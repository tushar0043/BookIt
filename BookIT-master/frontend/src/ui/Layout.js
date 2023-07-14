import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Header from '../components/Header'
import classes from './Layout.module.css'
const Layout = (props) => {
  return (
    <Fragment>
      <Header></Header>
      <div id={classes.main}>{props.children}</div>
      <Footer></Footer>
    </Fragment>
  )
}

export default Layout
