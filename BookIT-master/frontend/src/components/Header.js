import React, { Fragment } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInDisplay, signUpDisplay, citySelectorDisplay } from '../store'
import classes from './Header.module.css'
const Header = () => {
  const dispatch = useDispatch()
  const signInHandler = () => {
    dispatch(signInDisplay(true))
  }
  const signUpHandler = () => {
    dispatch(signUpDisplay(true))
  }
  const cityHandler = () => {
    dispatch(citySelectorDisplay(true))
  }
  const username = useSelector((state) => state.user.username)
  const city = useSelector((state) => state.user.cityName)

  return (
    <Navbar variant='dark' className='mb-2'>
      <Container fluid>
        <Navbar.Brand href='/home'>
          <img
            src='./logo.png'
            width='30'
            height='30'
            className='d-inline-block align-top '
            alt='React Bootstrap logo'
          />
          <span className='title'>BookIT</span>
        </Navbar.Brand>
        <Nav className='ms-auto'>
          <div className={classes.link} onClick={cityHandler}>
            {city} <i className='fa-solid fa-caret-down'></i>
          </div>
          {username == null ? (
            <Fragment>
              {' '}
              <div className={classes.link} onClick={signInHandler}>
                Sign In
              </div>
              <div
                className={classes.link}
                onClick={signUpHandler}
                to='/sign-up'
              >
                Sign Up
              </div>
            </Fragment>
          ) : (
            <div className={classes.link}>Hi, {username}</div>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
