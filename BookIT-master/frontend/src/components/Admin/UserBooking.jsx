import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Booking from './Booking'
import classes from './UserBookings.module.css'
const UserBooking = () => {
  const params = useParams()
  const [bookings, setBookings] = useState([])
  const { id } = params
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`http://localhost:3001/booking/${id}`)
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        console.log("Couldn't fetch bookings")
      }
    }
    fetchBookings()
  }, [])
  return (
    <Container fluid className='mt-3'>
      {bookings.length > 0 ? (
        <Row>
          {bookings.map((booking) => (
            <Booking key={booking.booking_id} booking={booking}></Booking>
          ))}
        </Row>
      ) : (
        <div className={classes.noBookings}>
          {' '}
          <span>No Bookings Exists</span>
        </div>
      )}
    </Container>
  )
}

export default UserBooking
