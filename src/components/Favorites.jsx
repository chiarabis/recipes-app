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
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin-right: 2rem;

    svg{
      font-size: 2rem;
      color: #313131;
    }
    svg:active{
      transform: scale(1.2);
      color: #f27121;
  }
`

export default Favorites;