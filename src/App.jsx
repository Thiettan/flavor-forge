import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);

  function handleAddName(e, newName) {
    e.preventDefault();
    setName(newName);
  }

  function handleAddTag(e, newTag) {
    e.preventDefault();
    setTag([...tag, newTag]);
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
      <div className="@container">
        <form action="" id="RecipeForger" className="max-w-md mx-auto">
          <h2 className="text-xl mb-5">Form Heading 2</h2>

          <RecipeNameInput name={name} handleAddName={handleAddName} />

          <RecipeTagInput tag={tag} handleAddTag={handleAddTag} />

          <RecipeImgInput />

          <IngredientInput
            ingredients={ingredients}
            handleAddIngredient={handleAddIngredient}
          />
          <DirectionsInput
            directions={directions}
            handleAddDirections={handleAddDirections}
          />
        </form>
      </div>
    </>
  );
}

const RecipeNameInput = ({ name, handleAddName }) => {
  /*   const [inputValue, setInputValue] = useState("") */
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Recipe Name</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeName" className="hidden">
        Recipe Name
      </label>
      <input
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeName"
        name="RecipeName"
        type="text"
        placeholder={name}
        onChange={(e) => {
          handleAddName(e, e.target.value);
        }}
      />
    </div>
  );
};

const RecipeTagInput = ({ tag, handleAddTag }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Recipe Tag</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeTag" className="hidden">
        Recipe Tag
      </label>
      <div className="flex">
        <input
          className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
          id="RecipeForger-RecipeTag"
          name="RecipeTag"
          type="text"
          placeholder=""
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className=""
          onClick={(e) => {
            handleAddTag(e, inputValue);
          }}
        >
          +
        </button>
      </div>
      <ul className="mt-4 list-disc list-inside text-sm">
        {tag.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const RecipeImgInput = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; //prevents the function from continuing if user cancels & no file was selected

    const reader = new FileReader();
    reader.onloadend = () => {
      //callback func for reader.readAsDataURL()
      // This runs after the file has finished being read
      setPreview(reader.result);
    };
    reader.readAsDataURL(file); // Starts the async reading process & converts the file to a base64 string
  };

  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Recipe Image</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeImage">
        Choose an image for your recipe:
      </label>

      <input
        type="file"
        id="RecipeForger-RecipeImage"
        className="border mt-2"
        name="RecipeImage"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />

      {preview && (
        <div className="mt-4">
          <p className="text-sm mb-2">Image Preview:</p>
          <img src={preview} alt="Preview" className="w-full rounded border" />
        </div>
      )}
    </div>
  );
};

const IngredientInput = ({ ingredients, handleAddIngredient }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Ingredients</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeIngredient" className="hidden">
        Ingredient
      </label>
      <div className="flex">
        <input
          className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
          id="RecipeForger-RecipeIngredient"
          name="RecipeIngredient"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className=""
          onClick={(e) => {
            handleAddIngredient(e, inputValue);
          }}
        >
          +
        </button>
      </div>
      {/* Show list of added ingredients */}
      <ul className="mt-4 list-disc list-inside text-sm">
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const DirectionsInput = ({ directions, handleAddDirections }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Directions</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeStep" className="hidden">
        Step
      </label>
      <textarea
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeStep"
        name="RecipeStep"
        type="text"
        placeholder=""
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        className=""
        onClick={(e) => {
          handleAddDirections(e, inputValue);
        }}
      >
        +
      </button>

      {/* Show list of added ingredients */}
      <ol className="mt-4 list-decimal list-inside text-sm">
        {directions.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

export default App;
