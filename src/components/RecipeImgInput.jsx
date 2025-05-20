import { useState } from "react";

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

export default RecipeImgInput;
