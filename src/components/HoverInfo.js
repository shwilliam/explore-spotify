import React from 'react'
import { withHoverContext } from '../context/hover'

class HoverInfo extends React.PureComponent {
  render () {
    const { hoveredTrack } = this.props.hoverContext
    if (!hoveredTrack) return null

    return (
      <section id="hover-info">
        <div className="bold">
          {hoveredTrack.name}
        </div>
        <div>
          {hoveredTrack.artists && hoveredTrack.artists.map((artist, index) => `${artist.name}${hoveredTrack.artists.length > index + 1 ? ', ' : ''}`)}
        </div>
      </section>
    )
  }
}

export default withHoverContext(HoverInfo)
