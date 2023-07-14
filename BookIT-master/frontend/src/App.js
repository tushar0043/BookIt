import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './screens/Home'
import Layout from './ui/Layout'
import './bootstrap.min.css'
import { useEffect } from 'react'
import MoviePage from './screens/MoviePage'
import Backdrop from './ui/Backdrop'
import Box from './ui/Box'
import { useSelector, useDispatch } from 'react-redux'
import SigninModal from './components/SigninModal'
import SignupModal from './components/SignupModal'
import CityModal from './components/CityModal'
import BookMovie from './screens/BookMovie'
import Terms from './components/BookMovie/Terms'
import FullScreenDialog from './components/BookMovie/PaymentsPage'
import AdminLogin from './components/AdminLogin/AdminLogin'
import Users from './components/Admin/Users'
import UserBooking from './components/Admin/UserBooking'
import ErrorModal from './components/ErrorModal'
function App() {
  const {
    displaySignIn,
    displaySignUp,
    displayCitySelector,
    displayTerms,
    displayErrorModal,
  } = useSelector((state) => state.ui)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch('http://localhost:3001/login')
      const data = await response.json()
      console.log(data)
    }
    checkAuthStatus()
  }, [])
  return (
    <BrowserRouter>
      <Layout>
        {displaySignIn && <SigninModal></SigninModal>}
        {displaySignUp && <SignupModal></SignupModal>}
        {displayCitySelector && <CityModal></CityModal>}
        {displayTerms && <Terms></Terms>}
        {displayErrorModal && <ErrorModal></ErrorModal>}

        <Routes>
          <Route path='/movies/:id' element={<MoviePage></MoviePage>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route
            path='/book-movie/:id'
            element={<BookMovie></BookMovie>}
          ></Route>
          <Route
            path='/booking/:id'
            element={<UserBooking></UserBooking>}
          ></Route>
          <Route
            path='/admin-login'
            element={<AdminLogin></AdminLogin>}
          ></Route>
          <Route path='/users' element={<Users></Users>}></Route>
          <Route
            exact
            path='/'
            element={<Navigate to='/home' replace></Navigate>}
          ></Route>
          <Route
            path='/payment'
            element={<FullScreenDialog></FullScreenDialog>}
          ></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
