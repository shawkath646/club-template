import * as yup from 'yup';
import { subYears, isAfter, isBefore } from 'date-fns';

const validationSchema = yup.object().shape({
    firstName: yup.string()
        .min(3, 'First name must be at least 3 characters')
        .max(32, 'First name must be at most 32 characters')
        .required('First name is required'),
    lastName: yup.string()
        .min(3, 'Last name must be at least 3 characters')
        .max(32, 'Last name must be at most 32 characters')
        .required('Last name is required'),
    institute: yup.string()
        .min(3, 'Institute name must be at least 3 characters')
        .max(48, 'Institute name must be at most 48 characters')
        .required('Institute is required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phoneNumber: yup.string()
        .matches(/^\d{7,15}$/, 'Phone number must be between 7 and 15 digits')
        .required('Phone number is required'),
    dateOfBirth: yup.date()
        .required('Date of birth is required')
        .test('age', 'You must be between 13 and 40 years old', (value) => {
            const today = new Date();
            const minAge = subYears(today, 40);
            const maxAge = subYears(today, 13);
            return value ? isAfter(value, minAge) && isBefore(value, maxAge) : false;
        }),
    address1: yup.string()
        .min(3, 'Address 1 must be at least 3 characters')
        .max(100, 'Address 1 must be at most 100 characters')
        .required('Address 1 is required'),
    address2: yup.string()
        .max(200, 'Address 2 must be at most 200 characters'),
    city: yup.string()
        .min(3, 'City / Town must be at least 3 characters')
        .max(32, 'City / Town must be at most 32 characters')
        .required('City / Town is required'),
    state: yup.string()
        .min(3, 'State / Province must be at least 3 characters')
        .max(32, 'State / Province must be at most 32 characters')
        .required('State / Province is required'),
    country: yup.string()
        .required('Country is required'),
    position: yup.string().required(),
    identificationNo: yup.string()
        .min(3, 'Identification number must be at least 3 characters')
        .max(30, 'Identification number must be at most 30 characters')
        .required('Identification number is required'),
    gender: yup.string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .required('Gender is required'),
    educationalBackground: yup.string()
        .oneOf(['science', 'business studies', 'humanities', 'vocational'], 'Invalid educational background')
        .required('Educational background is required'),
    presentClass: yup.string()
        .required('Present class is required'),
    joiningReason: yup.string()
        .max(300, 'Joining reason must be at most 300 characters'),
    interestedIn: yup.string()
        .oneOf(["articles", "olympiads", "magazine", "volunteering"], 'Invalid interested in')
        .required('Interest selection is required'),
    agreeRules: yup.boolean()
        .oneOf([true], 'You must agree to the rules')
        .required('Agreement to rules is required'),
    profilePic: yup.mixed<File | ArrayBuffer | string>()
        .required('Profile picture is required')
        .test('fileType', 'Profile picture must be a valid type (File, ArrayBuffer, Base64 string)', (value) => {
            return value instanceof File || value instanceof ArrayBuffer || typeof value === 'string';
        }),
    identificationDoc: yup.mixed<File | ArrayBuffer | string>()
        .required('Identification document is required')
        .test('fileType', 'Identification document must be a valid type (File, ArrayBuffer, Base64 string)', (value) => {
            return value instanceof File || value instanceof ArrayBuffer || typeof value === 'string';
        }),
    signature: yup.mixed<File | ArrayBuffer | string>()
        .required('Signature is required')
        .test('fileType', 'Signature must be a valid type (File, ArrayBuffer, Base64 string)', (value) => {
            return value instanceof File || value instanceof ArrayBuffer || typeof value === 'string';
        }),

});

export default validationSchema;
