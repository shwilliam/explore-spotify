import React from 'react';

const Node = ({
  id, name, popularity, x, y, previewURL, onNodeClick, onNodeHover,
}) => (
  <g
    className="node"
    id={id}
    transform={`translate(${x}, ${y})`}
    onClick={() => onNodeClick({
      id, name, popularity, x, y, previewURL,
    })}
    onMouseEnter={onNodeHover}
  >
    <circle
      r={popularity / 2.5 + 10}
      fill="black"
    />
    <circle
      r={popularity / 5 + 3}
      // hacky red-ish to green-ish color scale
      fill={`hsl(${130 * (popularity / 100)}, 100%, 50%)`}
    />
    <circle
      r="1.5"
      fill="white"
    />
  </g>
);

export default Node;
