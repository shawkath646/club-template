"use client";
import { ControllerRenderProps } from "react-hook-form";
import { IoCheckbox } from "react-icons/io5";

interface CheckBoxType {
    field: ControllerRenderProps<any, any>;
    text: string;
}

export default function CheckBox({ field, text }: CheckBoxType) {
    return (
        <div className="flex items-start space-x-2 my-3">
            <div
                {...field}
                onClick={() => field.onChange(!field.value)}
                className={`relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-gray-600 ${field.value ? 'bg-blue-500 dark:bg-blue-500' : 'bg-white dark:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0`}
            >
                {field.value && (
                    <IoCheckbox className="w-4 h-4 text-white dark:text-black" />
                )}
            </div>
            <p className="text-sm text-gray-300/90 dark:text-gray-300">{text}</p>
        </div>
    );
};
