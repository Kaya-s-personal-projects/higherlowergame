import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'; 
import Game from './components/game'
import Menu from './components/menu'

function App() {

  const [start, setStart] = useState(false);

  const menuToApp = (menuData) => {
    setStart(menuData)
  }

  const gameToApp = (gamedata) => {
    setStart(gamedata[0])
    setStart(gamedata[1])
  }

  return (
    <div className="App">
      {!start && <Menu menuToApp = {menuToApp}/>}
      {start  && <Game gameToApp = {gameToApp}/>}
    </div>
  );
}

export default App;
