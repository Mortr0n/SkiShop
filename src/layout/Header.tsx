import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, FormGroup, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../app/context/StoreContext";
import { useAppSelector } from "../app/store/configureStore";
import './styles.css'

interface IProps {
    darkMode: boolean;
    setDarkMode: Function;
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register   ', path: '/register'},
]


const Header: React.FC<IProps> = (props: IProps) => {
    const {darkMode, setDarkMode} = props;
    const { basket } = useAppSelector(state => state.basket)
    const itemCount = basket?.items?.reduce((sum, item) => sum + item.quantity, 0);
    

const navStyles = {
    color: 'inherit', 
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.600'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

    return(
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems="center">
                    <Typography 
                        className="reStoreTitle" 
                        variant="h6" 
                        component={NavLink} 
                        to='/' 
                        sx={navStyles}
                        exact
                    >
                        RE-Store
                    </Typography>
                    <div className="darkModeSwitchDiv">
                        <FormGroup>
                            <FormControlLabel 
                                checked={darkMode} 
                                control={<Switch onChange={() => setDarkMode()} />} 
                                sx={navStyles} 
                                label="Dark Mode" 
                            />
                        </FormGroup>
                    </div>
                </Box>
                

                <List sx={{display: 'flex'}}>
                    {
                        midLinks.map(({title, path}) => (
                            <ListItem 
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title}
                            </ListItem>
                        ))
                    }
                </List>
                
                <Box display='flex' alignItems='center' >
                    <IconButton component={Link} to='/basket' size="large" sx={{color: 'inherit'}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart  />
                        </Badge>
                    </IconButton>
                    <List sx={{display: 'flex', }}>
                        {
                            rightLinks.map(({title, path}) => (
                                <ListItem 
                                    key={path}
                                    component={NavLink}
                                    to={path}
                                    sx={navStyles}
                                >
                                    {title}
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header;