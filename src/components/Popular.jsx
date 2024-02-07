import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
//import { data } from '../data'

function Popular(){
    /*const [data, setData] = useState([])

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const response = await fetch('https://api.spoonacular.com/recipes/random?apiKey=328dabcd7af647cca3432a1aa982eccf&number=9')
                if(!response.ok){
                    throw new Error(`Error! Status: ${response.status}`)
                }

                const jsonData = await response.json()
                setData(jsonData.recipes);

                console.log(jsonData.recipes)
            } catch(error) {
                console.error('Error during API request', error.message)
            }
        };

        fetchData();
    }, [])*/



    const [popular, setPopular] = useState([]);

    useEffect(()=> {
        getPopular()
    }, []);

    const getPopular = async() => {
        const check = localStorage.getItem('popular');
        if(check){
            setPopular(JSON.parse(check));
        }else{
            const api = await fetch('https://api.spoonacular.com/recipes/random?apiKey=328dabcd7af647cca3432a1aa982eccf&number=10');
            const data = await api.json();
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data.recipes)
        }
    }
    

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
                    {popular.map(( {title, id, image} ) => {
                        return (
                            <SplideSlide key={id}>
                                <Card>
                                    <p>{title}</p>
                                    <img src={image} alt={title}/>
                                    <Gradient/>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                    {/*{data.map((item) => {
                        return (
                            <SplideSlide key={item.id}>
                                <Card>
                                    <p>{item.title}</p>
                                    <img src={item.image} alt={item.title}/>
                                    <Gradient/>
                                </Card>
                            </SplideSlide>
                        )
                    })}*/}
                </Splide>

            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 1rem;
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