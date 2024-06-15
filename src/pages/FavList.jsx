import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TbTrash } from "react-icons/tb"
import './list.css'

function FavList() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteRecipes(storedFavorites);
  }, []);

  const handleRemoveFav = (recipe) => {
    const updatesFavs = favoriteRecipes.filter(name => name != recipe)
    setFavoriteRecipes(updatesFavs)
    localStorage.setItem('favorites', JSON.stringify(updatesFavs))
    console.log('Trash bin icon clicked')
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="box">
        <h4>Favorite recipes</h4>
        {favoriteRecipes.length === 0 ? (
            <p>No favs here - yet!</p>
          ) : (
            <table className="favlist">
              <tbody>
                {favoriteRecipes.map(recipe => (
                  <tr key={recipe.id}>
                    <td><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></td>
                    <TbTrash style={{fontSize: '1rem'}} onClick={() => handleRemoveFav(recipe)}/>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

export default FavList;
