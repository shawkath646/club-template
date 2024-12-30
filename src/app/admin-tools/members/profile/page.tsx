import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ClubInformations from "./ClubInformations";
import MemberPermissions from "./MemberPermissions";
import PDFDownloadButton from "./PDFDownloadButton";
import ProfilePictureDownloadButton from "./ProfilePictureDownloadButton";
import { getMemberProfile } from "@/backend/members";
import { capitalizeWords, formatDate } from "@/utils/utils.backend";
import { PagePropsType } from "@/types";
import { IoIosArrowBack } from "react-icons/io";

export async function generateMetadata({ searchParams: searchParamsPromise }: PagePropsType): Promise<Metadata> {
    const searchParams = await searchParamsPromise;
    let userId = searchParams.id;

    if (Array.isArray(userId)) userId = userId[0];
    if (!userId) return { title: "Invalid ID provided" };

    const memberProfile = await getMemberProfile(userId);
    return {
        title: memberProfile.personal.fullName
    };
};

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {

    const searchParams = await searchParamsPromise;
    let userId = searchParams.id;
    let callbackUrl = searchParams.callbackUrl;

    if (Array.isArray(userId)) userId = userId[0];
    if (Array.isArray(callbackUrl)) callbackUrl = callbackUrl[0];

    if (!userId) notFound();

    const decodedCallbackUrl = decodeURIComponent(callbackUrl || `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members`);
    const memberProfile = await getMemberProfile(userId);

    return (
        <>
            <menu className="flex space-x-3 items-center text-white dark:text-gray-200 mb-5 bg-black/20 py-3 px-2 rounded shadow-lg">
                <Link
                    href={decodedCallbackUrl}
                    className="hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105"
                >
                    <IoIosArrowBack size={32} className="text-white drop-shadow-md" />
                </Link>
                <h2 className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
                    View Profile
                </h2>
            </menu>
            <section className="mb-8 grid lg:grid-cols-2 gap-5">
                <div className="text-center space-y-4">
                    <Image
                        src={memberProfile.personal.picture || `https://eu.ui-avatars.com/api/?name=${memberProfile.personal.fullName}&size=120`}
                        alt={`${memberProfile.personal.fullName} profile picture`}
                        height={120}
                        width={120}
                        className="rounded-full border-4 border-yellow-500 dark:border-yellow-400 object-cover w-[120px] h-[120px] mx-auto"
                    />
                    <h1 className="text-2xl font-semibold">{memberProfile.personal.fullName}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Application ID: {memberProfile.id}</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2">
                    <PDFDownloadButton applicationId={memberProfile.id} />
                    {!!memberProfile.personal.picture && <ProfilePictureDownloadButton applicationId={memberProfile.id} />}
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Personal Information</h2>
                    <table className="min-w-full table-auto text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">Date of Birth</td>
                                <td className="p-2">:</td>
                                <td>{formatDate(memberProfile.personal.dateOfBirth)}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Gender</td>
                                <td className="p-2">:</td>
                                <td>{capitalizeWords(memberProfile.personal.gender)}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">Father's Name</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.personal.fatherName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">Mother's Name</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.personal.motherName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Address</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.personal.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Identification</h2>
                    <table className="min-w-full table-auto text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-2">Email</td>
                                <td className="p-2">:</td>
                                <td className="w-full max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <Link
                                        href={"mailto:" + memberProfile.identification.primaryEmail}
                                        target="_blank"
                                        className=" text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors truncate"
                                    >
                                        {memberProfile.identification.primaryEmail}
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Phone</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.phoneNumber.value}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">ID Number</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.personalIdentificationNo}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">Facebook Profile</td>
                                <td className="p-2">:</td>
                                <td className="w-full max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <Link
                                        href={memberProfile.identification.fbProfileLink}
                                        target="_blank"
                                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors truncate"
                                    >
                                        {memberProfile.identification.fbProfileLink}
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>

            <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm mb-8">
                <h2 className="font-semibold text-lg mb-4">Educational Information</h2>
                <table className="min-w-full table-auto text-left">
                    <tbody>
                        <tr>
                            <td className="font-semibold py-2">Institute</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.educational.institute}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Institute Address</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.educational.instituteAddress}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Student ID</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.educational.studentID}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Background</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.educational.background}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Present Class</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.educational.presentClass}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <ClubInformations docId={memberProfile.id} memberProfileClub={memberProfile.club} />
            {(memberProfile.club.status === "approved") && (
                <MemberPermissions docId={memberProfile.id} preloadPermissions={memberProfile.club.permissions} />
            )}
        </>
    );
}