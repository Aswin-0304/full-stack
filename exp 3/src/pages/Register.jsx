import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function Register(){
 const [f,setF]=useState({username:'',password:'',role:'Viewer'});
 const nav=useNavigate();
 const save=()=>{const users=JSON.parse(localStorage.getItem('users')||'[]');users.push(f);localStorage.setItem('users',JSON.stringify(users));nav('/');};
 return <div className='card'><h1>Register</h1>
 <input placeholder='Username' onChange={e=>setF({...f,username:e.target.value})}/>
 <input placeholder='Password' onChange={e=>setF({...f,password:e.target.value})}/>
 <select onChange={e=>setF({...f,role:e.target.value})}><option>Admin</option><option>Editor</option><option>Viewer</option></select>
 <button onClick={save}>Register</button></div>;
}