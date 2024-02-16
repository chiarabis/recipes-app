import Pages from "./pages/Pages"
import Category from "./components/Category"
import Search from "./components/Search"
import List from "./components/List"
import Favorites from "./components/Favorites"
import { BrowserRouter } from "react-router-dom"
import styled from "styled-components"
import { GiKnifeFork } from "react-icons/gi"
import { Link } from "react-router-dom"
import { IngredientProvider } from "./contexts/IngredientContext"


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <IngredientProvider>

          <Nav>
            <Logo>
              <GiKnifeFork/>
              <AppName to={'/'}>Deli App</AppName>
            </Logo>

            <Box>
              <Favorites/>
              <List/>
              <Search/>
            </Box>
          </Nav>

          <Category/>
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
    margin: 3rem;
`

const Logo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  
    svg{
      font-size: 2rem;
      color: #f27121;
    }
`

const Box = styled.div`
  display: flex;
  align-items: center;
`

const AppName = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: 'Delius Unicase', cursive;
    margin: 0 1rem;
    background: -webkit-linear-gradient(30deg, #f27121, #e94057);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export default App;