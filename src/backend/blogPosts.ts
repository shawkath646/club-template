"use server";
import { forbidden, notFound, unauthorized } from "next/navigation";
import { cache } from "react";
import { getSession } from "./auth";
import { getMemberProfileById } from "./members";
import uploadFileToFirestore from "./uploadFileToFirestore";
import { sendMail } from "./baseApp";
import { generateRandomId, timestampToDate } from "@/utils/utils.backend";
import { bucket, db } from "@/config/firebase.config";
import blogPostApprovalEmailTemplate from "@/templates/blogPostApprovalEmail.template";
import blogPostRejectionEmailTemplate from "@/templates/blogPostRejectionEmail.templates";
import { ActionResponseType, BlogPostFormType, BlogPostType, PartialFields } from "@/types";

export const getPartialBlogPosts = cache(async (
    pageNumber?: number,
    isApproved: boolean = true
): Promise<{ blogPosts: BlogPostType[]; totalPosts: number; }> => {

    if (!isApproved) {
        const session = await getSession();
        if (!session) forbidden();
        if (!session.permissions.includes("blogs")) unauthorized();
    }

    const totalPostsSnapshot = await db
        .collection("blogPosts")
        .where("isApproved", "==", isApproved)
        .count()
        .get();

    const totalPosts = totalPostsSnapshot.data().count;

    let blogPostsQuery = db
        .collection("blogPosts")
        .where("isApproved", "==", isApproved)
        .orderBy("timestamp", "desc");

    if (pageNumber) {
        blogPostsQuery = blogPostsQuery
            .offset((pageNumber - 1) * 12)
            .limit(12);
    }

    const blogPostsSnapshot = await blogPostsQuery.get();

    const blogPosts = blogPostsSnapshot.docs.map((doc) => {
        const postData = doc.data() as BlogPostType;
        return {
            ...postData,
            postText: "",
            ref: doc.ref,
        };
    });

    await Promise.all(blogPosts.map(async (post) => {
        const [authorData, seenByCountSnapshot] = await Promise.all([
            getMemberProfileById(post.authorId),
            post.ref.collection("seenBy").count().get(),
        ]);

        post.authorName = authorData.personal.fullName;
        post.timestamp = timestampToDate(post.timestamp);
        post.seenBy = seenByCountSnapshot.data().count;
    }));

    return {
        blogPosts,
        totalPosts
    };
});

export const addBlogPost = async (
    postData: BlogPostFormType,
    modifiedPostId?: string
): Promise<ActionResponseType> => {
    const session = await getSession();
    if (!session) forbidden();

    let docId = modifiedPostId || `BLOG${generateRandomId(6)}`;
    let existingPostData = modifiedPostId ? await getBlogPost(modifiedPostId) : null;

    if (existingPostData && (session.id !== existingPostData.authorId || existingPostData.isApproved)) unauthorized();

    if (!modifiedPostId || postData.thumbnail !== existingPostData?.thumbnail) {
        postData.thumbnail = await uploadFileToFirestore(postData.thumbnail, {
            fileType: "image",
            fileName: `blogPost_${docId}`
        });
    }

    const postObject: PartialFields<BlogPostType, "seenBy" | "slug" | "authorName"> = {
        ...postData,
        id: docId,
        authorId: existingPostData?.authorId || session.id,
        ...(existingPostData?.authorName && { authorName: existingPostData.authorName }),
        timestamp: existingPostData?.timestamp || new Date(),
        isApproved: existingPostData?.isApproved ?? false,
        isModified: Boolean(modifiedPostId),
    };
    await db.collection("blogPosts").doc(docId).set(postObject);
    return { success: true };
};

export const getBlogPost = cache(async (identifier: string, bySlug: boolean = false) => {
    let docRef;

    if (bySlug) {
        const docSnapshot = await db.collection("blogPosts").where("slug", "==", identifier).get();
        if (docSnapshot.empty) notFound();
        docRef = docSnapshot.docs[0];
    } else {
        docRef = await db.collection("blogPosts").doc(identifier).get();
        if (!docRef.exists) notFound();
    }

    const postData = docRef.data() as BlogPostType;
    const memberData = await getMemberProfileById(postData.authorId);
    const seenByCountSnapshot = await docRef.ref.collection("seenBy").count().get();

    return {
        ...postData,
        seenBy: seenByCountSnapshot.data().count,
        authorName: memberData.personal.fullName,
        timestamp: timestampToDate(postData.timestamp),
    };
});

export const approveBlogPost = async (docId: string): Promise<ActionResponseType> => {
    const session = await getSession();
    if (!session) forbidden();
    if (!session.permissions.includes("blogs")) unauthorized();

    const postData = await getBlogPost(docId);
    const memberData = await getMemberProfileById(postData.authorId);
    const slug = postData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const response = await sendMail({
        recipient: memberData.identification.primaryEmail,
        subject: "Your blog post has been published",
        body: await blogPostApprovalEmailTemplate({
            memberName: memberData.personal.fullName,
            postTitle: postData.title,
            slug
        }),
        type: "html"
    });

    if (!response.success) return response;

    await db.collection("blogPosts").doc(docId).update({ isApproved: true, slug, timestamp: new Date() });
    return { success: true };
};

export const rejectBlogPost = async (docId: string, rejectionReason: string): Promise<ActionResponseType> => {
    const session = await getSession();
    if (!session) forbidden();
    if (!session.permissions.includes("blogs")) unauthorized();

    const postData = await getBlogPost(docId);
    const memberData = await getMemberProfileById(postData.authorId);

    const response = await sendMail({
        recipient: memberData.identification.primaryEmail,
        subject: "Your blog post has been rejected",
        body: await blogPostRejectionEmailTemplate({
            memberName: memberData.personal.fullName,
            postTitle: postData.title,
            rejectionReason
        }),
        type: "html"
    });

    if (!response.success) return response;

    await bucket.file(`blogPost_${docId}`).delete();
    await db.collection("blogPosts").doc(docId).delete();
    return { success: true };
};

export const addBlogPostView = async (docId: string): Promise<ActionResponseType> => {
    const session = await getSession();
    if (!session) return { success: false, message: "User session not found." };

    await db.collection("blogPosts").doc(docId).collection("seenBy").doc(session.id).set({ timestamp: new Date() });
    return { success: true };
};
