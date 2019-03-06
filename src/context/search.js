import React from 'react'

const TrackContext = React.createContext(null)

export class TrackContextProvider extends React.Component {
  state = {
    searchResults: null,
    hoveredTrack: null,
    playingTrack: null
  }

  setSearchResults = (searchResults) => {
    this.setState({ searchResults })
  }

  resetTracks = () => {
    this.setState({ searchResults: null, hoveredTrack: null, playingTrack: null })
  }

  setHoveredTrack = (id, name, artists, popularity, previewURL) => {
    this.setState({ hoveredTrack: { id, name, artists, popularity, previewURL } })
  }

  setPlayingTrack = (id, name, artists, popularity, previewURL) => {
    this.setState({ playingTrack: { id, name, artists, popularity, previewURL } })
  }

  render () {
    const { children } = this.props
    const { searchResults, hoveredTrack, playingTrack } = this.state

    return (
      <TrackContext.Provider
        value={{
          searchResults,
          updateSearchResults: this.setSearchResults,
          resetTracks: this.resetTracks,
          hoveredTrack,
          playingTrack,
          setHoveredTrack: this.setHoveredTrack,
          setPlayingTrack: this.setPlayingTrack
        }}
      >
        {children}
      </TrackContext.Provider>
    )
  }
}

export const withTrackContext = Component => props => (
  <TrackContext.Consumer>
    {trackContext => <Component {...props} trackContext={trackContext} />}
  </TrackContext.Consumer>
)

export default TrackContext
