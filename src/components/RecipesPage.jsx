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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedDish) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedDish]);

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <main className="flex-grow justify-center w-7/8 p-4 sm:p-6 md:p-10 mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 font-bold">
          Explore Delicious Recipes
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

      {/* Modal */}
      {selectedDish && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="bg-red-200 p-4 sm:p-6 rounded-lg w-11/12 sm:max-w-md md:max-w-4xl h-auto max-h-[90vh] shadow-lg overflow-y-auto relative">
            
            {/* Title & Close Button */}
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{selectedDish.strMeal}</h2>
              <button
                className="absolute top-0 right-0 h-10 w-10 bg-red-500 text-white rounded-full flex items-center justify-center"
                onClick={() => setSelectedDish(null)}
              >
                ✕
              </button>
            </div>

            {/* Dish Image */}
            <img
              src={selectedDish.strMealThumb}
              alt={selectedDish.strMeal}
              className="w-full h-48 sm:h-64 md:h-80 rounded-lg mx-auto mb-4"
            />

            {/* Instructions (Scrollable) */}
            <div className="max-h-60 overflow-y-auto mt-4 pr-2">
              <p className="text-sm sm:text-base">{selectedDish.strInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
