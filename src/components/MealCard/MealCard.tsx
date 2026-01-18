import {Box, Grid} from '@mui/material';
import type {IMeal} from '../../types';
import CardItem from './CardItem/CardItem.tsx';
import * as React from 'react';

interface Props {
    meals: IMeal[];
    deleteMeal: (id: string) => void;
    isLoading: boolean;
}

const MealCard: React.FC<Props> = ({meals, deleteMeal, isLoading}) => {
    return (
         <Grid container spacing={2} sx={{ mt: 5 }}>
             <Grid size={12}>

                  {meals.map(meal => (
                      <Box key={meal.id}
                           sx={{
                               p: 2,
                               my: 3,
                               display: 'flex',
                               justifyContent: 'space-between',
                               alignItems: 'center',
                               border: '2px solid #9127ae',
                               borderRadius: 3,
                           }}
                      >
                          <CardItem meal={meal} deleteMeal={deleteMeal} isLoading={isLoading}  />
                      </Box>
                  ))}


             </Grid>
         </Grid>
    );
};

export default MealCard;