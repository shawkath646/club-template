import Image from "next/image";
import dynamicBoxImage1 from "@/assets/DynamicBox/copy-92.png"

export default async function DynamicBox() {
    return (
        <section className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-lg max-w-xl mx-auto mt-10">
            <div className="flex flex-col lg:flex-row items-center">
                {/* Text Section */}
                <div className="lg:w-2/3 lg:pr-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-0">
                        Flood Causes in Bangladesh (Brahmonbaria, Feni, Cumilla) Due to Opened Dams in India
                    </h2>
                    <p className="text-sm sm:text-md mb-4 lg:mb-0">
                        Your small donation can help those affected by the flood.
                    </p>
                    <div className="text-center lg:text-left">
                        <a
                            href="/donate"
                            className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
                        >
                            Donate Now
                        </a>
                    </div>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/3 lg:pl-4 mt-4 lg:mt-0">
                    <Image
                        src={dynamicBoxImage1}
                        alt="Flood in Bangladesh"
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}