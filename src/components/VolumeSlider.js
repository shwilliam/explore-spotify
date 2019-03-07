import React from 'react'
import { withAudioContext } from '../context/audio'

class VolumeSlider extends React.PureComponent {
  render () {
    const { playingTrackAudio, playingVolume, setPlayingVolume } = this.props.audioContext

    if (!playingTrackAudio) return null
    return (
      <label id="volume-slider" htmlFor="range-slider">
        <div className="label">{playingVolume}</div>
        <input
          id="range-slider"
          orient="vertical"
          type="range"
          name="range-slider"
          min="0"
          max="100"
          step="1"
          defaultValue={playingVolume}
          onChange={(e) => setPlayingVolume(parseInt(e.target.value))}/>
      </label>
    )
  }
}

export default withAudioContext(VolumeSlider)
