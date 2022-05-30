import React from 'react'

import {Card,CardActions,CardContent,Typography,Button,Grid} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange'
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles({
  button:{
  
    '&:hover': {
        backgroundColor: '#1A8DE1',
        color: '#ffffff',
    },
  },
 
});
function Subject(props) {
    const classes=useStyles();
    
    return (
        <Grid item xs={4} style={{height:'428px'}}>
      <Card style={{fontFamily: 'Montserrat, sans-serif',width:'100%',height:'100%',position:'relative',padding:'0px'}}>
          <CardContent>
            <div style={{display:'flex',justifyContent:'space-between',color:'#2E86C1',fontFamily:'Montserrat, sans-serif',fontWeight:'400'}}>
                <p>{props.data['Course Id']}</p>
                <p><DateRangeIcon /> {props.data['Next Session Date']}</p>
            </div>
            <Typography variant='body1' style={{color:'#647380',fontFamily:'Montserrat, sans-serif'}}>Provider</Typography>
            <Typography variant='h6' style={{color:' #707B7C',fontFamily:'Montserrat, sans-serif',fontWeight:'600'}}>{props.data['Provider']}</Typography>
            <Typography variant='body1'  style={{color:'#647380',fontFamily:'Montserrat, sans-serif'}}>Course Name</Typography>
            <Typography variant='h6' style={{color:'#2471A3',fontFamily:'Montserrat, sans-serif',fontWeight:'800'}}>{props.data['Course Name']}</Typography>
            <Typography variant='body1'  style={{color:'#647380',fontFamily:'Montserrat, sans-serif'}}>{props.data['Universities/Institutions']!=""?"Universities/Institutions":""}</Typography>
            <Typography variant='h6' style={{color:'#27AE60',fontFamily:'Monteserrat, sans-serif',fontWeight:'600'}}>{props.data['Universities/Institutions']!=""?props.data['Universities/Institutions']:""}</Typography>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                <Typography variant='body1'  style={{color:'#647380',fontFamily:'Montserrat, sans-serif'}}>Parent Subject</Typography>
            <Typography variant='body1' style={{color:' #707B7C',fontFamily:'Montserrat, sans-serif',fontWeight:'600'}}>{props.data['Parent Subject']}</Typography>
                </div>
                <div>
                <Typography variant='body1'  style={{color:'#647380',fontFamily:'Montserrat, sans-serif'}}>Child Subject</Typography>
            <Typography variant='body1' style={{color:' #707B7C',fontFamily:'Montserrat, sans-serif',fontWeight:'600'}}>{props.data['Child Subject']}</Typography>
                </div>
            </div>
          </CardContent>
          <CardActions>
          <Button  style={{color:'#1A8DE1',
    fontFamily: 'Montserrat, sans-serif',position:'absolute',bottom:0}} href={props.data['Video(Url)']} fullWidth>Learn More</Button>
          </CardActions>
      </Card>
      </Grid>
    )
}

export default Subject
