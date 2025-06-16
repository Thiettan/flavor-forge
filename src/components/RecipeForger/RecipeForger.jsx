import { useState } from "react";
import AddBtn from "../ui/AddBtn";
import RecipeNameInput from "../RecipeNameInput";
import RecipeDescriptionInput from "../RecipeDescriptionInput";
import RecipeTagInput from "../RecipeTagInput";
import RecipeImgInput from "../RecipeImgInput";
import IngredientInput from "../IngredientInput";
import DirectionsInput from "../DirectionsInput";

// 🔧 Helper Functions ====
import { trimArray, upsertRecipe } from "../../util/helper-functions";
import { saveSingleRecipe, updateRecipe } from "../FireBase/firestoreHelpers";
// ========================

// Test Data ==============
import testTagData from "../../data/recipe-tags-test.json";
import testIngredientData from "../../data/recipe-ingredients-test.json";
import testDirectionData from "../../data/recipe-directions-test.json";
// ========================

import PopupTimed from "../ui/PopupTimed";
import MUIButton from "@mui/material/Button";

// 🧠 Context ====
import { useFlavorForge } from "../context/FlavorForgeContext";
// ===============

const RecipeForger = () => {
  const { user, recipeBook, setRecipeBook, tempData, setTempData } =
    useFlavorForge(); // ✅ use context values

  /*   const isDev = process.env.NODE_ENV === "development"; */
  // Get the full recipe object using the ID stored in tempData
  const editingRecipe = recipeBook.find((r) => r.id === tempData);

  const [name, setName] = useState(editingRecipe?.name || "French Omelette");
  const [tag, setTag] = useState(editingRecipe?.tag || testTagData);
  const [description, setDescription] = useState(
    editingRecipe?.description || ""
  );
  const [image, setImage] = useState(editingRecipe?.image || null);
  const [ingredients, setIngredients] = useState(
    editingRecipe?.ingredients || testIngredientData
  );
  const [directions, setDirections] = useState(
    editingRecipe?.directions || testDirectionData
  );
  const [showPopup, setShowPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false); //tracks and give loading prop for animating Materia btn

  /*   useEffect(() => {
    console.log("Ingredients state updated:", ingredients);
  }, [ingredients]); */

  const handleSaveRecipe = async () => {
    const formValid = true;
    if (!formValid) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    const compiledRecipe = {
      id: tempData || crypto.randomUUID(), //generate unique id
      name: name.trim(),
      tag: trimArray(tag), // trimmed array of tag strings
      description: description,
      ingredients: ingredients,
      directions: directions,
      image: image,
      createdAt: new Date().toISOString(),
    };

    console.log("[handleSaveRecipe] Compiled recipe:", compiledRecipe);

    // ✅ Update local state
    const isNewRecipe = tempData == null;

    // ✅ Update local state, if newRecipe is true, append to RecipeBook state, else: replaces existing if matches recipe id
    const updatedBook = upsertRecipe(recipeBook, compiledRecipe);
    setRecipeBook(updatedBook);

    // ✅ Save to Firestore
    try {
      if (isNewRecipe) {
        await saveSingleRecipe(user.uid, compiledRecipe);
      } else {
        await updateRecipe(user.uid, compiledRecipe.id, compiledRecipe);
        setTempData(null);
      }
      setShowPopup(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  function handleAddName(e, newName) {
    e.preventDefault();
    setName(newName);
  }

  function handleAddTag(e, newTag) {
    e.preventDefault();
    setTag([...tag, newTag]);
  }

  function handleAddDescription(e, newDescription) {
    e.preventDefault();
    setDescription(newDescription);
  }

  function handleAddImage(e, newImg) {
    e.preventDefault();
    setImage(newImg);
  }

  function handleAddIngredient(e, newIngredient) {
    e.preventDefault();
    setIngredients([...ingredients, newIngredient]);
  }

  function handleAddDirections(e, newDirections) {
    e.preventDefault();
    setDirections([...directions, newDirections]);
  }

  return (
    <>
      {user ? (
        <div className="recipe-forger">
          <div className="@container max-w-5xl mx-auto p-4">
            <h2 className="text-5xl mb-4">Recipe Forge</h2>
            <form action="" id="RecipeForger" className="max-w-full mx-auto ">
              <h2 className="text-xl mb-5">Form Heading 2</h2>

              <RecipeNameInput name={name} handleAddName={handleAddName} />

              <RecipeTagInput
                tag={tag}
                handleAddTag={handleAddTag}
                setTag={setTag}
              />

              <RecipeDescriptionInput
                description={description}
                handleAddDescription={handleAddDescription}
              />

              <RecipeImgInput image={image} handleAddImage={handleAddImage} />

              <IngredientInput
                ingredients={ingredients}
                handleAddIngredient={handleAddIngredient}
                setIngredients={setIngredients}
              />
              <DirectionsInput
                directions={directions}
                handleAddDirections={handleAddDirections}
                setDirections={setDirections}
              />

              <MUIButton
                variant="contained"
                loading={isLoading}
                loadingPosition="start"
                className="float-right"
                onClick={handleSaveRecipe}
              >
                Forge Recipe
              </MUIButton>
            </form>
          </div>
          <PopupTimed
            message="Recipe saved successfully!"
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
          />
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </>
  );
};

export default RecipeForger;
