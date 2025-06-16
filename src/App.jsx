import { useState } from "react";
import ActionBtn from "./components/ui/ActionBtn";
import RecipeForger from "./components/RecipeForger/RecipeForger";
import RecipeDisplay from "./components/RecipeDisplay/RecipeDisplay";
import MainMenu from "./components/MainMenu/MainMenu";
import RecipeCarousel from "./components/RecipeCarousel/RecipeCarousel";
import RecipeBook from "./components/RecipeBook/RecipeBook";

import SignIn from "./components/FireBase/SignIn";
import SignOutBtn from "./components/FireBase/SignOutBtn";
import ConfirmPopup from "./components/ui/ConfirmPopup";

import { deleteRecipe } from "./components/FireBase/firestoreHelpers";

// Material UI ////////////////////////////
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
///////////////////////////////////////////

// Context //////////////////////////////
import {
  FlavorForgeProvider,
  useFlavorForge,
} from "./components/context/FlavorForgeContext";
////////////////////////////////////////

function AppContent() {
  const [showPopup, setShowPopup] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmArgs, setConfirmArgs] = useState(null);
  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    icon: "Success",
  });

  // ✅ From context
  const { user, recipeBook, setRecipeBook, currentPage } = useFlavorForge();

  // Popup Management ///////////////////////////
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

  const deleteAndUpdateRecipeBook = async (recipeId, callback) => {
    await deleteRecipe(user.uid, recipeId);
    setRecipeBook((prev) => prev.filter((r) => r.id !== recipeId));
    if (callback) callback(); // call the callback if provided
  };

  const AppList = user
    ? [
        <RecipeCarousel
          recipeBook={recipeBook}
          setRecipeBook={setRecipeBook}
          openConfirmPopup={openConfirmPopup}
          deleteAndUpdateRecipeBook={deleteAndUpdateRecipeBook}
        />,
        <RecipeForger
          recipeBook={recipeBook}
          setRecipeBook={setRecipeBook}
          user={user}
        />,
        <RecipeBook recipeBook={recipeBook} />,
      ]
    : [<p>Loading...</p>];

  return (
    <>
      {user ? ( //checks if user is signed in
        <>
          <MainMenu />
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
          <SignOutBtn />
        </>
      ) : (
        <SignIn /> //no user detected, sign in page
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FlavorForgeProvider>
        <AppContent />
      </FlavorForgeProvider>
    </ThemeProvider>
  );
}

export default App;
