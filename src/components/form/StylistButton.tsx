'use client';
import React from 'react';

interface StylistButtonProps {
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  colorScheme?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'orange' | 'gray';
  isLoading?: boolean;
  loadingLabel?: string;
  onClick?: () => void | Promise<void>;
  type?: HTMLButtonElement['type'];
  className?: string;
  children?: React.ReactNode;
}

const StylistButton: React.FC<StylistButtonProps> = ({
  size = 'md',
  isDisabled = false,
  colorScheme = 'blue',
  isLoading = false,
  loadingLabel = 'Loading...',
  onClick,
  type = 'button',
  className,
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
        return 'w-[120px] py-1.5 text-sm';
      case 'lg':
        return 'w-[250px] py-3';
      default:
        return 'w-[200px] py-2';
    }
  };

  const getColorSchemeClasses = (): string => {
    switch (colorScheme) {
      case 'red':
        return isDisabled || isLoading
          ? 'bg-red-300 dark:bg-red-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500';
      case 'green':
        return isDisabled || isLoading
          ? 'bg-green-300 dark:bg-green-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500';
      case 'yellow':
        return isDisabled || isLoading
          ? 'bg-yellow-300 dark:bg-yellow-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus:ring-yellow-500';
      case 'purple':
        return isDisabled || isLoading
          ? 'bg-purple-300 dark:bg-purple-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500';
      case 'orange':
        return isDisabled || isLoading
          ? 'bg-orange-300 dark:bg-orange-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:ring-orange-500';
      case 'gray':
        return isDisabled || isLoading
          ? 'bg-gray-300 dark:bg-gray-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500';
      default:
        return isDisabled || isLoading
          ? 'bg-blue-300 dark:bg-blue-900 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500';
    }
  };


  return (
    <button
      type={type}
      onClick={handleClick}
      className={`inline-block ${getSizeClasses()} font-medium text-white dark:text-gray-200 ${getColorSchemeClasses()} focus:ring-2 focus:ring-offset-2 rounded-lg shadow-md transform hover:scale-105 focus:scale-105 transition-all duration-300 ease-out ${className ?? ''}`}
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
