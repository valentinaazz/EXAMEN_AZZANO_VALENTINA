
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton, Button } from '@material-ui/core';
import { useState,useEffect } from 'react';
import { sortRoute,meetingRoute } from '../ApiRoutes';
import { get, remove } from '../Calls';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


const Sort=()=>{

    const [rows,setRows]=useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [id,setId]=useState();

    useEffect(async()=>{
        let data=await get(sortRoute);
        setRows(data);
        setNeedUpdate(false);


    },[needUpdate]);

   const navigate=useNavigate();

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
                        <TableRow hover={true} key={row.MetingID} onMouseEnter={()=>{setId(row.MetingID) }}>
                            <TableCell  component="th" scope ="row"> {row.MetingID}</TableCell>
                            <TableCell align="center">{row.Descriere}</TableCell>
                            <TableCell align="center"> {row.Url}</TableCell>
                            <TableCell align="center">{row.Date}</TableCell>
                     
                            <IconButton onClick={()=>{navigate(`/Edit/${row.MetingID}`)}} >
                                <EditIcon  ></EditIcon>
                            </IconButton>
                          
                        
                        </TableRow>
                    ))}

                </TableBody>
             </Table>
            </TableContainer>

        </div>
    )
}

export default Sort;