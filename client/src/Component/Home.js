import React,{useContext,useState,useEffect} from 'react'
import { ProjectContext } from '../Context/GlobalContext'
import Progress from './Progress'
const Home = () => {
    // const {Add,Minus,value} = useContext(ProjectContext)
  const [value, setValue] = useState(0);
  const fileListLength = 5000
  const percentInterval = fileListLength/100
  var percentCount = 1

  useEffect(() => {
    const interval = setInterval(() => {
      for (var i = 1; i<=fileListLength;i++){
        if(i%percentInterval===0){
          // console.log("Percent Count",percentCount);
          // console.log("index:",i);
          setValue((oldValue)=>{
           console.log("previous Value :",oldValue);
           const newValue =  percentCount
           if (newValue === 100) {
            clearInterval(interval);
          }
          return newValue;
          })
          percentCount++
          console.log("value",value);
        }

      }
    }, 500);
  }, []);
  return (
    // <div>
    //     <div className='value-edit'>{value}</div>
    //     <button className='btn btn-primary' onClick={Add}>+</button>
    //     <button className='btn btn-danger' onClick={Minus}>-</button>
    // </div>
    <Progress value={value} />
  )
}

export default Home