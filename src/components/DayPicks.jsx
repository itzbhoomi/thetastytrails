import { useEffect, useState } from 'react';

function DayPicks() {
    const [mondayDishes, setMondayDishes] = useState([]);
    const [dishesToDisplay, setDishesToDisplay] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    
    const today = new Date().getDay();
    const dateKey = new Date().toISOString().split('T')[0];

    // Fetch dishes on first load
    useEffect(() => {
        const storedMondayDishes = localStorage.getItem('mondayDishes');
        
        if (storedMondayDishes) {
            setMondayDishes(JSON.parse(storedMondayDishes));
        } else {
            const fetchMondayDishes = async () => {
                const dishes = [];
                while (dishes.length < 5) {
                    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                    const data = await response.json();
                    const newDish = data.meals[0];

                    if (!dishes.find(dish => dish.idMeal === newDish.idMeal)) {
                        dishes.push(newDish);
                    }
                }
                setMondayDishes(dishes);
                localStorage.setItem('mondayDishes', JSON.stringify(dishes));
            };
            fetchMondayDishes();
        }
    }, []);

    // Select dishes for today
    useEffect(() => {
        if (mondayDishes.length > 0) {
            if (today === 1) {
                setDishesToDisplay(mondayDishes);
            } else {
                const storedDailyDishes = localStorage.getItem(`dailyDishes-${dateKey}`);
                
                if (storedDailyDishes) {
                    setDishesToDisplay(JSON.parse(storedDailyDishes));
                } else {
                    const fetchDailyDishes = async () => {
                        const dishes = [];
                        while (dishes.length < 5) {
                            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                            const data = await response.json();
                            const newDish = data.meals[0];

                            if (!mondayDishes.find(d => d.idMeal === newDish.idMeal) && !dishes.find(d => d.idMeal === newDish.idMeal)) {
                                dishes.push(newDish);
                            }
                        }
                        setDishesToDisplay(dishes);
                        localStorage.setItem(`dailyDishes-${dateKey}`, JSON.stringify(dishes));
                    };
                    fetchDailyDishes();
                }
            }
        }
    }, [mondayDishes, today, dateKey]);

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
        <div className='justify-center w-7/8 p-10 mx-auto'>
            <h1 className='text-3xl text-center mb-6 font-bold'>
                Today's Tasty Picks <br /> Top 5 recipes of Tuesday!
            </h1>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {dishesToDisplay.map((dish) => (
                    <div key={dish.idMeal} className="recipe-card text-center cursor-pointer" onClick={() => handleDishClick(dish)}>
                        <img src={dish.strMealThumb} alt={dish.strMeal} className='w-full md:w-50 h-50 rounded-lg shadow-lg hover:scale-105 transition' />
                        <h2 className='text-xl font-bold mt-2'>{dish.strMeal}</h2>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedDish && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex items-center justify-center">
                    <div className="bg-red-200 p-6 rounded-lg max-w-2xl w-3/4 h-5/6 shadow-lg relative overflow-y-auto">
                        {/* Title with Close Button */}
                        <div className="relative">
                            <h2 className="text-3xl font-bold mb-4">{selectedDish.strMeal}</h2>
                            <button
                                className="absolute top-0 right-0 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                onClick={() => setSelectedDish(null)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Dish Image */}
                        <img src={selectedDish.strMealThumb} alt={selectedDish.strMeal} className='w-full h-80 rounded-lg mx-auto' />

                        {/* Dish Description (Scrollable) */}
                        <div className="max-h-60 overflow-y-auto mt-4 pr-2">
                            <p>{selectedDish.strInstructions}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DayPicks;
