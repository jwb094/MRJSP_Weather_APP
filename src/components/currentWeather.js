import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Row,Col } from 'react-bootstrap'

const currentWeather = ({curWeather}) => {
  function reload(){
    window.location.reload();
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${curWeather.weather[0].icon}@4x.png`
  return (
   <>
   <Card
   bg={'info'}
    style={{ width: '20rem',marginTop:'50px'}} >
   <Card.Header as="h5" variant="primary" className="text-center"> {curWeather.name}  <Button variant="info" onClick={reload()}>Refresh</Button></Card.Header> 
   <Card.Img variant="top" src={weatherIcon} /> 
  <Card.Body>
  
    <Row>
    <Col md={12} className="text-center"> <p>Temp Feel:{ Math.floor(curWeather.main.feels_like - 273)}</p>  </Col>
    <Col md={6}>  
      <h5>Max:{ Math.floor(curWeather.main.temp_max - 273)}</h5>
      <h5>Min:{Math.floor(curWeather.main.temp_min - 273)}</h5>
      <h5>Humidity:{curWeather.main.humidity}</h5>
  </Col>
  <Col md={6}>  
    <h5>Wind Speed:{ curWeather.wind.speed}</h5>
    <h5>Wind Dir:{ curWeather.wind.deg}</h5>
    <h5>Pressure:{ curWeather.main.pressure}</h5>
  </Col>
    </Row>
      
    <Row>
      <Col md={6}>
      <Button variant="primary">Add To Save Location</Button>
      </Col>
   
    </Row>

  </Card.Body>
</Card>
   </>
  )
}

export default currentWeather