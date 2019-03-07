/* eslint react/prop-types: 0 */
import React from 'react'

const AudioContext = React.createContext(null)

export class AudioContextProvider extends React.Component {
  state = {
    playingTrack: null,
    playingTrackAudio: null,
    playingVolume: 20
  }

  playTrack = () => {
    const { playingTrackAudio, playingVolume } = this.state
    playingTrackAudio.volume = playingVolume / 100 // eslint-disable-line
    playingTrackAudio.play()
  }

  pauseTrack = () => {
    this.state.playingTrackAudio.pause()
  }

  setPlayingTrack = (id, name, artists, popularity, previewURL) => {
    this.setState({ playingTrack: { id, name, artists, popularity, previewURL } })
  }

  setPlayingTrackAudio = (audio) => {
    this.setState({ playingTrackAudio: audio })
  }

  setPlayingVolume = (volume) => {
    const { playingTrackAudio } = this.state
    playingTrackAudio.volume = volume / 100 // eslint-disable-line
    this.setState({ playingVolume: volume })
  }

  render () {
    const { children } = this.props
    const { playingTrack, playingTrackAudio, playingVolume } = this.state

    return (
      <AudioContext.Provider
        value={{
          playingTrack,
          playingTrackAudio,
          playTrack: this.playTrack,
          pauseTrack: this.pauseTrack,
          playingVolume,
          setPlayingTrack: this.setPlayingTrack,
          setPlayingTrackAudio: this.setPlayingTrackAudio,
          setPlayingVolume: this.setPlayingVolume
        }}
      >
        {children}
      </AudioContext.Provider>
    )
  }
}

export const withAudioContext = Component => props => (
  <AudioContext.Consumer>
    {audioContext => <Component {...props} audioContext={audioContext}/>}
  </AudioContext.Consumer>
)

export default AudioContext
