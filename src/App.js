import './App.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import  CurrentWeather  from './components/currentWeather';
import Forecast from './components/Forecast';

//const dotenv = require('dotenv');
 const apiKey = process.env.REACT_APP_ACCESS_KEY;
// const f = process.env.REACT_APP_NOT_SECRET_CODE;



function App() {
  const [currentLocationLat,setCurrentlocationLat] = useState('');
  const [currentLocationLong,setCurrentlocationLong] = useState('');
  const [currentLocationWeather,setcurrentLocationWeather] = useState([]);
  const [isloading,setisloading] = useState(true);
  const [show,setShow] = useState(true);


  useEffect(() => {
  
    navigator.geolocation.getCurrentPosition(function(position) {

        setCurrentlocationLat(position.coords.latitude);
        setCurrentlocationLong(position.coords.longitude)
    })

    const fetchCurrentLocationWeather= async()=>{
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocationLat}&lon=${currentLocationLong}&appid=${apiKey}`)
      //console.log(result);
       setcurrentLocationWeather(result.data);
       setisloading(false)
     }

    //  const fetchCurrentLocationForecast= async()=>{
    //   const getCityFromLatAndLong = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentLocationLat}&longitude=${currentLocationLong}&localityLanguage=en`)
    //   console.log(getCityFromLatAndLong);
    //   var cityname = getCityFromLatAndLong.data.city;
    //   console.log(cityname);
    //   const getCurrentLocationForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid&appid=${apiKey}`)

    //     setcurrentLocationWeather(getCurrentLocationForecast.list);
    //   }


    fetchCurrentLocationWeather();
    // fetchCurrentLocationForecast();
  }, [currentLocationLat,currentLocationLong]);


  function toggleForecast(){
    setShow(prevState => !prevState)
  }

  return (
<>
<Container fluid>
  <Row>
    { !isloading ? 
                  <Col md={{ span: 6, offset: 5 }}>   
                  <CurrentWeather className="mt-9" curWeather={currentLocationWeather} toggleForecast={toggleForecast}/>
                  </Col> :"Is Loading"
      }
      <Col md={{ span: 6, offset: 5 }}>   
      <Forecast/>
      </Col>
  </Row>
</Container>


  

</> 






  );
}

export default App;
