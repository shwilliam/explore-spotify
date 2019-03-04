import React from 'react';
import posed from 'react-pose';

import NodeGraph from './NodeGraph';

const DraggableDiv = posed.div({
  draggable: true,
  dragBounds: {
    top: '-20%',
    right: '50%',
    bottom: '20%',
    left: '-50%',
  },
})

class GraphView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempNodeInfo: null,
      playingNodeInfo: null,
    };
    this.setTempNodeInfo = this.setTempNodeInfo.bind(this);
    this.setPlayingNodeInfo = this.setPlayingNodeInfo.bind(this);
  }

  setTempNodeInfo(nodes, id) {
    this.setState({ tempNodeInfo: nodes.find(song => song.id === id) });
  }

  setPlayingNodeInfo(nodes, id) {
    this.setState({ playingNodeInfo: nodes.find(song => song.id === id) });
  }

  render() {
    const { nodes } = this.props;
    const { tempNodeInfo, playingNodeInfo } = this.state;
    
    return (<>
      {/* TODO: set aria-live
      eslint-disable-next-line */}
      <marquee className="pin-top">
        {
          playingNodeInfo ? (
            <>
              <span className="pink">
                ♫
              </span>
              {playingNodeInfo.name}
              {playingNodeInfo.artists && ' - '}
              {playingNodeInfo.artists && playingNodeInfo.artists.map((artist, index) => `${artist.name}${playingNodeInfo.artists.length > index + 1 ? ', ' : ''}`)}
            </>
          ) : <p>Hover/tap to explore songs. Double-click to get recommendations and play track.</p>
        }
      </marquee>
      {
      tempNodeInfo
      && (
        <section id="track-info">
          <div className="bold">
            {tempNodeInfo.name}
          </div>
          <div>
            {tempNodeInfo.artists && tempNodeInfo.artists.map((artist, index) => `${artist.name}${tempNodeInfo.artists.length > index + 1 ? ', ' : ''}`)}
          </div>
        </section>
      )
    }
      {nodes.length ? (
        <DraggableDiv className="draggable">
          <NodeGraph
            nodes={nodes}
            updateTempNode={this.setTempNodeInfo}
            updatePlayingNode={this.setPlayingNodeInfo}
            />
        </DraggableDiv>
      ) : alert('No songs found. Please reset the search to try again.')}
    </>);
  }
}

export default GraphView;
