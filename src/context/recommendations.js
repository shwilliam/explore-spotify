import React from 'react'

const RecommendationsContext = React.createContext(null)

export class RecommendationsContextProvider extends React.Component {
  state = {
    clickedTracks: []
  }

  addClickedTrack = (id) => {
    this.setState(({ clickedTracks }) => {
      let updatedClickedTracks = clickedTracks.slice()
      updatedClickedTracks.push(id)

      return {
        clickedTracks: updatedClickedTracks
      }
    })
  }

  resetRecommendations = () => {
    this.setState({ clickedTracks: [] })
  }

  render () {
    const { children } = this.props
    const { clickedTracks } = this.state

    return (
      <RecommendationsContext.Provider
        value={{
          clickedTracks,
          addClickedTrack: this.addClickedTrack,
          resetRecommendations: this.resetRecommendations
        }}
      >
        {children}
      </RecommendationsContext.Provider>
    )
  }
}

export const withRecommendationsContext = Component => props => (
  <RecommendationsContext.Consumer>
    {recommendationsContext => <Component {...props} recommendationsContext={recommendationsContext}/>}
  </RecommendationsContext.Consumer>
)

export default RecommendationsContext
