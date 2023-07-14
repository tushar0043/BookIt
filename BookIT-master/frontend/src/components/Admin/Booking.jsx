import React from 'react'
import { Card, ListGroupItem, ListGroup, Col } from 'react-bootstrap'
import classes from './UserBookings.module.css'
const Booking = ({ booking }) => {
  return (
    <Col xs={12} md={6} lg={4} xl={4} className={classes.bookingsContainer}>
      <Card style={{ width: '20rem' }} className={classes.booking}>
        <Card.Body>
          <Card.Title>{booking.movie_name}</Card.Title>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>Theater: {booking.theater_name}</ListGroupItem>
          <ListGroupItem>Number Of Seats: {booking.no_of_seats}</ListGroupItem>
          <ListGroupItem>Time Of Booking: {booking.time}</ListGroupItem>
          <ListGroupItem>Date Of Booking: {booking.date}</ListGroupItem>
          <ListGroupItem>Total Cost: {booking.cost}</ListGroupItem>
        </ListGroup>
      </Card>
    </Col>
  )
}

export default Booking
