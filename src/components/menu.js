import top500list from '../top500.json';
import animelist from '../animelist.json';
import greencheck from '../svg/greencheck.svg'
import classroomImg from '../img/classroom.jpg'
import React, {useState, useEffect} from 'react'; 
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'

import axios from 'axios';

import { createTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bdbdbd',
    },
    secondary: {
      main: '#bdbdbd'
    }
  }
});

function Menu({setStart, setGameMode, setYear, setUserId}){
    const [valueForUserId, setValueForUserId] = useState("");
    const [validUserId, setValidUserId] = useState(false);
    const [valueForYear, setValueForYear] = useState([2002, 2022]);

    const getResponse = async (url, config) => {
      try {
           const response = await axios.get(url, config)
           console.log(response.data)
           if (response.status === 200)
            setValidUserId(true)
           else{
            setValidUserId(false)
            alert('User id is not found or server is currently offline.')
           }
      } catch(err) {
           console.log('err')
           setValidUserId(false)
           alert('User id is not found or server is currently offline.')
      }
 }

    const handleSubmit = (event) => {
      event.preventDefault();
      let URL = `http://localhost:8080/custom`
      let config = {
        params: {'userId': valueForUserId}
      }
      getResponse(URL, config)
    }
    
    const handleChange = (event, newValue) => {
      setValueForYear(newValue);
  };


    function gameMenu()
    {
        return (
            <div className='menu-wrapper'>
                <img className = 'menu-bg' src={classroomImg}/>
                <div className='menu-wrapper2'>
                  <div className='menu-wrapper2-header'>
                    <h1 className='menu-text'>Anime HigherLower Game</h1>
                  </div>
                  <div className='menu-wrapper2-body'>
                  <h2 className='menu-text'>select years</h2>
                  <Box theme={theme} sx={{width: 300}}>
                  <Slider
                      theme={theme}
                      value={valueForYear}
                      step={1}
                      marks
                      min={2005}
                      max={2022}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                    />
                    </Box>
                    <h2 className='menu-text'>select media types</h2>
                    <FormGroup row> 
                      <FormControlLabel control={<Checkbox defaultChecked theme={theme}/>} style={{color: 'white'}} label="TV" />
                      <FormControlLabel control={<Checkbox defaultChecked theme={theme}/>} style={{color: 'white'}} label="MOVIE"/>
                      <FormControlLabel control={<Checkbox defaultChecked theme={theme}/>} style={{color: 'white'}} label="OVA/ONA" />
                    </FormGroup>

                    <form style={{margin: 20}} onSubmit={handleSubmit}>
                      <label style={{color: 'white'}}>Enter your MALID:
                        <input 
                          type="text" 
                          value={valueForUserId}
                          onChange={(e) => setValueForUserId(e.target.value)}
                        />
                      </label>
                      <input type="submit" />
                      {validUserId && <img className ='menu-greencheck' src={greencheck}/>}
                    </form>

                    <Stack style={{margin: 30}}spacing={2} direction="row">
                    <Button variant="contained" theme={theme} onClick={()=>{
                                setStart(true);
                                setGameMode('classic')
                                setYear(valueForYear)
                            }}>Classic</Button>
                    <Button variant="contained" theme={theme} onClick={()=>{
                                setStart(true);
                                setGameMode('custom')
                            }}>Custom</Button>
                  </Stack>
                  </div>
                </div>
              </div>
        )
    }

    return(
        <div>
            {gameMenu()}
        </div>
    )
}

export default Menu