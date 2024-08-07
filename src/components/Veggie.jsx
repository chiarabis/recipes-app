import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

function Veggie(){
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const [veggie, setVeggie] = useState([]);

    const getVeggie = async(apiKey) => {
        const check = localStorage.getItem('veggie');
        if(check && check !== '[]'){
            try{
                const parsedData = JSON.parse(check)
                setVeggie(parsedData);
            } catch(error) {
                console.error('Failed to parse local storage data:', error);
                fetchVeggie(apiKey);
            }
        }else {
            fetchVeggie(apiKey);
        }
    };

    const fetchVeggie = async(apiKey) => {
        try {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes);
        } catch (error) {
            console.error('Failed to fetch veggie data:', error);
        }
    };

    useEffect(()=> {
        getVeggie(apiKey)
    }, []);


    return (
        <div>
            <Wrapper>
                <h3>Vegetarian picks</h3>

                <Splide options={{
                    perPage: 5,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '2rem',
                    breakpoints: {
                        1058: {
                            perPage: 4,
                            gap: '1.5rem'
                        },
                        780: {
                            perPage: 3,
                            gap: '1.5rem'
                        },
                        640: {
                            perPage: 2,
                            gap: '1rem'
                        },
                        480: {
                            perPage: 1,
                            gap: '1rem'
                        },
                    }
                }}>
                    {veggie.map((recipe) => {
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

    h3{
        font-size: 1.3rem;
    }

    @media (max-width: 1024px){
        h3{
            font-size: 1.5rem;
        }
    }
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
        width: 80%;
        text-align: center;
        font-weight: 600;
        font-size: 0.8rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 768px){
        p {
            font-size: 1.1rem;
        }
    }
`;
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7));
`

export default Veggie;
