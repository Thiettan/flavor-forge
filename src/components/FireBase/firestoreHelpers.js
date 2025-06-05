import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import {
  db
} from "./firebase";

export async function getUserRecipes(uid) {
  console.log(`[getUserRecipes] Started for UID: ${uid}`);

  const userDoc = doc(db, "users", uid);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    console.log("[getUserRecipes] Document found, returning recipeBook.");
    return docSnap.data().recipeBook || [];
  } else {
    console.log("[getUserRecipes] No document found, returning empty array.");
    return [];
  }
}

export async function saveUserRecipes(uid, recipeBook) {
  console.log(`[saveUserRecipes] Started for UID: ${uid}`);
  await setDoc(doc(db, "users", uid), {
    recipeBook
  });
  console.log("[saveUserRecipes] Recipe book saved successfully.");
}