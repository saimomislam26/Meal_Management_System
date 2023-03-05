import React, { useState, useEffect,useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { ProjectContext } from '../Context/GlobalContext';
const AddItem = () => {
    const {_id} = useContext(ProjectContext)
    const [buyer, setBuyer] = useState('');
    const [stat,setStat] = useState([])
    const [bazar, setBazar] = useState({
        itemName: "",
        amount: "",
        date: ""
    })
    const jwt = Cookies.get('jwtoken')
    let name, value
    const getBazarInfo = (e) => {
        name = e.target.id
        value = e.target.value
        setBazar({ ...bazar, [name]: value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { itemName, amount, date } = bazar
        const res = await fetch(`${process.env.REACT_APP_URL}/addbazar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: JSON.stringify({
                itemName, amount, date, buyer:_id
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
            setBazar({
                itemName: "",
                amount: "",
                date: ""
            })
            setBuyer("")
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
    const bazarStatTable = async()=>{
        const res = await fetch(`${process.env.REACT_APP_URL}/bazartable`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + jwt
          }
      })
      const temp = await res.json()
  
      if (res.status === 200) {
        setStat(temp)
      }
      }

    useEffect(() => {
        bazarStatTable()
    }, [])

    return (
        <>
        <Box sx={{display:"flex",justifyContent:"center",}}>
        <TableContainer component={Paper} sx={{maxWidth: 900, marginTop:"30px" }}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell align="right">Total Bazar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stat && stat.map((row) => (
                            <TableRow
                                key={row.day}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.day}
                                </TableCell>
                                <TableCell align="right">{row.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Box >
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} >
                <TextField id="itemName" label="Item Name" variant="outlined" sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} value={bazar.itemName} onChange={getBazarInfo} />
                <TextField id="amount" label="Amount" variant="outlined" sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} value={bazar.amount} onChange={getBazarInfo} />

                {/* <FormControl sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} >
                    <InputLabel id="demo-simple-select-helper-label">Select Buyer</InputLabel>
                    <Select
                        labelId="buyer"
                        id="buyer"
                        value={buyer}
                        label="buyer"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            userList.map((val)=>{
                                return(
                                    <MenuItem value={val._id}>{val.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl> */}
                <input type={'date'} id='date' style={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} value={bazar.date} onChange={getBazarInfo} />

            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Button variant="contained" sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }} onClick={handleSubmit}>Add</Button>
            </Box>
            
        </Box>
        </>
        

    )
}

export default AddItem