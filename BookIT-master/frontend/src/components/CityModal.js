import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { changeCitySelected, closeModal, setCityName } from '../store'
import Backdrop from '../ui/Backdrop'
import Box from '../ui/Box'
import './animate.css'
import classes from './CityModal.module.css'
const CityModal = () => {
  const location = [
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/mumbai.png',
      name: 'Mumbai',
      id: 1,
    },

    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/bang.png',
      name: 'Bangaluru',
      id: 2,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/hyd.png',
      name: 'Hyderabad',
      id: 3,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/ahd.png',
      name: 'Ahemdabad',
      id: 4,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/chd.png',
      name: 'Chandigarh',
      id: 5,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/chen.png',
      name: 'Chennai',
      id: 6,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/pune.png',
      name: 'Pune',
      id: 7,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/kolk.png',
      name: 'Kolkata',
      id: 8,
    },
    {
      link: 'https://in.bmscdn.com/m6/images/common-modules/regions/koch.png',
      name: 'Kochi',
      id: 9,
    },
  ]

  const dispatch = useDispatch()

  const handleLocation = (name) => {
    dispatch(closeModal())
    dispatch(changeCitySelected(true))
    dispatch(setCityName(name))
  }

  return (
    <Fragment>
      <Backdrop></Backdrop>
      <Box className={`animate ${classes.cityBox}`}>
        <div id={classes.title}>Popular cities</div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            textAlign: 'center',
          }}
          id={classes.imagesBox}
        >
          {location.map((loc) => (
            <div style={{ margin: '2px' }} key={loc.id}>
              <img
                onClick={() => handleLocation(loc.name)}
                src={loc.link}
                alt={loc.name}
                className={classes.cityImage}
              />
              <div>{loc.name}</div>
            </div>
          ))}
        </div>
      </Box>
    </Fragment>
  )
}

export default CityModal
