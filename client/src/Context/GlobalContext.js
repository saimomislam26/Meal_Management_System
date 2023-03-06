import React, { useEffect,useReducer, createContext } from 'react'
import App from '../App'
import {reducer} from '../reducer/reducer'
import Cookies from 'js-cookie'
export const ProjectContext = createContext()

let initialState = {
    userName:"",
    isLoggedIn:false,
    _id:""
}

const jwt = localStorage.getItem("jwtoken")

const GlobalContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getUserData = async()=>{
        const res = await fetch(`${process.env.REACT_APP_URL}/protecteddata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+ jwt
            }
        })
        const temp = await res.json()
        // console.log(temp);
        if (res.status === 200 && temp) {
            return dispatch({
                type:'SET_USER_INFO',
                payload:{
                    data:temp
                }
            })
        }
    }
    useEffect(() => {
        if(localStorage.getItem("jwtoken")){
            getUserData()
        }
        else{
            console.log("No Token");
        }
    }, [])
    const setUserInfo = (data)=>{
        return dispatch({
            type:"SET_USER_INFO",
            payload:data
        })
    }
    const deleteUserInfo = ()=>{
        return dispatch({
            type:"DELETE_USER_INFO"
        })
    }

  return (
    <ProjectContext.Provider value={{...state,setUserInfo,deleteUserInfo}}>
        <App />
    </ProjectContext.Provider>
  )
}

export default GlobalContext