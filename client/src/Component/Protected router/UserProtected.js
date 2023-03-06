import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
const UserProtected = ({children}) => {
    const isCookie = Cookies.get('jwtoken',{ domain: 'meal-management-m8fx.onrender.com' })
    if(isCookie){
        return children
    }
    else {
        return <Navigate to={"/signin"}/>
    }
}

export default UserProtected