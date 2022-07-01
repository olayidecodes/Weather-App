import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  // To get input value and search
  const [ data, setData ] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fd23e89403073fa672ad071a761220e3`;

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')      
    }
  }

  return (
    <div className="App">
      
      <div className='container'>
        <div className='search'>
          <input 
          placeholder='Enter Location' 
          type='text' 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          />
        </div>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h2>{data.main.temp.toFixed()}°F</h2> : null}
            
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
              <span>Feels Like</span>
            </div>
            <div className='humidity'>
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <span>Humidity</span>
            </div>
            <div className='wind'>
              {data.wind ? <p>{data.wind.speed} MPH</p> : null}
              <span>Wind Speed</span>
            </div>
          </div>
        }


      </div>
    </div>
  );
}

export default App;
