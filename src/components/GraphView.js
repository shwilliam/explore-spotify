import React from 'react';
import NodeGraph from './NodeGraph';

class GraphView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNode: null,
    };
    this.setNodeInfo = this.setNodeInfo.bind(this);
  }

  setNodeInfo(nodes, id) {
    this.setState({ hoveredNode: nodes.find(song => song.id === id) });
  }

  render() {
    const { nodes } = this.props;
    const { hoveredNode } = this.state;

    return (<>
      {hoveredNode
      && (
        // TODO: set aria-live
        <section className="pin-top-left">
          <div>{hoveredNode.name}</div>
          <div>{hoveredNode.artists && hoveredNode.artists.map((artist, index) => `${artist.name}${hoveredNode.artists.length > index + 1 ? ', ' : ''}`)}</div>
        </section>
      )
    }
      {nodes.length ? (
        <NodeGraph
          nodes={nodes}
          updateNodeInfo={this.setNodeInfo}
        />
      ) : (
        <div>
          no songs found :(
        </div>)
      }
    </>);
  }
}

export default GraphView;
