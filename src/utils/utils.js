const getTitleCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const isArraySizeInRange = (low, high, array) => {
    return array.length > low && array.length <= high;
};

export default {
    getTitleCase,
    isArraySizeInRange
};

