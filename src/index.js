import React from 'react'
import ReactDOM from 'react-dom'

import './assets/styles/reset.css'
import './assets/styles/utilities.css'
import './assets/styles/global.css'

import App from './App'
import * as serviceWorker from './serviceWorker'

import { TrackContextProvider } from './context/search'

ReactDOM.render((
  <TrackContextProvider>
    <App />
  </TrackContextProvider>
), document.getElementById('root'))

// TODO: register() [http://bit.ly/CRA-PWA]
serviceWorker.unregister()
