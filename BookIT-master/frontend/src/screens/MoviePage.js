import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  citySelectorDisplay,
  getFocusedMovie,
  getMovies,
  signInDisplay,
} from '../store'
import { useParams, useNavigate } from 'react-router-dom'
import './moviePage.css'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { RecommendedMovies } from '../components/HomePage/RecommendedMovies'
import { storeAuth } from '../store'
import { updateFocusedMovie } from '../store'
import { Carousel } from 'react-bootstrap'

function valuetext(value) {
  return `${value}`
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    height: '400px',
    width: '300px',
  },
  root: {
    width: 250,
    margin: 20,
    textAlign: 'center',
  },
}))

const MoviePage = () => {
  const navigate = useNavigate()
  const [rValue, setRvalue] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const { id } = useParams()
  const data = useSelector((state) => state.movies.focused_movie)
  const dispatch = useDispatch()

  const [action, setAction] = React.useState(false)
  const isAuth = useSelector((state) => state.authentication.isAuth)
  const citySelected = useSelector((state) => state.user.citySelected)

  React.useEffect(() => {
    dispatch(getFocusedMovie(id))
    window.scrollTo(window.scrollX, 0)
  }, [])

  const handleClick = () => {
    if (isAuth) {
      if (!citySelected) {
        dispatch(citySelectorDisplay(true))
      } else {
        navigate(`/book-movie/${id}`)
      }
    } else {
      dispatch(signInDisplay(true))
      setAction(true)
    }
  }

  return (
    <div>
      {data && (
        <>
          <div
            className='container'
            style={{
              backgroundImage: `linear-gradient(90deg, rgb(34, 34, 34) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%),url(${data.cover_image_url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* <Login action={action} handleCloseLogin={handleCloseLogin} /> */}
            <div className='container__card'>
              <img src={data.banner_image_url} alt='title' />
            </div>
            <div className='container__movieDetail'>
              <h1>{data.movie_name}</h1>
              <div className='container__movieDetail_rating'>
                <img
                  src='https://www.leadingwithhonor.com/wp-content/uploads/2021/02/redheart.png'
                  alt='Rating'
                  style={{ width: 25 }}
                />
                <h1>{data.rating.percentage}%</h1>
                <p style={{ marginBottom: 0 }}>
                  {Math.ceil(data.rating.no_of_ratings)} Ratings
                </p>
              </div>

              <div className='container__movieDetail_language'>
                <div>
                  <p>2D</p>
                </div>
                <div>
                  <p>{data.languages}</p>
                </div>
              </div>
              <div style={{ color: 'white', fontSize: 18 }} className='timing'>
                <h5 style={{ color: 'white', fontSize: 18 }}>
                  {`${data.movie_duration} - ${data.movie_genre.map(
                    (e) => ' ' + e.genre
                  )} - ${data.release_date}`}
                </h5>
              </div>
              <div className='BookButton'>
                <button onClick={handleClick}>Book Tickets</button>
              </div>
            </div>
          </div>
          <div className='middleContainer'>
            <div>
              <h1>About the movie</h1>
              <p>{data.about_movie}</p>
            </div>
          </div>
        </>
      )}

      <RecommendedMovies></RecommendedMovies>
    </div>
  )
}

export default MoviePage
