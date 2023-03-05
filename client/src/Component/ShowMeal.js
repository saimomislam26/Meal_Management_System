import React, { useEffect, useLayoutEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie'

const ShowMeal = () => {
    const jwt = Cookies.get('jwtoken')
    const [info, setInfo] = useState({
        totalBazar: 0,
        totalMeal: 0,
        pMeal: 0,
        sMeal: 0
    })
    const [stat,setStat] = useState([])
    const allInfoCalculation = async () => {
        const res = await fetch(`${process.env.REACT_APP_URL}/showmeal`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        })
        const temp = await res.json()

        if (res.status === 200) {
            setInfo({
                totalBazar: temp[1].totalBazar,
                totalMeal: temp[0].total,
                pMeal: temp[2].result.filter((val)=>{return(val.name[0].name==='Pranto' && val.amount)})[0].amount,
                sMeal: temp[2].result.filter((val)=>{return(val.name[0].name==='Saimom' && val.amount)})[0].amount,
            })
        }
    }
    const mealStatTable = async()=>{
        const res = await fetch(`${process.env.REACT_APP_URL}/showmealtable`, {
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
    useLayoutEffect(() => {
        allInfoCalculation()
        mealStatTable()
    }, [])

    return (
        <>
        <Box sx={{display:"flex",justifyContent:"center",}}>
        <TableContainer component={Paper} sx={{maxWidth: 900, marginTop:"30px" }}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell align="right">Total Meal</TableCell>
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
                                <TableCell align="right">{row.totalMeal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
            

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <TextField
                        id="filled-read-only-input"
                        label="Total Amount"
                        value={info && info.totalBazar}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Total Meal"
                        value={info && info.totalMeal}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Per Meal"
                        value={info && info.totalBazar / info.totalMeal}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Pranto's Total Meal"
                        value={info && info.pMeal}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Saimom's Total Meal"
                        value={info && info.sMeal}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Pranto's Meal Cost"
                        value={info &&( (info.totalBazar / info.totalMeal) * info.pMeal)}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Saimom's Meal Cost"
                        value={info && ( (info.totalBazar / info.totalMeal) * info.sMeal)}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}
                    />

                </Box>
                {/* <Button variant="contained" sx={{ minWidth: "300px", marginRight: "30px", marginTop: "30px" }}>Add</Button> */}
            </Box>
        </>


    )
}

export default ShowMeal