import React from 'react';
import '../firebase';
import { Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function AuthGuard(Component, props) {
    const auth = getAuth();
    //const navigate = useNavigate();
    
    const user = auth.currentUser
    if(user){
        return <Component {...props}/>
    }else{
        //navigate('/');
        return <Navigate to="/"/>
        //return Component
    }
}

export default AuthGuard;