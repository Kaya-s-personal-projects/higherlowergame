import dataset from '../top500.json';
import React, {useState, useEffect} from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'

let animeArray = dataset['data']

function Card(){
    const a1 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const a2 = animeArray[Math.floor(Math.random()*animeArray.length)]
    const [over, setOver] = useState(false)
    const [move, setMove] = useState(false)
    const [score, setScore] = useState(0)
    const [anime, setAnime] = useState([a1, a2])

    function answerCorrect()
    {
        const newAnime = animeArray[Math.floor(Math.random()*animeArray.length)];
        setAnime([anime[1], newAnime]);
        setScore(score+1);
    }

    function answerWrong()
    {
        setOver(true)
    }

    function displayAnime(){
            return (
                <div className='movie-bg'>
                    <div class="container">
                        <img src = {anime[0].node.main_picture.large} alt="" className="movie"/>
                        <div class="text-wrapper">
                        <h2>{anime[0].node.title} has a </h2>
                         <h2 className = "rating">{anime[0].node.mean}</h2>
                         <h2> rating on MyAnimeList</h2>
                        </div>
                    </div>

                    <div class="container">
                        <img src = {anime[1].node.main_picture.large} alt="" className="movie"/>
                        <div class="text-wrapper">
                        <h2>{anime[1].node.title}</h2>
                        <h2 className = "rating">{anime[1].node.mean}</h2>
                         <h2> rating on MyAnimeList</h2>
                        <button className="btn1" onClick={()=>{
                            anime[1].node.mean >= anime[0].node.mean ? answerCorrect() : answerWrong()
                        }}>Higher<div className='arrow-up'></div></button>
                        <button className="btn2"onClick={()=>{
                            anime[1].node.mean <= anime[0].node.mean ? answerCorrect() : answerWrong()
                        }}>Lower<div className='arrow-down'></div></button>
                        </div>
                    </div>
                    <div className="circle">
                        <h1 className='VS'>VS</h1>
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

//require("../img/hibike.jpg")

{/* <motion.div className='section1'
initial={{ x: "50vw" }}
animate={{ x: move ? "0vw": "50vw" }}
transition={{ duration: 0.5 }}
onClick={()=>{
    setMove(!move);
    console.log("clicked")
}}
>
<img src = {require("../img/hibike.jpg")} alt="" className="movie-bg"/>
</motion.div> */}