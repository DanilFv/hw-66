import {useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import type {IMeal, IMealForm} from '../../types';
import axiosAPI from '../../components/axiosAPI.ts';
import MealForm from '../../components/MealForm/MealForm.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const EditMeal = () => {
    const [currentMeal, setCurrentMeal] = useState<IMealForm>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams<{ id: string }>();

    const fetchMeal = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await axiosAPI.get<IMeal | null>(`meals/${id}.json`);
            const dataMeal = response.data;

            if (dataMeal) setCurrentMeal(dataMeal);

        } finally {
            setIsLoading(false);
        }
    }, [])


    useEffect(() => {
        if (params.id) {
            void fetchMeal(params.id);
        }
    }, [params.id, fetchMeal]);

    let form = (
        <MealForm isEdit={true} initialValues={currentMeal} mealId={params.id} />
    );

    if (isLoading) {
        form = (
            <Spinner />
        );
    }





    return (
        <>
            {form}
        </>
    );
};

export default EditMeal;