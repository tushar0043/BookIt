import React from 'react'
import classes from './Backdrop.module.css'
import { useDispatch } from 'react-redux'
import { closeModal } from '../store'
const Backdrop = (props) => {
  const dispatch = useDispatch()
  const stopModal = () => {
    dispatch(closeModal())
  }
  return (
    <div onClick={stopModal} className={classes.backdrop}>
      {props.children}
    </div>
  )
}

export default Backdrop
