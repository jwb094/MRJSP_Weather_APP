import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import { Row,Col } from 'react-bootstrap';
import List  from './List';
export const ForecastList = ({futureForecast}) => {
   console.log(futureForecast);
  return (

  futureForecast.map((futures)=>(
    <Col>
    <List futures={futures}/>
    </Col>
 
      ))

  
   
  


   

 
  
  )
}
