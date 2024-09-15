"use client";
import { ControllerRenderProps, FieldError } from "react-hook-form";

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
                className="block w-full px-3 py-2 text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}