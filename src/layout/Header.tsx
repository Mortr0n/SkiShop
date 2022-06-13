import { AppBar, Button, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from "@mui/material";
import './styles.css'



interface IProps {
    darkMode: boolean;
    setDarkMode: Function;
}


const Header: React.FC<IProps> = (props: IProps) => {
    const {darkMode, setDarkMode} = props;


    return(
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography className="reStoreTitle" variant="h6">
                    RE-Store
                </Typography>
                <div className="darkModeSwitchDiv">
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={() => setDarkMode()} />} label="Dark Mode" />
                    </FormGroup>
                </div>
                
                
            </Toolbar>
        </AppBar>
    )
}

export default Header;