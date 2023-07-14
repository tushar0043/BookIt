import React from 'react'

import styles from './Cinemas.module.css'

export const DropDowns = ({ handleFilters, filters }) => {
  const subRegions = ['Delhi', 'Gurgaon', 'Greater Noida', 'Noida', 'Faridabad']
  // const filters = []
  const menu = (
    <div>
      {/* MEnu */}
      {subRegions?.map((region, index) => (
        <div key={index + 1}>
          {/* menu item */}
          <div
            className={styles.filter__item}
            style={
              filters.indexOf(region) >= 0
                ? { backgroundColor: '#F84464', color: 'white' }
                : { backgroundColor: 'transparent' }
            }
            onClick={() => handleFilters(region)}
          >
            <span>{region}</span>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <div overlay={menu} trigger={['click']}>
        <div className={styles.filter}>Filter Sub Regions</div>
      </div>
      {/* <DropDown>

            </DropDown> */}
    </div>
  )
}
