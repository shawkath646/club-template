import Image from "next/image";
import applicationInfo from "@/constant/applicaiton-info.json";
import banner1 from "@/assets/Banners/msg1545168757-1212.jpg";


export default async function Introduction() {
    return (
        <section className="grid lg:grid-cols-2 mt-10 gap-5">
            <div className="my-auto space-y-3">
                <h1 className="text-sky-500 text-2xl md:text-3xl lg:text-4xl font-bold">{applicationInfo.name}</h1>
                <p className="font-semibold text-gray-400">{applicationInfo.slogan}</p>
                <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur rerum vero et deserunt, ullam quia recusandae illum nihil ex, mollitia minus harum, distinctio veritatis id illo totam officiis sed quos!</p>
            </div>

            <Image
                src={banner1}
                alt="Banner 1"
                width={600}
                height={300}
                className="w-[300px] md:w-[400px] lg:w-[600px] object-cover mx-auto rounded"
            />
        </section>
    );
}