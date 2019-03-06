import React from 'react'

const TopHeader = ({ children }) => (
  <header className="pin-top space-between">
    <h1>Explore Spotify</h1>
    {children}
  </header>
)

export default TopHeader
