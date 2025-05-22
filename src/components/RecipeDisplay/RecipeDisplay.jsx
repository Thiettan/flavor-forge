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
        <p>{Recipe.description}</p>
        <RecipeTagList tag={Recipe.tag} />
        <img src={Recipe.image} alt="Preview" className="w-full" />
        <h3>Ingredients</h3>
        <IngredientList ingredients={Recipe.ingredients} />
        <h3>Directions</h3>
        <DirectionsList directions={Recipe.directions} />
      </div>
    </div>
  );
};
export default RecipeDisplay;
