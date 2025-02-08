"use client";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdatePositionDialogContent from "./UpdatePositionDialogContent";
import UpdateStatusDialogContent from "./UpdateStatusDialogContent";
import { formatDate, capitalizeWords } from "@/utils/utils.frontend";
import { MemberProfileType } from "@/types";
import UpdateNbcIdDialogContainer from "./UpdateNbcIdDialogContainer";


export default function ClubInformations({ docId, memberProfileClub }: { docId: string, memberProfileClub: MemberProfileType["club"] }) {

    const [isNbcIdDialogOpen, setNbcIdDialogOpen] = useState(false);
    const [isPositionDialogOpen, setPositionDialogOpen] = useState(false);
    const [isStatusDialogOpen, setStatusDialogOpen] = useState(false);

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
            <section className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Club Information</h2>
                <table className="min-w-full table-auto text-left">
                    <tbody>
                        {!!memberProfileClub.nbcId && (
                            <tr>
                                <td className="font-semibold py-2">NBC ID</td>
                                <td className="p-2">:</td>
                                <td>
                                    <button type="button" onClick={() => setNbcIdDialogOpen(true)} className="flex items-center flex-wrap gap-2 group">
                                        <span className="text-white bg-white/20 px-3 py-1 rounded-full text-sm font-medium group-hover:bg-yellow-500/30 transition-all">
                                            {memberProfileClub.nbcId}
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td className="font-semibold py-2">Position</td>
                            <td className="p-2">:</td>
                            <td>
                                <button type="button" onClick={() => setPositionDialogOpen(true)} className="flex items-center flex-wrap gap-2 group">
                                    {memberProfileClub.position.map((item, index) => (
                                        <span key={index} className="text-yellow-500 bg-yellow-500/20 px-3 py-1 rounded-full text-sm font-medium group-hover:bg-yellow-500/30 transition-all">
                                            {capitalizeWords(item)}
                                        </span>
                                    ))}
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Status</td>
                            <td className="p-2">:</td>
                            <td className="align-middle">
                                <button type="button" onClick={() => setStatusDialogOpen(true)} className={getStatusLabel(memberProfileClub.status)}>
                                    {memberProfileClub.status}
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">{memberProfileClub.nbcId ? "Joined On" : "Applied On"}</td>
                            <td className="p-2">:</td>
                            <td>{formatDate(memberProfileClub.joinedOn)}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Interested In</td>
                            <td className="p-2">:</td>
                            <td>{memberProfileClub.interestedIn}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2 whitespace-nowrap">Extra-Curricular Activities</td>
                            <td className="p-2">:</td>
                            <td className="text-sm">{memberProfileClub.extraCurricularActivities}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold py-2">Special Note</td>
                            <td className="p-2">:</td>
                            <td className="text-sm">{memberProfileClub.specialNote}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <Dialog as="div" open={isNbcIdDialogOpen} onClose={() => { }}>
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <DialogPanel transition className="w-full max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Update NBC ID
                        </DialogTitle>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Current NBC ID: {memberProfileClub.nbcId}
                        </p>
                        <UpdateNbcIdDialogContainer
                            docId={docId}
                            setDialogOpen={setNbcIdDialogOpen}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog as="div" open={isPositionDialogOpen} onClose={() => { }}>
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <DialogPanel transition className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Update Position
                        </DialogTitle>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Select a new position from the dropdown.
                        </p>
                        <UpdatePositionDialogContent
                            docId={docId}
                            defaultPosition={memberProfileClub.position}
                            setDialogOpen={setPositionDialogOpen}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog as="div" open={isStatusDialogOpen} onClose={() => { }}>
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <DialogPanel transition className="w-full max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Update Status
                        </DialogTitle>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Select a new status from the dropdown.
                        </p>
                        <UpdateStatusDialogContent
                            docId={docId}
                            defaultStatus={memberProfileClub.status}
                            setDialogOpen={setStatusDialogOpen}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}