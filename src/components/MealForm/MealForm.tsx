import {Box, Grid, MenuItem, TextField, Typography} from '@mui/material';
import type {IMealForm} from '../../types';
import * as React from 'react';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {mealTimeArray} from '../../constants.ts';
import axiosAPI from '../axiosAPI.ts';
import {toast} from 'react-toastify';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
    isEdit?: boolean;
    initialValues?: IMealForm;
    mealId?: string;
}

const MealForm: React.FC<Props> = ({isEdit, mealId, initialValues = {
    mealTime: '',
    mealDescription: '',
    calories: 0,
}}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const {register, control, reset, handleSubmit, formState: {errors}} = useForm<IMealForm>({
        defaultValues: initialValues
    });

    const onSubmit =  async (data: IMealForm) => {
        try {
            setIsLoading(true);
            if (isEdit && mealId) {
                console.log(mealId);
            } else {
                await axiosAPI.post('meals.json', data);
                navigate('/');
                toast.success('Прием пищи успешно добавлен!');
                reset();
            }

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Box sx={{ mt: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h4' component='h5' color='textSecondary' sx={{ textAlign: 'center', fontWeight: 'medium' }}>
                    {isEdit ? 'Edit meal' : 'Add meal'}
                </Typography>

                <Grid container spacing={2} sx={{ mx: 'auto', width: '70%', mt: 4, mb: 4 }}>

                    <Grid size={12}>
                        <Controller
                            name="mealTime"
                            control={control}
                            rules={{ required: 'Выберите время приема пищи!' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label='Meal time'
                                    error={!!errors.mealTime}
                                    helperText={errors.mealTime?.message}
                                    disabled={isLoading}
                                >
                                     {mealTimeArray.map(meal => (
                                            <MenuItem key={meal} value={meal}>{meal}</MenuItem>
                                        ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label='Description'
                            multiline
                            fullWidth
                            variant='outlined'
                            minRows={3}
                            {...register('mealDescription', {
                                required: 'Это обязательное поле!',
                                setValueAs: (value: string) => value?.trim() ?? ''
                            })}
                            error={!!errors.mealDescription}
                            disabled={isLoading}
                            helperText={errors.mealDescription?.message}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label='Calories'
                            fullWidth
                            variant='outlined'
                            type='number'
                            {...register('calories', {
                                required: 'Это обязательное поле!',
                                min: {
                                    value: 1,
                                    message: 'Значение не должно быть меньше 1 ккал!'
                                },
                                valueAsNumber: true
                            })}
                            error={!!errors.calories}
                            helperText={errors.calories?.message}
                            disabled={isLoading}
                        />
                    </Grid>

                    <Grid size={12}>
                        <ButtonSpinner type='submit' text={isEdit ? 'Edit' : 'Save'} loading={isLoading} icon={isEdit ? <EditDocumentIcon /> : <SaveIcon />} />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default MealForm;