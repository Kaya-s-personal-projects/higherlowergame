import animelist from '../animelistFrom2002.json';
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
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


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

function Game({setStart, userAnimeList, isMobile, playBy, gameMode}){
    const [over, setOver] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [score, setScore] = useState(0)
    const [gameStatus, setGameStatus] = useState("")
    const [showRating, setShowRating] = useState(false)
    const [animeBuffer, setAnimeBuffer] = useState(null)
    var a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
    var a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const [anime, setAnime] = useState([a1, a2])
    const [timer, setTimer] = useState(true)
    const [timerKey, setTimerKey] = useState(0)
    const [timerDuration, setTimerDuration] = useState(10)
    const [maxScore, setMaxScore] = useState(0)
    const [bottonDisable, setBottonDisable] = useState(false)

    const initRef = useRef(false);
    const threshold = 0.1
    
    useEffect(() => {

        if (initRef.current) return;
        initRef.current = true;
        animeArray = userAnimeList
        var a1, a2;
        do
        {
            a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
            a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
        }while(a1['malId'] === a2['malId'] || Math.abs(a1['mean'] - a2['mean']) <= threshold)
        setAnime([a1,a2])
      }, []);


    const answerCorrect = () => {
        setBottonDisable(true)
        setTimer(false)

        setShowRating(true)
        let animeBuffer = anime[1]
        setAnimeBuffer(animeBuffer)
        setGameStatus("correct")
        let newAnime
        do{
            newAnime = animeArray[Math.floor(Math.random()*animeArray.length)]
        }while(newAnime['malId'] === anime[1]['malId'] || Math.abs(newAnime['mean'] - anime[1]['mean']) <= threshold)
        
        setTimeout(() => {
            setAnimation(true)
            setAnime([anime[0], newAnime]);
            setShowRating(false)
        },800)

        setTimeout(() => {
            setScore(score+1);
            setAnimation(false)
            setAnime([animeBuffer, newAnime]);
            if(timerKey>=19)
                setTimerDuration(5)
            else if(timerKey>=9)
                setTimerDuration(7)
            else
                setTimerDuration(10)
            setTimerKey(timerKey+1);//restart timer
            setTimer(true);//restart animation
            setBottonDisable(false)
            setGameStatus("")
        }, 1200)
    }

    function answerWrong()
    {
        setBottonDisable(true)
        setTimer(false)
        setGameStatus("wrong")
        setShowRating(true)
        setTimeout(() => {
            setShowRating(false)
            setGameStatus("")
            setBottonDisable(false)
            setOver(true)
        }, 1500)
    }

    function Counter()
    {
        if (playBy === "rating")
            return (
                <CountUp className = "rating" end={anime[1].mean} decimals={2} duration={0.4}/>
            )
        else if (playBy === "popularity")
        return (
            <CountUp className = "rating" end={anime[1].num_list_users} duration={0.4}/>
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

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too lale...</div>;
        }
      
        return (
          <div className="timer">
            <h1>{remainingTime}</h1>
          </div>
        );
      };

    function showInGameStatus()
    {
        if (gameStatus==="correct"){
            return(
                <div className={isMobile ? "circle-mobile" :"circle-desktop"}>
                    <div className={isMobile ? "correct-mobile" :"correct-desktop"}/>
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
        }
        else if (gameStatus==="wrong")
        {
            return(
                <div className={isMobile ? "circle-mobile" :"circle-desktop"}>
                <div className={isMobile ? "wrong-mobile" :"wrong-desktop"}/>
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
        }
        else{
            if (gameMode==='classic'){
                return(
                    <div className={isMobile ? "circle-mobile" :"circle-desktop"}>
                            <h1 className='vs'>VS</h1>
                        </div>  
                )
            }
        }
        
    }

    function showTimer(){
        if (gameMode==='clock'){
            return(
                <div className="timer-wrapper">
                <CountdownCircleTimer
                key={timerKey}
                size={84}
                strokeWidth={8}
                isPlaying={timer}
                duration={timerDuration}
                colors={["#6ef3b7" , "#f4483f", "#A30000"]}
                trailColor = {'rgba(52, 52, 52, 0.0)'}
                isSmoothColorTransition = {false}
                colorsTime={[ 10, 3, 0]}
                onComplete={() => (answerWrong())}
                >
                {gameStatus === "" && renderTime}
                </CountdownCircleTimer>
            </div>
            )
        }
    }

    function showRatingOrUser() {
        if (playBy === "rating")
            return(<div><h2> is rated </h2>
                <div className = "rating">{anime[0].mean.toFixed(2)}</div>
                <h2> on MyAnimeList</h2>
                </div>)
        else if (playBy === "popularity")
            return(<div><h2> has </h2>
                <div className = "rating">{anime[0].num_list_users}</div>
                <h2>list users on MyAnimeList</h2>
                </div>)
    }

    function reset()
    {
        var a1, a2;
        do
        {
            a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
            a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
        }while(a1['malId'] === a2['malId'] || Math.abs(a1['mean'] - a2['mean']) <= threshold)
        setAnime([a1, a2])
        setTimerKey(timerKey+1);
        setTimer(true);
        setScore(0)
        setOver(false)
    }



    function displayAnime(){
            return (
                <div className={isMobile ? 'game-wrapper-mobile':'game-wrapper-deskop'}>
                    <div class={isMobile ? 'game-card-wrapper-mobile' : 'game-card-wrapper-desktop'}>
                        <img src = {anime[0].main_picture_large} alt="" className={isMobile ? 'image-wrapper-mobile' : 'image-wrapper-desktop'}/>
                        <div class={isMobile ? 'text-wrapper-mobile' : 'text-wrapper-desktop'}>
                        <h1>"{anime[0].title}"</h1>
                            {showRatingOrUser()}
                        </div>
                    </div>

                    <div class={isMobile ? 'game-card-wrapper-mobile' : 'game-card-wrapper-desktop'}>
                        <img src = {anime[1].main_picture_large} alt="" className={isMobile ? 'image-wrapper-mobile' : 'image-wrapper-desktop'}/>
                        {animation && <Animation/>}

                        <div class={isMobile ? 'text-wrapper-mobile' : 'text-wrapper-desktop'}>
                        <h1>"{anime[1].title}"</h1>
                        { showRating && <Counter/>}
                        {/* <h2 className = "rating">{anime[1].mean.toFixed(2)}</h2> */}
                        <button className="btn1" disabled={bottonDisable} onClick={()=>{
                            if(playBy === "rating")
                                anime[1].mean >= anime[0].mean ? answerCorrect() : answerWrong()
                            else if (playBy=== "popularity")
                                anime[1].num_list_users >= anime[0].num_list_users ? answerCorrect() : answerWrong()
                        }}>Higher<div className='arrow-up'></div></button>
                        <button className="btn1" disabled={bottonDisable} onClick={()=>{
                            if(playBy === "rating")
                                anime[1].mean <= anime[0].mean ? answerCorrect() : answerWrong()
                            else if (playBy=== "popularity")
                                anime[1].num_list_users <= anime[0].num_list_users ? answerCorrect() : answerWrong()
                        }}>Lower<div className='arrow-down'></div></button>
                        </div>
                    </div>
                    {showTimer()}
                    {showInGameStatus()}

                    <div className="bottom-left">
                        <h1 className='score'>Score: {score}</h1>
	                </div>
                </div>
            )
        }

    function gameOver(){
        if (score > maxScore)
            setMaxScore(score)
        return (
                <div className="lost-overlay">
                    <div className="lost-box">
                    <h1>You Lost</h1>
                    <h2>Your score is {score}</h2>
                    <h3>Highest score: {maxScore}</h3>
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