/* eslint react/prop-types: 0 */
import React from 'react'
import queryString from 'query-string'
import { updateAccessToken, redirectToLogin } from './assets/utils/spotify'
import { getItem, setItem, clear } from './assets/utils/local-storage'

import { withSearchContext } from './context/search'

import SearchView from './views/SearchView'
import GraphView from './views/GraphView'

const localToken = getItem('token')
const tokenTimestamp = getItem('token-timestamp')
const queryToken = queryString.parse(window.location.search).access_token

// expired token
if (localToken && parseInt(tokenTimestamp) + 1000000 < (new Date()).valueOf()) {
  redirectToLogin()
}

if (queryToken) {
  clear()
  setItem('token', queryToken)
  setItem('token-timestamp', (new Date()).valueOf())

  updateAccessToken(queryToken)
} else if (localToken) {
  updateAccessToken(localToken)
} else {
  redirectToLogin()
}

class App extends React.PureComponent {
  render () {
    const { searchResults } = this.props.searchContext

    return !searchResults ? <SearchView/> : <GraphView/>
  }
}

export default withSearchContext(App)
