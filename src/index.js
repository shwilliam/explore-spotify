import React from 'react'
import ReactDOM from 'react-dom'

import './assets/styles/reset.css'
import './assets/styles/utilities.css'
import './assets/styles/global.css'

import App from './App'
import * as serviceWorker from './serviceWorker'

import { SearchContextProvider } from './context/search'
import { RecommendationsContextProvider } from './context/recommendations'
import { AudioContextProvider } from './context/audio'
import { HoverContextProvider } from './context/hover'

ReactDOM.render((
  <SearchContextProvider>
    <RecommendationsContextProvider>
      <AudioContextProvider>
        <HoverContextProvider>
          <App/>
        </HoverContextProvider>
      </AudioContextProvider>
    </RecommendationsContextProvider>
  </SearchContextProvider>
), document.getElementById('root'))

// TODO: register() [http://bit.ly/CRA-PWA]
serviceWorker.unregister()
