"use client";
import { useRef } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";

interface FileUploadType {
    label: string;
    field: ControllerRenderProps<any, any>;
    error?: FieldError;
    setError: (errorText: string) => void
    accept?: string;
}

export default function FileUpload({ label, field, error, setError, accept }: FileUploadType) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fieldId = label.replace(" ", "-");

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.size <= MAX_FILE_SIZE) field.onChange(file);
        else setError("Select a valid file that is under 5MB.");
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}:
            </label>

            {!field.value ? (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="
            flex flex-col items-center justify-center 
            w-full h-32 border-2 border-dashed
            rounded-lg cursor-pointer transition-all duration-300 
            hover:border-blue-500 dark:hover:border-blue-400 
            bg-white/20 dark:bg-gray-800/20 hover:bg-white/40 dark:hover:bg-gray-800/40
            text-gray-600 dark:text-gray-300 text-sm font-medium border-gray-400 dark:border-gray-600"
                >
                    <FiUploadCloud size={40} className="mb-2 text-gray-500 dark:text-gray-400" />
                    <p>Click to upload or drag and drop</p>
                </button>
            ) : (
                <div className="flex items-center justify-between w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Selected File:</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{field.value.name}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Change
                    </button>
                </div>
            )}
            <input
                id={fieldId}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept={accept}
            />
            <p className="text-sm text-gray-400 mt-2">Note: Only PDF, JPEG, PNG, and DOC file formats are supported. The document must be clear and must not exceed 5MB. Unclear documents will result in rejection.</p>
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
