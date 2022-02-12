
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton, Button } from '@material-ui/core';
import { useState,useEffect } from 'react';
import { filterRoute,meetingRoute } from '../ApiRoutes';
import { get, remove } from '../Calls';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';


const Filter=()=>{

    const [rows,setRows]=useState([]);
    const [id,setId]=useState();
    const navigate=useNavigate();
    const [open,setOpen]=useState(false);


   const search=async()=>{
    let descriere=document.querySelector("#descriere").value;
    let url=document.querySelector("#url").value;
    let data=await get(filterRoute+`?descriere=${descriere}&url=${url}`);
    setRows(data);

    console.log(data.length)
    if(data.length==0){
        setOpen(true);
        setTimeout(setOpen,3000,false);
    }

   }
  

    return(
        <div>
            <TextField
            id="descriere"
            label="Descriere"/>
            <TextField
            id="url"
            label="Url"/>
            <IconButton onClick={search}>
                <SearchIcon/>

            </IconButton>

            <TableContainer id="tableContainer">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="center">Descriere</TableCell>
                        <TableCell align="center">Url</TableCell>
                        <TableCell align="center">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => ( 
                        <TableRow hover={true} key={row.MeetingID} onMouseEnter={()=>{setId(row.MeetingID) }}>
                            <TableCell  component="th" scope ="row"> {row.MeetingID}</TableCell>
                            <TableCell align="center">{row.Descriere}</TableCell>
                            <TableCell align="center"> {row.Url}</TableCell>
                            <TableCell align="center">{row.Date}</TableCell>
                     
                            <IconButton onClick={()=>{navigate(`/Edit/${row.MeetingID}`)}} >
                                <EditIcon  ></EditIcon>
                            </IconButton>
                          
                        
                        </TableRow>
                    ))}

                </TableBody>
             </Table>
            </TableContainer>

            <Snackbar open={open} autoHideDuration={1000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Date inexistente
         </Alert>
         </Snackbar>

        </div>
    )
}

export default Filter;