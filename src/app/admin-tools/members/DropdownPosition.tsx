"use client";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { capitalizeWords } from "@/utils/utils.frontend";
import joiningFormOption from "@/constant/joiningFormOptions.json";
import { FaChevronDown } from "react-icons/fa";

export default function DropdownPosition({ selected, filterByPrefix }: { selected?: string, filterByPrefix: string; }) {
    return (
        <Menu as="div" className="relative inline-block my-5">
            <MenuButton className="inline-flex items-center justify-between w-full rounded-md bg-black/20 dark:bg-black/30 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                {!!selected ? capitalizeWords(selected) : "Filter"}
                <FaChevronDown className="ml-2" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 focus:outline-none">
                <div className="py-1">
                    <MenuItem as={Fragment}>
                        <Link
                            href={filterByPrefix + "all"}
                            className={`${!selected
                                    ? "bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white"
                                    : "text-gray-700 dark:text-gray-300"
                                } group flex w-full items-center px-4 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${!selected ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                        >
                            All
                        </Link>
                    </MenuItem>
                    {joiningFormOption.positions.map((item, index) => (
                        <MenuItem as={Fragment} key={index}>
                            <Link
                                href={filterByPrefix + item}
                                className={`${selected === item
                                        ? "bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white"
                                        : "text-gray-700 dark:text-gray-300"
                                    } group flex w-full items-center px-4 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${selected === item ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                            >
                                {capitalizeWords(item)}
                            </Link>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );
};
