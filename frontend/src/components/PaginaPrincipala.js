import Tabel from "./Tabel";
import Adaugare from "./Adaugare";
import { IconButton, TextField } from "@material-ui/core";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PreviewIcon from '@mui/icons-material/Preview';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { useState } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import Export from "./Export";



function PaginaPrincipala(){

    const[view,setView]=useState(true);
    const[sort,setSort]=useState(false);
    const[filter,setFilter]=useState(false);



    return(
        <div className="container">
           
            <Adaugare className="component"/>
            <IconButton className="component" onClick={()=>{setView(true); setSort(false); setFilter(false)}}>
                <PreviewIcon/>
            </IconButton>
            <IconButton className="component" onClick={()=>{setView(false); setSort(false); setFilter(true)}}>
                <FilterAltIcon/>
            </IconButton>
            <IconButton className="component" onClick={()=>{setView(false); setSort(true); setFilter(false)}}>
                <SortByAlphaIcon/>
            </IconButton>
            
            {
                view?
                (
                    <Tabel/>
                ):(
                    <div></div>
                )
            }

            {
                sort?
                (
                    <Sort/>
                ):(
                    <div></div>
                )
            }

{
                filter?
                (
                    <Filter/>
                ):(
                    <div></div>
                )
            }

            <Export/>
            
        </div>
    )

}

export default PaginaPrincipala;