/* eslint-disable react/prop-types */
import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
import './spinner.css'

const Spinner = ({ loading }) => {
  return (
    <div className={loading ? 'spinner-overlay' : ''}>
      <div className="spinner-wrapper">
        <HashLoader color={'#141527'} loading={loading} size={75} />
      </div>
    </div>
  )
}

export default Spinner
