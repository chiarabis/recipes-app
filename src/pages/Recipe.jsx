import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CiSquarePlus } from "react-icons/ci";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useIngredientContext } from '../contexts/IngredientContext';

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')
    const [showPopupFav, setShowPopupFav] = useState(false)
    const [showPopupShare, setShowPopupShare] = useState(false)

    const fetchDetails = async() => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=328dabcd7af647cca3432a1aa982eccf`);
        const detailData = await data.json();
        setDetails(detailData);
    }
    
    useEffect(()=> {
        fetchDetails()
    }, [params.name])


    //add ingredient to grocery list and saved them
    const { selectedIngredients, setSelectedIngredients } = useIngredientContext();
    
    const handleAdd = (ingredient) => {
        const ingredientName = ingredient.nameClean;
        
        if (!selectedIngredients.includes(ingredientName)) {
            const updateIngredients = [...selectedIngredients, ingredientName];
            setSelectedIngredients(updateIngredients);

            localStorage.setItem('selectedIngredients', JSON.stringify(updateIngredients));
        }
    }
    useEffect(() => {
        const savedIngredients = localStorage.getItem('selectedIngredients');
        if (savedIngredients) {
            setSelectedIngredients(JSON.parse(savedIngredients));
        }
    }, []);


    //favorites recipes
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorited = storedFavorites.some(favorite => favorite.id === details.id);
        setIsFavorite(isFavorited);
    }, [details.id]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorited = storedFavorites.some(favorite => favorite.id === details.id);

        if (isFavorited) {
            const updatedFavorites = storedFavorites.filter(favorite => favorite.id !== details.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            const updatedFavorites = [...storedFavorites, { id: details.id, title: details.title }];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        }
    }

    
    //share recipes
    const toggleShare = async () => {
        try {
          await navigator.share({
            title: details.title,
            text: details.title,
            url: window.location.href
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
    };



    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title}></img>

                <Icon>
                    <FaHeart onClick={toggleFavorite}
                        color={isFavorite ? '#f27121' : '#313131'}
                        onMouseEnter={() => setShowPopupFav(true)}
                        onMouseLeave={() => setShowPopupFav(false)}/>
                        {showPopupFav && <Popup>{isFavorite ? 'Remove from favorites' : 'Save to favorites'}</Popup>}
                    <FaShareAlt onClick={toggleShare}
                        onMouseEnter={() => setShowPopupShare(true)}
                        onMouseLeave={() => setShowPopupShare(false)}/>
                        {showPopupShare && <Popup>Share this recipe!</Popup>}
                </Icon>
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
                                <IconButton onClick={() => handleAdd(ingredient)}>
                                    <CiSquarePlus/>
                                </IconButton>
                            </li> 
                        })}
                    </ul>  
                )}              
            </Info>
        </DetailWrapper>
    )
}

const Popup = styled.div`
  position: absolute;
  bottom: 130%;
  left: 0;
  font-size: 0.6rem;
  background-color: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Icon = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin: 2rem 0;
    position: relative;

    svg{
      font-size: 1.5rem;
      color: #313131;
      margin-right: 1rem;
    }
    svg:active{
      transform: scale(1.2);
      color: #f27121;
    }
`
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
const IconButton = styled.button`
    font-size: 1.5rem;
    background: transparent;
    border: none;
    color: #313131;
    cursor: pointer;
    margin-left: 1rem;
    translate: 0 0.3rem;

    &:hover{
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
