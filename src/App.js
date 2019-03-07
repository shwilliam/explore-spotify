/* eslint react/prop-types: 0 */
import React from 'react'
import { initSpotifyAPI } from './assets/utils/spotify'

import { withSearchContext } from './context/search'

import SearchView from './views/SearchView'
import GraphView from './views/GraphView'

const accessToken = initSpotifyAPI()

class App extends React.PureComponent {
  render () {
    const { searchResults } = this.props.searchContext

    if (!accessToken) {
      return <div>Redirecting to Spotify login...</div>
    } else if (!searchResults) {
      return <SearchView/>
    }
    return <GraphView/>
  }
}

export default withSearchContext(App)
