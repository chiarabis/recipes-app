/* eslint-disable react/prop-types */
import { MdKebabDining } from 'react-icons/md'
import { BiSushi, BiCheese, BiSolidBowlRice} from 'react-icons/bi'
import { PiFlowerLotus, PiPepperFill, PiPizza, PiHamburger } from 'react-icons/pi'
import { GiNoodles, GiTacos, GiDumplingBao, GiOlive, GiBaobab, GiTeapot, GiMatryoshkaDolls, GiSausage, GiBullHorns, GiSalmon, GiPalmTree } from 'react-icons/gi'
import { TbJewishStar } from "react-icons/tb";
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from "react"


function Category( {closeDropdown} ){
    const [showCategories, setShowCategories] = useState(false)
    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowCategories(true);
        setShowBanner(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);



    const [isMealTypeOpen, setIsMealTypeOpen] = useState();
    const [isCuisineOpen, setIsCuisineOpen] = useState();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 967);

    const toggleMealType = () => {
        setIsMealTypeOpen(!isMealTypeOpen);
    };
    const toggleCuisine = () => {
        setIsCuisineOpen(!isCuisineOpen);
    };
    
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 967);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if(window.innerWidth <= 967){
            setIsMealTypeOpen(false)
            setIsCuisineOpen(false)
        } else {
            setIsMealTypeOpen(true)
            setIsCuisineOpen(true)
        }
    }, [isLargeScreen])

    

    return (
        <>
        <Dropdown>
            <MealType>
                <MenuContainer onClick={isLargeScreen ? null : toggleMealType}>
                    <h4>By meal type</h4>
                    {isLargeScreen ? (
                        <>
                            <SlArrowUp style={{ display: 'none' }} />
                            <SlArrowDown style={{ display: 'none' }} />
                        </>
                    ) : (
                        isMealTypeOpen ? <SlArrowUp/> : <SlArrowDown/>
                    )}
                </MenuContainer>
            
                {isMealTypeOpen && (
                <ul>
                    <li>
                        <CatLink to={'/type/maincourse'} onClick={closeDropdown}>
                            <h4>Main course</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/appetizer'} onClick={closeDropdown}>
                            <h4>Appetizer</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/sidedish'} onClick={closeDropdown}>
                            <h4>Side dish</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/salad'} onClick={closeDropdown}>
                            <h4>Salad</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/breakfast'} onClick={closeDropdown}>
                            <h4>Breakfast</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/snack'} onClick={closeDropdown}>
                            <h4>Snack</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/soup'} onClick={closeDropdown}>
                            <h4>Soup</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/sauce'} onClick={closeDropdown}>
                            <h4>Sauce</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/dessert'} onClick={closeDropdown}>
                            <h4>Dessert</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/type/drink'} onClick={closeDropdown}>
                            <h4>Drink</h4>
                        </CatLink>
                    </li>
                </ul>
                )}
            </MealType>

            <Divider/>

            <Cuisine>
                <MenuContainer onClick={isLargeScreen ? null : toggleCuisine}>
                    <h4>By cuisine</h4>
                    {isLargeScreen ? (
                        <>
                            <SlArrowUp style={{ display: 'none' }} />
                            <SlArrowDown style={{ display: 'none' }} />
                        </>
                        ) : (
                            isCuisineOpen ? <SlArrowUp/> : <SlArrowDown/>
                    )}
                </MenuContainer>
                
                {isCuisineOpen && (
                <ul>
                    <li>
                        <CatLink to={'/cuisine/Italian'} onClick={closeDropdown}>
                            <PiPizza/><h4>Italian</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/British'} onClick={closeDropdown}>
                            <GiTeapot/><h4>British</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/American'} onClick={closeDropdown}>
                            <PiHamburger/><h4>North American</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Thai'} onClick={closeDropdown}>
                            <GiNoodles/><h4>Thai</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Korean'} onClick={closeDropdown}>
                            <BiSolidBowlRice/><h4>Korean</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Japanese'} onClick={closeDropdown}>
                            <BiSushi/><h4>Japanese</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Mexican'} onClick={closeDropdown}>
                            <GiTacos/><h4>Mexican</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Chinese'} onClick={closeDropdown}>
                            <GiDumplingBao/><h4>Chinese</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/French'} onClick={closeDropdown}>
                            <BiCheese/><h4>French</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/African'} onClick={closeDropdown}>
                            <GiBaobab/><h4>African</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Nordic'} onClick={closeDropdown}>
                            <GiSalmon/><h4>Nordic</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Middle Eastern'} onClick={closeDropdown}>
                            <GiOlive/><h4>Middle Eastern</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Indian'} onClick={closeDropdown}>
                            <PiFlowerLotus/><h4>Indian</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Latin American'} onClick={closeDropdown}>
                            <PiPepperFill/><h4>Latin American</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Eastern European'} onClick={closeDropdown}>
                            <GiMatryoshkaDolls/><h4>Eastern European</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/German'} onClick={closeDropdown}>
                            <GiSausage/><h4>German</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Spanish'} onClick={closeDropdown}>
                            <GiBullHorns/><h4>Spanish</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Caribbean'} onClick={closeDropdown}>
                            <GiPalmTree/><h4>Caribbean</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Greek'} onClick={closeDropdown}>
                            <MdKebabDining/><h4>Greek</h4>
                        </CatLink>
                    </li>
                    <li>
                        <CatLink to={'/cuisine/Jewish'} onClick={closeDropdown}>
                            <TbJewishStar/><h4>Jewish</h4>
                        </CatLink>
                    </li>
                </ul>
                )}
            </Cuisine>
        </Dropdown>
        </>
    )
}


const Dropdown = styled.div`
    position: absolute;
    right: 0;
    top: 150%;
    z-index: 1;
    background-color: #fff;
    border-radius: 2rem;
    border: 3px solid #f27121;
    box-shadow: 0px 8px 10px 5px #f27121;
    //width: fit-content;
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);


    ul {
        list-style: none;
        padding: 0;
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 3rem;
        grid-row-gap: 0.5rem;
        width: 100%;
    }

    li {
        padding: 10px 0;
        width: max-content;
        cursor: pointer;
    }

    &:after, &:before {
        border: solid transparent;
        content: " ";
        display: block;
        height: 0;
        position: absolute;
        pointer-events: none;
        width: 0;
        bottom: 100%;
    }
    &:after {
        border-color: rgba(255, 255, 255, 0);
        border-bottom-color: #fff;
        left: 94%;
        margin-left: -10px;
        border-width: 10px;
    }
    &:before {
        border-color: rgba(255, 255, 255, 0);
        border-bottom-color: #f27121;
        left: 94%;
        margin-left: -14px;
        border-width: 14px;
    }

    @media (max-width: 1268px){
        right: -200%;

        &:after {
            left: 65% !important;
        }
        &:before {
            left: 65% !important;
        }
    }
    @media (max-width: 967px) {
        grid-template-columns: repeat(1, 1fr);
        right: 0%;
        width: 535px;

        &:after {
            left: 90% !important;
        }
        &:before {
            left: 90% !important;
        }
    }
    @media (max-width: 700px){
        left: -220%;

        &:after{
            left: 50% !important;
        }
        &:before{
            left: 50% !important;
        }
    }

    @media (max-width: 580px) {
        left: -100%;
        width: 300px;
        
        ul {
            grid-template-columns: repeat(1, 1fr);
        }
    }
`
const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    //cursor: pointer;
    color: #313131;
    
    svg{
        font-size: 1.1rem;
        margin-left: 0.5rem;
        text-align: center;
    }

    @media (max-width: 967px){
        cursor: pointer;

        &:active{
            color: #f27121;
        }
        &:hover{
            color: #f27121;
        }
    }
`

const MealType = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    
    h4{font-size: 1.3rem;}

    @media (max-width: 580px) {
        width: max-content;
    }
`

const Cuisine = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;

    h4{font-size: 1.3rem;}

    @media (max-width: 580px) {
        width: max-content;
    }
`

const Divider = styled.div`
    border-right: 1px solid #31313160;
    height: 95%;
    width: 0;
    align-self: center;

    @media (max-width: 967px){
        height: 0;
        width: 95%;
        justify-self: center;
        border-bottom: 1px solid #313131;
    }
`

const CatLink = styled(NavLink)`
    align-items: center;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    font-size: 1.5rem;
    color: #313131;
   
    h4{
        font-size: 1.3rem;
    }
    svg{
        margin-right: 0.5rem;
    }
    &:hover{
        color: #f27121;
        transform: scale(1.1);

        h4{color: #f27121}
    }

`
/*const Banner = styled.div`
    opacity: ${props => props.show ? '1' : '0'};
    transition: opacity 3s ease-in-out;
    position: absolute;
    top: -25%;

    background: linear-gradient(to right, #f27121, #e94057);
    border-radius: 1rem;
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
    align-items:center;
    justify-content: center;
    margin: 2rem 0;
    height:200px;
    width: 100%;

    h1{
        color: #313131;
        text-align: center;
        margin-bottom: 1rem;
    }

    @media (max-width: 1216px){
        top: 0;
    }
    @media (max-width: 855px){
        top: 15%;
    }
`
const List = styled.div`
    opacity: ${props => props.show ? '1' : '0'};
    transition: opacity 3s ease;

    display: flex;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
`
const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    border-radius: 50%;
    //margin-right: 2rem;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4{
        color: white;
        font-size: 0.8rem;
        text-align: center;
        margin-top: 0.5rem;
    }
    
    svg{
        color: white;
        font-size: 1.5rem;
    }
    &.active{
        background: linear-gradient(to right, #f27121, #e94057);

        svg{
            color: white;
        }
        h4{
            color: white;
        }
    }
`*/

export default Category;