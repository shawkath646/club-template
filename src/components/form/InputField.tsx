"use client";
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { IoCheckbox } from "react-icons/io5";

interface InputFieldType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldId: string;
  error?: FieldError;
}

const InputField = forwardRef<HTMLInputElement, InputFieldType>(
  ({ label, fieldId, error, type, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);


    return (
      <div className="w-full">
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}:
        </label>

        <input
          id={fieldId}
          aria-label={label}
          aria-invalid={!!error}
          type={type === 'password' && showPassword ? 'text' : type}
          {...rest}
          ref={ref}
          className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
        />

        {type === 'password' && (
          <div className="flex items-start space-x-2 my-3">
            <div
              onClick={() => setShowPassword(value => !value)}
              className={`relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-gray-600 ${showPassword ? 'bg-blue-500 dark:bg-blue-500' : 'bg-white dark:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0`}
            >
              {showPassword && (
                <IoCheckbox className="w-4 h-4 text-black dark:text-white" />
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Show password</p>
          </div>
        )}

        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
