"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ProfilePictureContainer from "./ProfilePictureContainer";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import RadioBox from "@/components/form/RadioBox";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./formValidation";
import { updateProfile } from "@/backend/members";
import { getTodayDate } from "@/utils/utils.frontend";
import joiningFormOptions from "@/constant/joiningFormOptions.json";
import { MemberProfileType, MemberUpdateProfileType } from "@/types";
import SelectBox from "@/components/form/SelectBox";


export default function InformationContainer({ memberProfile }: { memberProfile: Omit<MemberProfileType, "auth"> }) {

    const [isEditMode, setEditMode] = useState<boolean>(false);
    const router = useRouter();

    const { control, handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<MemberUpdateProfileType>({
        defaultValues: {
            gender: memberProfile.personal.gender,
            fatherName: memberProfile.personal.fatherName,
            motherName: memberProfile.personal.motherName,
            address: memberProfile.personal.address,
            identificationNo: memberProfile.identification.personalIdentificationNo,
            fbProfileLink: memberProfile.identification.fbProfileLink,
            institute: memberProfile.educational.institute,
            instituteAddress: memberProfile.educational.instituteAddress,
            educationalBackground: memberProfile.educational.background,
            studentID: memberProfile.educational.studentID,
            interestedIn: memberProfile.club.interestedIn,
            joiningReason: memberProfile.club.interestedIn,
            extraCurricularActivities: memberProfile.club.extraCurricularActivities,
            presentClass: memberProfile.educational.presentClass
        },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<MemberUpdateProfileType> = async (data) => {
        await updateProfile(data);
        router.refresh();
        setEditMode(false);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <section className="flex space-x-5 items-center">
                    <ProfilePictureContainer
                        memberFullName={memberProfile.personal.fullName}
                        pictureUrl={memberProfile.personal.picture}
                    />
                    <div>
                        <p className="text-lg font-medium text-white dark:text-gray-200">{memberProfile.personal.fullName}</p>
                        <p className="text-sm font-medium text-gray-300 dark:text-gray-400">
                            {memberProfile.identification.primaryEmail}
                        </p>
                        <p className="text-sm font-medium text-gray-300 dark:text-gray-400">{memberProfile.id}</p>
                        <p className="text-sm font-medium text-gray-300 dark:text-gray-400">NBC ID: {memberProfile.club.nbcId}</p>
                    </div>

                </section>
                {!isEditMode && (
                    <div className="mt-4 lg:mt-0 lg:ml-auto">
                        <StylistButton
                            size="sm"
                            colorScheme="green"
                            onClick={() => setEditMode(true)}
                        >
                            Enable edit
                        </StylistButton>
                    </div>
                )}
            </div>
            {isEditMode && (
                <p className="text-sm text-gray-800 dark:text-gray-400 my-3 max-w-2xl">Editing the name and primary email address directly is not allowed to prevent fake identities. If you need further changes, please contact our admin team with proper documents (e.g., National ID Card, Birth Certificate, or Passport).</p>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 w-full"
            >
                <div className="space-y-4">
                    <InputField
                        label="Date of Birth (MM-DD-YYYY)"
                        type="date"
                        defaultValue={getTodayDate(memberProfile.personal.dateOfBirth)}
                        isEditable={isEditMode}
                        error={errors.dateOfBirth}
                        singleLine
                        {...register("dateOfBirth", { valueAsDate: true })}
                    />
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <RadioBox
                                field={field}
                                label="Gender"
                                options={joiningFormOptions.gender}
                                singleLine
                                isEditable={isEditMode}
                                error={errors.gender}
                            />
                        )}
                    />
                    <InputField
                        label="Father's Name"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("fatherName")}
                        error={errors.fatherName}
                    />
                    <InputField
                        label="Mother's Name"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("motherName")}
                        error={errors.motherName}
                    />
                    <InputField
                        label="NID/BRC/Passport No"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("identificationNo")}
                        error={errors.identificationNo}
                    />
                    <InputField
                        label="Facebook Profile URL"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("fbProfileLink")}
                        error={errors.fbProfileLink}
                    />
                    <InputField
                        label="Reason for joining (Optional)"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("joiningReason")}
                        error={errors.joiningReason}
                    />
                    <InputField
                        label="Extra Curricular Activities (Optional)"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("extraCurricularActivities")}
                        error={errors.extraCurricularActivities}
                    />
                </div>
                <div className="space-y-4">
                    <InputField
                        label="Institute / Workplace"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("institute")}
                        error={errors.institute}
                    />
                    <InputField
                        label="Institute / Workplace Address"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("instituteAddress")}
                        error={errors.instituteAddress}
                    />
                    <InputField
                        label="Student ID"
                        type="text"
                        isEditable={isEditMode}
                        singleLine
                        {...register("studentID")}
                        error={errors.studentID}
                    />
                    <Controller
                        name="educationalBackground"
                        control={control}
                        render={({ field }) => (
                            <RadioBox
                                field={field}
                                label="Educational Background"
                                options={joiningFormOptions.educationalBackground}
                                isEditable={isEditMode}
                                singleLine
                                error={errors.educationalBackground}
                            />
                        )}
                    />
                    <Controller
                        name="interestedIn"
                        control={control}
                        render={({ field }) => (
                            <RadioBox
                                field={field}
                                label="Interested In"
                                options={joiningFormOptions.interestedIn}
                                isEditable={isEditMode}
                                singleLine
                                error={errors.interestedIn}
                            />
                        )}
                    />
                    <Controller
                        name="presentClass"
                        control={control}
                        render={({ field }) => (
                            <SelectBox
                                label="Present Class"
                                field={field}
                                options={joiningFormOptions.presentClass}
                                isEditable={isEditMode}
                                error={errors.presentClass}
                            />
                        )}
                    />
                </div>
                {isEditMode && (
                    <div className="mt-3 flex gap-3 items-center justify-end col-span-1 lg:col-span-2">
                        <StylistButton size="sm" colorScheme="red" onClick={() => reset()} isDisabled={isSubmitting}>
                            Reset changes
                        </StylistButton>
                        <StylistButton type="submit" size="sm" colorScheme="green" isLoading={isSubmitting} loadingLabel="Saving...">
                            Save changes
                        </StylistButton>
                    </div>
                )}
            </form>
        </>
    );
}