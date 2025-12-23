import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from "prop-types"

import Card from "./Card"

const portalNodes = {}

const getReactDomClient = () => {
  try {
    // eslint-disable-next-line global-require
    return require('react-dom/client')
  }
  catch (e) {
    return null
  }
}

export default class ToolTip extends React.Component {
  static propTypes = {
    parent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    tooltipTimeout: PropTypes.number
  }

  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500
  }

  createPortal() {
    const node = document.createElement('div')
    node.className = 'ToolTipPortal'
    document.body.appendChild(node)

    const portal = {
      node,
      timeout: false,
      root: null,
    }

    const ReactDOMClient = getReactDomClient()
    if (ReactDOMClient && typeof ReactDOMClient.createRoot === 'function') {
      portal.root = ReactDOMClient.createRoot(node)
    }

    portalNodes[this.props.group] = portal
  }

  renderPortal(props) {
    if (!portalNodes[this.props.group]) {
      this.createPortal()
    }
    let {parent, ...other} = props
    let parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent

    const portal = portalNodes[this.props.group]
    const element = <Card parentEl={parentEl} {...other}/>

    if (portal.root) {
      portal.root.render(element)
    }
    else {
      ReactDOM.render(element, portal.node)
    }
  }

  componentDidMount() {
    if (!this.props.active) {
      return
    }

    this.renderPortal(this.props)
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props
    if ((!portalNodes[this.props.group] && !nextProps.active) ||
      (!prevProps.active && !nextProps.active)) {
      return
    }

    let props = { ...nextProps }
    let newProps = { ...nextProps }

    if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
      clearTimeout(portalNodes[this.props.group].timeout)
    }

    if (prevProps.active && !props.active) {
      newProps.active = true
      portalNodes[this.props.group].timeout = setTimeout(() => {
        props.active = false
        this.renderPortal(props)
      }, nextProps.tooltipTimeout)
    }

    this.renderPortal(newProps)
  }

  componentWillUnmount() {
    if (portalNodes[this.props.group]) {
      const portal = portalNodes[this.props.group]
      if (portal.root) {
        portal.root.unmount()
      }
      else {
        ReactDOM.unmountComponentAtNode(portal.node)
      }
      clearTimeout(portalNodes[this.props.group].timeout)

      try {
        document.body.removeChild(portal.node)
      }
      catch(e) {}

      portalNodes[this.props.group] = null
    }
  }

  render() {
    return null
  }
}
