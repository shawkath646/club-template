import * as yup from 'yup';

const subYears = (date: Date, years: number): Date => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate;
};

const validationSchema = yup.object().shape({
    fullName: yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters')
        .max(64, 'First name must be at most 64 characters'),
    dateOfBirth: yup.date()
        .required('Date of birth is required')
        .test('age', 'You must be between 13 and 40 years old', (value) => {
            const today = new Date();
            const minAge = subYears(today, 40);
            const maxAge = subYears(today, 13);
            return value ? value.getTime() > minAge.getTime() && value.getTime() < maxAge.getTime() : false;
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
    address: yup.string()
        .required('Address 1 is required')
        .min(3, 'Address 1 must be at least 3 characters')
        .max(150, 'Address 1 must be at most 150 characters'),
    institute: yup.string()
        .required('Institute is required')
        .min(3, 'Institute name must be at least 3 characters')
        .max(48, 'Institute name must be at most 48 characters'),
    instituteAddress: yup.string()
        .required('Institute address is required')
        .min(3, 'Institute address must be at least 3 characters')
        .max(150, 'Institute address must be at most 150 characters'),
    studentID: yup.string()
        .required('Student ID is required')
        .min(3, 'Student ID must be at least 3 characters')
        .max(16, 'Student ID must be at most 16 characters'),
    position: yup
        .array()
        .of(yup.string().required('Each position must be a string'))
        .min(1, 'Position must have at least one value')
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
        .max(150, 'Facebook profile URL must be at most 150 characters')
        .url('Please provide a valid profile URL'),
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
});

export default validationSchema;
