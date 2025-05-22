export const trimArray = (arr) => {
    return Array.isArray(arr) ? arr.map(t => t.trim()) : [];
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}