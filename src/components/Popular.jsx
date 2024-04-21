import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

function Popular(){
    const spoonacularApiKey = import.meta.env.VITE_SOME_KEY;
    const [popular, setPopular] = useState([]);

    const getPopular = async() => {
        const check = localStorage.getItem('popular');
        if(check !== null){
            setPopular(JSON.parse(check))
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${spoonacularApiKey}&number=10`); 
            const data = await api.json();
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }
    }
    
    useEffect(()=> {
        getPopular()
    }, []);


    return (
        <div>
            <Wrapper>
                <h3>Popular picks</h3>

                <Splide options={{
                    perPage: 5,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '3rem',
                }}>
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title}/>
                                        <Gradient/>
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>

            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0;
    `;
const Card = styled.div`
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    margin-top: 0.5rem;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 0.8rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    `;
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7));
    `

/*se l'img fosse contenuta in un div:
const Card = styled.div`
    overflow: hidden;
    
    div{
        width: 100%;
    }

    img{
        border-radius: 1.5rem;
        width: 100%;
        height: auto;
    }

    p{
        margin: 0 0.3rem;
        margin-bottom: 0.8rem;
    }
    `;*/


export default Popular;