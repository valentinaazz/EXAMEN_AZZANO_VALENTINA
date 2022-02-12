import { Button, TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { meetingRoute } from "../ApiRoutes";
import { post } from "../Calls";
import AddBoxIcon from '@mui/icons-material/AddBox';

function Adaugare(){

    const [meeting,setMeeting]=useState({
        Descriere:"",
        Url:"",
        Date:Date.now()
    })

    const[isAdding,setIsAdding]=useState(false);


    const onChangeMeeting=(e)=>{
        setMeeting({...meeting,[e.target.name]:e.target.value})

    }

    const saveMeeting=async()=>{
     
        await post(meetingRoute,meeting);
    }

    const handleSubmit=(e)=>{   
        saveMeeting();
       
    }

    return(
        <div>
          {
            isAdding?
            (
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
              
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
          </Box>

            ):(
             <IconButton  id="btn" onClick={()=>{setIsAdding(true)}}>
               <AddBoxIcon/>ADD MEETING
             </IconButton>
            )
          }
          
            
         
        
        </div>
    )
}

export default Adaugare;