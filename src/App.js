import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import {AuthProvider} from './context/AuthContext';
import './App.css';

export default function App(){
 return (
 <AuthProvider>
 <BrowserRouter>
 <Routes>
 <Route path='/' element={<Login/>}/>
 <Route path='/register' element={<Register/>}/>
 <Route path='/forgot' element={<ForgotPassword/>}/>
 <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
 </Routes>
 </BrowserRouter>
 </AuthProvider>);
}