import { DirectionsList } from "../DirectionsList";
import { IngredientList } from "../IngredientList";
import { RecipeTagList } from "../RecipeTagList/RecipeTagList";
import ActionBtn from "../ui/ActionBtn";
import IconBtn from "../ui/IconBtn";
import ToggleBtn from "../ui/ToggleBtn";
import { useState } from "react";
import PrintIcon from "../ui/icons/PrintIcon";
import RecipeDate from "../RecipeDate";
import { EditableList } from "../EditableList";

const RecipeDisplay = ({ ...props }) => {
  const Recipe = props.props;
  console.log(Recipe);

  const [showCheckbox, toggleShowCheckbox] = useState(false);

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
              variant="utility"
              onClick={() => {
                window.print();
              }}
            >
              <PrintIcon className="h-[1.5em] w-[1.5em] flex items-center justify-center" />
            </IconBtn>
            <ToggleBtn
              onChange={(e) => {
                toggleShowCheckbox(e.target.checked);
              }}
              checked={showCheckbox}
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
