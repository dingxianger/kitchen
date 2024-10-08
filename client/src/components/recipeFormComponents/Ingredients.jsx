import { useState } from "react";

export default function Ingredients ({ onChange }) {
  
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

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
    <div className="flex justify-around mt-10">
      <form>
        <h2 className="text-2xl mb-4 text-center">Ingredients</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center w-full text-xl gap-4 mb-4">
            <input
              type="ingredient"
              name="name"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(event) => handleInputChange(index, event)}
              required
            />
            <input
              type="ingredient"
              name="quantity"
              placeholder="Quantity (optional)"
              value={ingredient.quantity}
              onChange={(event) => handleInputChange(index, event)}
              className="ingredient-input"
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="flex items-center gap-2 border border-primary px-4 py-2 rounded-2xl text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Ingredient
        </button>
      </form>
    </div>
  );
}