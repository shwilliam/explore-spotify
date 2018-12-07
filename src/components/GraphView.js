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

  setHoveredNode(nodes, id) {
    this.setState({ hoveredNode: nodes.find(song => song.id === id) });
  }

  render() {
    const {
      nodes, width, height, reset,
    } = this.props;
    const { hoveredNode } = this.state;

    return (<>
      <button className="reset top-right" onClick={reset} type="button">clear</button>
      {hoveredNode
      && (
      <span className="top-left">
        <h2>
          {hoveredNode.name}
        </h2>
        {hoveredNode.artists && hoveredNode.artists.map((artist, index) => `${artist.name}${hoveredNode.artists.length > index + 1 ? ', ' : ''}`)}
      </span>
      )
        }
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
