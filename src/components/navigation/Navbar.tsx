"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { signOut } from "@/backend/auth";
import navMenuRoutes from "@/constant/navMenuRoutes.json";
import { ClubInfoType, UserSessionObject } from "@/types";
import { FaUser, FaUserCircle, FaUserPlus, FaBars } from "react-icons/fa";
import { IoMdExit, IoMdSettings } from "react-icons/io";


export default function Navbar({ clubInfo, session }: { clubInfo: ClubInfoType; session: UserSessionObject | null }) {
    const [hasScrolled, setHasScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    setHasScrolled(true);
                } else {
                    setHasScrolled(false);
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setHasScrolled(true);
        }
    }, [pathname]);

    return (
        <nav
            className={`fixed print:static top-0 left-0 z-[99] w-full transition-colors duration-300 ${hasScrolled
                    ? 'bg-gradient-to-r from-sky-500/70 to-blue-600/50 backdrop-blur-md'
                    : 'bg-transparent pt-8 backdrop-blur-none'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center text-white dark:text-gray-200 px-2">
                <Link
                    href="/"
                    className={`flex space-x-1 items-center text-lg ${hasScrolled ? "text-white" : "text-black dark:text-gray-200"} dark:text-gray-200" font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-all`}
                >
                    <Image src={clubInfo.logo} height={50} width={50} alt={`${clubInfo.name} logo`} />
                    <p>{clubInfo.name}</p>
                </Link>

                <div className="flex items-center space-x-3 md:space-x-5">
                    {navMenuRoutes.map((item, key) => (
                        <Link
                            key={key}
                            href={item.route}
                            className={`hidden lg:block px-3 py-2 rounded-md font-semibold transition-all ${hasScrolled ? 'text-blue-100 hover:text-white dark:text-gray-300 dark:hover:text-white' : 'bg-white hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 shadow-md text-blue-500 dark:text-gray-200'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Menu as="div" className="relative">
                        <MenuButton className={`p-2 transition duration-200 ease-in-out rounded-md ${hasScrolled ? "text-blue-100 hover:text-white" : "bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-700 text-blue-500 dark:text-gray-200"}`}>
                            {(session?.picture) ? <Image src={session.picture} alt="user profile" height={28} width={28} className="w-[28px] h-[28px] rounded-full object-cover" /> : <FaUserCircle size={28} />}
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 bg-white">
                            {(!session) && (
                                <>
                                    <MenuItem>
                                        <Link href="/join" className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                                            <FaUserPlus size={17} />
                                            <p>Join as member</p>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href="/login`" className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                                            <FaUser size={17} />
                                            <p>Login as member</p>
                                        </Link>
                                    </MenuItem>
                                </>
                            )}
                            {session && (
                                <MenuItem>
                                    <Link href="/profile" className="w-full px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                                        <FaUserCircle size={17} />
                                        <p>Profile</p>
                                    </Link>
                                </MenuItem>
                            )}
                            {!!session?.permissions.length && (
                                <MenuItem>
                                    <Link href="/admin-tools" className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                                        <IoMdSettings size={17} />
                                        <p>Admin tools</p>
                                    </Link>
                                </MenuItem>
                            )}
                            {session && (
                                <MenuItem>
                                    <button type="button" onClick={() => signOut()} className="w-full px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                                        <IoMdExit size={17} />
                                        <p>Log out</p>
                                    </button>
                                </MenuItem>
                            )}
                        </MenuItems>
                    </Menu>
                    <Menu as="div" className="relative lg:hidden">
                        <MenuButton className={`p-2 transition duration-200 ease-in-out rounded-md ${hasScrolled ? "text-blue-100 hover:text-white" : "bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-700 text-blue-500 dark:text-gray-200"}`}>
                            <FaBars size={28} />
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 bg-white">
                            {navMenuRoutes.map((item, key) => (
                                <MenuItem key={key}>
                                    <Link href={item.route} className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">{item.name}</Link>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </nav>
    );
}
