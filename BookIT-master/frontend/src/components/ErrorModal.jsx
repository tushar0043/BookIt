import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Backdrop from '../ui/Backdrop'
import Box from '../ui/Box'

const ErrorModal = () => {
  const message = useSelector((state) => state.ui.errorMessage)
  return (
    <Fragment>
      <Backdrop></Backdrop>
      <Box>{message}</Box>
    </Fragment>
  )
}

export default ErrorModal
