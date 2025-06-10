import {
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDocs,
  collection
} from "firebase/firestore";
import {
  db
} from "./firebase";


// 🔄 Fetch all recipes from the user's `recipes` subcollection
export async function getUserRecipes(uid) {
  console.log(`[getUserRecipes] Started for UID: ${uid}`);

  const recipesRef = collection(db, "users", uid, "recipes");
  const snapshot = await getDocs(recipesRef);

  if (!snapshot.empty) {
    console.log("[getUserRecipes] Recipes found, returning array.");
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id, // Include document ID in recipe object
    }));
  } else {
    console.log("[getUserRecipes] No recipes found, returning empty array.");
    return [];
  }
}
//Merges or updates only specified fields
export async function updateRecipe(uid, recipeId, data) {
  const recipeRef = doc(db, "users", uid, "recipes", recipeId);
  await updateDoc(recipeRef, data);
  console.log(`[updateRecipe] Updated fields in recipe ${recipeId}`);
}

// 💾 Save one recipe document to the user's `recipes` subcollection
export async function saveSingleRecipe(uid, recipe) {
  const recipeRef = doc(db, "users", uid, "recipes", recipe.id);
  await setDoc(recipeRef, recipe); //setDoc replaces/uploads entire document
  console.log(`[saveSingleRecipe] Saved recipe: ${recipe.name}`);
}


// 💾 Save each recipe as its own document in the `recipes` subcollection
export async function saveUserRecipes(uid, recipeBook) {
  console.log(`[saveUserRecipes] Started for UID: ${uid}`);

  const writePromises = recipeBook.map((recipe) => {
    const recipeRef = doc(db, "users", uid, "recipes", recipe.id);
    return setDoc(recipeRef, recipe); // Overwrites if exists, creates if not
  });

  await Promise.all(writePromises);
  console.log("[saveUserRecipes] All recipes saved successfully.");
}

export async function deleteRecipe(uid, recipeId) {
  try {
    const recipeRef = doc(db, "users", uid, "recipes", recipeId); //reference path to specific recipe that needs deleting
    await deleteDoc(recipeRef);
    console.log(`Recipe ${recipeId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}