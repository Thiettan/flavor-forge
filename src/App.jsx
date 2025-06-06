import { useState, useEffect } from "react";
import ActionBtn from "./components/ui/ActionBtn";
import RecipeForger from "./components/RecipeForger/RecipeForger";
import RecipeDisplay from "./components/RecipeDisplay/RecipeDisplay";
import MainMenu from "./components/MainMenu/MainMenu";
import RecipeCarousel from "./components/RecipeCarousel/RecipeCarousel";
import RecipeBook from "./components/RecipeBook/RecipeBook";

import SignInBtn from "./components/FireBase/SignInBtn";
import SignOutBtn from "./components/FireBase/SignOutBtn";

import { auth } from "./components/FireBase/firebase";
import {
  getUserRecipes,
  saveUserRecipes,
} from "./components/FireBase/firestoreHelpers";
import SignIn from "./components/FireBase/SignIn";
import SignOut from "./components/FireBase/SignOutBtn";

import ConfirmPopup from "./components/ui/ConfirmPopup";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [recipeBook, setRecipeBook] = useState([]);
  const [user, setUser] = useState(null);
  const [hasLoadedRecipes, setHasLoadedRecipes] = useState(false); // ✅ FLAG
  const [showPopup, setShowPopup] = useState(false);

  const [tempData, setTempData] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);

  function handleSetCurrentPage(idx, data) {
    setCurrentPage(idx);
    if (data != null) setTempData(data);
  }

  const handleConfirm = () => {
    console.log("User confirmed.");
    setShowPopup(false);
  };

  function handleSignOut() {
    setCurrentPage(0);
    setUser(null);
    setRecipeBook(null);
    setHasLoadedRecipes(false);
  }

  // Track auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const recipes = await getUserRecipes(user.uid);
        setRecipeBook(recipes || []);
        setHasLoadedRecipes(true); // ✅ Set true only after data is fetched
      } else {
        setRecipeBook([]);
        setHasLoadedRecipes(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync changes to Firestore when recipeBook updates (but only after initial load)
  useEffect(() => {
    if (user && hasLoadedRecipes) {
      saveUserRecipes(user.uid, recipeBook);
    }
  }, [recipeBook, user, hasLoadedRecipes]); // ✅ include the flag

  const AppList = [
    <RecipeCarousel
      recipeBook={recipeBook}
      setRecipeBook={setRecipeBook}
      handleSetCurrentPage={handleSetCurrentPage}
    />,
    <RecipeForger
      recipeBook={recipeBook}
      setRecipeBook={setRecipeBook}
      user={user}
      tempData={tempData}
      setTempData={setTempData}
    />,
    <RecipeBook recipeBook={recipeBook} />,
  ];

  return (
    <>
      {user ? ( //checks if user is signed in
        <>
          <MainMenu
            currentPage={currentPage}
            handleSetCurrentPage={handleSetCurrentPage}
          />
          {AppList[currentPage]}
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Trigger Popup
          </button>
          <ConfirmPopup
            isVisible={showPopup}
            title="Recipe saved successfully!"
            message="Would you like to reset the form?"
            icon="Success"
            onConfirm={handleConfirm}
            onClose={() => setShowPopup(false)}
          />
          <SignOutBtn handleSignOut={handleSignOut} />
        </>
      ) : (
        <SignIn /> //no user detected, sign in page
      )}
    </>
  );
}

export default App;
