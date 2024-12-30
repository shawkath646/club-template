import { RiAlertFill } from "react-icons/ri";

export default function NoItemFound({ label }: { label: string }) {
    return (
        <section className="min-h-[450px] flex items-center justify-center">
            <div className="text-center">
                <RiAlertFill className="text-6xl text-blue-500 dark:text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    No {label} found
                </h3>
            </div>
        </section>
    );
}