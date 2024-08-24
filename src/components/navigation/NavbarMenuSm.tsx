"use client";
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import navMenuRoutes from "@/constant/navMenuRoutes.json";
import { FaBars } from "react-icons/fa6";

export default function NavbarMenuSm() {
    return (
        <Menu as="div" className="relative md:hidden">
            <MenuButton className="flex items-center p-2 transition duration-200 ease-in-out rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaBars size={28} className="text-white dark:text-gray-200" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 bg-white">
                {navMenuRoutes.map((item, key) => (
                    <MenuItem key={key}>
                        <Link href={item.route} className="px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md bg-gray-100 bg-transparent dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900 flex space-x-4 items-center">{item.name}</Link>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}