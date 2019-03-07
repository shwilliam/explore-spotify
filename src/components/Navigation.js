import React from 'react'

class Navigation extends React.PureComponent {
  render () {
    return (
      <nav>
        <ul>
          <li>
            <a href="https://github.com/shwilliam/explore-spotify-graph/blob/master/README.md#contributing" target="_blank" rel="noopener noreferrer">
            contribute
            </a>
          </li>
          <li>
            <a className="pink" href="https://github.com/shwilliam/explore-spotify-graph/issues" target="_blank" rel="noopener noreferrer">
            issues
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
