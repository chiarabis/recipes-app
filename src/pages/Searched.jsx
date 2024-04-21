import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Searched() {
    const spoonacularApiKey = import.meta.env.VITE_SOME_KEY;
    const [searchedRecipes, setSearchedRecipes] = useState([])
    let params = useParams()

    const getSearched = async(name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${name}`)
        const recipes = await data.json()
        setSearchedRecipes(recipes.results)
    }

    useEffect(()=> {
        getSearched(params.search)
    }, [params.search])

    return (
        <Grid>
            {searchedRecipes.map((recipe) => {
                return (
                    <Card key={recipe.id}>
                        <Link to={'/recipe/' + recipe.id}>
                            <img src={recipe.image} alt={recipe.title}/>
                            <h4>{recipe.title}</h4>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;
    `;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
    `;

export default Searched;