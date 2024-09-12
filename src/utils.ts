const getTodayDate = (): string => {
    const today = new Date();
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

function generateUniqueId(): string {
    const currentYear = new Date().getFullYear();
    const lastTwoDigitsOfYear = currentYear.toString().slice(-2);

    const currentTime = new Date().getTime().toString();

    const lastFourDigits = currentTime.slice(-4);

    return `NBC${lastTwoDigitsOfYear}${lastFourDigits}`;
}



function formatDate(input: Date | null, locale: string = 'en-US'): string {
    if (!input) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    return input.toLocaleDateString(locale, options);
}



export { getTodayDate, formatDate, fileToBase64, generateUniqueId };