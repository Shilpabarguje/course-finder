import './App.css';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios'
import store from "./redux/store"
import { fetch_subjects } from './redux/Subjects/Subjects/SubjectActions';
import FilterBar from './FilterBar';
import SubjectMain from './SubjectMain';

function App(props) {

  const [subjects, setsubjects] = useState(null);
  const [subjectsOriginal, setSubjectsOriginal] = useState(null);
  const [parents, setparents] = useState(null);
  const [filters, setFilters] = useState(null);
  const [passingsubjects, setPassingSubjects] = useState(null);

  function convert(str) {
    var newDate = new Date(str),
      mnth = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2);
    return [newDate.getFullYear(), mnth, day].join("-");
  }


  let temp = new Set();
  function filter(t) {
    const n = convert(t.date);
    t.date = n;
    console.log(t.date);
    setFilters(t);
  }
  //   useEffect(()=>{
  //     axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
  //    .then((response)=>{
  //     setPassingSubjects(response.data.slice(0,500));
  //      setsubjects(response.data.slice(0,500));

  //     response.data.map(item => temp.add(item['Parent Subject']));
  //     const x=Array.from(temp);

  //     setparents(x);

  //    })

  //  },[]);

  useEffect(() => {
    props.fetchinfo();
  }, [])
  useEffect(() => {
    setPassingSubjects(props.subjects.slice(0, 500));
    setsubjects(props.subjects.slice(0, 500));
    setSubjectsOriginal(props.subjects.slice(0, 500));
    props.subjects.map(item => temp.add(item['Parent Subject']));
    const x = Array.from(temp);
    setparents(x);

  }, [props.subjects])
  useEffect(() => {

    if (filters) {
      if (filters.course && filters.childcourse && filters.selfPaced) {
        const x = subjects.filter(item => item['Parent Subject'] == filters.course
          && item['Child Subject'] == filters.childcourse &&
          (filters.selfPaced && item['Next Session Date'] == 'Self paced'));

        setPassingSubjects(x);
      } else if (filters.course && filters.childcourse) {
        const x = subjects.filter(item => item['Parent Subject'] == filters.course
          && item['Child Subject'] == filters.childcourse);

        setPassingSubjects(x);
      } else if (filters.course && filters.selfPaced) {
        const x = subjects.filter(item => item['Parent Subject'] == filters.course
          && (filters.selfPaced && item['Next Session Date'] == 'Self paced'));

        setPassingSubjects(x);
      } else if (filters.childcourse && filters.selfPaced) {
        const x = subjects.filter(item => item['Child Subject'] == filters.childcourse
          && (filters.selfPaced && item['Next Session Date'] == 'Self paced'));

        setPassingSubjects(x);
      } else if (filters.course) {
        const x = subjects.filter(item => item['Parent Subject'] == filters.course);

        setPassingSubjects(x);
      } else if (filters.childcourse) {
        const x = subjects.filter(item => item['Child Subject'] == filters.childcourse);

        setPassingSubjects(x);
      } else if (filters.selfPaced) {
        const x = subjects.filter(item => (filters.selfPaced && item['Next Session Date'] == 'Self paced'));
        setPassingSubjects(x);
      } else if (filter.date) {
        const x = subjects.filter(item => {
          var filteDateString = item['Next Session Date']
          var replacedDate = filteDateString.replace('nd', '').replace('rd', '').replace('th', '').replace('st', '')
          var filterDate = new Date(replacedDate);
          const stringDate = convert(filterDate);
          if (stringDate == filters.date) {
            return true;
          }
        })
        setPassingSubjects(x);
      } else {
        setPassingSubjects(subjectsOriginal);
      }
    }
    else
      setPassingSubjects(subjectsOriginal);
  }, [filters])



  return (
    <Provider store={store}>
      <div style={{ padding: '1% 2%' }} className='App'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" className='TitleBar' style={{ background: '#1A8DE1' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

              <Typography variant="h4" component="div" style={{ fontWeight: '700', fontFamily: 'Montserrat, sans-serif', color: '#ffffff ' }}>
                Course Finder App
              </Typography>

              <Typography variant='subtitle1' component="div" style={{ fontWeight: '600', fontFamily: 'Montserrat, sans-serif', color: 'yellow' }}>Courses found:
                <span style={{ color: 'pink ' }}>500</span>
              </Typography>



            </Toolbar>
          </AppBar>
        </Box>

        {subjects ? <FilterBar parents={parents} subjects={subjects} filter={filter} /> : null}
        {subjects ? <SubjectMain subjects={passingsubjects} filter={filters} /> : <CircularProgress style={{ positon: 'absolute', top: '50%', left: '50%' }} />}

      </div>
    </Provider>
  );
}
const mapStatetoProps = state => {
  return {
    subjects: state.subjects
  }

}

const mapDispatchtoProps = dispatch => {
  return {
    fetchinfo: () => { dispatch(fetch_subjects()) }
  }

}

export default connect(mapStatetoProps, mapDispatchtoProps)(App)
// export default App;
