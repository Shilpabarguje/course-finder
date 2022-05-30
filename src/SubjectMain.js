import React from 'react'
import {useState,useEffect} from 'react'
import Subject from './Subject';
import {Grid,FormControl,InputLabel,Select,MenuItem,Button} from '@material-ui/core'
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import Bargraph from './Bargraph'

function SubjectMain(props) {
    console.log(props.subjects);
    const [currentsubjects,setcurrentsubjects]=useState(null);
    const [pages,setPages]=useState(null);
    const [currentPage,setCurrentPage]=useState(1);
    const [currentitems,setCurrentItems]=useState(null);
    const [filters,setFilters]=useState(props.filter);
    const [parentuniversities,setparentuniversities]=useState(null);
    const[childcourses,setchildcourses]=useState(null);
    const [option,setOption]=useState(null);
    const [view,setView]=useState(false);
    const [countuniversity,setCountUniversity]=useState(null);
    const [universityData,setUniversityData]=useState(null);
    const [childCourseData,setChildCourseData]=useState(null);
 useEffect(()=>{
 
    setcurrentsubjects(props.subjects);
    if(currentsubjects)
    setPages(Math.round(currentsubjects.length/6))
    if(currentsubjects && currentsubjects.length>=6){
        setCurrentItems(currentsubjects.slice(0,6));
    }
    else
        setCurrentItems(currentsubjects);
  
 },[props.subjects,currentsubjects]);
 useEffect(()=>{
     if(currentitems){
        
        var obj={};
        currentitems.map(item=>{
          if(item['Universities/Institutions'] in obj)
                obj[item['Universities/Institutions']]+=1;
          else
            obj[item['Universities/Institutions']]=1;
        })
        console.log(Object.keys(obj));
        console.log(Object.values(obj));
        setUniversityData(obj);
        var obj2={};
        currentitems.map(item=>{
          if(item['Child Subject'] in obj2)
            obj2[item['Child Subject']]+=1;
          else
            obj2[item['Child Subject']]=1;
        })
        setChildCourseData(obj2);
     }
 },[currentitems]);
 const handleChange = (event, value) => {
   setCurrentPage(value);
   const startIndex = (value * 6) - 6;
  const endIndex = startIndex + 6;
  const temp= props.subjects.slice(startIndex, endIndex);
  setCurrentItems(temp);
 };

const handleOptionChange=(event)=>{
    setOption(event.target.value);
}

    return (
        <div>
             <Grid container spacing={3}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
    {currentsubjects && currentitems?currentitems.map(item =>  <Subject data={item} />):null}
   {props.subjects? <Pagination count={Math.round(props.subjects.length/6)} page={currentPage} onChange={handleChange} color='primary' style={{margin:'auto'}} />:null}
    </Grid>
    <div style={{display:'flex',justifyContent:'space-between',margin:'20px 85px'}}>
    <FormControl style={{width:'30%'}} >
  <InputLabel >Option</InputLabel>
  <Select
   
    value={option}
    label="Option"
    onChange={handleOptionChange}
  >
    <MenuItem value={'University'}>University</MenuItem>
    <MenuItem value={'Child course'}>Child course</MenuItem>
   
  </Select>
</FormControl>
<Button variant='contained' color='primary' onClick={(event)=>{
    event.preventDefault();
    setView(true);
}}>Generate Chart</Button>
</div>
     { view && universityData&& childCourseData?option=='University'?<Bargraph labels={'University'} xdata={Object.keys(universityData)} ydata={Object.values(universityData)} />:<Bargraph labels={'Child Course'} xdata={Object.keys(childCourseData)} ydata={Object.values(childCourseData)}/>:null}
        </div>
    )
}

export default SubjectMain
