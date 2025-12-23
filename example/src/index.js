import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const container = document.querySelector('#root')

if (container) {
  try {
    // eslint-disable-next-line global-require
    const { createRoot } = require('react-dom/client')
    createRoot(container).render(<App />)
  }
  catch (e) {
    ReactDOM.render(<App />, container)
  }
}
