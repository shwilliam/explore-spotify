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
  id, name, popularity, x, y, previewURL, onNodeClick, onNodeHover,
}) => (
  <StyledNode
    className="Node"
    id={id}
    transform={`translate(${x}, ${y})`}
    onClick={() => onNodeClick({
      id, name, popularity, x, y, previewURL,
    })}
    onMouseEnter={onNodeHover}
  >
    <circle
      r={popularity / 2}
      fill="black"
    />
    <circle
      r={popularity / 8}
      // hacky red-ish to green-ish color scale
      fill={`hsl(${130 * (popularity / 100)}, 100%, 50%)`}
    />
    <circle
      r="1"
      fill="black"
    />
  </StyledNode>
);

export default Node;
