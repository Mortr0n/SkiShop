import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container, createTheme } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "../app/errors/NotFound";
import ServerError from "../app/errors/ServerError";
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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline />
      <Header
        darkMode={darkMode}
        setDarkMode={handleDarkMode}
      />
      <Container>
        <Switch>
          <Route exact path='/'  component={HomePage}   />
          <Route exact path='/catalog'  component={Catalog}   />
          <Route path='/catalog/:id'  component={ProductDetails}   />
          <Route path='/about'  component={AboutPage}   />
          <Route path='/contact'  component={ContactPage}   />
          <Route path='/server-error'  component={ServerError}   />
          <Route component={NotFound} />
        </Switch>
        
      </Container> 
    </ThemeProvider>
  );
}

export default App;
