"use client";
import { Radio, RadioGroup } from '@headlessui/react';
import { ControllerRenderProps, FieldError } from "react-hook-form";

interface RadioBoxType {
    label: string;
    field: ControllerRenderProps<any, any>;
    options: string[];
    error?: FieldError;
    singleLine?: boolean;
    isEditable?: boolean;
}

export default function RadioBox({ label, field, options, error, singleLine, isEditable = true }: RadioBoxType) {

    const fieldId = label.replace(/ /g, "-").toLowerCase();

    return (
        <div className={`w-full max-w-md mb-1 ${singleLine ? 'flex space-x-4' : ''}`}>
            <label
                htmlFor={fieldId}
                className={`text-sm font-medium text-gray-200 dark:text-gray-300 ${singleLine ? 'whitespace-nowrap' : 'block mb-2'}`}>
                {label}:
            </label>
            {isEditable ? (
                <RadioGroup
                    id={fieldId}
                    {...field}
                    aria-label={label}
                    aria-invalid={!!error}
                    className={`flex  gap-4 flex-wrap items-center`}
                >
                    {options.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                            <Radio
                                value={option}
                                className="group flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white/20 dark:bg-gray-800/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[checked]:bg-blue-500 dark:data-[checked]:bg-blue-400 transition-all duration-200 ease-in-out"
                            >
                                <span className="invisible w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 group-data-[checked]:visible" />
                            </Radio>
                            <label className="text-gray-200 dark:text-gray-300 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </label>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <p>{field.value.charAt(0).toUpperCase() + field.value.slice(1)}</p>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
