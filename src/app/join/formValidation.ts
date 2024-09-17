import * as yup from 'yup';
import { subYears, isAfter, isBefore } from 'date-fns';
import { MemberFormType } from '@/types';

const validationSchema = yup.object().shape({
    firstName: yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters')
        .max(32, 'First name must be at most 32 characters'),
    lastName: yup.string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters')
        .max(32, 'Last name must be at most 32 characters'),
    dateOfBirth: yup.date()
        .required('Date of birth is required')
        .test('age', 'You must be between 13 and 40 years old', (value) => {
            const today = new Date();
            const minAge = subYears(today, 40);
            const maxAge = subYears(today, 13);
            return value ? isAfter(value, minAge) && isBefore(value, maxAge) : false;
        }),
    fatherName: yup.string()
        .required('Father\'s name is required')
        .min(3, 'Father\'s name must be at least 3 characters')
        .max(64, 'Father\'s name must be at most 64 characters'),
    motherName: yup.string()
        .required('Mother\'s name is required')
        .min(3, 'Mother\'s name must be at least 3 characters')
        .max(64, 'Mother\'s name must be at most 64 characters'),
    gender: yup.string()
        .required('Gender is required')
        .oneOf(['male', 'female', 'other'], 'Invalid gender'),
    email: yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    phoneNumber: yup.string()
        .required('Phone number is required')
        .matches(/^\d{7,15}$/, 'Phone number must be between 7 and 15 digits'),
    identificationNo: yup.string()
        .required('Identification number is required')
        .min(3, 'Identification number must be at least 3 characters')
        .max(30, 'Identification number must be at most 30 characters'),
    address1: yup.string()
        .required('Address 1 is required')
        .min(3, 'Address 1 must be at least 3 characters')
        .max(100, 'Address 1 must be at most 100 characters'),
    address2: yup.string()
        .max(200, 'Address 2 must be at most 200 characters'),
    city: yup.string()
        .required('City / Town is required')
        .min(3, 'City / Town must be at least 3 characters')
        .max(32, 'City / Town must be at most 32 characters'),
    state: yup.string()
        .required('State / Province is required')
        .min(3, 'State / Province must be at least 3 characters')
        .max(32, 'State / Province must be at most 32 characters'),
    country: yup.string()
        .required('Country is required'),
    institute: yup.string()
        .required('Institute is required')
        .min(3, 'Institute name must be at least 3 characters')
        .max(48, 'Institute name must be at most 48 characters'),
    instituteAddress: yup.string()
        .required('Institute address is required')
        .min(3, 'Institute address must be at least 3 characters')
        .max(120, 'Institute address must be at most 120 characters'),
    studentID: yup.string()
        .required('Student ID is required')
        .min(3, 'Student ID must be at least 3 characters')
        .max(16, 'Student ID must be at most 16 characters'),
    position: yup.string()
        .required('Position is required'),
    educationalBackground: yup.string()
        .required('Educational background is required')
        .oneOf(['science', 'business studies', 'humanities', 'vocational'], 'Invalid educational background'),
    presentClass: yup.string()
        .required('Present class is required'),
    joiningReason: yup.string()
        .max(300, 'Joining reason must be at most 300 characters'),
    extraCurricularActivities: yup.string()
        .max(300, 'Extra curricular activities must be at most 300 characters'),
    fbProfileLink: yup.string()
        .required('Facebook profile URL is required')
        .min(3, 'Facebook profile URL must be at least 3 characters')
        .max(150, 'Facebook profile URL must be at most 150 characters'),
    interestedIn: yup.string()
        .required('Interest selection is required')
        .oneOf(["articles", "olympiads", "magazine", "volunteering"], 'Invalid interested in'),
    agreeRules: yup.boolean()
        .required('Agreement to rules is required')
        .oneOf([true], 'You must agree to the rules'),
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
