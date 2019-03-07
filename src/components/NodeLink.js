/* eslint react/prop-types: 0 */
import React from 'react'

class NodeLink extends React.PureComponent {
  render () {
    const { source, target } = this.props

    return (
      <line
        stroke="var(--pink)"
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
      />
    )
  }
}

export default NodeLink
