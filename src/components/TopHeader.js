/* eslint react/prop-types: 0 */
import React from 'react'

class TopHeader extends React.PureComponent {
  render () {
    const { children } = this.props

    return (
      <header className="pin-top space-between">
        <h1>Explore Spotify</h1>
        {children}
      </header>
    )
  }
}

export default TopHeader
