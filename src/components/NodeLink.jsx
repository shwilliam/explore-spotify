import React from 'react';

const NodeLink = ({ source, target }) => (
  <line
    className="NodeLink"
    stroke="black"
    x1={source.x}
    y1={source.y}
    x2={target.x}
    y2={target.y}
  />
);

export default NodeLink;
