import applicationInfo from "@/constant/applicaiton-info.json";
import introBackground from "@/assets/7892917.jpg";


export default async function Introduction() {
    return (
        <section
            style={{ backgroundImage: `url(${introBackground.src})` }}
            className="clip-path-scientific bg-cover bg-center bg-no-repeat"
        >
            <div className="bg-black bg-opacity-50 pt-[150px]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[380px] lg:h-[500px] grid lg:grid-cols-2 gap-5">
                    <div className="space-y-5 lg:space-y-10">
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-2xl md:text-3xl lg:text-4xl font-bold">
                            {applicationInfo.name}
                        </h1>
                        <p className="font-semibold text-gray-400 md:text-lg">
                            {applicationInfo.slogan}
                        </p>
                        <p className="text-gray-400 text-sm md:text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
                            rerum vero et deserunt, ullam quia recusandae illum nihil ex, mollitia
                            minus harum, distinctio veritatis id illo totam officiis sed quos!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}