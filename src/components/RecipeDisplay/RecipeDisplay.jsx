import { useState } from "react";
import { RecipeTagList } from "../RecipeTagList/RecipeTagList";
import ActionBtn from "../ui/ActionBtn";
import IconBtn from "../ui/IconBtn";
import ToggleBtn from "../ui/ToggleBtn";
import PrintIcon from "../ui/icons/PrintIcon";
import RecipeDate from "../RecipeDate";
import { EditableList } from "../EditableList";
import EditIcon from "../ui/icons/EditIcon";

const RecipeDisplay = ({ handleSetCurrentPage, recipeIndex, ...props }) => {
  const Recipe = props.props;
  console.log(Recipe);

  const [showCheckbox, toggleShowCheckbox] = useState(false);
  /*   const [editMode, toggleEditMode] = useState(false); */
  /*   const [ingredients, setIngredients] = useState(Recipe.ingredients);
  const [directions, setDirections] = useState(Recipe.directions); */

  function handleEditMode() {
    //insert recipe id below or maybe index

    handleSetCurrentPage(1, recipeIndex); //navigates to RecipeForger to edit current recipe
  }

  return (
    <div className="RecipeDisplay">
      <div className="container mx-auto p-4">
        <h2 className="text-6xl">{Recipe.name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-4">
            {Recipe.createdAt && <RecipeDate date={Recipe.createdAt} />}
            <RecipeTagList tag={Recipe.tag} />
          </div>
          <div className="flex justify-between items-center gap-4">
            <IconBtn
              className="primary"
              tooltip="Print"
              variant="utility"
              onClick={() => {
                window.print();
              }}
            >
              <PrintIcon className="h-[1.5em] w-[1.5em] flex items-center justify-center" />
            </IconBtn>

            <IconBtn
              onClick={() => handleEditMode()}
              tooltip="Edit your recipe"
            >
              <EditIcon className="w-[1.5em] h-[1.5em]" />
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
            className="w-full aspect-[4/3] object-cover rounded-lg"
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
  );
};
export default RecipeDisplay;
