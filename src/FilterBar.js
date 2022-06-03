import React from 'react'
import { useState,useEffect } from 'react';
import './App.css';
import {Typography,Grid,Box,Button,FormControl,InputLabel,Select,MenuItem,Checkbox,FormControlLabel,TextField} from '@material-ui/core';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ComputerIcon from '@material-ui/icons/Computer';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles({
  button:{
    border:'1px solid #1A8DE1'
  },
});
function FilterBar(props) {
  const classes=useStyles();
     let temp=new Set();
    const [child,setchild]=useState(null);
    
    const [course,setCourse]=useState(null);
    const [childcourse,setChildCourse]=useState(null);
    const [date, setDate] = React.useState(null);
    const [selfPaced,setselfPaced]=useState(false);
     useEffect(()=>{
       props.subjects.map(item=>{
        if(item['Parent Subject']===course)
            temp.add(item['Child Subject'])
       });

       setchild(Array.from(temp));
     },[course])

   
   
    return (
      
        <Box className='FilterMenu' sx={{border:'1px grey',bgcolor:'#ffffff',padding:'2% 2%',marginBottom:'2%'}}>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
        
          <Grid item xs={3}>
          <div style={{display:'flex',justifyContent:'space-between'}}> 
          <LocalLibraryIcon style={{color:'#75B8F3',marginTop:'15px'}} fontSize='large'/>
          <FormControl fullWidth style={{marginLeft:'8px'}}>
       <InputLabel >  Course</InputLabel>
       <Select label="Course" value={course} onChange={(event)=>{setCourse(event.target.value)}} >
       {props.parents?props.parents.map(course=><MenuItem value={course}>{course}</MenuItem>):null}
       </Select>
     </FormControl>
     
     </div>
           </Grid>
  <Grid item xs={3}> 
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> 
   <ComputerIcon style={{color:'#75B8F3',marginTop:'20px'}} fontSize='large' />
  <FormControl fullWidth style={{marginLeft:'8px'}}>
       <InputLabel >
      Child Course
       </InputLabel>
       <Select label="Child Course" value={childcourse} onChange={(event)=>setChildCourse(event.target.value)} >
       {child?child.map(course=><MenuItem value={course}>{course}</MenuItem>):null}
       </Select>
     </FormControl>
     </div>
      </Grid>
    
     <Grid item xs={2}>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
 <DatePicker
 variant="outlined"
   label="Date"
   value={date}
        onChange={(newDate) => {
          setDate(newDate); }}
   renderInput={(params) => <TextField {...params} />}
 />
</LocalizationProvider>
 </Grid>
   <Grid item xs={2}> 
   <FormControlLabel control={<Checkbox  color='primary' style={{color:'#1A8DE1'}}
    checked={selfPaced}/>} label="Self Paced" onClick={(e)=>setselfPaced((x)=>!x)} style={{marginTop:'24px'}}/>
   </Grid>
   <Grid item xs={1}>
   
   <Button variant='outlined'  style={{marginRight:'1%',color:'#1A8DE1',marginTop:'24px'}} className={classes.button} onClick={(event)=>{
       setCourse(null);
       setChildCourse(null);
       setDate(null);
       setselfPaced(false);
       props.filter({});
   }}>Reset</Button>
  
    </Grid>
   <Grid item xs={1}>
   <Button variant='' style={{backgroundColor:'#1A8DE1',color:'#ffffff',
    fontFamily: 'Montserrat, sans-serif',marginTop:'24px'}} fullWidth onClick={(event)=>{
      const dateToSearch = new Date(date);
      dateToSearch.setHours(0,0,0,0);
      var obj={
        course:course,
        childcourse:childcourse,
        date:dateToSearch,
        selfPaced:selfPaced
      };
      props.filter(obj);
    }}>Search</Button>
   
   </Grid>
   </Grid>
   </Box>
      
    )
}

export default FilterBar
