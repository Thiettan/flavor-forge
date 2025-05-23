import { DirectionsList } from "../DirectionsList";
import { IngredientList } from "../IngredientList";
import { RecipeTagList } from "../RecipeTagList/RecipeTagList";

const RecipeDisplay = ({ ...props }) => {
  const Recipe = props.props;
  console.log(Recipe);
  return (
    <div className="RecipeDisplay">
      <div className="container mx-auto">
        <h2 className="text-6xl">{Recipe.name}</h2>
        <RecipeTagList tag={Recipe.tag} />

        <img
          src={Recipe.image}
          alt="Preview"
          className="w-full aspect-[4/3] object-cover rounded-lg"
        />
        <p className="my-6">{Recipe.description}</p>
        <section className="my-4">
          <h3 className="text-2xl mb-2">Ingredients</h3>
          <hr />
          <IngredientList
            ingredients={Recipe.ingredients}
            className="py-2 px-2"
          />
        </section>
        <section className="my-4">
          <h3 className="text-2xl mb-2">Directions</h3>
          <hr />
          <DirectionsList
            directions={Recipe.directions}
            className="py-2 px-2"
          />
        </section>
      </div>
    </div>
  );
};
export default RecipeDisplay;
