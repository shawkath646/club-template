import Image from "next/image";

interface Member {
    profilePic: string;
    name: string;
    email: string;
    institute: string;
    position: string;
}

interface Department {
    title: string;
    members: Member[];
}

const departments: Department[] = [
    {
        title: "President",
        members: [
            {
                profilePic: "/path/to/profile-pic.jpg",
                name: "John Doe",
                email: "johndoe@example.com",
                institute: "Example University",
                position: "President",
            },
            // Add more members as needed
        ],
    },
    {
        title: "Technology",
        members: [
            {
                profilePic: "/path/to/profile-pic2.jpg",
                name: "Jane Smith",
                email: "janesmith@example.com",
                institute: "Tech Institute",
                position: "Lead Developer",
            },
            // Add more members as needed
        ],
    },
    {
        title: "Graphics Designer",
        members: [
            {
                profilePic: "/path/to/profile-pic3.jpg",
                name: "Alice Brown",
                email: "alicebrown@example.com",
                institute: "Art School",
                position: "Graphics Designer",
            },
            // Add more members as needed
        ],
    },
    {
        title: "Writer",
        members: [
            {
                profilePic: "/path/to/profile-pic4.jpg",
                name: "Bob White",
                email: "bobwhite@example.com",
                institute: "Literature College",
                position: "Writer",
            },
            // Add more members as needed
        ],
    },
];

export default async function Page() {
    return (
        <main className="min-h-[750px] bg-white text-black dark:bg-black dark:text-gray-200 py-12 pt-[100px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-5 bg-blue-500 bg-opacity-20 py-5 px-3 rounded">Our Team</h1>
                {departments.map((department) => (
                    <section key={department.title} className="mb-12">
                        <h2 className="text-3xl font-semibold mb-8 text-blue-500 dark:text-blue-400">
                            {department.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {department.members.map((member) => (
                                <div
                                    key={member.email}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <Image
                                        src={member.profilePic}
                                        alt={`${member.name}'s profile picture`}
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                        width={96}
                                        height={96}
                                    />
                                    <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {member.position}
                                    </p>
                                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {member.institute}
                                    </p>
                                    <p className="text-center text-sm text-blue-500 dark:text-blue-400">
                                        <a href={`mailto:${member.email}`}>{member.email}</a>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}