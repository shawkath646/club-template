"use client";
import { useRef } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";

interface FileUploadType {
    label: string;
    field: ControllerRenderProps<any, any>;
    error?: FieldError;
    setError: (errorText: string) => void;
    clearError: () => void;
    type?: "image" | "video" | "audio" | "document" | "all";
    maxFileSize?: number;
    isBase64?: boolean;
}

export default function FileUpload({ label, field, clearError, error, setError, type = "all", maxFileSize = 1, isBase64 }: FileUploadType) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fieldId = label.replace(/ /g, "-").toLowerCase();

    const acceptedFileType = {
        image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"],
        video: [".mp4", ".webm", ".ogg"],
        audio: [".mp3", ".wav", ".ogg", ".aac"],
        document: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv"],
        all: ["*/*"]
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const accept = acceptedFileType[type];
        const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

        if (type !== "all" && !accept.includes(fileExtension)) {
            setError(
                `File format ${fileExtension} is not accepted. Allowed formats for ${type} are: ${accept.join(", ")}.`
            );
            return;
        }

        if (file.size > maxFileSize * 1024 * 1024) {
            setError(`File size exceeds the limit of ${maxFileSize}MB. Please select a smaller file.`);
            return;
        }

        if (isBase64) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                field.onChange(base64String);
                setError("");
            };
            reader.onerror = () => {
                setError("An error occurred while reading the file. Please try again.");
            };
            reader.readAsDataURL(file);
        } else {
            field.onChange(file);
            clearError();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
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
            text-gray-300 dark:text-gray-400 text-sm font-medium border-gray-300 dark:border-gray-600 space-y-2"
                >
                    <FiUploadCloud size={40} />
                    <p>Click to upload or drag and drop</p>
                </button>
            ) : (
                <div className="flex items-center justify-between w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Selected File:</p>
                        {!isBase64 && (
                            <p className="font-medium text-gray-800 dark:text-gray-200">{field.value.name}</p>
                        )}
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
                accept={acceptedFileType[type].join(", ")}
            />
            <p className="text-sm text-gray-300 dark:text-gray-400 mt-2">Note: Only PDF, JPEG, PNG, and DOC file formats are supported. The document must be clear and must not exceed 5MB. Unclear documents will result in rejection.</p>
            {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
