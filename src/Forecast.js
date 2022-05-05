import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import { ForecastList } from './components/ForecastList';
import axios from 'axios';
const apiKey = process.env.REACT_APP_ACCESS_KEY;
const Forecast = () => {
  const location = useLocation();
  const { forecastlong } = location.state
  const { forecastlat } = location.state

  // console.log(forecastlong);
  // console.log(forecastlat);

  useEffect(() => {
    if (forecastlong !== null &&forecastlat !== null) {
      const fetchCurrentLocationForecast= async()=>{
        const getCurrentCity = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${forecastlat}&longitude=${forecastlong}&localityLanguage=en`)
        var searchCity = getCurrentCity.data.city;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`)
        console.log(result);
       }

       fetchCurrentLocationForecast();
    } else {

    }


  }, [])
  

  return (
    <div>Forecast</div>
  )
}

export default Forecast