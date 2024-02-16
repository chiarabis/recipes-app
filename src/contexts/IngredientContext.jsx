import { createContext, useState, useContext } from 'react';

const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    return (
        <IngredientContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
            {children}
        </IngredientContext.Provider>
    );
};

export const useIngredientContext = () => useContext(IngredientContext);