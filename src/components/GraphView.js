import React from 'react';
import NodeGraph from './NodeGraph';

class GraphView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNode: null,
    };
    this.setHoveredNode = this.setHoveredNode.bind(this);
  }

  setHoveredNode(name) {
    this.setState({ hoveredNode: name });
  }

  render() {
    const {
      nodes, width, height, reset,
    } = this.props;

    return (<>
      <button className="reset top-right" onClick={reset} type="button">clear</button>
      {this.state.hoveredNode}
      <NodeGraph
        nodes={nodes}
        width={width}
        height={height}
        onNodeHover={this.setHoveredNode}
      />
    </>);
  }
}

export default GraphView;
