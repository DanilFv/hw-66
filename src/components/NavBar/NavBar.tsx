import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                <Typography
                    variant="h6"
                    component={NavLink} to='/'
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                >
                    Calorie tracker
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
