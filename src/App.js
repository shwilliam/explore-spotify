import React from 'react'
import { initSpotifyAPI } from './assets/utils/spotify'

import { withTrackContext } from './context/search'

import Navigation from './components/Navigation'
import TopHeader from './components/TopHeader'
import SearchForm from './components/SearchForm'
import DraggableGraphContainer from './components/DraggableGraphContainer'
import NodeGraph from './components/NodeGraph'
import HoverInfo from './components/HoverInfo'
import PlayingInfo from './components/PlayingInfo'

const accessToken = initSpotifyAPI()

const App = withTrackContext(({ trackContext }) => {
  const {
    searchResults,
    resetTracks,
    hoveredTrack,
    setHoveredTrack,
    playingTrack,
    setPlayingTrack
  } = trackContext

  if (!accessToken) return (<div>Redirecting to Spotify login...</div>)
  else if (!searchResults) {
    return (
      <main role="main">
        <TopHeader>
          <Navigation />
        </TopHeader>
        <SearchForm />
      </main>
    )
  }
  return (
    <main role="main">
      <TopHeader>
        <button
          className="pink border-left"
          onClick={resetTracks}
          type="button"
        >
          reset
        </button>
      </TopHeader>
      <PlayingInfo track={playingTrack} className="pin-top" />
      {
        hoveredTrack && <HoverInfo
          track={hoveredTrack}
        />
      }
      <DraggableGraphContainer>
        <NodeGraph
          searchResults={searchResults}
          updateTempNode={setHoveredTrack}
          updatePlayingNode={setPlayingTrack}
        />
      </DraggableGraphContainer>
    </main>
  )
})

export default App
