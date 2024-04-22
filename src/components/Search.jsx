import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

function Search(){
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input);
        setInput('')
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch/>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 2rem 0;

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