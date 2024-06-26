import styled from "styled-components"
import { LuPenSquare } from "react-icons/lu"
import { useNavigate } from "react-router-dom"


function List() {
  const navigate = useNavigate();

  const listClickHandler = (e) => {
    e.preventDefault();
    navigate('/list/')
}

  return (
    <ListIcon onClick={listClickHandler}>
        <LuPenSquare/>
    </ListIcon>
  )
}

const ListIcon = styled.div`
    display: flex;
    //flex-wrap: wrap;
    //justify-content: flex-start;
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

    @media (max-width: 700px){
      margin: 0;
    }
`
export default List;