"use client";
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    fieldId: string;
    error?: FieldError;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, fieldId, error, ...rest }, ref) => {
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
          {...rest}
          ref={ref}
          className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
