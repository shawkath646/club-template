"use client";
import { useState } from "react";
import { ControllerRenderProps, FieldError, Merge } from "react-hook-form";
import StylistButton from "./StylistButton";

const ArrayInput = ({
    label,
    field,
    error,
    maximumItem = 5,
    setError,
    clearError,
}: {
    label: string;
    field: ControllerRenderProps<any, any>;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    maximumItem?: number;
    setError: (message: string) => void;
    clearError: () => void;
}) => {
    const [value, setValue] = useState("");
    const fieldId = label.replace(/\s+/g, "-").toLowerCase();

    const items = Array.isArray(field.value) ? (field.value as string[]) : [];

    const handleAddItem = () => {
        clearError();
        if (items.length < maximumItem) {
            field.onChange([...items, value.trim()]);
            setValue("");
        } else {
            setError(`Maximum item limit of ${maximumItem} reached.`);
        }
    };
    

    const handleRemoveItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        field.onChange(updatedItems);
    };

    return (
        <div className="w-full max-w-lg">
            <label
                htmlFor={fieldId}
                className="text-sm font-medium text-gray-200 dark:text-gray-300 block mb-2"
            >
                {label}:
            </label>

            {items.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center mb-3">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-md text-sm hover:bg-yellow-500/30 transition"
                        >
                            {item} ✕
                        </button>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-3">
                <input
                    id={fieldId}
                    aria-label={label}
                    aria-invalid={!!error}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="block w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/20 border border-gray-300/70 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 sm:text-sm sm:leading-5"
                />
                <StylistButton
                    size="sm"
                    colorScheme="blue"
                    onClick={handleAddItem}
                    isDisabled={value.trim().length < 3}
                >
                    Add
                </StylistButton>
            </div>

            {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default ArrayInput;
