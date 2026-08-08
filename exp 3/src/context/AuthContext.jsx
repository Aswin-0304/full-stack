import React,{createContext,useState} from 'react';
export const AuthContext=createContext();
export function AuthProvider({children}){
 const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
 const login=(u,p)=>{
 const users=JSON.parse(localStorage.getItem('users')||'[]');
 const found=users.find(x=>x.username===u && x.password===p);
 if(found){localStorage.setItem('user',JSON.stringify(found));setUser(found);return true;}
 return false;};
 const logout=()=>{localStorage.removeItem('user');setUser(null);};
 return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>;
}