import './App.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import  CurrentWeather  from './components/currentWeather';


//const dotenv = require('dotenv');
 const apiKey = process.env.REACT_APP_ACCESS_KEY;
// const f = process.env.REACT_APP_NOT_SECRET_CODE;



function App() {
  const [currentLocationLat,setCurrentlocationLat] = useState('');
  const [currentLocationLong,setCurrentlocationLong] = useState('');
  const [currentLocationWeather,setcurrentLocationWeather] = useState([]);
  const [searchLocation,setsearchlocation] = useState('');
  const [LocationWeather,setLocationWeather] = useState([]);
  console.log(process.env.REACT_APP_ACCESS_KEY);
  useEffect(() => {
  
    navigator.geolocation.getCurrentPosition(function(position) {

        setCurrentlocationLat(position.coords.latitude);
        setCurrentlocationLong(position.coords.longitude)
    })

  
 //console.log(currentLocationLat);
  //console.log(currentLocationLong);
    const fetchCurrentLocationWeather= async()=>{
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocationLat}&lon=${currentLocationLong}&appid=${apiKey}`)
      //console.log(result);
       setcurrentLocationWeather(result.data);
     }

    fetchCurrentLocationWeather();

  }, [currentLocationLat,currentLocationLong])


  // function SearchWeatherLocation(){
  //   const
//https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}

  //   const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocationLat}&lon=${currentLocationLong}&appid=${apiKey}`)
  // }


  return (
<>
<Container fluid>
  <Row>
    <Col md={{ span: 6, offset: 5 }}>   
     <CurrentWeather className="mt-9" curWeather={currentLocationWeather}/>
    </Col>
  </Row>
</Container>


  

</> 






  );
}

export default App;
