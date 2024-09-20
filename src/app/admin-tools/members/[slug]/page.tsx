import Image from "next/image";
import { getMemberProfile } from "@/backend/members";
import { PagePropsType } from "@/types";
import { MdEmail, MdPhone, MdLocationOn, MdPerson } from "react-icons/md";
import { FaFacebook, FaUniversity } from "react-icons/fa";
import { formatDate } from "@/utils";

export default async function Page({ params }: PagePropsType) {
    const memberDocId = params.slug;
    const memberProfile = await getMemberProfile(memberDocId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Profile Picture and Basic Info */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <Image
                        src={memberProfile.personal.picture}
                        alt={`${memberProfile.personal.fullName} profile picture`}
                        width={150}
                        height={150}
                        className="rounded-full object-cover mb-4"
                    />
                    <h2 className="text-xl font-bold mb-2">{memberProfile.personal.fullName}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(memberProfile.personal.dateOfBirth as Date)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {memberProfile.personal.gender}
                    </p>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
                <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="flex items-center text-sm">
                        <MdPerson className="mr-2 text-blue-500 dark:text-blue-400" />{" "}
                        Father: {memberProfile.personal.fatherName}
                    </p>
                    <p className="flex items-center text-sm">
                        <MdPerson className="mr-2 text-blue-500 dark:text-blue-400" />{" "}
                        Mother: {memberProfile.personal.motherName}
                    </p>
                    <p className="flex items-center text-sm">
                        <MdLocationOn className="mr-2 text-blue-500 dark:text-blue-400" />{" "}
                        Address: {memberProfile.personal.address}
                    </p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-4">Contact Information</h3>
                <p className="flex items-center text-sm">
                    <MdEmail className="mr-2 text-blue-500 dark:text-blue-400" /> {memberProfile.identification.email}
                </p>
                <p className="flex items-center text-sm">
                    <MdPhone className="mr-2 text-blue-500 dark:text-blue-400" /> {memberProfile.identification.phoneNumber}
                </p>
                <p className="flex items-center text-sm">
                    <FaFacebook className="mr-2 text-blue-500 dark:text-blue-400" />{" "}
                    <a
                        href={memberProfile.identification.fbProfileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Facebook Profile
                    </a>
                </p>
                <p className="text-sm mt-4">
                    <strong>ID:</strong> {memberProfile.identification.identificationNo}
                </p>
            </div>

            {/* Educational Information */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
                <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-4">Educational Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="flex items-center text-sm">
                        <FaUniversity className="mr-2 text-blue-500 dark:text-blue-400" /> {memberProfile.educational.institute}
                    </p>
                    <p className="text-sm">Institute Address: {memberProfile.educational.instituteAddress}</p>
                    <p className="text-sm">Student ID: {memberProfile.educational.studentID}</p>
                    <p className="text-sm">Background: {memberProfile.educational.background}</p>
                    <p className="text-sm">Present Class: {memberProfile.educational.presentClass}</p>
                </div>
            </div>

            {/* Club Information */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-3">
                <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-4">Club Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="text-sm">NBC ID: {memberProfile.club.nbcId}</p>
                    <p className="text-sm">Position: {memberProfile.club.position}</p>
                    <p className="text-sm">Status: {memberProfile.club.status}</p>
                    <p className="text-sm">Joined On: {formatDate(memberProfile.club.joinedOn as Date)}</p>
                    <p className="text-sm">Interested In: {memberProfile.club.interestedIn}</p>
                    <p className="text-sm">Extra Curricular Activities: {memberProfile.club.extraCurricularActivities}</p>
                    <p className="text-sm">Reason for Joining: {memberProfile.club.reason}</p>
                </div>
            </div>
        </div>
    );
}