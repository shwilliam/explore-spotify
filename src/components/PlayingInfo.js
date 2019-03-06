import React from 'react'

const PlayingInfo = ({ track, ...props }) => (
  /* TODO: set aria-live */
  <marquee {...props}> {/* eslint-disable-line */}
    {track ? <>
      <span className="pink">
        ♫
      </span>
      {track.name}
      {track.artists && ' - '}
      {track.artists && track.artists.map((artist, index) => `${artist.name}${track.artists.length > index + 1 ? ', ' : ''}`)}
    </> : <p>Hover/tap to explore songs. Double-click to get recommendations and play track.</p>}
  </marquee>
)

export default PlayingInfo
