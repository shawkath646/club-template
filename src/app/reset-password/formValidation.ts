import * as yup from "yup";

const validationSchema = yup.object().shape({
    nbcId: yup.number()
        .required("NBC ID is required")
        .min(100000, "NBC ID starts at 100000")
        .max(999999, "NBC ID ends at 999999"),
    email: yup.string()
        .required("Primary email is required")
        .email("Please enter a valid email address"),
    verificationCode: yup.string()
        .required("Verification code is required")
        .length(6, "Verification code must be exactly 6 characters long"),
    newPassword: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long"),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Confirm your new password"),
});

export default validationSchema;
