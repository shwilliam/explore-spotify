import React from 'react';

const Node = ({
  id, name, popularity, x, y, onNodeClick,
}) => (
  <g
    className="Node"
    id={id}
    transform={`translate(${x}, ${y})`}
    onClick={() => onNodeClick({
      id, name, popularity, x, y,
    })}
  >
    <text>{name}</text>
    <circle
      r={popularity / 2}
      // hacky red-ish to green-ish color scale
      fill={`hsl(${130 * (popularity / 100)}, 100%, 50%)`}
    />
  </g>
);

export default Node;
