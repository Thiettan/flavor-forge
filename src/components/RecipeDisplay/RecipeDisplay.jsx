import { useState } from "react";
import { RecipeTagList } from "../RecipeTagList/RecipeTagList";
import ActionBtn from "../ui/ActionBtn";
import IconBtn from "../ui/IconBtn";
import ToggleBtn from "../ui/ToggleBtn";
import RecipeDate from "../RecipeDate";
import { EditableList } from "../EditableList";
/* import EditIcon from "../ui/icons/EditIcon"; */
/* import PrintIcon from "../ui/icons/PrintIcon"; */

// Material UI ///////////////////////////////////
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
//////////////////////////////////////////////////

const RecipeDisplay = ({
  handleSetCurrentPage,
  openConfirmPopup,
  deleteAndUpdateRecipeBook,
  setActiveRecipe,
  ...props
}) => {
  const Recipe = props.props;
  console.log(Recipe);

  const [showCheckbox, toggleShowCheckbox] = useState(false);
  /*   const [editMode, toggleEditMode] = useState(false); */
  /*   const [ingredients, setIngredients] = useState(Recipe.ingredients);
  const [directions, setDirections] = useState(Recipe.directions); */

  function handleEditMode() {
    //insert recipe id below or maybe index

    handleSetCurrentPage(1, Recipe.id); //navigates to RecipeForger to edit current recipe
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
                  onClick={() => {
                    window.print();
                  }}
                >
                  <PrintIcon className="text-white" />
                  {/*       <PrintIcon className="h-[1.5em] w-[1.5em] flex items-center justify-center" /> */}
                </IconBtn>

                <IconBtn
                  aria-label="Edit"
                  onClick={() => handleEditMode()}
                  tooltip="Edit your recipe"
                >
                  <EditIcon className="text-white" />
                  {/*   <EditIcon className="w-[1.5em] h-[1.5em]" /> */}
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
                          setActiveRecipe(0);
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
                  onChange={(e) => {
                    toggleShowCheckbox(e.target.checked);
                  }}
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
              {/*           <IngredientList
            ingredients={Recipe.ingredients}
            showCheckbox={showCheckbox}
            className="py-2 px-2"
          /> */}
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
        <p>No recpies to display...</p>
      )}
    </>
  );
};
export default RecipeDisplay;
