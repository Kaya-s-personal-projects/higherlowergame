import dataset from '../top500.json';
import React, {useState, useEffect} from 'react'; 
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'

let animeArray = dataset['data']

function Card(){
    const a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const [anime, setAnime] = useState([a1, a2])
    const [over, setOver] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [score, setScore] = useState(0)
    const [status, setStatus] = useState(0)
    const [showRating, setShowRating] = useState(false)
    let animeSlide = null;

    function answerCorrect()
    {
        setShowRating(true)
        setAnimation(true)
        setStatus(1)
        setTimeout(() => {
            const newAnime = animeArray[Math.floor(Math.random()*animeArray.length)];
            setAnime([anime[1], newAnime]);
            setScore(score+1);
            setShowRating(false)
            setAnimation(false)
            setStatus(0)
        }, 500)
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
                <img src = {anime[1].node.main_picture.large} alt="" className="imageWrapper"/>
            </div>
        )
    }

    function CircleStatus()
    {
        if(status===1){
            return(
                <div className="circle">
                    <div className='correct'/>
                    <h1 className='vs'>VS</h1>
                </div>
            )
        }else if (status === 2){
            return(
                <div className="circle">
                    <div className='wrong'/>
                    <h1 className='vs'>VS</h1>
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
    function GameMenu()
    {
        return (
            <div className='wrapper1'>
            </div>
        )
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
                        {animation && <Animation/>}
                        <img src = {anime[1].node.main_picture.large} alt="" className='imageWrapper'/>

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

export default Card