import React, { Fragment, useRef } from 'react'
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap'
import Backdrop from '../ui/Backdrop'
import Box from '../ui/Box'
import './SigninModal.css'
import logo from './signin-image.jpg'
import './animate.css'
import { useDispatch } from 'react-redux'
import { changeUsernameId, closeModal, displayError, storeAuth } from '../store'
import { Link } from 'react-router-dom'
const SigninModal = () => {
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const formHandler = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({
        username: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (data.message) {
      console.log(data.message)
    } else {
      dispatch(
        changeUsernameId({ userid: data[0].id, username: data[0].username })
      )
      dispatch(storeAuth(true))
    }

    dispatch(closeModal())
  }
  const closeMod = () => {
    dispatch(closeModal())
  }
  return (
    <Fragment>
      <Backdrop></Backdrop>
      <Box className='box animate'>
        <Row>
          <Col xs={4} className='d-flex align-items-center'>
            <Image src={logo} fluid></Image>
          </Col>
          <Col xs={8}>
            <Row className={` text-center mb-4`}>
              <Col id='title'>Sign In</Col>
            </Row>
            <form onSubmit={formHandler}>
              <div id='input'>
                <div className='m-4 '>
                  <label htmlFor='email'>Username</label>
                  <input
                    type='text'
                    ref={emailRef}
                    required
                    placeholder='Enter Username'
                  />
                </div>
                <div className='m-4 '>
                  <label htmlFor='Password'>Password</label>
                  <input
                    type='password'
                    required
                    placeholder='Enter Password'
                    ref={passwordRef}
                  />
                </div>
              </div>
              <div className='d-grid gap-2'>
                <Button variant='primary' className='my-3' type='submit'>
                  Sign In
                </Button>
              </div>
            </form>

            <Link to='/admin-login' id='adminLogin' onClick={closeMod}>
              Login As An Admin?
            </Link>
          </Col>
        </Row>
      </Box>
    </Fragment>
  )
}

export default SigninModal
