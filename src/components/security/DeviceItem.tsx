"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTransition } from "react";
import StylistButton from "@/components/form/StylistButton";
import { formatDate } from "@/utils/utils.frontend";
import * as deviceIcons from "@/constant/deviceIcons";
import { SessionObject } from "@/types";
import { signOut } from "@/backend/auth";


export default function DeviceItem({ sessionItem, currentSessionId }: { sessionItem: SessionObject; currentSessionId: string; }) {

    const [isLoading, startTransition] = useTransition();

    const router = useRouter();

    const handleDeviceLogout = () => startTransition(async () => {
        await signOut({ sessionId: sessionItem.id });
        router.refresh();
    });

    const formatDeviceName = (deviceString: string) => {
        let os = "Unknown OS";
        let browser = "Unknown Browser";

        if (deviceString.includes("Windows NT")) os = "Windows";
        if (deviceString.includes("Mac OS X")) os = "Mac";
        if (deviceString.includes("Linux")) os = "Linux";
        if (deviceString.includes("Android")) os = "Android";
        if (deviceString.includes("iPhone")) os = "iPhone";

        if (deviceString.includes("Chrome")) browser = "Chrome";
        if (deviceString.includes("Safari") && !deviceString.includes("Chrome")) browser = "Safari";
        if (deviceString.includes("Firefox")) browser = "Firefox";
        if (deviceString.includes("Edge")) browser = "Microsoft Edge";

        return `${os} - ${browser}`;
    }

    const getDeviceLogo = (deviceString: string) => {
        if (deviceString.includes("Windows")) return deviceIcons.windowsIcon;
        if (deviceString.includes("Android")) return deviceIcons.androidIcon;
        if (deviceString.includes("iPhone")) return deviceIcons.iphoneIcon;
        if (deviceString.includes("Mac")) return deviceIcons.macIcon;
        if (deviceString.includes("Linux")) return deviceIcons.linuxIcon;
        return deviceIcons.unknownDeviceIcon;
    };

    return (
        <article className="relative border border-gray-200 dark:border-gray-600 p-1 md:p-3 rounded-lg shadow-md flex gap-4">
            <Image
                src={getDeviceLogo(sessionItem.device)}
                alt={formatDeviceName(sessionItem.device)}
                height={48}
                width={48}
                className="h-12 w-12 object-contain invert"
            />

            <div className="flex-grow">
                <p className="text-lg font-medium text-white">{formatDeviceName(sessionItem.device)}</p>
                <p className="text-sm text-gray-800 dark:text-gray-400">Time: {formatDate(sessionItem.timestamp)}</p>
                <p className="text-sm text-gray-800 dark:text-gray-400">Last active: {formatDate(sessionItem.lastActive)}</p>
                <p className="text-sm text-gray-800 dark:text-gray-400">IP: {sessionItem.ipAddress}</p>
                <p className="text-sm text-gray-800 dark:text-gray-400">Location: {sessionItem.location}</p>
            </div>

            <span
                className={`absolute top-2 right-2 px-3 py-1 text-xs font-medium rounded-full ${sessionItem.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                    }`}
            >
                {sessionItem.status}
            </span>
            {(sessionItem.status === "active" && sessionItem.id !== currentSessionId) && (
                <StylistButton
                    size="sm"
                    colorScheme="red"
                    isLoading={isLoading}
                    loadingLabel="Please wait..."
                    onClick={handleDeviceLogout}
                    className="absolute bottom-2 right-2"
                >
                    Logout
                </StylistButton>
            )}
        </article>
    );
};