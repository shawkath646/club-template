import Image from "next/image";
import Introduction from "@/components/home/Introduction";
import DynamicBox from "@/components/home/DynamicBox";


export default async function Home() {
  return (
    <main className="min-h-[750px] bg-white text-black dark:bg-black dark:text-gray-200">

      <Introduction />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DynamicBox />

        {/* Notice Board */}
        <section className="notices mt-5 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Notice Board</h2>
          <ul className="space-y-4">
            <li className="bg-blue-50 p-4 rounded-lg shadow-md">
              <p>📢 Notice 1: Upcoming seminar on Quantum Physics.</p>
            </li>
            <li className="bg-blue-50 p-4 rounded-lg shadow-md">
              <p>📢 Notice 2: Registration open for the Science Olympiad.</p>
            </li>
          </ul>
        </section>

        {/* Event List */}
        <section className="events mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            <li className="bg-green-50 p-4 rounded-lg shadow-md">
              <p>🔬 Event 1: Robotics Workshop - 25th August</p>
            </li>
            <li className="bg-green-50 p-4 rounded-lg shadow-md">
              <p>🔬 Event 2: Science Fair - 5th September</p>
            </li>
          </ul>
        </section>

        {/* Olympiad List */}
        <section className="olympiads mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Olympiad List</h2>
          <ul className="space-y-4">
            <li className="bg-yellow-50 p-4 rounded-lg shadow-md">
              <p>🏅 Olympiad 1: National Physics Olympiad</p>
            </li>
            <li className="bg-yellow-50 p-4 rounded-lg shadow-md">
              <p>🏅 Olympiad 2: International Chemistry Olympiad</p>
            </li>
          </ul>
        </section>

        {/* Admins */}
        <section className="admins mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Admins</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="admin bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
              <Image src="/admin1.jpg" alt="Admin 1" width={100} height={100} className="rounded-full mb-4" />
              <h3 className="text-lg font-medium">Admin Name 1</h3>
              <p className="text-gray-500">Position</p>
            </div>
            <div className="admin bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
              <Image src="/admin2.jpg" alt="Admin 2" width={100} height={100} className="rounded-full mb-4" />
              <h3 className="text-lg font-medium">Admin Name 2</h3>
              <p className="text-gray-500">Position</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
