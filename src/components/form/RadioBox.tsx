"use client";
import { Radio, RadioGroup } from '@headlessui/react';
import { ControllerRenderProps, FieldError } from "react-hook-form";

interface RadioBoxType {
    label: string;
    field: ControllerRenderProps<any, any>;
    options: string[];
    error?: FieldError;
}

export default function RadioBox({ label, field, options, error }: RadioBoxType) {

    const fieldId = label.replace(" ", "-");

    return (
        <div className="w-full max-w-md mb-4">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}:</label>
            <RadioGroup
                id={fieldId}
                {...field}
                aria-label={label}
                aria-invalid={!!error}
                className="flex justify-between items-center gap-4 flex-wrap"
            >
                {options.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                        <Radio
                            value={option}
                            className="group flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-400 dark:border-gray-600 bg-white/20 dark:bg-gray-800/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[checked]:bg-blue-500 dark:data-[checked]:bg-blue-400 transition-all duration-200 ease-in-out"
                        >
                            <span className="invisible w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 group-data-[checked]:visible " />
                        </Radio>
                        <label className="text-gray-900 dark:text-gray-300 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                    </div>
                ))}
            </RadioGroup>
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}