/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import './ContextMenu.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPeriodName, getIdCell } from './../redux/actions'

class ContextMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      projectRep: JSON.parse(localStorage.getItem('projectRepresentation')),
    }
  }
  closeAllOpenedWindows() {
    //
    const periods = this.state.projectRep?.periods
    if (periods.length > 0) {
      for (let idx = 0; idx < periods.length; idx++) {
        if (this.props.idElem !== periods[idx].periodName + idx) {
          for (let i = 0; i < periods.length; i++) {
            const element = document.getElementsByClassName(periods[idx].periodName + i)
            if (element.length > 0) {
              for (let index = 0; index < element.length; index++) {
                element[index].click()
              }
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.idElem) {
      const element = document.getElementsByClassName(this.props.idElem)
      if (element.length > 1) {
        for (let index = 0; index < element.length; index++) {
          element[index].addEventListener('contextmenu', this._handleContextMenu, true)
          element[index].addEventListener('click', this._handleClick, true)
          element[index].addEventListener('scroll', this._handleScroll, true)
        }
      } else {
        element.addEventListener('contextmenu', this._handleContextMenu, true)
        element.addEventListener('click', this._handleClick, true)
        element.addEventListener('scroll', this._handleScroll, true)
      }
      this.closeAllOpenedWindows()
    } else {
      document.addEventListener('contextmenu', this._handleContextMenu, true)
      document.addEventListener('click', this._handleClick, true)
      document.addEventListener('scroll', this._handleScroll, true)
    }
  }

  componentWillUnmount() {
    if (this.props.idElem) {
      const element = document.getElementsByClassName(this.props.idElem)
      if (element.length > 1) {
        for (let index = 0; index < element.length; index++) {
          element[index].removeEventListener('contextmenu', this._handleContextMenu, true)
          element[index].removeEventListener('click', this._handleClick, true)
          element[index].removeEventListener('scroll', this._handleScroll, true)
        }
      } else {
        element.removeEventListener('contextmenu', this._handleContextMenu, true)
        element.removeEventListener('click', this._handleClick, true)
        element.removeEventListener('scroll', this._handleScroll, true)
      }
    } else {
      document.removeEventListener('contextmenu', this._handleContextMenu, true)
      document.removeEventListener('click', this._handleClick, true)
      document.removeEventListener('scroll', this._handleScroll, true)
    }

    // const opt = document.getElementsByClassName('contextMenu--option')
    // if (opt.length > 1) {

    //   for (let index = 0; index < opt.length; index++) {
    //     opt[index].removeEventListener('click', this.props.openFunctionBuilder())
    //   }
    // } else if (opt.length > 0) {
    //   opt.removeEventListener('click', this.props.openFunctionBuilder())
    // }
  }

  _handleContextMenu = (event) => {
    event.preventDefault()
    this.closeAllOpenedWindows()
    this.setState({ visible: true })

    const opt = document.getElementsByClassName('contextMenu--option')
    if (opt.length > 1) {
      for (let index = 0; index < opt.length; index++) {
        opt[index].addEventListener('click', this.openFunctionBuilder)
      }
    } else if (opt.length > 0) {
      opt[0].addEventListener('click', this.openFunctionBuilder)
    }

    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const rootW = this.root?.offsetWidth ? this.root?.offsetWidth : 400
    const rootH = this.root?.offsetHeight ? this.root?.offsetHeight : 250

    const right = screenW - clickX > rootW
    const left = !right
    const top = screenH - clickY > rootH
    const bottom = !top

    if (right) {
      this.root.style.left = `${clickX + 5}px`
    }

    if (left) {
      this.root.style.left = `${clickX - rootW - 5}px`
    }

    if (top) {
      this.root.style.top = `${clickY + 5}px`
    }

    if (bottom) {
      this.root.style.top = `${clickY - rootH - 5}px`
    }
  }

  _handleClick = (event) => {
    const { visible } = this.state
    const wasOutside = !(event.target.contains === this.root)

    if (wasOutside && visible) this.setState({ visible: false })
  }

  _handleScroll = () => {
    const { visible } = this.state

    if (visible) this.setState({ visible: false })
  }

  openFunctionBuilder = (e) => {
    let header = e.path[6].children[0].children[0].children
    for (let index = 0; index < header.length; index++) {
      if (e.path[2].className.indexOf(header[index].innerText) > -1) {
        this.props.getIdCell({ id: e.path[2].className })
        this.props.getPeriodName({ periodName: header[index].innerText })
      }
    }
    this.props.setVisible()
  }

  render() {
    const { visible } = this.state

    return (
      (visible || null) && (
        <div
          ref={(ref) => {
            this.root = ref
          }}
          className="contextMenu"
        >
          {/* <div className="contextMenu--option contextMenu--option__disabled">View full version</div> */}
          <div className="contextMenu--option">Function Builder</div>
          {/* <option className="contextMenu--separator" /> */}
        </div>
      )
    )
  }
}

ContextMenu.propType = {
  idElem: PropTypes.string,
  setVisble: PropTypes.func,
}

export default connect(null, { getPeriodName, getIdCell })(ContextMenu)
