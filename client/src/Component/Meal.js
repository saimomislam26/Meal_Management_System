import React,{useContext, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { ProjectContext } from '../Context/GlobalContext';
const Meal = () => {
  const {_id} = useContext(ProjectContext)

    const [meal, setMeal] = React.useState({
      amount:"",
      date:""
    });
    const jwt = Cookies.get('jwtoken')
    let name,value
    const handleMeal =(e)=>{
      name = e.target.id
      value = e.target.value
      setMeal({...meal,[name]:value})
    }

    const addMeal = async(event)=>{
      event.preventDefault();
      const { amount, date } = meal
      const res = await fetch(`${process.env.REACT_APP_URL}/addmeal`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + jwt
          },
          body: JSON.stringify({
              amount,date,eater:_id
          }),
      })
      const data = await res.json()
      if (res.status === 400) {
          toast(data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }
      else if(res.status === 200) {
          setMeal({
              amount: "",
              date: ""
          })
          toast('Add Successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }else{
          console.log(data);
      }
    }

   

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center",flexDirection:"column" }}>
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <TextField id="amount" label="Meal Amount" variant="outlined" sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} value={meal.amount} onChange={handleMeal} />

        <input type={'date'} style={{minWidth: "300px", marginRight: "30px", marginTop: "30px"}} id='date' value={meal.date} onChange={handleMeal}/>
        
    </Box>
    <Button variant="contained" sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} onClick={addMeal}>Add Meal</Button>
</Box>
  )
}

export default Meal