import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container, createTheme } from "@mui/material";
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../features/about/AboutPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import ContactPage from "../features/contact/ContactPage";
import HomePage from "../features/home/HomePage";
import Header from "./Header";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? '#131313' : '#eaeaea',
      }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#444444' : 'white'
          }
        }
      }
    }
  })

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Header
        darkMode={darkMode}
        setDarkMode={handleDarkMode}
      />
      <Container>
        <Route exact path='/'  component={HomePage}   />
        <Route exact path='/catalog'  component={Catalog}   />
        <Route path='/catalog/:id'  component={ProductDetails}   />
        <Route path='/about'  component={AboutPage}   />
        <Route path='/contact'  component={ContactPage}   />
      </Container> 
    </ThemeProvider>
  );
}

export default App;
