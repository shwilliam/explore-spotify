import React from 'react';

const Node = ({
  id, name, popularity, x, y, previewURL, updatePlayingNode, updateTempNode,
}) => (
  <g
    className="node"
    id={id}
    transform={`translate(${x}, ${y})`}
    onDoubleClick={() => updatePlayingNode({
      id, name, popularity, x, y, previewURL,
    })}
    onClick={updateTempNode}
    onMouseEnter={updateTempNode}
  >
    <circle
      r={popularity / 2.5 + 10}
      fill="var(--blue)"
    />
    <circle
      r={popularity / 6 + 4}
      // hacky red-ish to green-ish color scale
      fill={`hsl(${130 * (popularity / 100)}, 100%, 60%)`}
    />
    <circle
      r="2"
      fill="var(--white)"
    />
  </g>
);

export default Node;
