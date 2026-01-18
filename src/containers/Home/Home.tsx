import {useCallback, useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import type {IMeal, IMealAPI} from '../../types';
import axiosAPI from '../../components/axiosAPI.ts';
import MealCard from '../../components/MealCard/MealCard.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import {toast} from 'react-toastify';
import MealsHeader from '../../components/MealsHeader/MealsHeader.tsx';


const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
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
        try {
            setButtonLoading(true);
            await axiosAPI.delete(`meals/${id}.json`);
            setMeals(prevState => prevState.filter(meal => meal.id !== id));
            toast.success('Прием пищи успешно удален!');

        } finally {
            setButtonLoading(false);
        }
    };

    const total = meals.reduce((acc, item) => {
        acc += item.calories
        return acc;
    },0);


    return (
        <>
            <MealsHeader total={meals.length > 0 ? total : undefined} />
            {isLoading && <Spinner />}
            {!isLoading && meals.length === 0 && <Typography variant='h4' component='p' sx={{ fontWeight: 'medium',}}>No meals found.</Typography>}
            {!isLoading && meals.length > 0 && <MealCard meals={meals} deleteMeal={onDeleteMeal} isLoading={buttonLoading} />}
        </>
    );
};

export default Home;