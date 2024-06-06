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
                <FaSearch onClick={submitHandler}/>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    width: auto;

    @media (max-width: 1268px) {
        margin: 2rem 0;
    }
    @media (max-width: 480px) {
        width: 100%;

    }

    div{
        width: 100%;
        position: relative;
    }
    
    input{
        border: none;
        background-color: #313131;
        font-size: 1.3rem;
        padding: 1rem 2rem;
        padding-left: 4.3rem;
        border-radius: 1rem;
        color: white;
        outline: none;
        width: 100%;
    }

    svg{
        position: absolute;
        top: 30%; //50
        left: 5%; //0
        //transform: translate(100%, -50%);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    svg:active{
        transform: scale(1.2);
    }
    svg:hover{
        color: #f27121;
        //transform: scale(1.2)
    }
    `

export default Search;