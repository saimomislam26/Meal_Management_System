import React from 'react'
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style.css'
import Home from './Component/Home'
import AddItem from './Component/AddItem'
import Navbar from './Component/Navbar'
import Meal from './Component/Meal'
import ShowMeal from './Component/ShowMeal'
import Signin from './Component/Signin'
import UserProtected from './Component/Protected router/UserProtected'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<UserProtected><AddItem/></UserProtected>}/>
        <Route path="/addmeal" exact element={<UserProtected><Meal/></UserProtected>}/>
        <Route path="/showmeal" exact element={<UserProtected><ShowMeal/></UserProtected>}/>
        <Route path="/signin" exact element={<Signin/>}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
