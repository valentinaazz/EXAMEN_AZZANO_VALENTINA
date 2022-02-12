import { Button, TextField } from '@material-ui/core';
import { useState,useEffect } from 'react';
import { exportRoute } from '../ApiRoutes';
import {get } from '../Calls';


function Export(){

    const [value,setValue]=useState();
  


    const exportF=async()=>{
        let data=await get(exportRoute);
        setValue(data)

        
    }
    return(
        <div>
            <Button  onClick={exportF}>EXPORT</Button>
            <TextField
            value={value}
            
            multiline/>
           
        </div>
    )
}

export default Export;