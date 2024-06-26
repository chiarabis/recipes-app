import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Cuisine(){
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const [cuisine, setCuisine] = useState([])
    let params = useParams()
    
    const getCuisine = async(name) => {
        try{
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`)
            if (!data.ok){
                throw new Error('Errore durante il recupero dei dati');
            }
            const recipes = await data.json()
            setCuisine(recipes.results)
        } catch(error){
            console.error('Si è verificato un errore durante il recupero dei dati:', error);
        }     
    }

    useEffect(()=> {
        getCuisine(params.type, apiKey)
    }, [params.type])

    
    return (
        <Grid
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            >
            {cuisine.map((recipe) => {
                return (
                    <Card key={recipe.id}>
                        <Link to={"/recipe/" + recipe.id}>
                            <img src={recipe.image} alt={recipe.title}/>
                            <h4>{recipe.title}</h4>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled(motion.div)`
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

export default Cuisine;