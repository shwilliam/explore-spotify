import React from 'react';
import NodeGraph from './NodeGraph';

const GraphView = ({
  nodes, width, height, reset,
}) => (
  <>
    <button className="reset top-right" onClick={reset} type="button">clear</button>
    <NodeGraph
      nodes={nodes}
      width={width}
      height={height}
    />
  </>
);

export default GraphView;
