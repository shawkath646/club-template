import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getMemberProfile } from "@/backend/members";
import { formatDate } from "@/utils";
import { PagePropsType } from "@/types";
import ButtonContainer from "./ButtonsContainer";
import MemberPermissions from "./MemberPermissions";
import DownloadButtons from "./ProfilePictureDownloadButton";
import PDFDownloadButton from "./PDFDownloadButton";
import ProfilePictureDownloadButton from "./ProfilePictureDownloadButton";

export async function generateMetadata(
    { params: { slug } }: PagePropsType,
): Promise<Metadata> {
    const memberProfile = await getMemberProfile(slug);
    return {
        title: memberProfile.personal.fullName
    }
};


export default async function Page({ params }: PagePropsType) {
    const memberDocId = params.slug;
    const memberProfile = await getMemberProfile(memberDocId);

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

    return (
        <>
            {/* Header */}
            <section className="mb-8 grid lg:grid-cols-2 gap-5">
                <div className="text-center space-y-4">
                    <Image
                        src={memberProfile.personal.picture}
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
                    {!!memberProfile.personal.picture && <ProfilePictureDownloadButton applicationId={memberProfile.id} profilePictureUrl={memberProfile.personal.picture} />}
                </div>
            </section>

            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Personal Information</h2>
                    <table className="min-w-full table-auto text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-2">Date of Birth</td>
                                <td className="p-2">:</td>
                                <td>{formatDate(memberProfile.personal.dateOfBirth as Date)}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Gender</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.personal.gender}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Father's Name</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.personal.fatherName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Mother's Name</td>
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

                {/* Identification Section */}
                <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Identification</h2>
                    <table className="min-w-full table-auto text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-2">Email</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.email}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Phone</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">ID Number</td>
                                <td className="p-2">:</td>
                                <td>{memberProfile.identification.identificationNo}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Facebook Profile</td>
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

            {/* Educational Information Section */}
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

            {/* Club Information Section */}
            <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Club Information</h2>
                <table className="min-w-full table-auto text-left">
                    <tbody>
                        <tr>
                            <td className="font-semibold py-2">NBC ID</td>
                            <td className="p-2">:</td>
                            <td>{memberProfile.club.nbcId}</td>
                        </tr>
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
                            <td className="font-semibold py-2">Joined On</td>
                            <td className="p-2">:</td>
                            <td>{formatDate(memberProfile.club.joinedOn as Date)}</td>
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
                    </tbody>
                </table>
            </section>
            {(memberProfile.club.status === "approved") && (
                <MemberPermissions docId={memberProfile.id} preloadPermissions={memberProfile.club.permissions} />
            )}
            <ButtonContainer docId={memberProfile.id} status={memberProfile.club.status} />
        </>
    );
}