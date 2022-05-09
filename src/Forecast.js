import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import { ForecastList } from './components/ForecastList';
import TodayForecastList  from './components/TodayForecastList';
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
  const [prospectForecast,setprospectForecast] = useState([]);
  const location = useLocation();
  


  useEffect(() => {
    //console.log(location.state);
   if (location.state != null) { //If user click button
 
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
       // console.log(position);
        setCurrentlocationLat(position.coords.latitude);
        setCurrentlocationLong(position.coords.longitude)
      })

      const fetchCurLocationForecast= async()=>{
        const getCurrentCity = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentLocationLat}&longitude=${currentLocationLong}&localityLanguage=en`)
        var searchCity = getCurrentCity.data.city;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`)
        setcurrentLocForecast(result.data.list);
        //console.log(currentLocForecast);
       }

       fetchCurLocationForecast();
       setTodaysAndFutureForecast(currentLocForecast);
    }


  }, [location])
  //console.log(currentLocForecast);
  function setTodaysAndFutureForecast(data){
   // console.log(data);
    const TodaysForecast = [];
    const FutureForecast = [];
    for (let index = 0; index < data.length; index++) {
      // const element = array[index];
      //console.log(data[index]);
        let date = data[index].dt_txt;
        date = date.split(' ');
        date = date[0];
      if (todayDate === date) {
        TodaysForecast.push(data[index]);
      } else {
        FutureForecast.push(data[index]);
      }

    }

    var prospectArr = [];
    var size = 8;
    for(var i = 0; i < FutureForecast.length; i += size) {
      prospectArr.push(FutureForecast.slice(i, i+size));
    }
    //console.log(prospectArr);
    settodayForecast(TodaysForecast);
    setprospectForecast(prospectArr);
  }

  //const TodaysForecast = '';
  //console.log(todayForecast);
  //console.log(todayForecast);
  //console.log(prospectForecast);

  return (
    <Row>
    {todayForecast != null ?  <Col md={12}>
    <TodayForecastList presentForecast={todayForecast}/>
    </Col>:'' 
    }   
      
   
    <Col md={12}>
    <ForecastList/>
    </Col>
    </Row>
  
  )
}

export default Forecast