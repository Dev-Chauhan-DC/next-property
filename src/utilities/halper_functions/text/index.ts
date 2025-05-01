


export function truncateText(
    text: string,
    limit: number,
    position: 'start' | 'center' | 'end' = 'end',
    suffix: string = '...',
): string {
    if (text.length <= limit) {
        return text;
    }

    const suffixLength = suffix.length;
    const availableLength = limit - suffixLength;

    switch (position) {
        case 'start':
            // Truncate from the start
            return suffix + text.slice(text.length - availableLength);

        case 'center':
            // Truncate from the middle
            const half = Math.floor(availableLength / 2);
            return text.slice(0, half) + suffix + text.slice(text.length - half);

        case 'end':
        default:
            // Truncate from the end (default behavior)
            return text.slice(0, availableLength) + suffix;
    }
}


export function formatNumberIndian(number: number) {
    if (number === null || number === undefined) {
        return '';
    }

    if (number >= 1e7) {
        return (number / 1e7).toFixed(0) + ' Cr'; // Crore
    } else if (number >= 1e5) {
        return (number / 1e5).toFixed(0) + ' L'; // Lakh
    } else if (number >= 1000) {
        return (number / 1000).toFixed(0) + ' K'; // Thousand
    } else {
        return number.toString(); // Less than thousand
    }
}

export function calculateDaysAgo(dateString: string) {
    const postDate: any = new Date(dateString);
    const currentDate: any = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - postDate;

    // Convert the time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Return the formatted string
    return daysDifference;
}

export const getInitials = (name: string): string => {
    if (!name) return '';

    const words = name.trim().split(/\s+/);
    return words
        .slice(0, 2) // Take only the first two words
        .map(word => word.charAt(0).toUpperCase()) // Get the first character of each word
        .join('');
};
