// RecipesPage.jsx
"use client";

import { useState, useEffect } from "react";
import TopNav from "./TopNav"; // Adjust path
import Footer from "./Footer"; // Adjust path

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = [];
      const seenIds = new Set();

      while (fetchedRecipes.length < 100) {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const newDish = data.meals[0];
        if (!seenIds.has(newDish.idMeal)) {
          seenIds.add(newDish.idMeal);
          fetchedRecipes.push(newDish);
        }
      }
      setRecipes(fetchedRecipes);
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <main className="flex-grow justify-center w-7/8 p-4 sm:p-6 md:p-10 mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6">
          <b>Explore Delicious Recipes</b>
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading recipes...</p>
          
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recipes.map((dish) => (
              <div
                key={dish.idMeal}
                className="recipe-card text-center cursor-pointer"
                onClick={() => handleDishClick(dish)}
              >
                <img
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  className="w-full md:w-50 h-50 rounded-lg shadow-lg hover:scale-105 transition"
                />
                <h2 className="text-xl font-bold mt-2">{dish.strMeal}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      {selectedDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 shadow-black">
          <div className="bg-red-200 p-4 sm:p-6 rounded-lg w-full sm:max-w-md md:max-w-6/10 min-w-[280px] h-auto max-h-[90vh] shadow-lg-black overflow-y-auto pr-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{selectedDish.strMeal}</h2>
            <img
              src={selectedDish.strMealThumb}
              alt={selectedDish.strMeal}
              className="w-full h-48 sm:h-64 md:h-80 rounded-lg mx-auto mb-4"
            />
            <p className="mt-4 text-sm sm:text-base">{selectedDish.strInstructions}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-full text-sm sm:text-base"
              onClick={() => setSelectedDish(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}