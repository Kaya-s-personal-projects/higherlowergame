import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'; 
import Game from './components/game'
import Menu from './components/menu'

function App() {

  const [start, setStart] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [year, setYear] = useState([2000,2022]);
  const [media, setMedia] = useState([""]);
  const [userId, setUserId] = useState(0);

  const changeStart = (data) => {
    setStart(data)
  }

  const changeGameMode = (data) => {
    setGameMode(data)
  }

  const changeYear = (data) => {
    setGameMode([data[0], data[1]])
  }

  return (
    <div className="App">
      {!start && <Menu setStart = {changeStart} gameMode = {gameMode} setGameMode = {changeGameMode} 
      year = {year} setYear = {changeYear} userId = {userId} setUserId = {setUserId}/>}
      {start  && <Game setStart = {changeStart} gameMode = {gameMode} year = {year} userId = {userId}/>}
    </div>
  );
}

export default App;
