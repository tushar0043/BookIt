import React, { useContext, useRef } from 'react'
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from './common'
import { Marginer } from '../marginer'
import { AccountContext } from './accountContext'

export function LoginForm(props) {
  const formHandler = (e) => {
    e.preventDefault()
    props.passData(usernameRef.current.value, passwordRef.current.value)
  }
  const usernameRef = useRef()
  const passwordRef = useRef()
  const { switchToSignup } = useContext(AccountContext)

  return (
    <BoxContainer>
      <FormContainer>
        <Input type='text' ref={usernameRef} placeholder='Username' />
        <Input type='password' ref={passwordRef} placeholder='Password' />
      </FormContainer>
      <Marginer direction='vertical' margin={10} />

      <Marginer direction='vertical' margin='1.6em' />
      <SubmitButton type='submit' onClick={formHandler}>
        Signin
      </SubmitButton>
      <Marginer direction='verti cal' margin='1em' />
    </BoxContainer>
  )
}
