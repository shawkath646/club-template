"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InputField from '@/components/form/InputField';
import RadioBox from '@/components/form/RadioBox';
import SelectBox from '@/components/form/SelectBox';
import FileUpload from '@/components/form/FileUpload';
import CheckBox from '@/components/form/CheckBox';
import StylistButton from '@/components/form/StylistButton';
import SubmittingDialog from './SubmittingDialog';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './formValidation';
import { submitMemberRequest } from '@/backend/members';
import { fileToBase64, getTodayDate } from '@/utils';
import { DialogStateType, MemberFormType } from '@/types';
import applicaitonInfo from "@/constant/applicaiton-info.json";
import joiningFormOptions from "@/constant/joiningFormOptions.json";


export default function JoiningFormClient({ registrationPosition }: { registrationPosition: string }) {

  const [dialogState, setDialogState] = useState<DialogStateType>({
    isOpen: false,
    status: "initial",
    message: "",
  });

  const { register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<MemberFormType>({
    defaultValues: {
      position: registrationPosition.toLowerCase().replace(" ", "-")
    },
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<MemberFormType> = async (data) => {
    setDialogState({ isOpen: true, status: "loading", message: "Submitting your request..." });

    try {
      const resolvedData: MemberFormType = {
        ...data,
        profilePic: (await fileToBase64(data.profilePic as File)) ?? "",
      };

      const response = await submitMemberRequest(resolvedData);

      if (response.status) {
        setDialogState({ isOpen: true, status: "success", message: "Form submitted successfully!" });
        setTimeout(() => router.push("/"), 3000);
      } else if (!response.status && response.errors) {
        response.errors.forEach((err: { field: keyof MemberFormType; message: string }) => {
          setError(err.field, { type: "manual", message: err.message });
        });
        setDialogState({ isOpen: false, status: "initial", message: "" });
      }
    } catch (error: any) {
      setDialogState({ isOpen: true, status: "failed", message: error.message });
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-200 bg-blue-500 bg-opacity-20 rounded py-5">{applicaitonInfo.name} e-Registration Form ({registrationPosition})</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <p className="text-gray-400 text-sm font-medium">Personal Information</p>
        <hr className="h-px mb-3 mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          <InputField type="text" fieldId="ullName" label="Full Name" {...register("fullName")} error={errors.fullName} />
          <InputField type="date" fieldId="dateOfBirth" label="Date of Birth" defaultValue={getTodayDate()} {...register("dateOfBirth")} error={errors.dateOfBirth} />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => <RadioBox label="Gender" field={field} options={joiningFormOptions.gender} error={errors.gender} />}
          />
          <InputField type="text" fieldId="fatherName" label="Father's Name" {...register("fatherName")} error={errors.fatherName} />
          <InputField type="text" fieldId="motherName" label="Mother's Name" {...register("motherName")} error={errors.motherName} />
          <InputField type="text" fieldId="address" label="Address" {...register("address")} error={errors.address} />
          <Controller
            name="profilePic"
            control={control}
            render={({ field }) => <FileUpload label="Formal photo (Passport size)" field={field} error={errors.profilePic} setError={(errorText) => setError("profilePic", { message: errorText })} />}
          />
        </section>
        <p className="text-gray-400 text-sm font-medium">Identification Information</p>
        <hr className="h-px mb-3 mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          <InputField type="email" fieldId="email" label="Email" {...register("email")} error={errors.email} />
          <InputField type="text" fieldId="phoneNumber" label="Phone Number" {...register("phoneNumber")} error={errors.phoneNumber} />
          <InputField type="text" fieldId="identificationNumber" label="NID/BRC/Passport No" {...register("identificationNo")} error={errors.identificationNo} />
          <InputField type="text" fieldId="fbProfileLink" label="Facebook Profile URL" {...register("fbProfileLink")} error={errors.fbProfileLink} />
        </section>
        <p className="text-gray-400 text-sm font-medium">Educational Information</p>
        <hr className="h-px mb-3 mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          <InputField type="text" fieldId="institute" label="Institute / Workplace" {...register("institute")} error={errors.institute} />
          <InputField type="text" fieldId="studentID" label="Student ID" {...register("studentID")} error={errors.studentID} />
          <Controller
            name="educationalBackground"
            control={control}
            render={({ field }) => <RadioBox label="Educational Background" field={field} options={joiningFormOptions.educationalBackground} error={errors.educationalBackground} />}
          />
          <Controller
            name="presentClass"
            control={control}
            render={({ field }) => <SelectBox label="Present Class" field={field} options={joiningFormOptions.presentClass} error={errors.presentClass} />}
          />
          <InputField type="text" fieldId="instituteAddress" label="Institute / Workplace Address" {...register("instituteAddress")} error={errors.instituteAddress} />
        </section>
        <p className="text-gray-400 text-sm font-medium">Club Information</p>
        <hr className="h-px mb-3 mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          <Controller
            name="interestedIn"
            control={control}
            render={({ field }) => <RadioBox label="Interested In" field={field} options={joiningFormOptions.interestedIn} error={errors.interestedIn} />}
          />
          <InputField type="text" fieldId="joiningReason" label="Reason for joining (Optional)" {...register("joiningReason")} error={errors.joiningReason} />
          <InputField type="text" fieldId="extraCurricularActivities" label="Extra Curricular Activities (Optional)" {...register("extraCurricularActivities")} error={errors.extraCurricularActivities} />
        </section>
        <Controller
          name="agreeRules"
          control={control}
          render={({ field }) => <CheckBox field={field} text="I hereby certify that the information provided is accurate and original. I have thoroughly reviewed the club membership rules and privacy policy, and I agree to comply with them. I understand that any violation of these rules may result in the cancellation of my membership without prior notice." />}
        />
        {errors.agreeRules && <p className="mt-2 text-sm text-red-600 mb-3">{errors.agreeRules.message}</p>}
        
        <StylistButton type="submit" colorScheme="blue" isLoading={isSubmitting} loadingLabel="Submitting..." size="md">
          Submit
        </StylistButton>
      </form>
      <SubmittingDialog dialogState={dialogState} setDialogState={setDialogState} />
    </>
  );
};
