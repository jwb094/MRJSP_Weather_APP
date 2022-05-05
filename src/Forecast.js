import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import { ForecastList } from './components/ForecastList';
import axios from 'axios';
import { Row,Col } from 'react-bootstrap';
const apiKey = process.env.REACT_APP_ACCESS_KEY;
function Forecast () {
  var todayDate = new Date();
  todayDate = todayDate.toISOString().split('T')[0];
  const [currentLocationLat,setCurrentlocationLat] = useState('');
  const [currentLocationLong,setCurrentlocationLong] = useState('');
  const [currentLocForecast,setcurrentLocForecast] = useState([]);
  const [todayForecast,settodayForecast] = useState([]);
  const location = useLocation();
  


  useEffect(() => {
   if (!location) { //If user click button
    const { forecastlong } = location.state
    const { forecastlat } = location.state
      const fetchCurrentLocationForecast= async()=>{
        const getCurrentCity = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${forecastlat}&longitude=${forecastlong}&localityLanguage=en`)
        var searchCity = getCurrentCity.data.city;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`)
        setcurrentLocForecast(result.data.list);
        //console.log(result.data.list);
       }

       fetchCurrentLocationForecast();
       setTodaysAndFutureForecast(currentLocForecast);
    } else { // User must click allow for geolocation
      navigator.geolocation.getCurrentPosition(function(position) {

        setCurrentlocationLat(position.coords.latitude);
        setCurrentlocationLong(position.coords.longitude)
      })

      const fetchCurrentLocationForecast= async()=>{
        const getCurrentCity = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentLocationLat}&longitude=${currentLocationLong}&localityLanguage=en`)
        var searchCity = getCurrentCity.data.city;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`)
        setcurrentLocForecast(result.data.list);
        //console.log(currentLocForecast);
       }

       fetchCurrentLocationForecast();
       setTodaysAndFutureForecast(currentLocForecast);
    }


  }, [location])
  //console.log(currentLocForecast);
  function setTodaysAndFutureForecast(data){
    const TodaysForecast = [];
    for (let index = 0; index < data.length; index++) {
      // const element = array[index];
      //console.log(data[index]);
        let date = data[index].dt_txt;
        date = date.split(' ');
        date = date[0];
      if (todayDate === date) {
        TodaysForecast.push(data[index]);
        data.splice(data.length, 1, data[index]);
      } 

    }
    

  }

  //const TodaysForecast = '';
  console.log(todayForecast);
  console.log(currentLocForecast);

  return (
    <Row>
    <Col md={12}>
    <ForecastList/>
    </Col>
    </Row>
  
  )
}

export default Forecast