import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container, } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "../app/errors/NotFound";
import ServerError from "../app/errors/ServerError";
import { useAppDispatch } from "../app/store/configureStore";
import AboutPage from "../features/about/AboutPage";
import { fetchCurrentUser } from "../features/account/accountSlice";
import Login from "../features/account/Login";
import Register from "../features/account/Register";
import BasketPage from "../features/basket/BasketPage";
import { fetchBasketAsync } from "../features/basket/basketSlice";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import CheckoutPage from "../features/checkout/CheckoutPage";
import ContactPage from "../features/contact/ContactPage";
import HomePage from "../features/home/HomePage";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";
import PrivateRoute from "./PrivateRoute";


function App() {
  const dispatch = useAppDispatch();
  const [ loading, setLoading ] = useState(true);
  const [ darkMode, setDarkMode ] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const initApp = useCallback(async () =>  {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch(err: any) {
      console.log(err);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

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
          <PrivateRoute path='/checkout' component={CheckoutPage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={NotFound} />
        </Switch>
        
      </Container> 
    </ThemeProvider>
  );
}

export default App;
