import React from 'react'

const HoverContext = React.createContext(null)

export class HoverContextProvider extends React.Component {
  state = {
    hoveredTrack: null,
    lastHover: null
  }

  setHoveredTrack = (id, name, artists, popularity, previewURL) => {
    this.setState({ hoveredTrack: { id, name, artists, popularity, previewURL }, lastHover: (new Date()).valueOf() })
  }

  render () {
    const { children } = this.props
    const { hoveredTrack, lastHover } = this.state

    return (
      <HoverContext.Provider
        value={{
          hoveredTrack,
          lastHover,
          setHoveredTrack: this.setHoveredTrack
        }}
      >
        {children}
      </HoverContext.Provider>
    )
  }
}

export const withHoverContext = Component => props => (
  <HoverContext.Consumer>
    {hoverContext => <Component {...props} hoverContext={hoverContext}/>}
  </HoverContext.Consumer>
)

export default HoverContext
