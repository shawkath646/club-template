import Link from "next/link";
import Image from "next/image";
import { getMemberProfile } from "@/backend/members";
import { formatDate } from "@/utils";
import { PagePropsType } from "@/types";
import { MdEmail, MdPhone, MdLocationOn, MdPerson } from "react-icons/md";
import { FaFacebook, FaUniversity } from "react-icons/fa";



export default async function Page({ params }: PagePropsType) {
    const memberDocId = params.slug;
    const memberProfile = await getMemberProfile(memberDocId);

    return (
        <div className="p-4">
            <section className="bg-white/30 dark:bg-gray-800/30 p-6 rounded-md shadow-md grid lg:grid-cols-2">
                {/* Left Section: Profile Picture and Basic Info */}
                <div className="text-gray-800 dark:text-gray-300">
                    <div className="text-center">
                        <Image
                            src={memberProfile.personal.picture}
                            alt={`${memberProfile.personal.fullName} profile`}
                            height={120}
                            width={120}
                            className="rounded-full border-4 border-yellow-500 dark:border-yellow-400 object-cover shadow-lg h-[120px] w-[120px]"
                        />
                        <p className="font-semibold text-lg text-gray-900 dark:text-white mt-3">
                            {memberProfile.personal.fullName}
                        </p>
                    </div>

                    {/* Basic Info Table */}
                    <table className="min-w-full table-auto text-left text-gray-900 dark:text-white border-separate border-spacing-y-2 mt-5">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-2 px-4">Date of Birth</td>
                                <td className="px-2 font-semibold">:</td>
                                <td className="py-2 px-4">{formatDate(memberProfile.personal.dateOfBirth as Date)}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 px-4">Gender</td>
                                <td className="px-2 font-semibold">:</td>
                                <td className="py-2 px-4">{memberProfile.personal.gender}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 px-4">Father's Name</td>
                                <td className="px-2 font-semibold">:</td>
                                <td className="py-2 px-4">{memberProfile.personal.fatherName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 px-4">Mother's Name</td>
                                <td className="px-2 font-semibold">:</td>
                                <td className="py-2 px-4">{memberProfile.personal.motherName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 px-4">Address</td>
                                <td className="px-2 font-semibold">:</td>
                                <td className="py-2 px-4">{memberProfile.personal.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Right Section: Identification Info */}
                <div className="mt-6 md:mt-0 w-full md:w-1/3 space-y-4 text-gray-800 dark:text-gray-300">
                    <table className="min-w-full text-left text-gray-900 dark:text-white">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-2">Email</td>
                                <td>:</td>
                                <td>{memberProfile.identification.email}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Phone Number</td>
                                <td>:</td>
                                <td>{memberProfile.identification.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">ID Number</td>
                                <td>:</td>
                                <td>{memberProfile.identification.identificationNo}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2">Facebook Profile</td>
                                <td>:</td>
                                <td>
                                    <Link href={memberProfile.identification.fbProfileLink} target="_blank" className="text-blue-500 dark:text-blue-400 underline">
                                        {memberProfile.identification.fbProfileLink}
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>


    );
}