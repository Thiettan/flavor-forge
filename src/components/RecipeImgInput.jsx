import { useState } from "react";
import { ImagePreview } from "./ImagePreview";

const RecipeImgInput = ({ image, handleAddImage }) => {
  const [preview, setPreview] = useState(image);

  const handleImageChange = (file) => {
    if (!file) return; // failsafe in case if user cancels

    // Check file size
    if (file.size > 1024 * 1024) {
      alert("File is too large. Please select an image under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (e) => {
      // callback func
      // below executes after FileReader finishes
      setPreview(reader.result);
      handleAddImage(e, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Recipe Image</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeImage">Choose an image:</label>

      {preview && ( //if preview is true, render below
        <ImagePreview
          preview={preview}
          forging={true}
          handleAddImage={handleAddImage}
          setPreview={setPreview}
        />
      )}

      {!preview && (
        <div
          className="flex items-center justify-center w-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label
            htmlFor="RecipeForger-RecipeImage"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG or JPG (MAX. 1MB)
              </p>
            </div>
            <input
              type="file"
              id="RecipeForger-RecipeImage"
              name="RecipeImage"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default RecipeImgInput;
