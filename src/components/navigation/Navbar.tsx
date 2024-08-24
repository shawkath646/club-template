import Link from "next/link";
import Image from "next/image";
import applicationInfo from "@/constant/applicaiton-info.json";
import NavbarMenuSm from "./NavbarMenuSm";
import NavbarUser from "./NavbarUserMenu";
import navMenuRoutes from "@/constant/navMenuRoutes.json";
import headerLogo from "@/assets/headerLogo.png";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 z-[99] bg-sky-600 text-white dark:text-gray-200 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex space-x-1 items-center hover:text-gray-200 dark:hover:text-gray-300 transition-all">
                    <Image src={headerLogo} height={50} width={50} alt={`${applicationInfo.name} logo`} />
                    <p>{applicationInfo.name}</p>
                </Link>

                <div className="flex items-center space-x-0 md:space-x-5">
                    {navMenuRoutes.map((item, key) => <Link key={key} href={item.route} className="hover:text-gray-200 dark:hover:text-gray-300 transition-all hidden md:block">{item.name}</Link>)}
                    <NavbarUser />
                    <NavbarMenuSm />
                </div>
            </div>
        </nav>
    );
}