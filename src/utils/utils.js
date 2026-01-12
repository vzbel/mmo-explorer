const getTitleCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const isArraySizeInRange = (low, high, array) => {
    return array.length > low && array.length <= high;
};

const getRandomIndex = (limit) => {
    return Math.floor(Math.random() * limit);
};

export default {
    getTitleCase,
    isArraySizeInRange,
    getRandomIndex
};

