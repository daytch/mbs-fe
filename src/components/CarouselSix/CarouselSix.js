/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './carouselsix.css'

const CarouselSix = (props) => {
  const { children, show } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)

  const [touchPosition, setTouchPosition] = useState(null)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length)
  }, [children])

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  return (
    <React.Fragment>
      <div className="carousel-container-s6">
        <div className="carousel-wrapper-s6">
          {/* You can alwas change the content of the button to other things */}
          {currentIndex > 0 ? (
            <button onClick={prev} className="left-arrow-s6">
              {'<'}
            </button>
          ) : (
            <button onClick={prev} className="left-arrow-empty-s6">
              <mark className="white">{'<'}</mark>
            </button>
          )}
          <div
            className="carousel-content-wrapper-s6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              className={`carousel-content-s6 show-${show}`}
              style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
            >
              {children}
            </div>
          </div>
          {/* You can always change the content of the button to other things */}
          {currentIndex < length - show ? (
            <button onClick={next} className="right-arrow-s6">
              {'>'}
            </button>
          ) : (
            <button onClick={next} className="right-arrow-empty-s6">
              <mark className="white">{'>'}</mark>
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CarouselSix
