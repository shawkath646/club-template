import * as yup from 'yup';

const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .min(5, "Title must be at least 5 characters")
        .max(200, "Title must be at most 200 characters"),
    postText: yup
        .string()
        .required("Post text is required")
        .min(50, "Post text must be at least 50 characters")
        .max(10000, "Post text must be at most 10000 characters"),
    thumbnail: yup
        .string()
        .required("Thumbnail is required"),
    keywords: yup
        .array()
        .required("Keywords are required")
        .of(yup.string().required().trim())
        .min(3, "At least three keyword is required"),
    excerpt: yup
        .string()
        .required("Excerpt is required")
        .min(5, "Excerpt must be at least 5 characters")
        .max(230, "Excerpt must be at most 230 characters")
});

export default validationSchema;