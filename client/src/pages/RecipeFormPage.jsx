import { useState } from "react";
import axios from "axios";
import Ingredients from "../components/recipeFormComponents/Ingredients";
import Instructions from "../components/recipeFormComponents/Instructions";

export default function RecipeFormPage () {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState([{ description: '', image: '' }]);
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients);
  };

  const handleInstructionsChange = (newInstructions) => {
    setInstructions(newInstructions);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null); // Clear the cover image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      coverImage,
      ingredients,
      instructions,
    };
    try {
      await axios.post('/recipes', recipeData);
      setRedirect(true);
      console.log('Recipe submitted successfully!');
    } catch (error) {
      console.error('Error submitting recipe:', error);
      console.log('Failed to submit recipe.');
    }
  };

  if (redirect) {
    return <Navigate to={'/recipe'} />
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
      <div className="flex flex-col w-1/3 justify-around mx-auto mt-10">
        <h2 className="text-2xl mb-4 text-center">Title</h2>
        <input
          type="title"
          value={title}
          onChange={handleTitleChange}
          className="border w-60 border-gray-300 justify-center p-2 rounded"
          placeholder="Enter recipe title"
        />
      </div>

      <div className="flex flex-col justify-around mt-10">
        <label className="text-2xl mb-4 text-center">Cover Picture</label>
        <div className="relative w-2/5 mx-auto h-80 bg-gray-100 rounded-2xl overflow-hidden">
          {coverImage ? (
            <div className="relative w-full h-full">
              <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              <button
                onClick={handleRemoveCoverImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center border border-gray-300 bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
              <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                Upload
              </div>
              <p className="text-base text-gray-400">Upload a cover image for this recipe</p>
            </label>
          )}
        </div>
      </div>

      <Ingredients onChange={handleIngredientsChange} />
      <Instructions onChange={handleInstructionsChange} />

      <div className="flex justify-center">
        <button className="border bg-primary rounded-3xl py-4 px-20 text-xl text-white mt-20 w-1/4" type="submit">Submit Recipe</button>
      </div>
    </form>
    
  );
}