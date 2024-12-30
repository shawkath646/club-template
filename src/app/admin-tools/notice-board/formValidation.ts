import * as yup from "yup";

const validationSchema = yup.object().shape({
    title: yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters long")
        .max(120, "Title must be at most 120 characters long"),
    description: yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters long")
        .max(1000, "Description must be at most 1000 characters long"),
    attachment: yup.mixed<File | ArrayBuffer | string>().nullable(),
    isImportant: yup.boolean().defined()
});

export default validationSchema;
