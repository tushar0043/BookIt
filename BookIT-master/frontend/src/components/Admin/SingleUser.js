import { mergeClasses } from '@material-ui/styles'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import classes from './SingleUser.module.css'
const SingleUser = (props) => {
  const navigate = useNavigate()
  const viewBookings = async () => {
    navigate(`/booking/${props.id}`)
  }
  return (
    <div className={classes.user}>
      <div className={classes.detail}>User ID: {props.id}</div>
      <div className={classes.detail}>Username: {props.username}</div>
      <div>
        <Button variant='primary' onClick={viewBookings}>
          View Bookings
        </Button>
      </div>
      <div>
        <Button variant='danger'>Delete User</Button>
      </div>
    </div>
  )
}

export default SingleUser
