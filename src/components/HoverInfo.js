import React from 'react'

const HoverInfo = ({ track, ...props }) => {
  if (!track) return null

  return (
    <section id="hover-info" {...props}>
      <div className="bold">
        {track.name}
      </div>
      <div>
        {track.artists && track.artists.map((artist, index) => `${artist.name}${track.artists.length > index + 1 ? ', ' : ''}`)}
      </div>
    </section>
  )
}

export default HoverInfo
