import { useState } from "react";
import AddBtn from "./components/AddBtn";
import RecipeNameInput from "./components/RecipeNameInput";
import RecipeTagInput from "./components/RecipeTagInput";
import RecipeImgInput from "./components/RecipeImgInput";
import IngredientInput from "./components/IngredientInput";
import DirectionsInput from "./components/DirectionsInput";
import "./App.css";

//TEST DATA Imports//
import testTagData from "./data/recipe-tags-test.json";
import testIngredientData from "./data/recipe-ingredients-test.json";
import testDirectionData from "./data/recipe-directions-test.json";
/////////////////////

function App() {
  const [name, setName] = useState("French Omelette");
  const [tag, setTag] = useState(testTagData);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(testIngredientData);
  const [directions, setDirections] = useState(testDirectionData);

  const handleSaveRecipe = () => {
    //insert form validation here
    const formValid = true;
    if (!formValid) return;

    const compiledRecipe = {
      name: name,
      tag: tag,
      ingredients: ingredients,
      directions: directions,
      image: image,
    };
    console.log(compiledRecipe);
  };

  function handleAddName(e, newName) {
    e.preventDefault();
    setName(newName);
  }

  function handleAddTag(e, newTag) {
    e.preventDefault();
    setTag([...tag, newTag]);
  }

  function handleAddImage(newImg) {
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
      <h1 className="text-6xl text-center">Flavor Forge</h1>
      <div className="@container max-w-5xl mx-auto">
        <form action="" id="RecipeForger" className="max-w-full mx-auto">
          <h2 className="text-xl mb-5">Form Heading 2</h2>

          <RecipeNameInput name={name} handleAddName={handleAddName} />

          <RecipeTagInput tag={tag} handleAddTag={handleAddTag} />

          <RecipeImgInput image={image} handleAddImage={handleAddImage} />

          <IngredientInput
            ingredients={ingredients}
            handleAddIngredient={handleAddIngredient}
          />
          <DirectionsInput
            directions={directions}
            handleAddDirections={handleAddDirections}
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
    </>
  );
}

export default App;
