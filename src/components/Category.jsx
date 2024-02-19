import { MdKebabDining } from 'react-icons/md'
import { BiSushi, BiCheese, BiSolidBowlRice} from 'react-icons/bi'
import { PiFlowerLotus, PiPepperFill, PiPizza, PiHamburger } from 'react-icons/pi'
import { GiNoodles, GiTacos, GiDumplingBao, GiOlive, GiBaobab, GiTeapot, GiMatryoshkaDolls, GiSausage, GiBullHorns, GiSalmon, GiPalmTree } from 'react-icons/gi'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from "react"

function Category(){
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

    return (
        <Wrapper>
        <Banner show={showBanner}>
            <h1>Any ideas what to cook today?</h1>
            <span>Discover flavors and colors from all over the 🌎</span>
        </Banner>

        <List show={showCategories}>
            <SLink to={'/cuisine/Italian'}>
                <PiPizza/>
                <h4>Italian</h4>
            </SLink>
            <SLink to={'/cuisine/British'}>
                <GiTeapot/>
                <h4>British</h4>
            </SLink>
            <SLink to={'/cuisine/American'}>
                <PiHamburger/>
                <h4>North American</h4>
            </SLink>
            <SLink to={'/cuisine/Thai'}>
                <GiNoodles/>
                <h4>Thai</h4>
            </SLink>
            <SLink to={'/cuisine/Korean'}>
                <BiSolidBowlRice/>
                <h4>Korean</h4>
            </SLink>
            <SLink to={'/cuisine/Japanese'}>
                <BiSushi/>
                <h4>Japanese</h4>
            </SLink>
            <SLink to={'/cuisine/Mexican'}>
                <GiTacos/>
                <h4>Mexican</h4>
            </SLink>
            <SLink to={'/cuisine/Chinese'}>
                <GiDumplingBao/>
                <h4>Chinese</h4>
            </SLink>
            <SLink to={'/cuisine/French'}>
                <BiCheese/>
                <h4>French</h4>
            </SLink>
            <SLink to={'/cuisine/African'}>
                <GiBaobab/>
                <h4>African</h4>
            </SLink>
            <SLink to={'/cuisine/Nordic'}>
                <GiSalmon/>
                <h4>Nordic</h4>
            </SLink>
            <SLink to={'/cuisine/Middle Eastern'}>
                <GiOlive/>
                <h4>Middle Eastern</h4>
            </SLink>
            <SLink to={'/cuisine/Indian'}>
                <PiFlowerLotus/>
                <h4>Indian</h4>
            </SLink>
            <SLink to={'/cuisine/Latin American'}>
                <PiPepperFill/>
                <h4>Latin American</h4>
            </SLink>
            <SLink to={'/cuisine/Eastern European'}>
                <GiMatryoshkaDolls/>
                <h4>Eastern European</h4>
            </SLink>
            <SLink to={'/cuisine/German'}>
                <GiSausage/>
                <h4>German</h4>
            </SLink>
            <SLink to={'/cuisine/Spanish'}>
                <GiBullHorns/>
                <h4>Spanish</h4>
            </SLink>
            <SLink to={'/cuisine/Caribbean'}>
                <GiPalmTree/>
                <h4>Caribbean</h4>
            </SLink>
            <SLink to={'/cuisine/Greek'}>
                <MdKebabDining/>
                <h4>Greek</h4>
            </SLink>
        </List>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    width: 100%;
    position: relative;
`
const Banner = styled.div`
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
`

export default Category;
