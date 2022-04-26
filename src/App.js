import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
var geolocation = require('geolocation');
import axios from 'axios';

function App() {
  const [currentLocationLat,setCurrentlocationLat] = useState('');
  const [currentLocationLong,setCurrentlocationLong] = useState('');
  const [searchLocation,setsearchlocation] = useState('');

  useEffect(() => {
    geolocation.getCurrentPosition(function (err, position) {
      if (err){
        alert(err);
      } else{
        console.log(position)
        setCurrentlocationLat(position.coords.latitude)
        setCurrentlocationLong(position.coords.longitude)
      }
    })
    const fetchCurrentLocationWeather= async()=>{
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat={currentLocationLat}&lon={currentLocationLong}&appid={API key}`)
      
    }

    fetchCurrentLocationWeather();

  }, [])


  return (
   <>
   
   </>
  );
}

export default App;
