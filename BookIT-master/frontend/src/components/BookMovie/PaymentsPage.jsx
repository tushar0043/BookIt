import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import ClearIcon from '@material-ui/icons/Clear'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { useDispatch, useSelector } from 'react-redux'
import FirstSection from '../PaymentPage/FirstSection'
import styles from './PaymentsPage.module.css'
import SecondSection from '../PaymentPage/SecondSection'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link, useNavigate } from 'react-router-dom'

import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { clearDetails } from '../../store'
// import { getBookingDetails, postBookingDetails } from '../Redux/booking/action'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Counter = () => (
  <CountdownCircleTimer
    isPlaying
    duration={300}
    colors={[
      ['#d1f542', 0.33],
      ['#d1f542', 0.33],
      ['#d1f542', 0.33],
    ]}
  >
    {({ remainingTime }) =>
      Math.floor(remainingTime / 60) + ' : ' + (remainingTime % 60) + ' Minutes'
    }
  </CountdownCircleTimer>
)

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#1F2533',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

export default function FullScreenDialog({ proceed }) {
  const navigate = useNavigate()
  const classes = useStyles()
  const [state, setState] = React.useState(false)
  const city = useSelector((state) => state.user.cityName)
  const booking_details = useSelector((state) => state.booking)
  const dispatch = useDispatch()
  const [counter, setCounter] = React.useState(true)
  const user_id = useSelector((state) => state.user.userid)
  const {
    movie_name,
    cinemas_name,
    price,
    date,
    day,
    time,
    silver,
    platinum,
    movie_grade,
  } = useSelector((state) => state.booking)
  const handleClose = () => {
    setState(false)
  }
  const handleChange = (e) => {}

  const handlePayment = async () => {
    setState(true)
    setTimeout(() => {
      setCounter(false)
    }, 5000)
    const seats = silver ? silver.length : 0 + platinum ? platinum.length : 0
    const response = await fetch(`http://localhost:3001/booking/${user_id}`, {
      method: 'POST',
      body: JSON.stringify({
        movie_name: movie_name,
        theater_name: cinemas_name,
        cost: price,
        no_of_seats: seats,
        time: time,
        date: date,
        day: day,
        movie_grade: movie_grade,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const handleMove = () => {
    dispatch(clearDetails())
    navigate('/')
  }

  console.log(state)
  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={styles.page}>
          <div className={styles.firstSection}>
            <FirstSection handlePayment={handlePayment} />
          </div>
          <div className={styles.secondSection}>
            <SecondSection />
            <div
              style={{
                width: '80px',
                margin: '20px auto',
                fontSize: '20px',
                wordBreak: 'break-word',
              }}
            >
              <Counter />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={state}
        TransitionComponent={Transition}
      >
        {counter && (
          <DialogTitle
            id='customized-dialog-title'
            style={{ background: '#222', color: 'white' }}
            onClose={handleClose}
          >
            Please hold tight we are getting your tickets ready.
          </DialogTitle>
        )}
        <DialogContent dividers>
          {counter ? (
            <img
              style={{ width: '70%', margin: '0 15%' }}
              src='https://cdn.dribbble.com/users/801336/screenshots/10037782/media/d7f28f902699655bba0b75e34dd9eb44.gif'
              alt=''
            />
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: 'white',
                background: '#222',
                padding: '100px 50px',
                borderRadius: '5px',
              }}
            >
              <h1>Congratulations!</h1>
              <div style={{ fontSize: '20px' }}>We have got your tickets</div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleMove}
            variant='contained'
            style={{ backgroundColor: '#222', color: 'white' }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
