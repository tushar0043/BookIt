import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { startTransition } from 'react'

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies_data: [],
    focused_movie: null,
    totalMovies: null,
  },
  reducers: {
    updateMovies: (state, action) => {
      state.movies_data = action.payload.data
    },
    updateFocusedMovie: (state, action) => {
      state.focused_movie = action.payload.data
    },
  },
})

export const getMovies = () => {
  return async (dispatch, getState) => {
    const res = await fetch(
      `https://bookmyshow-clone-masai.herokuapp.com/movies/`
    )
    const data = await res.json()

    dispatch(movieSlice.actions.updateMovies(data))
  }
}

export const getFocusedMovie = (id) => {
  return async (dispatch, getState) => {
    const res = await fetch(
      `https://bookmyshow-clone-masai.herokuapp.com/movies/${id}`
    )
    const data = await res.json()

    dispatch(movieSlice.actions.updateFocusedMovie(data))
  }
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    movie_name: '',
    date: '',
    day: '',
    time: '',
    cinemas_name: '',
    silver: [],
    platinium: [],
    price: 0,
    total_price: 0,
    banner_image_url: '',
    movie_grade: '',
  },
  reducers: {
    updateDayDate: (state, action) => {
      state.date = action.payload.date
      state.day = action.payload.day
    },
    updateMovieName: (state, { payload }) => {
      state.movie_name = payload.movie_name
      state.movie_grade = payload.movie_grade
      state.banner_image_url = payload.banner_image_url
    },
    updateCinemaNameTime: (state, { payload }) => {
      state.cinemas_name = payload.cinema_name
      state.time = payload.time
    },
    updateSeating: (state, { payload }) => {
      state.silver = payload.silver
      state.platinium = payload.platinium
      state.price = payload.price
    },
    updateTotalPrice: (state, { payload }) => {
      state.total_price = payload
    },
    clearDetails: (state, action) => {
      state.movie_name = ''
      state.date = ''
      state.day = ''
      state.time = ''
      state.cinemas_name = ''
      state.silver = []
      state.platinium = []
      state.price = 0
      state.total_price = 0
      state.banner_image_url = ''
      state.movie_grade = ''
    },
  },
})

const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: {
    cinema_data: { data: [] },
  },
  reducers: {
    updateCinemaData: (state, action) => {
      state.cinema_data = action.payload
    },
  },
})

export const getCinemas = () => {
  return async (dispatch, getState) => {
    const res = await fetch(
      'https://bookmyshow-clone-masai.herokuapp.com/cinema'
    )
    const cinema_data = await res.json()
    dispatch(cinemaSlice.actions.updateCinemaData(cinema_data))
  }
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuth: false,
  },
  reducers: {
    storeAuth: (state, action) => {
      state.isAuth = action.payload
    },
  },
})

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    displaySignIn: false,
    displaySignUp: false,
    displayCitySelector: false,
    displayTerms: false,
    seatingModalOpen: false,
    displayErrorModal: false,
    errorMessage: '',
  },
  reducers: {
    signInDisplay: (state, action) => {
      state.displaySignIn = action.payload
      if (state.displaySignUp) {
        state.displaySignUp = false
      }
    },
    displayError: (state, action) => {
     
      state.displayErrorModal = action.payload.display
      state.errorMessage = action.payload.message
    },
    displaySeatingModal: (state, action) => {
      state.seatingModalOpen = action.payload
    },
    signUpDisplay: (state, action) => {
      state.displaySignUp = action.payload
      if (state.displaySignIn) {
        state.displaySignIn = false
      }
    },
    citySelectorDisplay: (state, action) => {
      state.displayCitySelector = action.payload
    },
    termsDisplay: (state, action) => {
      state.displayTerms = action.payload
    },
    closeModal: (state, action) => {
      state.displaySignUp = false
      state.displaySignIn = false
      state.displayCitySelector = false
    },
  },
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    cityName: 'Select City',
    citySelected: false,
    username: null,
    userid: null,
  },
  reducers: {
    setCityName: (state, action) => {
      state.cityName = action.payload
    },
    changeCitySelected: (state, action) => {
      state.citySelected = action.payload
    },
    changeUsernameId: (state, action) => {
      state.userid = action.payload.userid
      state.username = action.payload.username
    },
  },
})

const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    authentication: authSlice.reducer,
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    cinema: cinemaSlice.reducer,
    booking: bookingSlice.reducer,
  },
})
export const { storeAuth } = authSlice.actions
export const {
  signInDisplay,
  signUpDisplay,
  closeModal,
  citySelectorDisplay,
  termsDisplay,
  displaySeatingModal,
  displayError,
} = uiSlice.actions
export const { setCityName, changeCitySelected, changeUsernameId } =
  userSlice.actions
export const { updateMovies, updateFocusedMovie } = movieSlice.actions
export const {
  updateDayDate,
  updateMovieName,
  updateCinemaNameTime,
  updateSeating,
  updateTotalPrice,
  clearDetails,
} = bookingSlice.actions
export default store
