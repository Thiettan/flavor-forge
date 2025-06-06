import { useState, useEffect } from "react";
import AddBtn from "../ui/AddBtn";
import RecipeNameInput from "../RecipeNameInput";
import RecipeDescriptionInput from "../RecipeDescriptionInput";
import RecipeTagInput from "../RecipeTagInput";
import RecipeImgInput from "../RecipeImgInput";
import IngredientInput from "../IngredientInput";
import DirectionsInput from "../DirectionsInput";

// 🔧 Helper Functions ====
import { trimArray } from "../../util/helper-functions";
import { saveSingleRecipe } from "../../components/FireBase/firestoreHelpers";
// ========================

// Test Data ==============
import testTagData from "../../data/recipe-tags-test.json";
import testIngredientData from "../../data/recipe-ingredients-test.json";
import testDirectionData from "../../data/recipe-directions-test.json";
// ========================

import PopupTimed from "../ui/PopupTimed";

const RecipeForger = ({ recipeBook, setRecipeBook, user }) => {
  /*   const isDev = process.env.NODE_ENV === "development"; */
  const isDev = true;
  const [name, setName] = useState(isDev ? "French Omelette" : "");
  const [tag, setTag] = useState(isDev ? testTagData : []);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(
    isDev ? testIngredientData : []
  );
  const [directions, setDirections] = useState(isDev ? testDirectionData : []);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("Ingredients state updated:", ingredients);
  }, [ingredients]);

  const handleSaveRecipe = async () => {
    const formValid = true;
    if (!formValid) {
      alert("Please fill out all required fields.");
      return;
    }

    const compiledRecipe = {
      id: crypto.randomUUID(), //generate unique id
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
    const updatedBook = [...recipeBook, compiledRecipe];
    setRecipeBook(updatedBook);

    // ✅ Save just this one recipe to Firestore
    try {
      await saveSingleRecipe(user.uid, compiledRecipe);
      setShowPopup(true);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }

    /** Old logic for Local Storage below */
    /*     const storedBookString = localStorage.getItem("recipeBook"); //get stored book from user

    if (storedBookString) {
      const storedBook = JSON.parse(storedBookString);
      console.log(storedBook); // array of recipe objects
      storedBook.push(compiledRecipe);
      localStorage.setItem("recipeBook", JSON.stringify(storedBook));
    } else {
      const recipeBook = [compiledRecipe];
      localStorage.setItem("recipeBook", JSON.stringify(recipeBook));
    } */
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

              <AddBtn
                variant="save"
                className="float-right"
                onClick={handleSaveRecipe}
              >
                Forge Recipe
              </AddBtn>
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
