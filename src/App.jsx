import Pages from "./pages/Pages"
import Search from "./components/Search"
import List from "./components/List"
import Menu from "./components/Menu"
import Favorites from "./components/Favorites"
import { BrowserRouter } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { IngredientProvider } from "./contexts/IngredientContext"



function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
        <IngredientProvider>

          <Nav>
            <Logo>
              <AppName to={'/'}>Foodelicious</AppName>
              <span>Your favourite app to try new delicious recipes!</span>
            </Logo>

            <Box>
              <IconGroup>
                <Favorites/>
                <List/>
              </IconGroup>

              <Search/>
              <Menu/>
            </Box>
          </Nav>

          <Pages/>
        
        </IngredientProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

const Nav = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 3rem;

    @media (max-width: 768px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
`

const AppName = styled(Link)`
    text-decoration: none;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Pacifico', cursive;
    margin: 0;
    background:
    -webkit-linear-gradient(30deg, #f27121, #e94057);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    animation: jello 3s ease-in 0s 3 normal forwards;   
    
    @keyframes jello {
      0% {
        transform: scale3d(1, 1, 1);
      }
      30% {
        transform: scale3d(1.25, 0.75, 1);
      }
      40% {
        transform: scale3d(0.75, 1.25, 1);
      }
      50% {
        transform: scale3d(1.15, 0.85, 1);
      }
      65% {
        transform: scale3d(0.95, 1.05, 1);
      }
      75% {
        transform: scale3d(1.05, 0.95, 1);
      }  
      100% {
        transform: scale3d(1, 1, 1);
      }
    }
`

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 2rem;
    width: fit-content;

    span{
      text-align:center;
      margin-top: 0.5rem;
      font-weight: 600;
      font-size: 1.3rem;
      background: -webkit-linear-gradient(30deg, #f27121, #e94057);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media (max-width: 768px){
      justify-content: center;
      align-items:center;
      margin-bottom: 1rem;
      margin-right: 0;
    }
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const IconGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;

    @media (max-width: 700px) {
      margin-top: 2rem;
      justify-content: space-evenly;
      width: 50%;
    }
`

export default App;