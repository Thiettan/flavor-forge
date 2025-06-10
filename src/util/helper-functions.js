export const trimArray = (arr) => {
    return Array.isArray(arr) ? arr.map(t => t.trim()) : [];
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export function upsertRecipe(recipeBook, recipe) {
    const exists = recipeBook.some((r) => r.id === recipe.id);

    return exists ?
        recipeBook.map((r) => (r.id === recipe.id ? recipe : r)) : [...recipeBook, recipe];
}

export function upsertAndSetRecipe(setter, recipeBook, recipe) {
    const updated = upsertRecipe(recipeBook, recipe);
    setter(updated);
}