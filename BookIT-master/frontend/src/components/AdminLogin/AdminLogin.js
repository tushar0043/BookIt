import React from 'react'
import styled from 'styled-components'
import { AccountBox } from '../accountBox'
import { useDispatch } from 'react-redux'
import { changeUsernameId, closeModal, storeAuth } from '../../store'
import { useNavigate } from 'react-router-dom'
const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const passData = async (username, password) => {
    const response = await fetch('http://localhost:3001/adminlogin', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
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
      navigate('/users')
    }
  }
  const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
  return (
    <AppContainer>
      <AccountBox passData={passData} />
    </AppContainer>
  )
}

export default AdminLogin
