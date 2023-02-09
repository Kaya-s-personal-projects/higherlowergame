import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'; 
import Game from './components/game'
import Menu from './components/menu'

function App() {

  const [start, setStart] = useState(false);
  const [animeList, setAnimelist] = useState({});

  const changeStart = (data) => {
    setStart(data)
  }


  const changeAnimeList = (data) => {
    setAnimelist(data)
  }

  return (
    <div className="App">
      {!start && <Menu setStart = {changeStart} animeList = {animeList} setAnimelist = {changeAnimeList}/>}
      {start  && <Game setStart = {changeStart}  userAnimeList = {animeList}/>}
    </div>
  );
}

export default App;
