"use client";
import Link from "next/link";
import { ChangeEvent, Fragment, useState } from "react";
import { debounce } from "lodash";
import { Transition, ComboboxInput, Combobox, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { memberSearchBarResult } from "@/backend/members";
import { MemberSearchBarResultType } from "@/types";

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState<MemberSearchBarResultType[]>([]);

    const debouncedSearch = debounce(async (query: string) => {
        if (query.length >= 3) {
            const result = await memberSearchBarResult(query);
            setSearchResult(result);
        } else {
            setSearchResult([]);
        }
    }, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        setSearchValue(searchText);
        debouncedSearch(searchText);
    };

    return (
        <Combobox>
            <div className="relative w-full max-w-[500px]">
                <div className="relative flex items-center space-x-2">
                    <ComboboxInput
                        id="member-search-bar"
                        aria-label="member-search-bar"
                        aria-invalid={false}
                        value={searchValue}
                        onChange={handleChange}
                        placeholder="Application ID, NBC ID, Name, Institute, Email"
                        className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/20 border rounded-md shadow-sm focus:outline-none transition-all duration-200 border-gray-400 dark:border-gray-600 focus:ring-green-500 focus:border-green-500 sm:text-sm sm:leading-5"
                    />
                    {searchValue.length >= 3 && false ? (
                        <Link
                            href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members?search=${searchValue}`}
                            className="w-[120px] py-2 text-sm text-center inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500 font-medium text-white dark:text-gray-200 focus:ring-2 focus:ring-offset-2 rounded-lg shadow-md transform hover:scale-105 focus:scale-105 transition-all duration-300 ease-out"
                        >
                            Search
                        </Link>
                    ) : (
                        <span
                            className="w-[120px] py-2 text-sm text-center inline-block bg-gray-400 text-gray-600 cursor-not-allowed rounded-lg shadow-md transition-all duration-300 ease-out"
                        >
                            Search
                        </span>
                    )}
                </div>

                {searchValue.length >= 3 && (
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ComboboxOptions className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white/80 dark:bg-black/80 backdrop-blur-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[99]">
                            {searchResult.length > 0 ? (
                                searchResult.map((result) => (
                                    <ComboboxOption
                                        key={result.id}
                                        as={Link}
                                        href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members/profile?id=${result.id}`}
                                        className="relative cursor-pointer select-none py-3 px-6 text-gray-900 dark:text-gray-200 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        value={result}
                                    >
                                        <span>{result.fullName}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{result.nbcId}</span>
                                    </ComboboxOption>
                                ))
                            ) : (
                                <ComboboxOption
                                    value=""
                                    className="relative cursor-pointer select-none py-3 px-6 text-gray-900 dark:text-gray-200 transition-colors duration-200"
                                >
                                    <p className="px-4 py-3 text-gray-500 dark:text-gray-400">No results found.</p>
                                </ComboboxOption>
                            )}
                        </ComboboxOptions>
                    </Transition>
                )}
            </div>
        </Combobox>
    );
};
