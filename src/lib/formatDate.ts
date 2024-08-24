const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

export default formatDate;