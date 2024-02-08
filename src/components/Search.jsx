import styled from 'styled-components'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

function Search(){
    const [input, setInput] = useState([]);
    
    return (
        <FormStyle>
            <div>
                <FaSearch/>
                <input type='text'/>
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 2rem 0;
    //display: flex;
    //justify-content: center;

    div{
        width: 100%;
        position: relative;
    }
    
    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1rem;
        padding: 1rem 3rem;
        border-radius: 1rem;
        color: white;
        outline: none;
    }

    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
    `

export default Search;