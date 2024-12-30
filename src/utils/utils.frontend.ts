const getTodayDate = (today: Date = new Date()): string => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const formatDate = (input: Date, { locale = 'en-US', isTime = false } = {}) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...(isTime && { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    };

    return input.toLocaleDateString(locale, dateOptions);
};

const capitalizeWords = (baseWord: string) => (
    baseWord
        .replace(/-/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
);

export {
    getTodayDate,
    formatDate,
    fileToBase64,
    capitalizeWords
};
