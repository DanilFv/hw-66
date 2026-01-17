import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import EditMeal from './containers/EditMeal/EditMeal.tsx';
import NewMeal from './containers/NewMeal/NewMeal.tsx';

const App = () => {

  return (
    <>
        <NavBar />
        <Container>
            <Routes>
                <Route path='/' element={(<Home />)} />
                <Route path='/meals/new-meal' element={(<NewMeal />)} />
                <Route path='/meals/edit-meal' element={(<EditMeal />)} />

                <Route
                    path="*"
                    element={(<Typography component='p' variant='h4' sx={{textAlign: 'center', mt: 3}}>Not found page!</Typography>)}
                />
            </Routes>
        </Container>
    </>
  )
};

export default App
