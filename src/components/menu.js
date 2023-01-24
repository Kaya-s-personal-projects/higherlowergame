import top500list from '../top500.json';
import animelist from '../animelist.json';
import checksvg from '../svg/check.svg'
import closesvg from '../svg/close.svg'
import classroomImg from '../img/classroom.jpg'
import React, {useState, useEffect} from 'react'; 
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'
import axios from 'axios';


function Menu({menuToApp}){
    const [data, setData] = useState([]);
    const [start, setStart] = useState(false);
    const [id, setID] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      let URL = `https://api.myanimelist.net/v2/users/${id}/animelist`
      let config = {
            headers:{
                      'X-MAL-CLIENT-ID': '71e68793ac5be0b8111dfe32daa70bd1',
                    },

            params:{'sort': 'list_score',
                    'limit': '1000'
                    }
      }
      axios.get(URL, config)
      .then((response)=>{setData(response.data)})
      .catch(function (error) {
        console.log(error.toJSON());
      });
      console.log(data)
      //alert(`The name you entered was: ${data.status_code}`);
    }

    function gameMenu()
    {
        return (
            <div className='menuWrapper'>
                <img className = 'menu-bg' src={classroomImg}/>
                <div className='menuWrapper2'>
                <h1 className='menu-text'>Anime HigherLower Game</h1>
                <button className='btn3' onClick={()=>{
                            // setStart(true);
                            menuToApp(true);
                        }}>classic</button>
                <button className='btn3'>custom MAL</button>
                <form onSubmit={handleSubmit}>
      <label style={{color: 'white'}}>Enter your MALID:
        <input 
          type="text" 
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>           
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