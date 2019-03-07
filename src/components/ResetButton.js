/* eslint react/prop-types: 0 */
import React from 'react'

import { withSearchContext } from '../context/search'
import { withRecommendationsContext } from '../context/recommendations'

class ResetButton extends React.PureComponent {
  render () {
    const { resetTracks } = this.props.searchContext
    const { resetRecommendations } = this.props.recommendationsContext

    return (
      <button
        className="pink border-left"
        onClick={() => {
          resetTracks()
          resetRecommendations()
        }}
        type="button"
      >
      reset
      </button>
    )
  }
}

export default withSearchContext(withRecommendationsContext(ResetButton))
