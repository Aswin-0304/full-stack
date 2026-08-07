import React,{useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
export default function Dashboard(){
 const {user,logout}=useContext(AuthContext);
 return <div className='card'><h1>Dashboard</h1><h2>{user?.username}</h2><p>Role: {user?.role}</p><button onClick={logout}>Logout</button></div>;
}