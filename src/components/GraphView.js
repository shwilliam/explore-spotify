import React from 'react';
import glamorous from 'glamorous';

import NodeGraph from './NodeGraph';

const InfoSpan = glamorous.span({
  fontSize: '3.5rem',
  color: 'rgba(154, 211, 222, 0.7)',
  margin: '0 1rem',
  pointerEvents: 'none',
  '> *': {
    margin: 0,
    padding: 0,
  },
});

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
      {hoveredNode
      && (
        <InfoSpan className="top-left">
          <h2>
            {hoveredNode.name}
          </h2>
          {hoveredNode.artists && hoveredNode.artists.map((artist, index) => `${artist.name}${hoveredNode.artists.length > index + 1 ? ', ' : ''}`)}
        </InfoSpan>
      )
    }
      {nodes.length ? (<>
        <button className="reset top-right" onClick={reset} type="button">clear</button>
        <NodeGraph
          nodes={nodes}
          width={width}
          height={height}
          onNodeHover={this.setHoveredNode}
        />
      </>) : <>
        <h2 className="top-left">
          no songs found :(
        </h2><br /><br /><br />
        <button className="" onClick={reset} type="button">reset</button>
    </>}
    </>);
  }
}

export default GraphView;
