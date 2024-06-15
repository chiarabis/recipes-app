import styled from "styled-components"
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"


function Favorites() {
    const navigate = useNavigate();

    const favoritesClickHandler = (e) => {
        e.preventDefault();
        navigate('/favorites/')
    }

    return (
        <ListIcon onClick={favoritesClickHandler}>
            <FaHeart/>
        </ListIcon>
    )
}

const ListIcon = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 2rem;

    svg{
      font-size: 2rem;
      color: #313131;
    }
    svg:active{
      transform: scale(1.2);
    }
    svg:hover{
        color: #f27121;
    }

    @media (max-width: 700px){ //480
        margin: 0;
    }
`

export default Favorites;