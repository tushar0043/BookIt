import React from 'react'
import classes from './Box.module.css'
const Box = (props) => {
  return (
    <div className={`${props.className} ${classes.box}`}>{props.children}</div>
  )
}

export default Box
