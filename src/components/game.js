import animelist from '../animelistFrom2010.json';
import placeholder from '../animePlaceholder.json';
import checksvg from '../svg/check.svg'
import closesvg from '../svg/close.svg'
import React, {useRef, useState, useEffect} from 'react'; 
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'


import { createTheme } from '@mui/material/styles';
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

var animeArray = animelist//anime TV shows

function Game({setStart, userAnimeList, isMobile}){
    const [over, setOver] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [score, setScore] = useState(0)
    const [status, setStatus] = useState(0)
    const [showRating, setShowRating] = useState(false)
    const [animeBuffer, setAnimeBuffer] = useState(null)
    var a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
    var a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const [anime, setAnime] = useState([a1, a2])

    const initRef = useRef(false);
    const threshold = 0.1
    // useEffect(() => {

    //     if (initRef.current) return;
    //     initRef.current = true;
    //     animeArray = userAnimeList
    //     var a1, a2;
    //     do
    //     {
    //         a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
    //         a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
    //     }while(a1['malId'] === a2['malId'] || Math.abs(a1['mean'] - a2['mean']) <= threshold)
    //     setAnime([a1,a2])
    //   }, []);


    const answerCorrect = () => {
    
        setShowRating(true)
        let animeBuffer = anime[1]
        setAnimeBuffer(animeBuffer)
        setStatus(1)
        let newAnime
        do{
            newAnime = animeArray[Math.floor(Math.random()*animeArray.length)]
        }while(newAnime['malId'] === anime[1]['malId'] || Math.abs(newAnime['mean'] - anime[1]['mean']) <= threshold)
        
        setTimeout(() => {
            setAnimation(true)
            setAnime([anime[0], newAnime]);
            setShowRating(false)
            setStatus(0)
        },800)

        setTimeout(() => {
            setScore(score+1);
            setAnimation(false)
            setAnime([animeBuffer, newAnime]);
        }, 1200)
    }

    function answerWrong()
    {
        setStatus(2)
        setShowRating(true)
        setTimeout(() => {
            setShowRating(false)
            setStatus(0)
            setOver(true)
        }, 1500)
    }

    function Counter()
    {
        return (
            <CountUp className = "rating" end={anime[1].mean} decimals={2} duration={0.4}/>
        )
    }

    function Animation()
    {
        return(
            <div className={isMobile ?  'imageWrapper-animate-mobile' : 'imageWrapper-animate-desktop'}>
                <img src = {animeBuffer.main_picture_large} alt="" className={isMobile ? "image-wrapper-mobile" : "image-wrapper-desktop"}/>
            </div>
        )
    }

    function CircleStatus()
    {
        if(status===1){
            return(
                    <div className={isMobile ? "circle-mobile" :"circle-desktop"}>
                        <div className='correct'/>
                        <motion.div
                            className = 'svg'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                        }}
                        >
                        <img className = 'svg' src={checksvg}/>
                        </motion.div>
                    </div>

            )
        }else if (status === 2){
            return(
                <div className={isMobile ? "circle-mobile" :"circle-desktop"}>
                    <div className='wrong'/>
                    <motion.div
                        className = 'svg'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                            
                    }}>
                    <img className = 'svg' src={closesvg}/>
                    </motion.div>
                </div>
            )
        }else{
            return(
                <div className={isMobile ? "circle-mobile" :"circle-desktop"}>
                    <h1 className='vs'>VS</h1>
                </div>
            )
        }
    }

    function reset()
    {
        setScore(0)
        setOver(false)
        var a1, a2;
        do
        {
            a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
            a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
        }while(a1['malId'] === a2['malId'] || Math.abs(a1['mean'] - a2['mean']) <= threshold)
        setAnime([a1, a2])
    }

    function displayAnime(){
            return (
                <div className={isMobile ? 'game-wrapper-mobile':'game-wrapper-deskop'}>
                    <div class={isMobile ? 'game-card-wrapper-mobile' : 'game-card-wrapper-desktop'}>
                        <img src = {anime[0].main_picture_large} alt="" className={isMobile ? 'image-wrapper-mobile' : 'image-wrapper-desktop'}/>
                        <div class="text-wrapper">
                        <h1>"{anime[0].title}"</h1><h2> is rated </h2>
                         <div className = "rating">{anime[0].mean.toFixed(2)}</div>
                         <h2> on MyAnimeList</h2>
                        </div>
                    </div>

                    <div class={isMobile ? 'game-card-wrapper-mobile' : 'game-card-wrapper-desktop'}>
                        <img src = {anime[1].main_picture_large} alt="" className={isMobile ? 'image-wrapper-mobile' : 'image-wrapper-desktop'}/>
                        {animation && <Animation/>}

                        <div class="text-wrapper">
                        <h1>"{anime[1].title}"</h1>
                        { showRating && <Counter/>}
                        {/* <h2 className = "rating">{anime[1].mean.toFixed(2)}</h2> */}
                        <button className="btn1" onClick={()=>{
                            anime[1].mean >= anime[0].mean ? answerCorrect() : answerWrong()
                        }}>Higher<div className='arrow-up'></div></button>
                        <button className="btn1"onClick={()=>{
                            anime[1].mean <= anime[0].mean ? answerCorrect() : answerWrong()
                        }}>Lower<div className='arrow-down'></div></button>
                        </div>
                    </div>
                    <CircleStatus/>
                    <div className="bottom-left">
                        <h1 className='score'>Score: {score}</h1>
	                </div>
                </div>
            )
        }

    function gameOver(){
        return (
                <div className="lost-overlay">
                    <div className="lost-box">
                    <h1 style={{color: '#f1f1f1'}}>You Lost</h1>
                    <h2 style={{color: '#f1f1f1'}}>Your score is {score}</h2>
                    <Stack style={{margin: 30}}spacing={2} direction="row">
                        <Button variant="contained" theme={theme} onClick={()=>{
                            reset()
                                }}>Retry</Button>
                        <Button variant="contained" theme={theme} onClick={()=>{
                            setStart(false)
                                }}>Return</Button>
                    </Stack>
                    </div>
                    </div> 
            )
    }

    return (
        <div className='App'>
            {displayAnime()}
            {over === true ? gameOver():null}
        </div>
        )
}

export default Game