import React, { Fragment, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AddCarousel } from '../components/HomePage/AddCarousel'
import { getMovies } from '../store'
import classes from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { RecommendedMovies } from '../components/HomePage/RecommendedMovies'
import { Link } from 'react-router-dom'
import { PremierMovies } from '../components/HomePage/PremierMovies'
import { Entertainment } from '../components/HomePage/Entertainment'
const Home = () => {
  console.log('object')
  const dispatch = useDispatch()
  console.log('DSA')
  useEffect(() => {
    dispatch(getMovies())
  }, [getMovies])
  return (
    <Fragment>
      <AddCarousel></AddCarousel>

      <RecommendedMovies></RecommendedMovies>
      <Entertainment></Entertainment>
      <PremierMovies></PremierMovies>
    </Fragment>
  )
}

export default Home
