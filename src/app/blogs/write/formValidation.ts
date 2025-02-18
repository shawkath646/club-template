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
        .max(12000, "Post text must be at most 12000 characters"),
    thumbnail: yup
        .string()
        .required("Thumbnail is required"),
    keywords: yup
        .array()
        .required("Keywords are required")
        .of(yup.string().required().trim()),
    excerpt: yup
        .string()
        .default("")
        .max(420, "Excerpt must be at most 420 characters")
});

export default validationSchema;