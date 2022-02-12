import { useState,useEffect } from "react";
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton, Button } from '@material-ui/core';
import { useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import {TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { meetingParRoute, meetingRoute,participantRoute } from '../ApiRoutes';
import { get, put,remove } from '../Calls';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Editare(){

    const [meeting,setMeeting]=useState();
    const[rows,setRows]=useState([]);


    const[descriere,setDescriere]=useState("");
    const[url,setUrl]=useState("");
    const[needUpdate,setNeedUpdate]=useState(false);
    const [isUpdating,setIsUpdating]=useState(true);  
    const [idP,setIdP]=useState();
   
    useEffect(async()=>{
        let data=await get(meetingParRoute,id);
        setMeeting(data);
        setDescriere(data.Descriere);
        setUrl(data.Url);
        let array=data.Participanti;
        setRows(array);

      setNeedUpdate(false);

    },[needUpdate]);

    const onChangeMeeting=(e)=>{
        setMeeting({...meeting,[e.target.name]:e.target.value})
    }

    const {id}=useParams();


    const updateMet=()=>{
        setIsUpdating(false);
    }

    const updateMeeting=async()=>{
        await put(meetingRoute,id,meeting);
    }

    const handleSubmit=(e)=>{
        updateMeeting();
    }
    const cancel=()=>{
        setIsUpdating(true);
    }

    const participantid=async()=>{
      await remove(participantRoute,idP);
    }
    const deleteParticipant=async()=>{
      participantid();
      setNeedUpdate(true);
    }

    const navigate=useNavigate();
    return(
        <div>

            <Button fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={updateMet}>Update</Button>
          <div>
              {
                  isUpdating
                  ?(
                      <div></div>

                  ):(
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} >
                    <TextField
                  autoComplete="off"
                  name="Descriere"
                  required
                  fullWidth
                  id="Descriere"
                  label="Descriere"
                  defaultValue={descriere}
                  autoFocus
                  onChange={e=>onChangeMeeting(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="Url"
                  label="Url"
                  name="Url"
                  defaultValue={url}
                  onChange={e=>onChangeMeeting(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                disabled
                autoComplete="off"
                  fullWidth
                  id="date"
                  label={new Date().toLocaleString() + ''}
                  name="Date"  
                  onChange={e=>onChangeMeeting(e)}
              
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update meeting
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={cancel}>Cancel</Button>
    
          </Box>
                  )
              }
          </div>
          
           
            <TableContainer id="cont">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="center">Nume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                        <TableRow hover={true} key={row.ParticipantID} onMouseEnter={()=>{setIdP(row.ParticipantID) }}>
                            <TableCell  component="th" scope ="row"> {row.ParticipantID}</TableCell>
                            <TableCell align="center">{row.Nume}</TableCell>
                            <IconButton onClick={deleteParticipant}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                            
                        </TableRow>
                    ))}

                </TableBody>
             </Table>
            </TableContainer>

         <Button onClick={()=>{navigate("/")}}>Pagina Principala</Button>
            


        </div>
    )
}

export default Editare;