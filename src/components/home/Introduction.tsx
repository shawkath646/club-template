import Image from "next/image";
import getClubInfo from "@/constant/getClubInfo";
import ScientificItems from "@/assets/Banners/coloured-science-elements.png";

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
                    {clubInfo.description}
                </p>
            </div>

            <div className="flex justify-center order-1 lg:order-none">
                <Image
                    src={ScientificItems}
                    alt="Scientific Elements"
                    width={400}
                    height={400}
                    className="w-auto h-[300px]"
                    priority
                />
            </div>
        </section>
    );
}
