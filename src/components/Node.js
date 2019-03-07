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
          id={`node-${id}`}
        />
        <text fill="var(--pink)">
          <textPath alignmentBaseline="top" xlinkHref={`#node-${id}`}>
            {children}
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
