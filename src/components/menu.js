import greencheck from '../svg/greencheck.svg'
import classroomImg from '../img/classroom.jpg'
import React, {useState, useEffect} from 'react'; 
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

var media = ['tv', 'movie', 'ova', 'ona']

function Menu({ setStart, setAnimelist}){
    const [valueForUserId, setValueForUserId] = useState("");
    const [userIdValid, setUserIdValid] = useState(false);
    const [year, setYear] = useState([2002, 2022]);
    const [userId, setUserId] = useState(0);
    const [withRating, setWithRating] = useState(true);
    const [mediaType, setMediaType] = useState(
      new Array(4).fill(true)
    );
    

    const getResponse = async (url, config) => {
      try {
        const response = await axios.get(url, config)
        console.log(response['data'])
        return response['data']
      } catch(err) {
        console.log(err)
        alert(`Failed to get anime from the server`);
        return null
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      let URL = `https://localhost:8080/custom`
      let config = {
        params: {'userId': `${valueForUserId}`}
      }
      let result = await getResponse(URL, config)
      if (result != null)
      {
        setUserIdValid(true)
        setUserId(valueForUserId)
      }
      else
        setUserIdValid(false)
    }

    const handleClassicSubmit = async (event) => {
      event.preventDefault()
      setStart(true);
      // var media = ['tv', 'movie', 'ova', 'ona']
      // var mediaInput = ''

      // let checker = arr => arr.every(v => v === false);

      // if (checker(mediaType)){
      //   alert("Select at least one media type")
      //   return
      // }

      // for (var k in mediaType)
      // {
      //     if (mediaType[k])
      //         mediaInput += '\'' + media[k] + '\''+ ", "
      // }
      // mediaInput = mediaInput.replace(/,\s*$/, "");

      // let URL = `https://localhost:8080/classic`
      // let config = {
      //     params:{
      //                 'year':`${year[0]}, ${year[1]}`,
      //                 'media': `${mediaInput}`
      //             }
      // }
      // let result = await getResponse(URL, config)
      // if (result!= null){
      //   setAnimelist(result)
      //   setStart(true);
      // }
    }

    const handleCustomSubmit = async (event) => {
      event.preventDefault()
      setStart(true);
      // if (!userIdValid){
      //   alert('Please enter a valid MAL userId')
      //   return
      // }

      // let URL = `https://localhost:8080/custom`
      // let config = {
      //     params:{
      //                 'userId':`${userId}`
      //             }
      // }
      // let result = await getResponse(URL, config)
      // if (result!= null){
      //   setAnimelist(result)
      //   setStart(true);
      // }
    }

    const handleChange = (event, newValue) => {
      setYear(newValue);
    };

    const handleChange2 = (pos) => {
      const updatedCheckedState = mediaType.map((item, index) =>
        index === pos ? !item : item
      );
      setMediaType(updatedCheckedState);
    };

    const handleChange3 = () => {
      setWithRating(!withRating);
    };


    function gameMenu()
    {
        return (
            <div className='menu-bg-wrapper'>
                <img className = 'menu-bg' src={classroomImg}/>
                <div className='menu-wrapper'>
                  <div className='menu-wrapper-header'>
                  <h1 className='menu-text'>Anime HigherLower Game</h1>
                  </div>
                  <div className='menu-wrapper-body'>
                    
                    <div className='menu-wrapper-body-option'>
                      <h2 className='menu-text'>select years</h2>
                        <Box theme={theme} sx={{width: 300}}>
                        <Slider
                            theme={theme}
                            value={year}
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
                        { media.map((mType, index)=>{
                          return(
                                  <FormControlLabel control={<Checkbox defaultChecked theme={theme}/>} 
                                    style={{color: 'white'}} 
                                    label = {mType}
                                    checked = {mediaType[index]}
                                    onChange ={() => handleChange2(index)} />
                                )
                        })}
                        </FormGroup>
                        <h2 className='menu-text'>Play by</h2>
                        <FormGroup row> 
                          <FormControlLabel control={<Checkbox defaultChecked theme={theme}/>} style={{color: 'white'}} label="Rating" checked = {withRating} onChange ={() => handleChange3()}/>
                          <FormControlLabel control={<Checkbox defaultChecked theme={theme}/>} style={{color: 'white'}} label="popularity" checked = {!withRating} onChange ={() => handleChange3()}/>
                        </FormGroup>
                    </div>

                    
                    <div className='menu-wrapper-body-option2'>
                    <form style={{margin: 20}} onSubmit={handleSubmit}>
                      <label style={{color: 'white'}}>Enter your MALID:
                        <input 
                          type="text" 
                          value={valueForUserId}
                          onChange={(e) => setValueForUserId(e.target.value)}
                        />
                      </label>
                      <input type="submit" />
                      {userIdValid && <img className ='menu-greencheck' src={greencheck}/>}
                    </form>

                    <Stack style={{margin: 30}}spacing={2} direction="row">
                    <Button variant="contained" theme={theme} onClick={(event)=>{
                          handleClassicSubmit(event)
                          }}>Classic</Button>
                    <Button variant="contained" theme={theme} onClick={(event)=>{
                          handleCustomSubmit(event)
                          }}>Custom</Button>
                  </Stack>
                  </div>
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