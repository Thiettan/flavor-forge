import { useState } from "react";
import { RecipeTagList } from "../RecipeTagList/RecipeTagList";
import ActionBtn from "../ui/ActionBtn";
import IconBtn from "../ui/IconBtn";
import ToggleBtn from "../ui/ToggleBtn";
import RecipeDate from "../RecipeDate";
import { EditableList } from "../EditableList";

// Material UI ///////////////////////////////////
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
//////////////////////////////////////////////////

// 🧠 Context
import { useFlavorForge } from "../context/FlavorForgeContext";

const RecipeDisplay = ({
  openConfirmPopup,
  deleteAndUpdateRecipeBook,
  setActiveRecipe,
  activeRecipe,
}) => {
  const { recipeBook, handleSetCurrentPage } = useFlavorForge(); // ⬅️ get from context
  const Recipe = recipeBook?.[activeRecipe]; // ⬅️ current active recipe
  const [showCheckbox, toggleShowCheckbox] = useState(false);

  function handleEditMode() {
    console.log(Recipe.id);
    handleSetCurrentPage(1, Recipe.id); // ⬅️ navigates to edit view
  }

  return (
    <>
      {Recipe ? (
        <div className="RecipeDisplay">
          <div className="container mx-auto p-4">
            <h2 className="text-4xl">{Recipe.name}</h2>
            <p className="date">
              {Recipe.createdAt && <RecipeDate date={Recipe.createdAt} />}
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
              <div className="flex justify-between items-center gap-4 ">
                <RecipeTagList tag={Recipe.tag} />
              </div>

              <div className="flex justify-between items-center gap-4 text-white">
                <IconBtn
                  aria-label="print"
                  tooltip="Print"
                  onClick={() => window.print()}
                >
                  <PrintIcon className="text-white" />
                </IconBtn>

                <IconBtn
                  aria-label="Edit"
                  onClick={() => {
                    handleEditMode();
                  }}
                  tooltip="Edit your recipe"
                >
                  <EditIcon className="text-white" />
                </IconBtn>

                <IconBtn
                  aria-label="delete"
                  tooltip="Delete"
                  onClick={() => {
                    openConfirmPopup(
                      deleteAndUpdateRecipeBook,
                      [
                        Recipe.id,
                        () => {
                          setActiveRecipe(0); // Close view after deletion
                        },
                      ],
                      {
                        title: "Delete Recipe",
                        message:
                          "Are you sure you want to permanently delete this recipe?",
                        icon: "Warning",
                      }
                    );
                  }}
                >
                  <DeleteIcon className="text-white" />
                </IconBtn>

                <ToggleBtn
                  onChange={(e) => toggleShowCheckbox(e.target.checked)}
                  checked={showCheckbox}
                  disabled={false}
                >
                  Checklist
                </ToggleBtn>
              </div>
            </div>

            {Recipe.image && (
              <img
                src={Recipe.image}
                alt={`Preview image of ${Recipe.name}`}
                className="w-full aspect-[4/3] object-cover rounded-lg mt-4 sm:mt-0"
              />
            )}

            <p className="my-6">{Recipe.description}</p>

            <section className="my-4">
              <h3 className="text-2xl mb-2">Ingredients</h3>
              <hr />
              <EditableList
                items={Recipe.ingredients}
                setItems={null}
                editMode={false}
                className="py-2 px-2"
                showCheckbox={showCheckbox}
                isOrdered={false}
              />
            </section>

            <section className="my-4">
              <h3 className="text-2xl mb-2">Directions</h3>
              <hr />
              <EditableList
                items={Recipe.directions}
                setItems={null}
                editMode={false}
                className="py-2 px-2"
                showCheckbox={showCheckbox}
                isOrdered={true}
                getItemPrefix={(idx) => `${idx + 1}.`}
              />
            </section>
          </div>
        </div>
      ) : (
        <p>No recipes to display...</p>
      )}
    </>
  );
};

export default RecipeDisplay;
