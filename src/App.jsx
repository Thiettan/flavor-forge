import { useState, useEffect } from "react";
import ActionBtn from "./components/ui/ActionBtn";
import RecipeForger from "./components/RecipeForger/RecipeForger";
import RecipeDisplay from "./components/RecipeDisplay/RecipeDisplay";
import MainMenu from "./components/MainMenu/MainMenu";
import RecipeCarousel from "./components/RecipeCarousel/RecipeCarousel";
import RecipeBook from "./components/RecipeBook/RecipeBook";

import { auth } from "./components/FireBase/firebase";
import {
  getUserRecipes,
  saveUserRecipes,
} from "./components/FireBase/firestoreHelpers";
import SignIn from "./components/FireBase/SignIn";
import SignOutBtn from "./components/FireBase/SignOutBtn";
import ConfirmPopup from "./components/ui/ConfirmPopup";

import { deleteRecipe } from "./components/FireBase/firestoreHelpers";

// Material UI ////////////////////////////
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
///////////////////////////////////////////

import Test from "./Test";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [recipeBook, setRecipeBook] = useState([]);
  const [user, setUser] = useState(null);
  const [hasLoadedRecipes, setHasLoadedRecipes] = useState(false); // ✅ FLAG

  // Popup Management ///////////////////////////
  const [showPopup, setShowPopup] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmArgs, setConfirmArgs] = useState(null);
  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    icon: "Success",
  });
  // 1. Call openConfirm to open popup and passes callback fn and arguments for it
  function openConfirmPopup(callback, args = [], options = {}) {
    setConfirmCallback(() => callback);
    setConfirmArgs(args);

    // Set default popup data, overridden by options
    setPopupData({
      title: options.title || "Are you sure?",
      message: options.message || "This action cannot be undone.",
      icon: options.icon || "Success",
    });

    setShowPopup(true);
  }
  // handleConfirm executing callback fn when CONFIRM button is clicked
  function handleConfirm() {
    if (confirmCallback) {
      confirmCallback(...confirmArgs);
    }
    setShowPopup(false);
  }
  /////////////////////////////////////////////////

  const [tempData, setTempData] = useState(null);
  //const [currentMode, setCurrentMode] = useState(null);

  function handleSetCurrentPage(idx, data) {
    setCurrentPage(idx);
    if (data != null) setTempData(data);
  }
  function handleSignOut() {
    setCurrentPage(0);
    setUser(null);
    setRecipeBook(null);
    setHasLoadedRecipes(false);
  }

  const deleteAndUpdateRecipeBook = async (recipeId, callback) => {
    await deleteRecipe(user.uid, recipeId);
    setRecipeBook((prev) => prev.filter((r) => r.id !== recipeId));
    if (callback) callback(); // call the callback if provided
  };

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

  const AppList = user
    ? [
        <RecipeCarousel
          recipeBook={recipeBook}
          setRecipeBook={setRecipeBook}
          handleSetCurrentPage={handleSetCurrentPage}
          openConfirmPopup={openConfirmPopup}
          deleteAndUpdateRecipeBook={deleteAndUpdateRecipeBook}
        />,
        <RecipeForger
          recipeBook={recipeBook}
          setRecipeBook={setRecipeBook}
          user={user}
          tempData={tempData}
          setTempData={setTempData}
        />,
        <RecipeBook recipeBook={recipeBook} />,
      ]
    : [<p>Loading...</p>];
  return (
    <ThemeProvider theme={theme}>
      {user ? ( //checks if user is signed in
        <>
          <Test />
          <MainMenu
            currentPage={currentPage}
            handleSetCurrentPage={handleSetCurrentPage}
            setTempData={setTempData}
          />
          {AppList[currentPage]}
          <button
            onClick={() => {
              openConfirmPopup();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Trigger Popup
          </button>
          <ConfirmPopup
            isVisible={showPopup}
            title={popupData.title}
            message={popupData.message}
            icon={popupData.icon}
            onConfirm={handleConfirm}
            onClose={() => setShowPopup(false)}
          />
          <SignOutBtn handleSignOut={handleSignOut} />
        </>
      ) : (
        <SignIn /> //no user detected, sign in page
      )}
    </ThemeProvider>
  );
}

export default App;
