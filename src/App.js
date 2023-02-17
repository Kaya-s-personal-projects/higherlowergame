import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'; 
// import MobileGame from './components/game-mobile'
import Game from './components/game'
import Menu from './components/menu'
import { useMediaQuery } from 'react-responsive';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


function App() {

  const [start, setStart] = useState(false);
  const [animeList, setAnimelist] = useState({});
  const [playBy, setPlayBy] = useState('popularity');
  const [gameMode, setGameMode] = useState('classic');
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const changeStart = (data) => {
    setStart(data)
  }


  const changeAnimeList = (data) => {
    setAnimelist(data)
  }

  const changePlayBy = (data) => {
    setPlayBy(data)
  }

  const changeGameMode = (data) => {
    setGameMode(data)
  }


  return (
    <div className="App">
      {!start && <Menu setStart = {changeStart} animeList = {animeList} setPlayBy = {changePlayBy} setAnimelist = {changeAnimeList} setGameMode={changeGameMode}/>}
      {start  && <Game setStart = {changeStart}  userAnimeList = {animeList} isMobile = {isMobile} playBy = {playBy} gameMode = {gameMode}/>}
    </div>
  );
}

export default App;
