const getRelativeTime = (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;
    const elapsed = current - previous;
    if (elapsed < msPerWeek) {
        if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';
        }
        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';
        }
        else {
            return Math.round(elapsed/msPerDay) + ' days ago';
        }
    } else {
        return previous.toString();
    }
};

const chunkArray = (array, size) => {
    const results = [];

    while (array.length) {
        results.push(array.splice(0, size));
    }

    return results;
}

const formatPrice = amount => `$ ${amount.toFixed(2)}`;

export { getRelativeTime, formatPrice, chunkArray};