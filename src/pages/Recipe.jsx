import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CiSquarePlus } from "react-icons/ci";

function Recipe( {addToList} ) {
    let params = useParams();
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')
    const fetchDetails = async() => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=328dabcd7af647cca3432a1aa982eccf`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData)
    }

    useEffect(()=> {
        fetchDetails()
    }, [params.name])

    const addIngredient = (ingredient) => {
        console.log('aggiungi ingrediente:', ingredient.name);
        addToList(ingredient.name);
    }

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title}></img>
            </div>
            <Info>
                <Button
                className={activeTab === 'instructions' ? 'active' : ''}
                onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button
                className={activeTab === 'ingredients' ? 'active' : ''}
                onClick={() => setActiveTab('ingredients')}>Ingredients</Button>

                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                        <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => {
                            return <li key={ingredient.id}>
                                {ingredient.original}
                                <AddButton onClick={() => addIngredient(ingredient)}>
                                    <CiSquarePlus/>
                                </AddButton>
                            </li>
                        })}
                    </ul>  
                )}              
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 6rem;
    margin-bottom: 5rem;
    display: flex;
    flex-direction: row;

    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    margin-top: 1rem;
    font-weight: 600;
`
const AddButton = styled.button`
    font-size: 1.5rem;
    background: transparent;
    border: none;
    color: #313131;
    cursor: pointer;
    margin-left: 1rem;
    translate: 0 0.3rem;

    :hover{
        color: #f27121;
    }
    svg:active{
        transform: scale(0.8);
    }
`

const Info = styled.div`
    margin-left: 10rem;

    h3{
        font-size: 1rem;
    }
`

export default Recipe;