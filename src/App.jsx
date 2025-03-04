// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import DayPicks from "./components/DayPicks";
import Footer from "./components/Footer";
import RecipesPage from "./components/RecipesPage"; // New component
import CookingTipsPage from "./components/CookingTipsPage";
import TotoAI from "./components/TotoAI";
import "./fonts.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <TopNav />
              <Hero />
              <DayPicks />
              <Footer />
            </>
          }
        />
        {/* Recipes Route */}
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/cooking-tips" element={<CookingTipsPage/>}/>
        <Route path="/TotoAI" element={<TotoAI/>}/>
      </Routes>
    </Router>
  );
}

export default App;