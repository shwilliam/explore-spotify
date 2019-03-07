import React from 'react'

const SearchContext = React.createContext(null)

export class SearchContextProvider extends React.Component {
  state = { searchResults: null }

  setSearchResults = (searchResults) => {
    this.setState({ searchResults })
  }

  resetTracks = () => {
    this.setState({ searchResults: null, hoveredTrack: null })
  }

  render () {
    const { children } = this.props
    const { searchResults } = this.state

    return (
      <SearchContext.Provider
        value={{
          searchResults,
          updateSearchResults: this.setSearchResults,
          resetTracks: this.resetTracks
        }}
      >
        {children}
      </SearchContext.Provider>
    )
  }
}

export const withSearchContext = Component => props => (
  <SearchContext.Consumer>
    {searchContext => <Component {...props} searchContext={searchContext}/>}
  </SearchContext.Consumer>
)

export default SearchContext
