"use client";
import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, ...rest }, ref) => {

    const fieldId = label.replace(/ /g, "-").toLowerCase();
    return (
      <div className="w-full">
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}:
        </label>
        <textarea
          id={fieldId}
          aria-label={label}
          aria-invalid={!!error}
          {...rest}
          ref={ref}
          className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/20 border rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 border-gray-400 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
