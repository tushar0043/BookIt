import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsHeartFill, BsCircleFill } from 'react-icons/bs'
import { VscDeviceMobile } from 'react-icons/vsc'
import { IoFastFoodOutline } from 'react-icons/io5'
import styles from './Cinemas.module.css'

import Seating from './Seating'
import SummaryPage from './SummeryPage'
import {
  displaySeatingModal,
  termsDisplay,
  updateCinemaNameTime,
  updateSeating,
} from '../../store'
import Backdrop from '../../ui/Backdrop'
import { Box } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const CinemasBody = ({ filters }) => {
  const cinemas_data = useSelector((state) => state.cinema.cinema_data.data)
  const date = useSelector((state) => state.booking.date)

  const dispatch = useDispatch()
  // console.log(cinemas_data);
  let filteredData = cinemas_data
  const seatingModalOpen = useSelector((state) => state.ui.seatingModalOpen)
  const [foodModalOpen, setFoodModalOpen] = useState(false)

  const handleFilter = () => {
    if (filters.length) {
      filteredData = cinemas_data?.filter((item) => {
        return filters.indexOf(item.sub_region) >= 0
      })
    }
  }

  handleFilter()
  React.useEffect(() => {
    window.scrollTo(window.scrollX, 0)
  }, [seatingModalOpen])

  function formatAMPM(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    if (hours < 10) hours = '0' + hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  const time = formatAMPM(new Date())
  const amOrPm = time[time.length - 2] + time[time.length - 1]
  const currentTime = time.split(':').map(Number).shift()
  // const currentMinutes = +time.split(":")[1].split(" ").shift();
  // console.log(typeof currentMinutes);
  // console.log(amOrPm)

  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const navigate = useNavigate()
  const showModal = () => {
    setVisible(true)
  }

  // const handleOk = () => {
  //   setConfirmLoading(true)
  //   setTimeout(() => {
  //     setSeatingModalOpen(!seatingModalOpen)
  //     setVisible(false)
  //     setConfirmLoading(false)
  //   }, 2000)
  // }

  const handleClick = (name, time) => {
    dispatch(updateCinemaNameTime({ cinema_name: name, time: time }))
    dispatch(termsDisplay(true))
  }

  const handleCloseSeatingModal = (seatingData) => {
    dispatch(displaySeatingModal(false))

    dispatch(updateSeating(seatingData))
    navigate('/payment')
  }

  // const handleCloseFoodModal = () => {
  //   setFoodModalOpen(false)
  // }

  const handleCloseSeatingButton = () => {
    dispatch(displaySeatingModal(false))
  }

  return seatingModalOpen ? (
    <Fragment>
      <Seating
        handleCloseSeatingButton={handleCloseSeatingButton}
        seatingActive={seatingModalOpen}
        handleCloseSeatingModal={handleCloseSeatingModal}
      />
    </Fragment>
  ) : (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <div>
          <BsCircleFill style={{ color: '#4ABD5D', fontSize: 10 }} />
          <span>AVAILABLE</span>
        </div>
        <div>
          <BsCircleFill style={{ color: 'rgb(253, 102, 0)', fontSize: 10 }} />
          <span>FAST FILLING</span>
        </div>
      </div>
      <div style={{ padding: '15px' }}>
        {filteredData.map((cinema) => (
          <div key={cinema._id} className={styles.container__card}>
            <div className={styles.container__card__title}>
              <BsHeartFill className={styles.container__card__title__icon} />
              <h4>{cinema.name}</h4>
            </div>
            <div className={styles.container__card__info}>
              <div className={styles.container__card__info__options}>
                <div style={{ color: '#49BA8E' }} className='me-4'>
                  <VscDeviceMobile />
                  <span>M-Ticket</span>
                </div>
                <div style={{ color: '#FFB23F' }}>
                  <IoFastFoodOutline />
                  <span>F&B</span>
                </div>
              </div>
              <div className={styles.container__card__info__times__container}>
                <div>
                  {cinema.timings?.map((time, index) => {
                    const showTime = time.time.split(':').map(Number).shift()
                    const showMinutes = +time.time
                      .split(':')[1]
                      .split(' ')
                      .shift()
                    // console.log(showTime, currentTime, showMinutes, new Date().getMinutes());
                    return (
                      <div
                        onClick={() => handleClick(cinema.name, time.time)}
                        style={
                          amOrPm === 'AM' ||
                          (showTime === currentTime
                            ? showMinutes > new Date().getMinutes()
                              ? true
                              : false
                            : showTime > currentTime && showTime !== 12) ||
                          date > new Date().getDate()
                            ? { pointerEvents: 'all' }
                            : {
                                pointerEvents: 'none',
                                color: 'rgb(192,192,192)',
                              }
                        }
                        key={index + 1}
                        className={styles.button}
                      >
                        {time.time}
                        <div className={` ${styles.price__container}`}>
                          <div>
                            <p>Rs. 180</p>
                            <span>SILVER</span> <br />
                            <span style={{ color: '#4abd5d' }}>Available</span>
                          </div>
                          <div>
                            <p>Rs. 250</p>
                            <span>PLATINUM</span> <br />
                            <span style={{ color: '#4abd5d' }}>Available</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {cinema.cancellation_availability && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsCircleFill
                      style={{ color: '#FFC610', fontSize: 8, marginRight: 5 }}
                    />{' '}
                    <span style={{ fontSize: 12, color: 'gray' }}>
                      Cancellation Available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CinemasBody
