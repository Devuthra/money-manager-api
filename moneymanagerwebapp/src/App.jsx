import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Category from './pages/Category';
import Filter from './pages/Filter';
import Expense from './pages/Expense';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Home from './pages/Home';
import { LoaderCircle } from 'lucide-react';

const App = () => {
    const [serverReady, setServerReady] = useState(false);

    useEffect(() => {
        fetch("https://money-manager-api-1-92tu.onrender.com/api/v1.0/health")
          .then(() => setServerReady(true))
          .catch(() => setServerReady(true));
    }, []);

    if (!serverReady) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-4">
                <LoaderCircle className="animate-spin w-10 h-10 text-purple-600" />
                <p className="text-gray-600 text-lg font-medium">Starting server, please wait...</p>
                <p className="text-gray-400 text-sm">This may take up to 30 seconds</p>
            </div>
        );
    }

    return (
        <>
            <Toaster/>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Root/>}/>
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
    );
}

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
        <Navigate to="/dashboard"/>
    ) : (
        <Navigate to="/login"/>
    );
}

export default App;