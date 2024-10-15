"use client";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { capitalizeWords } from "@/utils/utils.frontend";

interface SelectBoxType {
    label: string;
    field: ControllerRenderProps<any, any>;
    options: string[];
    error?: FieldError;
}

export default function SelectBox({ field, label, options, error }: SelectBoxType) {

    const fieldId = label.replace(" ", "-");

    return (
        <div className="w-full max-w-md mb-4">
            <label
                htmlFor={fieldId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                {label}:
            </label>
            <select
                id={fieldId}
                {...field}
                aria-label="Current Class"
                aria-invalid={!!error}
                className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/20 border rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 border-gray-400 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
            >
                {options.map((option) => (
                    <option key={option} value={option} className="text-black">
                        {capitalizeWords(option)}
                    </option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}