import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container, } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import agent from "../app/api/agent";
import { useStoreContext } from "../app/context/StoreContext";
import NotFound from "../app/errors/NotFound";
import ServerError from "../app/errors/ServerError";
import { getCookie } from "../app/util/util";
import AboutPage from "../features/about/AboutPage";
import BasketPage from "../features/basket/BasketPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import CheckoutPage from "../features/checkout/CheckoutPage";
import ContactPage from "../features/contact/ContactPage";
import HomePage from "../features/home/HomePage";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";


function App() {
  const { setBasket } = useStoreContext();
  const [ loading, setLoading ] = useState(true);
  const [ darkMode, setDarkMode ] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch((err) => console.log("Error getting basket using buyerId", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket])

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

  if (loading) return <LoadingComponent message="Initializing app..." />

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
          <Route path='/basket' component={BasketPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
        
      </Container> 
    </ThemeProvider>
  );
}

export default App;
