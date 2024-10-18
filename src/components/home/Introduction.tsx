import getClubInfo from "@/constant/getClubInfo";

export default async function Introduction() {

    const clubInfo = await getClubInfo();

    return (
        <section className="bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 rounded py-10 lg:pb-16 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-5 items-center mt-10">
            <div className="space-y-5 lg:space-y-8">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-2xl md:text-3xl lg:text-4xl font-bold">
                    {clubInfo.name}
                </h1>
                <p className="font-semibold text-gray-700 dark:text-gray-300 md:text-lg">
                    {clubInfo.slogan}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
                    rerum vero et deserunt, ullam quia recusandae illum nihil ex, mollitia
                    minus harum, distinctio veritatis id illo totam officiis sed quos!
                </p>
            </div>
        </section>
    );
};
