import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container, createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import { useState } from "react";
import Catalog from "../features/catalog/Catalog";
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
        <Catalog />
      </Container> 
    </ThemeProvider>
  );
}

export default App;
