import { FaPizzaSlice, FaHamburger } from 'react-icons/fa'
import { BiSushi } from 'react-icons/bi'
import { PiFlowerLotus, PiPepperFill } from 'react-icons/pi'
import { GiNoodles, GiTacos, GiDumplingBao, GiHotMeal, GiOlive, GiBaobab } from 'react-icons/gi'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

function Category(){
    return (
        <List>
            <SLink to={'/cuisine/Italian'}>
                <FaPizzaSlice/>
                <h4>Italian</h4>
            </SLink>
            <SLink to={'/cuisine/American'}>
                <FaHamburger/>
                <h4>North American</h4>
            </SLink>
            <SLink to={'/cuisine/Thai'}>
                <GiNoodles/>
                <h4>Thai</h4>
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
                <GiHotMeal/>
                <h4>French</h4>
            </SLink>
            <SLink to={'/cuisine/African'}>
                <GiBaobab/>
                <h4>African</h4>
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
        </List>
    )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
    `;
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
    `;

export default Category;
