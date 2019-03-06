import React from 'react'

const Node = ({
  id, radius, color, x, y, children, ...props
}) => (
  <g
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

export default Node
