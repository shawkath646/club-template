import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MemberPermissions from "./MemberPermissions";
import PDFDownloadButton from "./PDFDownloadButton";
import ButtonContainer from "./ButtonsContainer";
import ProfilePictureDownloadButton from "./ProfilePictureDownloadButton";
import { getMemberProfile } from "@/backend/members";
import { capitalizeWords, formatDate } from "@/utils/utils.frontend";
import getClubInfo from "@/constant/getClubInfo";
import { PagePropsType } from "@/types";
import { IoIosArrowBack } from "react-icons/io";

export async function generateMetadata(
    { searchParams }: PagePropsType,
): Promise<Metadata> {
    let userId = searchParams.id;

    if (Array.isArray(userId)) userId = userId[0];
    if (!userId) return { title: "Invalid ID provided" };

    const memberProfile = await getMemberProfile(userId);
    return {
        title: memberProfile?.personal?.fullName || "Member not found"
    };
};


export default async function Page({ searchParams }: PagePropsType) {

    let userId = searchParams.id;
    let callbackUrl = searchParams.callbackUrl;

    if (Array.isArray(userId)) userId = userId[0];
    if (Array.isArray(callbackUrl)) callbackUrl = callbackUrl[0];

    if (!userId) return redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/not-found`);

    const decodedCallbackUrl = decodeURIComponent(callbackUrl || `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members`);
    const clubInfo = await getClubInfo();
    const memberProfile = await getMemberProfile(userId);

    const getStatusLabel = (status: string): string => {
        const statusColors: { [key: string]: string } = {
            approved: "bg-green-500/20 text-green-500",
            suspended: "bg-yellow-500/20 text-yellow-500",
            rejected: "bg-red-500/20 text-red-500",
            expired: "bg-gray-500/20 text-gray-500",
            pending: "bg-blue-500/20 text-blue-500",
        };

        return (statusColors[status] || "bg-gray-500/20 text-gray-500") + " inline-flex items-center w-fit px-3 py-1 text-sm font-semibold rounded-full";
    };

    if (!memberProfile) return redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/not-found`);

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
                                <td>
                                    <Link
                                        href={"mailto:" + memberProfile.identification.email}
                                        target="_blank"
                                        className="inline-block w-full text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors truncate"
                                    >
                                        {memberProfile.identification.email}
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Phone</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">ID Number</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.identificationNo}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap">Facebook Profile</td>
                                <td className="p-2">:</td>
                                <td className="w-full max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <Link
                                        href={memberProfile.identification.fbProfileLink}
                                        target="_blank"
                                        className="inline-block w-full text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors truncate"
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

            <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Club Information</h2>
                <table className="min-w-full table-auto text-left">
                    <tbody>
                        {!!memberProfile.club.nbcId && (
                            <tr>
                                <td className="font-semibold py-2">NBC ID</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.club.nbcId}</td>
                            </tr>
                        )}
                        <tr>
                            <td className="font-semibold py-2">Position</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.club.position.replace("-", " ")}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Status</td>
                            <td className="p-2">:</td>
                            <td className="align-middle">
                                <span className={getStatusLabel(memberProfile.club.status)}>
                                    {memberProfile.club.status}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">{memberProfile.club.nbcId ? "Joined On" : "Applied On"}</td>
                            <td className="p-2">:</td>
                            <td>{formatDate(memberProfile.club.joinedOn)}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Interested In</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.club.interestedIn}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Extra-Curricular Activities</td>
                            <td className="p-2">:</td>
                            <td className="text-sm">{memberProfile.club.extraCurricularActivities}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Special Note</td>
                            <td className="p-2">:</td>
                            <td className="text-sm">{memberProfile.club.specialNote}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            {(memberProfile.club.status === "approved") && (
                <MemberPermissions docId={memberProfile.id} preloadPermissions={memberProfile.club.permissions} />
            )}
            <ButtonContainer
                clubInfo={clubInfo}
                currentStatus={memberProfile.club.status}
                docId={memberProfile.id}
                position={memberProfile.club.position}
                specialNote={memberProfile.club.specialNote}
                decodedCallbackUrl={decodedCallbackUrl}
            />
        </>
    );
}