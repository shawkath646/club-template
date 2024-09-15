'use client';

import React from 'react';

interface StylistButtonProps {
  size?: 'sm' | 'md' | 'lg'; // Button size options
  isDisabled?: boolean; // Disable state
  colorScheme?: 'blue' | 'red' | 'green'; // Color scheme options
  isLoading?: boolean; // Loading state
  loadingLabel?: string; // Text to display while loading
  onClick?: () => void | Promise<void>; // Async/Sync onClick handler
  type?: HTMLButtonElement['type']; // Type of button (submit, button, etc.)
  children?: React.ReactNode; // Children prop to pass button content
}

const StylistButton: React.FC<StylistButtonProps> = ({
  size = 'md',
  isDisabled = false,
  colorScheme = 'blue',
  isLoading = false,
  loadingLabel = 'Loading...',
  onClick,
  type = 'button',
  children,
}) => {
  const handleClick = async () => {
    if (isDisabled || isLoading) {
      return;
    }

    if (onClick) {
      await onClick();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-[100px] py-1';
      case 'lg':
        return 'w-[250px] py-3';
      default:
        return 'w-[200px] py-2'; // Default size 'md'
    }
  };

  const getColorSchemeClasses = () => {
    switch (colorScheme) {
      case 'red':
        return isDisabled || isLoading
          ? 'bg-red-300 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500';
      case 'green':
        return isDisabled || isLoading
          ? 'bg-green-300 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500';
      default:
        return isDisabled || isLoading
          ? 'bg-blue-300 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500'; // Default is blue
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`block mt-5 col-span-3 ${getSizeClasses()} mx-auto font-medium text-white ${getColorSchemeClasses()} focus:ring-2 focus:ring-offset-2 rounded-lg shadow-lg transform hover:scale-105 focus:scale-105 transition-all duration-300 ease-out`}
      style={{ pointerEvents: isDisabled || isLoading ? 'none' : 'auto', opacity: isDisabled ? 0.5 : 1 }}
    >
      {isLoading ? (
        <>
          <svg
            className="inline-block w-4 h-4 mr-2 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default StylistButton;
