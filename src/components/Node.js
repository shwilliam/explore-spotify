import React from 'react';
import glamorous from 'glamorous';

const StyledNode = glamorous.g({
  '& > text': {
    opacity: 0,
  },
  ':hover': {
    '& > text': {
      opacity: 1,
    },
  },
});

const Node = ({
  id, name, popularity, x, y, onNodeClick,
}) => (
  <StyledNode
    className="Node"
    id={id}
    transform={`translate(${x}, ${y})`}
    onClick={() => onNodeClick({
      id, name, popularity, x, y,
    })}
  >
    <circle
      r={popularity / 2}
      // hacky red-ish to green-ish color scale
      fill={`hsl(${130 * (popularity / 100)}, 100%, 50%)`}
    />
    <text x="20" y="-35">{name}</text>
  </StyledNode>
);

export default Node;
