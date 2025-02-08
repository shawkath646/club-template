import { Metadata } from 'next';
import Link from 'next/link';
import { forbidden } from "next/navigation";
import InformationContainer from './InformationContainer';
import PasswordSettings from '@/components/security/PasswordSettings';
import TwoStepSecurity from '@/components/security/TwoStepSecurity';
import DeviceItem from '@/components/security/DeviceItem';
import { getSession, getAllSessions, getBackupCodes } from "@/backend/auth";
import { getMemberProfileById } from "@/backend/members";
import { formatDate } from '@/utils/utils.backend';
import { IoIosArrowBack } from "react-icons/io";

export async function generateMetadata(): Promise<Metadata> {
    const session = await getSession();
    if (!session) forbidden();

    return {
        title: "Profile - " + session.fullName,
    };
};

export default async function Page() {
    const session = await getSession();
    if (!session) forbidden();

    const userData = await getMemberProfileById(session.id);
    const { auth, ...safeUserData } = userData;

    const allSessions = await getAllSessions();
    const savedBackupCodes = await getBackupCodes();

    const backupCodeDownloadHeader = `${userData.id} - NBC${userData.club.nbcId} - ${userData.identification.primaryEmail}\n`;

    return (
        <>
            <menu className="flex space-x-3 items-center text-white dark:text-gray-200 mb-5 bg-black/20 py-3 px-2 rounded shadow-lg">
                <Link
                    href="/"
                    className="hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105"
                >
                    <IoIosArrowBack size={32} className="text-white drop-shadow-md" />
                </Link>
                <h2 className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
                    Profile
                </h2>
            </menu>

            <InformationContainer memberProfile={safeUserData} />
            <div className="mt-16">
                <div className="text-center mb-8">
                    <p className="text-3xl font-semibold text-white dark:text-gray-200">Security Settings</p>
                    <p className="text-md text-white/80 dark:text-gray-400 mt-2">Change your password to enhance account security</p>
                </div>

                <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 w-full">
                    <PasswordSettings lastPasswordChanged={formatDate(userData.auth.lastPasswordChange)} />
                    <TwoStepSecurity
                        isTwoStep={auth.isTwoStep}
                        twoStepMethods={{
                            authenticator: !!auth.twoStepMethods.authenticator || false,
                            emails: auth.twoStepMethods.emails,
                            phones: auth.twoStepMethods.phones,
                        }}
                        savedBackupCodes={savedBackupCodes}
                        backupCodeDownloadHeader={backupCodeDownloadHeader}
                    />
                </section>
                <section className="mt-10 bg-white/20 dark:bg-black/20 rounded-xl p-2 md:p-8 shadow-xl backdrop-blur-lg space-y-8">
                    <p className="text-2xl font-semibold text-white dark:text-gray-300">Device Management</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {allSessions.map((device, index) => (
                            <DeviceItem
                                key={index}
                                sessionItem={device}
                                currentSessionId={session.sessionId}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <div className="flex items-center w-full mt-10">
                <hr className="flex-grow border-t border-gray-500" />
                <span className="px-4 text-gray-500 text-sm">Joined On: {formatDate(userData.club.joinedOn)}</span>
                <hr className="flex-grow border-t border-gray-500" />
            </div>
        </>
    );
}
