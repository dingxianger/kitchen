import { useState } from "react";

export default function Ingredients () {
  
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  // Function to handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <form>
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center text-xl gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(event) => handleInputChange(index, event)}
            className="ingredient-input"
            required
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity (optional)"
            value={ingredient.quantity}
            onChange={(event) => handleInputChange(index, event)}
            className="ingredient-input"
          />
          <button
            type="button"
            onClick={() => handleRemoveIngredient(index)}
            className="bg-primary text-white px-4 py-1 rounded-2xl"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddIngredient}
        className="border border-primary px-4 py-2 rounded-3xl"
      >
        Add Ingredient
      </button>
    </form>
  );
}