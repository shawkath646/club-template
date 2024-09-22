"use client";
import { useState } from "react";
import { updatePermissions } from "@/backend/members";
import permissionsList from "@/constant/permissionsList.json";
import { IoCheckbox } from "react-icons/io5";


export default function MemberPermissions({ preloadPermissions, docId }: { preloadPermissions: string[]; docId: string; }) {

    const [permissions, setPermissions] = useState(preloadPermissions);

    const onCheckBoxChange = async (permission: string) => {
        const updatedPermissions = permissions.includes(permission)
            ? permissions.filter((item) => item !== permission)
            : [...permissions, permission];

        setPermissions(updatedPermissions);

        try {
            await updatePermissions(docId, updatedPermissions);
        } catch (error) {
            console.error("Failed to update permissions:", error);
        }
    };

    const PermissionCheckBox = ({ text }: { text: string }) => {
        const isEnabled = permissions.includes(text);

        return (
            <div className="flex items-start space-x-2 my-3">
                <div
                    onClick={() => onCheckBoxChange(text)}
                    className={`relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-gray-600 ${isEnabled ? 'bg-blue-500 dark:bg-blue-500' : 'bg-white dark:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0`}
                >
                    {isEnabled && (
                        <IoCheckbox className="w-4 h-4 text-black dark:text-white" />
                    )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
            </div>
        );
    };

    return (
        <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm mt-10">
            <h2 className="font-semibold text-lg mb-4">Permissions</h2>
            <div className="space-y-3 ml-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {permissionsList.map((item, index) => (
                    <PermissionCheckBox key={index} text={item} />
                ))}
            </div>
        </section>
    );
}
