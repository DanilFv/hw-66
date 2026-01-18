import {Box, Button, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import * as React from 'react';

interface Props {
    total?: number;
}

const MealsHeader: React.FC<Props> = ({total}) => {


    return (
       <Box sx={{ display: 'flex', justifyContent: total ? 'space-between' : 'end', alignItems: 'center' }}>
           {total && <Typography component='p' variant='h5' color='textSecondary'>Total calories: <strong>{total}</strong></Typography>  }
           <Button type='button' variant='outlined' color='secondary' component={NavLink} to='/meals/new-meal'>Add new meal</Button>
       </Box>
    );
};

export default MealsHeader;