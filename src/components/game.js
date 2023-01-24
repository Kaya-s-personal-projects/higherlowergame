import top500list from '../top500.json';
import animelist from '../animelist.json';
import checksvg from '../svg/check.svg'
import closesvg from '../svg/close.svg'
import classroomImg from '../img/classroom.jpg'
import React, {useState, useEffect} from 'react'; 
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'

let animeArray = animelist//2200 anime TV shows

function Game({gameToApp}){
    const a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const [anime, setAnime] = useState([a1, a2])
    const [over, setOver] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [score, setScore] = useState(0)
    const [status, setStatus] = useState(0)
    const [showRating, setShowRating] = useState(false)
    const [animeBuffer, setAnimeBuffer] = useState(null)

    function answerCorrect()
    {
        setShowRating(true)
        let animeBuffer = anime[1]
        setAnimeBuffer(animeBuffer)
        setStatus(1)
        const newAnime = animeArray[Math.floor(Math.random()*animeArray.length)];
        
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
            <CountUp className = "rating" end={anime[1].node.mean} decimals={2} duration={0.4}/>
        )
    }

    function Animation()
    {
        return(
            <div className='imageWrapper-animate'>
                <img src = {animeBuffer.node.main_picture.large} alt="" className="imageWrapper"/>
            </div>
        )
    }

    function CircleStatus()
    {
        if(status===1){
            return(
                <div className="circle">
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
                <div className="circle">
                    <div className='wrong'/>
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
                    <img className = 'svg' src={closesvg}/>
                    </motion.div>
                </div>
            )
        }else{
            return(
                <div className="circle">
                    <h1 className='vs'>VS</h1>
                </div>
            )
        }
    }

    function startGame()
    {
        setScore(0)
        setOver(false)
        const a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
        const a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
        setAnime([a1, a2])
    }

    function displayAnime(){
            return (
                <div className='wrapper1'>
                    <div class='wrapper2'>
                        <img src = {anime[0].node.main_picture.large} alt="" className='imageWrapper'/>
                        <div class="text-wrapper">
                        <h1>"{anime[0].node.title}"</h1><h2> is rated </h2>
                         <div className = "rating">{anime[0].node.mean}</div>
                         <h2> on MyAnimeList</h2>
                        </div>
                    </div>

                    <div class="wrapper2">
                        <img src = {anime[1].node.main_picture.large} alt="" className='imageWrapper'/>
                        {animation && <Animation/>}

                        <div class="text-wrapper">
                        <h1>"{anime[1].node.title}"</h1>
                        { showRating && <Counter/>}
                        {/* <h2 className = "rating">{anime[1].node.mean}</h2> */}
                        <button className="btn1" onClick={()=>{
                            anime[1].node.mean >= anime[0].node.mean ? answerCorrect() : answerWrong()
                        }}>Higher<div className='arrow-up'></div></button>
                        <button className="btn2"onClick={()=>{
                            anime[1].node.mean <= anime[0].node.mean ? answerCorrect() : answerWrong()
                        }}>Lower<div className='arrow-down'></div></button>
                        </div>
                    </div>
                    <CircleStatus/>
                    <div className="bottom-left">
                        <h2 className='score'>Score: {score}</h2>
	                </div>
                </div>
            )
        }

        function gameOver(){
        return (
            <div className="lost-overlay">
                <div className="lost-box">
                <h1>You Lost</h1>
                <h2>Your score is {score}</h2>
                <button className="btn3" onClick={()=>{ 
                    startGame()
                        }}>Retry</button>
                <button className="btn3" onClick={()=>{ 
                    gameToApp(false)
                        }}>Return</button>
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