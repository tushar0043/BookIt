import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CinemasBody from '../components/BookMovie/CinemasBody'

import Header from '../components/BookMovie/Header'

import Filter from '../components/BookMovie/Filter'
import { getCinemas } from '../store'

const BookMovie = () => {
  const dispatch = useDispatch()

  const [filters, setFilters] = useState([])
  const [count, setCount] = useState(0)
  // const movie = useSelector(state => state.data.movies).data;

  // console.log(movie_name)
  // const [bookingDetails, setBookingDetails] = useState({
  //     movie_name: "",
  //     date: "",
  //     day: "",
  //     time: "",
  //     cinemas_name: ""
  // });

  useEffect(() => {
    dispatch(getCinemas())
  }, [getCinemas])

  const handleFilters = (item) => {
    const newData = filters
    if (filters.indexOf(item) >= 0) {
      newData.splice(filters.indexOf(item), 1)
      setFilters(newData)
    } else {
      newData.push(item)
      setFilters(newData)
    }
    setCount((prev) => prev + 1)
  }

  // const handleSelectNameTime = (cinemas_name, time) => {
  //     console.log(cinemas_name, time)
  //     setBookingDetails({ ...bookingDetails, cinemas_name, time })
  //     setCount(prev => prev + 1);
  // }

  // const handleSelectDate = (date, day) => {
  //     setBookingDetails({ ...bookingDetails, date, day });
  //     setCount(prev => prev + 1);
  // }

  // const handleMovieName = (movie_name) => {
  //     setBookingDetails({ ...bookingDetails, movie_name })
  // }

  useEffect(() => {
    // console.log(count, "count")
    // console.log(bookingDetails)
  }, [count])

  return (
    <div style={{ backgroundColor: '#000', paddingBottom: 20 }}>
      <Header />
      <Filter handleFilters={handleFilters} filters={filters} />
      <CinemasBody filters={filters} />
    </div>
  )
}

export default BookMovie
