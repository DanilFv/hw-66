import {Box, Button, Typography} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type {IMeal} from '../../../types';
import * as React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
    meal: IMeal;
    deleteMeal: (id: string) => void;
    isLoading?: boolean;
}

const CardItem: React.FC<Props> = ({meal, deleteMeal, isLoading = false}) => {
    return (
        <>
            <Box>
                <Typography component='p' variant='body1' color='textSecondary' sx={{ fontWeight: 'medium' }}>
                    {meal.mealTime}
                </Typography>
                <Typography component='p' variant='h6' color='secondary'>
                    {meal.mealDescription}
                </Typography>
            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography component='p' variant='body1' sx={{ mx: 10, fontWeight: 'bold' }}>{meal.calories} kcal</Typography>
                <Box display={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button type='button' variant='text' component={NavLink} to={`/meals/${meal.id}/edit-meal`} color='secondary' sx={{ mb: 1 }}><EditNoteIcon/></Button>
                    <Button type='button' loading={isLoading} loadingPosition='center' disabled={isLoading} variant='text' color='error' onClick={() => deleteMeal(meal.id)} ><DeleteForeverIcon/></Button>
                </Box>
            </Box>
        </>
    );
};

export default CardItem;