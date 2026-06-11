import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Category from './pages/Category';
import Filter from './pages/Filter';
import Expense from './pages/Expense';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Home from './pages/Home';

const App = () => {
    return (
        <>
            <Toaster/>
            <BrowserRouter>
                <Routes>
                    <Route path='/dashboard' element={<Home/>}/>
                    <Route path='/income' element={<Income/>}/>
                    <Route path='/expense' element={<Expense/>}/>
                    <Route path='/category' element={<Category/>}/>
                    <Route path='/filter' element={<Filter/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;