import { RiAlertFill } from "react-icons/ri";

export default function NoItemFound() {
    return (
        <section className="h-[450px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
                <RiAlertFill className="text-6xl text-blue-500 dark:text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    No Document Found
                </h3>
            </div>
        </section>
    );
}