import React,{useState,useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
export default function Login(){
 const [username,setUsername]=useState('');
 const [password,setPassword]=useState('');
 const {login}=useContext(AuthContext);
 const nav=useNavigate();
 return <div className='card'><h1>Welcome Back</h1>
 <input placeholder='Username' onChange={e=>setUsername(e.target.value)}/>
 <input type='password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
 <button onClick={()=>login(username,password)?nav('/dashboard'):alert('Invalid')}>Login</button>
 <p><Link to='/forgot'>Forgot Password?</Link></p>
 <p><Link to='/register'>Create Account</Link></p></div>;
}