import { useState } from "react";
export const ImagePreview = ({
  preview,
  forging,
  handleAddImage,
  setPreview,
}) => {
  const [previewImg, setPreviewImg] = useState(preview);
  return (
    <div className="mt-4">
      <p className="text-sm mb-2">Image Preview:</p>
      <div className="relative ">
        {previewImg && (
          <>
            <img
              className="w-full aspect-[4/3] object-cover rounded-lg"
              src={previewImg}
              alt=""
            />
          </>
        )}
        {/* if in Recipe Forger && preview has img data; render button below */}
        {forging && previewImg && (
          <button
            onClick={(e) => {
              handleAddImage(e, null);
              setPreviewImg(null);
              setPreview(null);
            }}
            className="absolute top-2 right-2 bg-orange-500"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};
