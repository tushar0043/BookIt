import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { closeModal, displaySeatingModal, termsDisplay } from '../../store'
import Backdrop from '../../ui/Backdrop'
import Box from '../../ui/Box'
import styles from './Cinemas.module.css'
import '../animate.css'
const Terms = () => {
  const dispatch = useDispatch()
  const handleCancel = () => {
    dispatch(termsDisplay(false))
  }
  const handleOk = () => {
    dispatch(termsDisplay(false))
    dispatch(displaySeatingModal(true))
  }
  return (
    <Fragment>
      <Backdrop></Backdrop>
      <Box className={`animate ${styles.termsBox}`}>
        <div
          className='text-center'
          style={{ color: 'black', fontSize: '30px', fontWeight: '700' }}
        >
          {' '}
          Terms & Conditions
        </div>
        <div className={styles.modalText}>
          <p>
            1. For your own safety, wearing face masks is compulsory for
            entering the cinema premises.
          </p>
          <p>
            2. Temperature checks will be conducted at the cinema.Patrons with
            high temperature (above 37.3 C or 99.14 F) will not be allowed
            inside.
          </p>
          <p>3. Entry is allowed only for valid ticket holders.</p>
          <p>
            4. Guests aged under 18 will not be allowed in "A" rated movies.
          </p>
          <p>
            5. Children above the age of 3 years require tickets for "U" or "U /
            A" rated movies.
          </p>
          <p>
            6. In case a ticket is lost or misplaced, a duplicate ticket cannot
            be issued.
          </p>
          <p>
            7. Tickets once purchased cannot be cancelled, exchanged or
            refunded.
          </p>
          <p>
            8. Guest Agrees to be contacted by INOX Management for the purpose
            of seeking feedback for service improvement.
          </p>
          <p>
            9. Decision(s) taken by INOX shall be final and binding, Rights of
            admission reserved.
          </p>
          <p>
            10. Outside food and beverages are not allowed inside the cinema
            premises.
          </p>
          <p>
            11. Contactless food and beverage purchase transaction and self pick
            -up from the counter.
          </p>
        </div>
        <div className='text-center pt-2'>
          <Button
            variant='danger'
            key='back'
            onClick={handleCancel}
            className='me-2'
          >
            Cancel
          </Button>
          ,
          <Button variant='primary' key='submit' onClick={handleOk}>
            Accept
          </Button>
        </div>
      </Box>
    </Fragment>
  )
}

export default Terms
