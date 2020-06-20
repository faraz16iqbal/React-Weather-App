import React, {useState} from 'react';
import './App.css';
// import axios from 'axios';

const api = {
  key: "6b0a19a80f99994855134531bb604c8d",
  base: "http://api.openweathermap.org/data/2.5/"
} 

function App() {
  // let url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=6b0a19a80f99994855134531bb604c8d";
  // axios
  //   .get(url)
  //   .then(response => {
  //     console.log(response)
  //   });

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json()) //convert data to json
        .then(result => {
          setWeather(result);
          setQuery(' '); 
          console.log(result);
        });
    }
  }


    const dateBuilder= (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()
    
    return `${day} ${date} ${month} ${year}`
  }

  // const typeofweather = null;
  // if (weather.weather[0].main ==='Rain'){
  //   typeofweather = "app rain";
  // }  
  
  // else if(weather.weather[0].main ==='Clouds'){
  //   typeofweather = "app cloud";

  // }
  
  // else if (weather.main.temp > 16){
  //   typeofweather = "app warm"
  // }
  // else{
  //   typeofweather = "app cold"
  // }
  let intro = <div className='intro'> Weather App</div>;

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search...'
            className='search-bar' 
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}/>
          </div>
            {(typeof weather.main != "undefined") ? (
            <div>  
              <div>
                <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
                  <div className='date'>{dateBuilder(new Date())}</div>
                </div>
                <div className='weather-box'>
                  <div className='temp'>
                    {Math.round(weather.main.temp)}°
                  </div>
                  <div className='weather'>{weather.weather[0].main !=='Rain' ? weather.weather[0].main : 'Rainy'}</div>
                </div>
                </div>
              </div>  
           ) : intro}
      </main>
    </div>
  );
}

export default App;
