"use client";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { capitalizeWords } from "@/utils/utils.frontend";

interface SelectBoxType {
    label: string;
    field: ControllerRenderProps<any, any>;
    options: string[];
    error?: FieldError;
    isEditable?: boolean;
}

export default function SelectBox({ field, label, options, error, isEditable = true }: SelectBoxType) {

    const fieldId = label.replace(/ /g, "-").toLowerCase();

    return (
        <div className={`w-full max-w-md mb-4 ${isEditable ? "" : "flex items-center space-x-2"}`}>
            <label
                htmlFor={fieldId}
                className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2 whitespace-nowrap"
            >
                {label}:
            </label>
            <select
                id={fieldId}
                {...field}
                aria-label={label}
                aria-invalid={!!error}
                disabled={!isEditable}
                className={`block w-full px-3 py-2 text-gray-700 dark:text-gray-200 disabled:text-gray-700 dark:disabled:text-gray-200 bg-white/20 dark:bg-gray-800/20 rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 sm:text-sm sm:leading-5 ${isEditable ? " border border-gray-300/70 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" : ""}`}
            >
                <option value="default" disabled>--- Select ---</option>
                {options.map((option, index) => (
                    <option key={index} value={option} className="text-black dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                        {capitalizeWords(option)}
                    </option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}