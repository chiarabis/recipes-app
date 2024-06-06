import styled from "styled-components"
import { motion } from 'framer-motion'
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { useState } from "react";
import Category from "./Category"


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = () => {
        setIsOpen(false);
    };
    
    
    return (
    <>
        <div style={{position: 'relative', width: 'fit-content'}}>
            
            <MenuContainer onClick={toggleMenu}>
                <h2>Menu</h2>
                {isOpen ? <SlArrowUp /> : <SlArrowDown />}
            </MenuContainer>

            {isOpen && (
                <Category closeDropdown={closeDropdown}/>
            )}
        </div>
    </>
  )
}

const MenuContainer =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end; //center
    margin-left: 2rem;
    cursor: pointer;
    color: #313131;
    
    h2 {
        font-size: 1.3rem;
        text-transform: uppercase;
    }
    svg{
        font-size: 1.5rem;
        margin-left: 0.5rem;
        text-align: center;
    }
    &:active{
        color: #f27121;
    }
    &:hover{
        color: #f27121;
    }

    @media (max-width: 700px){
        margin-left: 0;
    }
`
