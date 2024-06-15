import { useIngredientContext } from "../contexts/IngredientContext";
import './list.css'
import { TbTrash } from "react-icons/tb";

function GroceryList() {
  const { selectedIngredients, setSelectedIngredients } = useIngredientContext();

  const handleDelete = (ingredientName) => {
    const updatedIngredients = selectedIngredients.filter(name => name !== ingredientName);
    setSelectedIngredients(updatedIngredients);
    localStorage.setItem('selectedIngredients', JSON.stringify(updatedIngredients));
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    localStorage.removeItem('selectedIngredients');
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="box">
        <h4>Grocery list</h4>
        {selectedIngredients.length === 0 ? (
          <p>Your grocery list is empty</p>
        ) : (
        <table className="grocerylist">
          <tbody>
            {selectedIngredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient}</td>
                <TbTrash style={{fontSize: '1rem'}} onClick={() => handleDelete(ingredient)}/>
              </tr>
            ))}
          </tbody>
        </table>
        )}

        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default GroceryList;