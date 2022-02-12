
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton, Button } from '@material-ui/core';
import { useState,useEffect } from 'react';
import { meetingRoute } from '../ApiRoutes';
import { get, remove } from '../Calls';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';



const Tabel=()=>{

    const [rows,setRows]=useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [id,setId]=useState();

    useEffect(async()=>{
        let data=await get(meetingRoute);
        setRows(data);
        setNeedUpdate(false);


    },[needUpdate]);

   const navigate=useNavigate();

   const deleteMeeting=async()=>{
      await remove(meetingRoute,id);
      setNeedUpdate(true);
   }


   

    return(
        <div>
            

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
                            <IconButton onClick={deleteMeeting} >
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        
                        </TableRow>
                    ))}

                </TableBody>
             </Table>
            </TableContainer>

        </div>
    )
}

export default Tabel;