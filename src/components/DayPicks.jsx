import { useEffect, useState } from 'react';

function DayPicks() {
    const [mondayDishes, setMondayDishes] = useState([]);
    const [dishesToDisplay, setDishesToDisplay] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    const dateKey = new Date().toISOString().split('T')[0]; 

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

    const handleDishClick = (dish) => {
        setSelectedDish(dish);
    };

    return (
        <div className='justify-center w-7/8 p-10 mx-auto'>
            <h1 className='text-3xl text-center mb-6'><b>Today's Tasty Picks <br></br> Top 5 recipes of {daysOfWeek[today]}! </b></h1>

            {/* Recipes Grid */}
            
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {dishesToDisplay.map((dish) => (
            <div key={dish.idMeal} className="recipe-card text-center cursor-pointer" onClick={() => handleDishClick(dish)}>
            <img src={dish.strMealThumb} alt={dish.strMeal} className='w-full md:w-50 h-50 rounded-lg shadow-lg hover:scale-105 transition' />
            <h2 className='text-xl font-bold mt-2'>{dish.strMeal}</h2>
            </div>
        ))}
        </div>


            {/* Detailed Recipe Modal */}
            {selectedDish && (
                <div className="fixed top-10 w-3/4 h-5/6 mx-auto bg-opacity-50 overflow-y-auto">
                    <div className="bg-red-200 p-6 rounded-lg max-w-2xl shadow-lg mx-auto my-auto overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-4">{selectedDish.strMeal}</h2>
                        <img src={selectedDish.strMealThumb} alt={selectedDish.strMeal} className='w-100 h-80 rounded-lg mx-auto' />
                        <p className="mt-4">{selectedDish.strInstructions}</p>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => setSelectedDish(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DayPicks;
