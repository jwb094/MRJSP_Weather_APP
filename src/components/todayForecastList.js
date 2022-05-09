import React from 'react'
import Card from 'react-bootstrap/Card';

 const TodayForecastList = ({presentForecast}) => {

  //onsole.log(presentForecast);
  return (
    presentForecast.map(present=>(
     <Card style={{width: '20rem'}}>
      <Card.Body>
        <Card.Title>{present.dt_txt.toString()}</Card.Title>
          <p>Max:{ Math.floor(present.main.temp_max - 273)}</p>
          <p>Min:{Math.floor(present.main.temp_min - 273)}</p>

      </Card.Body>
    </Card>
    ))

      )


  
}

export default TodayForecastList;