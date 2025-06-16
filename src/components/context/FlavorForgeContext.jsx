// components/context/FlavorForgeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../FireBase/firebase";
import { getUserRecipes, saveUserRecipes } from "../FireBase/firestoreHelpers";

const FlavorForgeContext = createContext();

export const FlavorForgeProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [recipeBook, setRecipeBook] = useState([]);
  const [hasLoadedRecipes, setHasLoadedRecipes] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  function handleSetCurrentPage(idx, data) {
    setCurrentPage(idx);
    setTempData(data);
  }

  function handleSignOut() {
    setCurrentPage(0);
    setTempData(null);
  }

  // Auth listener + initial recipe fetch
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const recipes = await getUserRecipes(user.uid);
        setRecipeBook(recipes || []);
        setHasLoadedRecipes(true);
      } else {
        setRecipeBook([]);
        setHasLoadedRecipes(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to Firestore when recipeBook changes
  useEffect(() => {
    if (user && hasLoadedRecipes) {
      saveUserRecipes(user.uid, recipeBook);
    }
  }, [user, recipeBook, hasLoadedRecipes]);

  return (
    <FlavorForgeContext.Provider
      value={{
        user,
        setUser,
        recipeBook,
        setRecipeBook,
        hasLoadedRecipes,
        setHasLoadedRecipes,
        tempData,
        setTempData,
        currentPage,
        setCurrentPage,
        handleSetCurrentPage,
        handleSignOut,
      }}
    >
      {children}
    </FlavorForgeContext.Provider>
  );
};

export const useFlavorForge = () => useContext(FlavorForgeContext);
