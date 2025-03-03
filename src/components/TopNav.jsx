// TopNav.jsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSearch = async () => {
    setHasSearched(true);
    setLoading(true); // Start loading
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSelectedDish(null);
      setLoading(false); // Stop loading for empty query
      return;
    }

    let results = [];
    if (searchType === "name") {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      const data = await response.json();
      results = data.meals || [];
    } else if (searchType === "ingredient") {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`);
      const data = await response.json();
      if (data.meals) {
        results = await Promise.all(
          data.meals.map(async (meal) => {
            const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            const detailData = await detailResponse.json();
            return detailData.meals[0];
          })
        );
      }
    }
    setSearchResults(results);
    setLoading(false); // Stop loading once results are fetched
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedDish(null);
    setHasSearched(false);
    setLoading(false); // Ensure loading is off when clearing
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleRecipesClick = () => {
    navigate("/recipes");
  };

  return (
    <div className="bg-[#ff7f7f] w-full relative pt-4">
      <div className="flex justify-between items-center relative px-2 sm:px-4 md:px-8 py-0 h-[80px] sm:h-[100px] md:h-[160px]">
        <div className="flex items-center">
          <img src="Logo.png" alt="Logo" className="h-[70px] w-[70px] sm:h-[80px] sm:w-[80px] md:h-[170px] md:w-[170px]" />
        </div>
        <h1 className="hidden md:block top-0 font-['Elsie'] text-3xl sm:text-4xl md:text-5xl absolute left-1/2 transform -translate-x-1/2">
          The Tasty Trails
        </h1>
        <h1 className="md:hidden font-['Elsie'] text-2xl sm:text-3xl">The Tasty Trails</h1>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex items-center space-x-2 md:space-x-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="rounded-full p-1 bg-white h-[30px] text-sm"
          >
            <option value="name">Name</option>
            <option value="ingredient">Ingredient</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="rounded-full w-full sm:w-[200px] lg:w-[270px] p-2 sm:p-[15px] bg-white h-[30px] transition duration-300 hover:scale-105 text-sm"
          />
          {searchQuery.length > 0 && (
            <button
              onClick={handleClearSearch}
              className="font-['Elsie'] bg-[#FFDAB9] w-full sm:w-[90px] h-[30px] rounded-full transition duration-300 hover:scale-110 text-sm"
            >
              Clear
            </button>
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleRecipesClick}
              className="font-['Elsie'] bg-[#FFDAB9] w-full sm:w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110 text-sm"
            >
              Recipes
            </button>
            <button className="font-['Elsie'] bg-[#FFDAB9] w-full sm:w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110 text-sm">
              Cooking Tips
            </button>
            <button className="font-['Elsie'] bg-[#FFDAB9] w-full sm:w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110 text-sm">
              Ask AI
            </button>
            <button className="font-['Elsie'] bg-[#FFDAB9] w-full sm:w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110 text-sm">
              About Us
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#ff7f7f] px-2 sm:px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="rounded-full p-1 bg-white h-[30px] text-sm"
            >
              <option value="name">Name</option>
              <option value="ingredient">Ingredient</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-full w-full p-2 bg-white h-[30px] transition duration-300 hover:scale-105 text-sm"
            />
            {searchQuery.length > 0 && (
              <button
                onClick={handleClearSearch}
                className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105 text-sm"
              >
                Clear
              </button>
            )}
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleRecipesClick}
                className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105 text-sm"
              >
                Recipes
              </button>
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105 text-sm">
                Cooking Tips
              </button>
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105 text-sm">
                Ask AI
              </button>
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105 text-sm">
                About Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results with Loading */}
      {hasSearched && loading ? (
        <div className="justify-center w-full p-4 sm:p-6 md:p-10 mx-auto">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      ) : hasSearched && searchResults.length === 0 ? (
        <div className="justify-center w-full p-4 sm:p-6 md:p-10 mx-auto">
          <p className="text-sm text-gray-600 mb-4">Oops! 0 results found! Please make sure you've entered the correct spelling</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="justify-center w-full p-4 sm:p-6 md:p-10 mx-auto">
          <p className="text-sm text-gray-600 mb-4">{searchResults.length} results found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {searchResults.map((dish) => (
              <div
                key={dish.idMeal}
                className="recipe-card text-center cursor-pointer"
                onClick={() => handleDishClick(dish)}
              >
                <img
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition"
                />
                <h2 className="text-lg sm:text-xl font-bold mt-2">{dish.strMeal}</h2>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {selectedDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
          <div className="bg-red-200 p-4 sm:p-6 rounded-lg w-full sm:max-w-md md:max-w-lg min-w-[280px] h-auto max-h-[90vh] shadow-lg overflow-y-auto pr-0">
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