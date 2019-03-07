import React from 'react'
import { withAudioContext } from '../context/audio'

class PlayingInfo extends React.PureComponent {
  render () {
    const { playingTrack } = this.props.audioContext

    return (
    /* TODO: set aria-live */
    <marquee className="pin-top"> {/* eslint-disable-line */}
        {playingTrack ? <>
        <span className="pink">
          ♫
        </span>
        {playingTrack.name}
        {playingTrack.artists && ' - '}
        {playingTrack.artists && playingTrack.artists.map(
          (artist, index) => `${artist.name}${playingTrack.artists.length > index + 1 ? ', ' : ''}`
        )}
      </> : <p>Hover/tap to explore songs. Double-click to get recommendations and play track.</p>}
      </marquee>
    )
  }
}

export default withAudioContext(PlayingInfo)
