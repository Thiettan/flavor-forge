import { useState, useEffect } from "react";
import AddBtn from "../ui/AddBtn";
import RecipeNameInput from "../RecipeNameInput";
import RecipeDescriptionInput from "../RecipeDescriptionInput";
import RecipeTagInput from "../RecipeTagInput";
import RecipeImgInput from "../RecipeImgInput";
import IngredientInput from "../IngredientInput";
import DirectionsInput from "../DirectionsInput";

// 🔧 Test Component =====
import TestComponent from "../TestComponent";

// 🔧 Helper Functions ====
import { trimArray } from "../../util/helper-functions";
// ========================

// Test Data ==============
import testTagData from "../../data/recipe-tags-test.json";
import testIngredientData from "../../data/recipe-ingredients-test.json";
import testDirectionData from "../../data/recipe-directions-test.json";
// ========================

const RecipeForger = () => {
  const [name, setName] = useState("French Omelette");
  const [tag, setTag] = useState(testTagData);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(testIngredientData);
  const [directions, setDirections] = useState(testDirectionData);

  useEffect(() => {
    console.log("Ingredients state updated:", ingredients);
  }, [ingredients]);

  const handleSaveRecipe = () => {
    //insert form validation here
    const formValid = true;
    if (!formValid) {
      alert("Please fill out all required fields.");
      return;
    }

    const compiledRecipe = {
      name: name.trim(),
      tag: trimArray(tag), // trimmed array of tag strings
      description: description,
      ingredients: ingredients,
      directions: directions,
      image: image,
    };

    console.log(compiledRecipe);

    const storedBookString = localStorage.getItem("recipeBook");

    if (storedBookString) {
      const storedBook = JSON.parse(storedBookString);
      console.log(storedBook); // array of recipe objects
      storedBook.push(compiledRecipe);
      localStorage.setItem("recipeBook", JSON.stringify(storedBook));
    } else {
      const recipeBook = [compiledRecipe];
      localStorage.setItem("recipeBook", JSON.stringify(recipeBook));
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
      <div className="recipe-forger">
        <h1 className="text-6xl text-center">Flavor Forge</h1>
        <div className="@container max-w-5xl mx-auto">
          <form action="" id="RecipeForger" className="max-w-full mx-auto p-4">
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
      </div>
    </>
  );
};

export default RecipeForger;
