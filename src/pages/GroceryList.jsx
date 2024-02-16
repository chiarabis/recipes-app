import { useIngredientContext } from "../contexts/IngredientContext";
import styled from "styled-components";

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
      <Box>
        <h4>Grocery list</h4>
        {selectedIngredients.length === 0 && (
          <p>Your grocery list is empty</p>
        )}
        <ul>
            {selectedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}
                <DeleteButton onClick={() => handleDelete(ingredient)}>Delete</DeleteButton>
                </li>
            ))}
        </ul>
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </div>
  )
}

const Button = styled.button`
    padding: 0.5rem;
    color: #313131;
    background: #f06969;
    border: 2px solid red;
    font-weight: 600;
    cursor:pointer;
    max-width: 50%;
    margin-top: 1.5rem;

    &:hover{
      background: red;
      color: white;
    }
    &:active{
      transform: scale(0.8);
    }
`

const DeleteButton = styled.button`
    font-size: 0.8rem;
    background: transparent;
    border: 1px solid #313131;
    color: #313131;
    cursor: pointer;
    margin-left: 1rem;
    padding: 0.3rem 0.5rem;

    &:hover{
        background: white;
    }
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    background: pink;
    margin-bottom: 3rem;
    padding: 1.2rem;
    border-radius: 1rem;

    h4{
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
    ul{
      text-transform: capitalize;
    }
    li{
      display:flex;
      align-items: center;
      justify-content: space-between;
      margin: 0.5rem 0;
    }
`

export default GroceryList;
