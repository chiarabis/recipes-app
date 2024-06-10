import Home from "./Home"
import Cuisine from "./Cuisine"
import MealType from "./MealType"
import Searched from "./Searched"
import Recipe from "./Recipe"
import GroceryList from "./GroceryList"
import FavRecipes from "./FavRecipes"
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

function Pages(){
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}/>
                <Route path="/cuisine/:type" element={<Cuisine/>}/>
                <Route path="/type/:type" element={<MealType/>}/>
                <Route path="/searched/:search" element={<Searched/>}/>
                <Route path="/recipe/:name" element={<Recipe/>}/>
                <Route path="/list/" element={<GroceryList/>}/>
                <Route path="/favorites/" element={<FavRecipes/>}/>
            </Routes>
        </AnimatePresence>
    )
}
export default Pages;