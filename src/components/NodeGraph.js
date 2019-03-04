import React from 'react';

import { fetchRecommendations } from '../assets/helpers/spotify-helpers';
import { initGraph, updateNodesAndLinks, stopForce } from '../assets/helpers/d3-helpers';

import Node from './Node';
import NodeLink from './NodeLink';

class NodeGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.nodes,
      links: null,
      clickedTracks: null,
      // TODO: make responsive
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.updatePlayingNode = this.updatePlayingNode.bind(this);
  }

  componentDidMount() {
    const { nodes, width, height } = this.state;

    initGraph(nodes, width, height)
      .on('tick', () => this.forceUpdate());
  }

  componentWillUnmount() {
    stopForce();
    if (this.preview) this.preview.pause();
  }

  updatePlayingNode({
    id, name, popularity, x, y, previewURL,
  }) {
    const { updatePlayingNode } = this.props;
    let { nodes, links, clickedTracks } = this.state;

    if (!clickedTracks) {
      clickedTracks = [id];
      nodes = [{
        id, name, popularity, x, y, previewURL,
      }];
      links = [];
    } else {
      if (clickedTracks.length === 5) {
        clickedTracks = clickedTracks.slice(1, 5);
      }
      clickedTracks.push(id);
    }

    const clickedNodeIndex = nodes.filter(
      track => track.id === id,
    )[0].index || 0; // 0 on init

    if (this.preview && previewURL) {
      this.preview.pause();
    }
    if (previewURL) {
      this.preview = new Audio();
      this.preview.src = previewURL;
      this.preview.volume = 0.2;
      this.preview.addEventListener('canplay', () => this.preview.play() && updatePlayingNode(nodes, id));
    }

    fetchRecommendations(clickedTracks.join(','))
      .then(res => res.json())
      .then(({ tracks }) => {
        tracks.map((track) => {
          if (nodes.findIndex(node => node.id === track.id) === -1) {
            nodes.push(track);
            links.push({
              source: clickedNodeIndex,
              target: nodes.indexOf(track),
            });
          }
          return { tracks, links };
        });
        updateNodesAndLinks(nodes, links, clickedTracks, state => this.setState(state));
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }

  render() {
    const {
      updateTempNode,
    } = this.props;
    const {
      nodes, links, width, height,
    } = this.state;

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          <g className="links">
            {
              links && links.map(link => (
                <NodeLink
                  key={`link-${link.source.id}_${link.target.id}`}
                  source={{ x: link.source.x, y: link.source.y }}
                  target={{ x: link.target.x, y: link.target.y }}
                />
              ))
              }
          </g>
          <g className="nodes">
            {nodes && nodes.map(({
              id, name, popularity, x = 0, y = 0, preview_url,
            }) => (
              <Node
                id={id}
                key={`node-${id}`}
                name={name}
                popularity={popularity}
                x={x}
                y={y}
                previewURL={preview_url}
                updatePlayingNode={this.updatePlayingNode}
                updateTempNode={() => updateTempNode(nodes, id)}
              />
            ))
        }
          </g>
        </g>
      </svg>
    );
  }
}

export default NodeGraph;
