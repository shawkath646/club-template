"use client";
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaLock, FaUser, FaUserCircle, FaUserPlus } from "react-icons/fa";


export default function NavbarUser() {
    return (
        <Menu as="div" className="relative">
            <MenuButton className="flex items-center p-2 transition duration-200 ease-in-out rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaUserCircle size={28} className="text-white dark:text-gray-200" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 bg-white">
                <MenuItem>
                    <Link href="/join" className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md bg-gray-100 bg-transparent dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                        <FaUserPlus size={17} />
                        <p>Join as member</p>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/login" className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md bg-gray-100 bg-transparent dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                        <FaUser size={17} />
                        <p>Login as member</p>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/login-admin" className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md bg-gray-100 bg-transparent dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">
                        <FaLock size={17} />
                        <p>Login as admin</p>
                    </Link>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}