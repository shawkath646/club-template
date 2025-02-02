import { Metadata } from "next";
import Introduction from "@/components/home/Introduction";
import DynamicBox from "@/components/home/DynamicBox";
import AdBanner from "@/components/AdBanner";
import getClubInfo from "@/constant/getClubInfo";

export async function generateMetadata(): Promise<Metadata> {
  const clubInfo = await getClubInfo();
  return { title: "Home | " + clubInfo.name };
};

export default async function Home() {
  return (
    <>
      <Introduction />
      <DynamicBox />
      <AdBanner
        data-ad-slot="5201887064"
        data-ad-format="auto"
        data-full-width-responsive={true}
      />

      {/* Notice Board */}
      <section className="notices mt-5 mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Notice Board</h2>
        <ul className="space-y-4">
          <li className="bg-blue-50 dark:bg-blue-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
            <p>📢 Notice 1: Upcoming seminar on Quantum Physics.</p>
          </li>
          <li className="bg-blue-50 dark:bg-blue-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
            <p>📢 Notice 2: Registration open for the Science Olympiad.</p>
          </li>
        </ul>
      </section>

      {/* Event List */}
      <section className="events mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upcoming Events</h2>
        <ul className="space-y-4">
          <li className="bg-green-50 dark:bg-green-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
            <p>🔬 Event 1: Robotics Workshop - 25th August</p>
          </li>
          <li className="bg-green-50 dark:bg-green-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
            <p>🔬 Event 2: Science Fair - 5th September</p>
          </li>
        </ul>
      </section>

      {/* Olympiad List */}
      <section className="olympiads mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Olympiad List</h2>
        <ul className="space-y-4">
          <li className="bg-yellow-50 dark:bg-yellow-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
            <p>🏅 Olympiad 1: National Physics Olympiad</p>
          </li>
          <li className="bg-yellow-50 dark:bg-yellow-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
            <p>🏅 Olympiad 2: International Chemistry Olympiad</p>
          </li>
        </ul>
      </section>
      <AdBanner
        data-ad-slot="5201887064"
        data-ad-format="auto"
        data-full-width-responsive={true}
      />
    </>
  );
}
