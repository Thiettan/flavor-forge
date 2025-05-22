export const trimArray = (arr) => {
    return Array.isArray(arr) ? arr.map(t => t.trim()) : [];
}