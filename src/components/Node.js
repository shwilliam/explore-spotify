/* eslint react/prop-types: 0 */
import React from 'react'

class Node extends React.PureComponent {
  render () {
    const { id, radius, color, x, y, children, ...props } = this.props

    return (
      <g
        className="node"
        {...props}
        transform={`translate(${x}, ${y})`}
      >
        <circle
          r={radius}
          fill="var(--blue)"
        />
        <circle
          r={radius + 2}
          fill="none"
          id={`node-${id}`}
        />
        <text fill="var(--pink)">
          <textPath alignmentBaseline="top" href={`#node-${id}`}>
            {
              children.length > radius
                ? children.slice(0, 15) + '...'
                : children
            }
          </textPath>
        </text>
        <circle
          r={radius / 2.5}
          fill={color}
        />
        <circle
          r="2"
          fill="var(--white)"
        />
      </g>
    )
  }
}

export default Node
