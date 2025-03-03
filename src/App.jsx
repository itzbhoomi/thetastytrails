import TopNav from "./components/TopNav"
import Hero from "./components/Hero";
import Category from "./components/CategoryBar";
import Footer from "./components/Footer"
import "./fonts.css";
import DayPicks from "./components/DayPicks";

function App(){
  return(
    <>
    <TopNav/>
    <Hero/>
    <DayPicks/>
    <Footer/>
    </>
  )
}

export default App