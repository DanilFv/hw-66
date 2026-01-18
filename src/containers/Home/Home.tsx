import {useCallback, useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import type {IMeal, IMealAPI} from '../../types';
import axiosAPI from '../../components/axiosAPI.ts';
import MealCard from '../../components/MealCard/MealCard.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import {toast} from 'react-toastify';


const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [meals, setMeals] = useState<IMeal[]>([]);

    const fetchMeals = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axiosAPI.get<IMealAPI>('meals.json');
            const mealsObjects = response.data;

            if (mealsObjects) {
                const allMeals = Object.keys(mealsObjects).map(meal => {
                    return {
                        ...mealsObjects[meal],
                        id: meal,
                    }
                });
                setMeals(allMeals);
            }
        } finally {
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        void fetchMeals();
    },[fetchMeals]);

    const onDeleteMeal = async (id: string) => {
      await axiosAPI.delete(`meals/${id}.json`);
      setMeals(prevState => prevState.filter(meal => meal.id !== id));
      toast.success('Прием пищи успешно удален!');
    };

    const total = meals.reduce((acc, item) => {
        acc += item.calories
        return acc;
    },0);


    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && meals.length === 0 && <Typography variant='h4' component='p'>No meals found.</Typography>}
            {!isLoading && meals.length > 0 &&
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component='p' variant='h5' color='textSecondary'>Total calories: <strong>{total}</strong></Typography>
                    <Button type='button' variant='outlined' color='secondary' component={NavLink} to='/meals/new-meal'>Add new meal</Button>
                  </Box>
                  <MealCard meals={meals} deleteMeal={onDeleteMeal} />
                </Box>
            }
        </>
    );
};

export default Home;