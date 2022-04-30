import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
const currentWeather = ({curWeather}) => {
  console.log(curWeather);
  return (
   <>
   <Card style={{ width: '18rem'}} >
   <Card.Header as="h5" variant="primary">Location {curWeather.name}</Card.Header>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
   
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
   </>
  )
}

export default currentWeather