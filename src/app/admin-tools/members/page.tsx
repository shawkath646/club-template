export default async function Page() {
    return (
        <>
            {/* Title */}
            <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-8">Member Management</h1>

            {/* New Requests Section */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">New Requests</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-500 dark:bg-blue-700 text-white text-sm leading-normal">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Profile Pic</th>
                                <th className="py-3 px-6 text-left">Member ID</th>
                                <th className="py-3 px-6 text-left">Full Name</th>
                                <th className="py-3 px-6 text-left">DOB</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Institute</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600 dark:text-gray-400">
                            {[1, 2, 3].map((member, idx) => (
                                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <td className="py-3 px-6">{idx + 1}</td>
                                    <td className="py-3 px-6">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="/profile-pic-placeholder.png"
                                            alt="Profile Pic"
                                        />
                                    </td>
                                    <td className="py-3 px-6">12345</td>
                                    <td className="py-3 px-6">John Doe</td>
                                    <td className="py-3 px-6">01/01/2000</td>
                                    <td className="py-3 px-6">member@example.com</td>
                                    <td className="py-3 px-6">ABC Institute</td>
                                    <td className="py-3 px-6 flex space-x-2">
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Accept</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Existing Members Section */}
            <section>
                <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">Existing Members</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-500 dark:bg-blue-700 text-white text-sm leading-normal">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Profile Pic</th>
                                <th className="py-3 px-6 text-left">Member ID</th>
                                <th className="py-3 px-6 text-left">Full Name</th>
                                <th className="py-3 px-6 text-left">DOB</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Phone</th>
                                <th className="py-3 px-6 text-left">Institute</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600 dark:text-gray-400">
                            {[1, 2, 3].map((member, idx) => (
                                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <td className="py-3 px-6">{idx + 1}</td>
                                    <td className="py-3 px-6">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="/profile-pic-placeholder.png"
                                            alt="Profile Pic"
                                        />
                                    </td>
                                    <td className="py-3 px-6">12345</td>
                                    <td className="py-3 px-6">John Doe</td>
                                    <td className="py-3 px-6">01/01/2000</td>
                                    <td className="py-3 px-6">member@example.com</td>
                                    <td className="py-3 px-6">+880 1234 567890</td>
                                    <td className="py-3 px-6">ABC Institute</td>
                                    <td className="py-3 px-6 flex space-x-2">
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Accept</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}