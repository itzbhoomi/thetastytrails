// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import DayPicks from "./components/DayPicks";
import Footer from "./components/Footer";
import RecipesPage from "./components/RecipesPage"; // New component
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
      </Routes>
    </Router>
  );
}

export default App;