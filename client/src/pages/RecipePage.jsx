import { useState } from "react";
import { Link } from "react-router-dom";

export default function RecipePage() {

  const [recipes, setRecipes] = useState([]);

  return (
    <div className="flex flex-col items-center mt-10">
      <Link className="inline-flex items-center gap-2 py-2 px-20 rounded-3xl bg-primary text-2xl text-white" to={'/recipe/new'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create New
      </Link>
      <di>recipe</di>
    </div>
  );
}