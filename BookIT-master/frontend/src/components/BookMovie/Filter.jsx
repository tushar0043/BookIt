import React from 'react'
import { Calendar } from './Calendar'
import { DropDowns } from './DropDowns'

const Filter = ({ handleFilters, filters }) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 7.5%',
      }}
    >
      <Calendar />
    </div>
  )
}

export default Filter
