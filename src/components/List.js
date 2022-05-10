import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row,Col } from 'react-bootstrap';
var moment = require('moment'); 

export const List = ({futures}) => {
  // console.log(futures);
  // futures.map(future=>(
  //   console.log(future)

  // ))
  return (
    futures.map(future=>(

 
  <ListGroup style={{width:'10rem',margin:'5px'}}>
    <ListGroup.Item>{moment(future.dt_txt).format('MMMM Do YYYY, h:mm:ss a')}</ListGroup.Item>
    <ListGroup.Item>
    <img src={`http://openweathermap.org/img/wn/${future.weather[0].icon}@4x.png`} class="img-fluid" alt="Responsive image"/>  
    </ListGroup.Item>
    <ListGroup.Item>Min:{ Math.floor(future.main.temp_min - 273)} - Max:{ Math.floor(future.main.temp_max - 273)}</ListGroup.Item>

  </ListGroup>



     
  
  

    ))
  )
}


export default List
