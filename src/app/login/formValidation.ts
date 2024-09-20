import * as yup from "yup";

const validationSchema = yup.object().shape({
    nbcId: yup.string()
        .required("NBC ID is required")
        .min(3, "NBC ID must be at least 3 characters long")
        .max(120, "NBC ID must be at most 6 characters long"),
    password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long"),
});

export default validationSchema;