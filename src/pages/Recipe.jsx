import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CiSquarePlus } from "react-icons/ci";
import { MdPeople } from "react-icons/md"
import { FaHeart, FaShareAlt, FaRegClock } from "react-icons/fa";
import { useIngredientContext } from '../contexts/IngredientContext';
import Loader from '../components/Loader';
import { TbMilkOff, TbFish, TbCarrot, TbMeat, TbHexagonLetterW } from 'react-icons/tb';
import { LuVegan, LuWheatOff } from 'react-icons/lu';
import { GiStomach } from 'react-icons/gi';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating'
import './recipe.css'

function Recipe() {
    const apiKey = import.meta.env.VITE_SOME_KEY;
    let params = useParams();
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')
    const [showPopupFav, setShowPopupFav] = useState(false)
    const [showPopupShare, setShowPopupShare] = useState(false)
    const [showPopupDiet, setShowPopupDiet] = useState(false)
    const [dietMessage, setDietMessage] = useState('');
    const [loading, setLoading] = useState(true)
    


    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
    }, []);


    const fetchDetails = async() => {
        try{
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);
            if (!data.ok){
                throw new Error('Errore durante il recupero dei dati');
            }
            const detailData = await data.json();
            setDetails(detailData);
            console.log(detailData, detailData.spoonacularScore)
        } catch(error) {
            console.error('Si è verificato un errore durante il recupero dei dati:', error);
        }
    }
    
    useEffect(()=> {
        fetchDetails(params.name, apiKey)
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
    

    //manipolazione dei tag html e links della ricetta
    const parseHTML = (htmlString) => {
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(htmlString, 'text/html'); 
        return parsedDocument.body;
    };
    const containsTagList = (htmlString) => {
        const body = parseHTML(htmlString);
        return body.querySelectorAll('ul, ol, li').length > 0;
    };
    const renderLinks = (htmlString) => {
        const parsedBody = parseHTML(htmlString);
        const links = parsedBody.querySelectorAll('a');
        const renderedLinks = Array.from(links).map((link, index) => (
          <a key={index} href={link.getAttribute('href')}>
            {link.textContent}
          </a>
        ));
        return renderedLinks;
    };

    //diet icon mapping
    /*const dietIconMapping = {
        vegan: { icon: <LuVegan style={{color: '#1da834', fontSize: '1.5rem'}} />, key: 'vegan', message: 'Vegan' },
        dairyFree: { icon: <TbMilkOff style={{color: '#deca64', fontSize: '1.5rem'}} />, key: 'dairyFree', message: 'Dairy free' },
        paleo: { icon: <TbMeat style={{color: '#bd2a2a', fontSize: '1.5rem'}} />, key: 'paleo', message: 'Paleo'},
        vegetarian: { icon: <TbCarrot style={{color: '#f77534', fontSize: '1.5rem'}} />, key: 'vegetarian', message: 'Vegetarian' },
        glutenFree: { icon: <LuWheatOff style={{color: '#c9861a', fontSize: '1.5rem'}} />, key: 'glutenFree', message: 'Gluten free' },
        pescatarian: { icon: <TbFish style={{color: '#1f57db', fontSize: '1.5rem'}} />, key: 'pescatarian', message: 'Pescatarian' },
        lowFodmap: { icon: <GiStomach style={{color: '#5c3b31', fontSize: '1.5rem'}} />, key: 'lowFodmap', message: 'Low FODMAP' }
    };*/
    const dietIconMapping = {
        'vegan': {icon: <LuVegan style={{color: '#1da834', fontSize: '1.5rem'}} />, message: 'Vegan'},
        'dairy free': {icon: <TbMilkOff style={{color: '#deca64', fontSize: '1.5rem'}} />, message: 'Dairy free'},
        'paleo': {icon: <TbMeat style={{color: '#bd2a2a', fontSize: '1.5rem'}} />, message: 'Paleo'},
        'lacto ovo vegetarian': {icon: <TbCarrot style={{color: '#f77534', fontSize: '1.5rem'}} />, message: 'Vegetarian'},
        'gluten free': {icon: <LuWheatOff style={{color: '#c9861a', fontSize: '1.5rem'}} />, message: 'Gluten free'},
        'pescatarian': {icon: <TbFish style={{color: '#77afd1', fontSize: '1.5rem'}} />, message: 'Pescatarian'},
        'fodmap friendly': {icon: <GiStomach style={{color: '#5c3b31', fontSize: '1.5rem'}} />, message: 'Low FODmap'},
        'ketogenic': {icon: <img src="../assets/icons8-avocado.png" style={{width: '1.5rem', height: '1.5rem'}}/>, message: 'Ketogenic'},
        'whole 30': {icon: <TbHexagonLetterW style={{color: '#171554', fontSize: '1.5rem'}}/>, message: 'Whole 30'}
    };

    //rating
    const score = details.spoonacularScore;
    const tooltip = parseFloat((score / 20).toFixed(1));
    
   

    return (
        <>
            {loading ? <Loader/> :
                <DetailWrapper>
                    <div className='image-container'>
                        <div className='title-heading' style={{ justifyContent: details.cuisines && details.cuisines.length > 0 ? 'space-between' : 'center'}}>
                            <h2>{details.title}</h2>

                            <div className='cuisine' style={{ display: details.cuisines && details.cuisines.length > 0 ? 'flex' : 'none' }}>
                                {details.cuisines && details.cuisines.length > 0 ? (
                                    details.cuisines.map((cuisine, index) => (
                                        <p key={index}>{cuisine}</p>
                                    ))
                                ) : null}
                            </div>   
                        </div>
                        <img src={details.image} alt={details.title}></img>
                    
                        <div className='image-icons-wrapper'>
                            <Icon>
                                <FaHeart onClick={toggleFavorite}
                                    color={isFavorite ? '#f27121' : '#313131'}
                                    onMouseEnter={() => setShowPopupFav(true)}
                                    onMouseLeave={() => setShowPopupFav(false)}
                                    />
                                    {showPopupFav && <PopupIcon>{isFavorite ? 'Remove from favorites' : 'Save to favorites'}</PopupIcon>}
                                <FaShareAlt onClick={toggleShare}
                                    onMouseEnter={() => setShowPopupShare(true)}
                                    onMouseLeave={() => setShowPopupShare(false)}
                                    />
                                    {showPopupShare && <PopupIcon>Share this recipe!</PopupIcon>}
                            </Icon>
                            
                            <div className='rating-wrapper'>
                                <Rating
                                    value={score / 20}
                                    readOnly
                                    activeFillColor='#f59e0b'
                                    inactiveFillColor='#ffedd5'
                                    style={{ maxWidth: 120, marginRight: '1rem' }}/>
                                    <RatingValue>{tooltip}</RatingValue>
                            </div>
                        </div>
                    </div>

                    <Info>
                        <div className='info-heading'>
                            <ButtonContainer>
                                <Button
                                className={activeTab === 'instructions' ? 'active' : ''}
                                onClick={() => setActiveTab('instructions')}>Instructions</Button>
                                <Button
                                className={activeTab === 'ingredients' ? 'active' : ''}
                                onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                            </ButtonContainer>

                            <div className='diet-icons'>
                                {details.diets && details.diets.map((diet, index) => (
                                    dietIconMapping[diet] && (
                                        <div key={index}
                                            onMouseEnter={() => {setShowPopupDiet(true); setDietMessage(dietIconMapping[diet].message);}}
                                            onMouseLeave={() => {setShowPopupDiet(false); setDietMessage('');}}>
                                            {dietIconMapping[diet].icon}
                                        </div>
                                    )
                                ))}
                                {showPopupDiet && <PopupDiet>{dietMessage}</PopupDiet>}
                            </div>
                            {/*<div className='diet-icons'>
                                {Object.keys(dietIconMapping).map(key => (
                                    details[key] && (
                                        <div key={key}
                                            onMouseEnter={() => {setShowPopupDiet(true); setDietMessage(dietIconMapping[key].message);}}
                                            onMouseLeave={() => {setShowPopupDiet(false); setDietMessage('');}}>
                                            {dietIconMapping[key].icon}
                                        </div>
                                    )
                                ))}
                                {showPopupDiet && <PopupDiet>{dietMessage}</PopupDiet>}
                            </div>*/}
                        </div>

                        {activeTab === 'instructions' && (
                            <div className='instructions'>
                                <p>{details.summary ? new DOMParser().parseFromString(details.summary, 'text/html').body.innerText : ''}</p>
                                <p className='recipe-links'>{details && renderLinks(details.summary)}</p>

                                <div className='instruction-details'>
                                    <div><FaRegClock style={{marginRight: '1rem'}}/>Ready in {details.readyInMinutes} min.</div>
                                    <div><MdPeople style={{marginRight: '1rem'}}/>Servings: {details.servings}</div>
                                </div>
                                
                                {details && containsTagList(details.instructions) ? (
                                    <ol style={{ marginLeft: '20px' }}>
                                    {Array.from(parseHTML(details.instructions).querySelectorAll('li')).map((li, index) => (
                                        <li key={index}>{li.textContent}</li>
                                    ))}
                                    </ol>
                                ) : (
                                    <p>{details.instructions}</p>
                                )}
                            </div>
                        )}
                        {activeTab === 'ingredients' && (
                            <div className='ingredients'>
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
                            </div>   
                        )}              
                    </Info>
                </DetailWrapper>
            }
        </>
    )
}

const PopupIcon = styled.div`
  position: absolute;
  bottom: 130%;
  left: 0;
  font-size: 0.8rem;
  background-color: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const PopupDiet = styled.div`
    position: absolute;
    width: max-content;
    bottom: 150%;
    font-size: 0.8rem;
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
    width: fit-content;
    

    .active{
        background: #313131;
        color: white;
    }
    li{
        font-size: 1rem;
        line-height: 2.5rem;
    }

    @media (max-width: 1100px){
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 340px;

    @media (max-width: 480px){
        flex-direction: column;
        justify-content: center;
        width: fit-content;

        button:nth-child(2){
            margin-top:1rem;
        }
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: rgb(255, 255, 255);
    border: 2px solid #313131;
    font-weight: 600;
    cursor:pointer;

    @media (max-width: 1100px){
        margin-right: 0;
    }
`
const IconButton = styled.button`
    font-size: 1.5rem;
    background: transparent;
    border: none;
    color: #313131;
    cursor:pointer;
    margin-left: 1rem;
    translate: 0 0.3rem;

    &:hover{
        color: #f27121;
        transform: scale(1.2)
    }
    svg:active{
        transform: scale(0.8);
    }
`

const Info = styled.div`
    text-align: justify;
    display:flex;
    flex-direction:column;
    margin-left: 5rem;
    width: 100%;

    h3{
        font-size: 1rem;
    }

    @media (max-width: 1100px){
        margin-left: 0;
        margin-top: 2rem;
    }
`

const RatingValue = styled.div`
    background-color: #313131;
    color: rgb(255, 255, 255);
    border-radius: 3px;
    width: fit-content;
    padding: 2px 5px;
    font-weight: 600;
`
export default Recipe;