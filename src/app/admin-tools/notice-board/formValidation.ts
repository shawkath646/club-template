import * as yup from "yup";

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(3, "Title must be at least 3 characters long")
        .max(120, "Title must be at most 120 characters long")
        .required("Title is required"),
    description: yup.string()
        .min(10, "Description must be at least 10 characters long")
        .max(1000, "Description must be at most 1000 characters long")
        .required("Description is required"),
    attachment: yup.mixed<File | ArrayBuffer | string>().defined().nullable(),
    isImportant: yup.boolean().defined()
});

export default validationSchema;
