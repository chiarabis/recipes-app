import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components"

function FavRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteRecipes(storedFavorites);
  }, []);

  const handleRemoveFav = (recipe) => {
    const updatesFavs = favoriteRecipes.filter(name => name != recipe)
    setFavoriteRecipes(updatesFavs)
    localStorage.setItem('favorites', JSON.stringify(updatesFavs))
    console.log('trash bin icon clicked')
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Box>
        <h4>Favorite recipes</h4>
        {favoriteRecipes.length === 0 && (
            <p>No favs here - yet!</p>
          )}
        <div>
        {favoriteRecipes.map(recipe => (
            <p key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            <IconButton onClick={() => handleRemoveFav(recipe)}>
              <FaTrashAlt/>
            </IconButton>
            </p>
        ))}
        </div>
      </Box>
    </div>
  );
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    background: #fce8d7;
    margin-bottom: 3rem;
    padding: 1.2rem;
    border-radius: 1rem;

    h4{
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
    div{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
      grid-column-gap: 3rem;
    }
    a{
      text-decoration: none;
      color: #313131;
    }
    a:hover{
      color: #f27121;
    }
    p{
      margin: 1rem 0;
    }
`

const IconButton = styled.button`
    font-size: 1rem;
    background: transparent;
    border: none;
    color: #313131;
    cursor: pointer;
    margin-left: 1rem;
    translate: 0 0.1rem;

    :hover{
        color: #f27121;
    }
    svg:active{
        transform: scale(0.8);
    }
`

export default FavRecipes;
