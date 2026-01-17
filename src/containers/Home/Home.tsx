import {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='p' variant='h5'>Total calories: </Typography>
                <Button type='button' variant='outlined' color='secondary' component={NavLink} to='/meals/new-meal'>Add new meal</Button>
            </Box>
        </>
    );
};

export default Home;