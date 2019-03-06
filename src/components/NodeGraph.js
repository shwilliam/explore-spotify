import React from 'react'
import { fetchRecommendations } from '../assets/utils/spotify'
import { initGraph, updateNodesAndLinks, stopForce } from '../assets/utils/d3'

import Node from './Node'
import NodeLink from './NodeLink'

class NodeGraph extends React.Component {
  state = {
    nodes: this.props.searchResults,
    links: null,
    clickedTracks: null,
    // TODO: make responsive
    width: window.innerWidth * 2,
    height: window.innerHeight * 2
  }

  componentDidMount () {
    const { nodes, width, height } = this.state
    this._mounted = true

    initGraph(nodes, width, height)
      .on('tick', () => this.forceUpdate())
  }

  componentWillUnmount () {
    this._mounted = false

    stopForce()
    if (this.preview) this.preview.pause() && this.preview.removeEventListener('canplay', this.playPreview)
  }

  updatePlayingNode = (
    { id, name, artists, popularity, previewURL }, { x, y }
  ) => {
    const { updatePlayingNode } = this.props
    let { nodes, links, clickedTracks } = this.state

    if (!clickedTracks) {
      clickedTracks = [id]
      nodes = [{
        id, name, artists, popularity, x, y, previewURL
      }]
      links = []
    } else {
      if (clickedTracks.length === 5) {
        clickedTracks = clickedTracks.slice(1, 5)
      }
      clickedTracks.push(id)
    }

    const clickedNodeIndex = nodes.filter(
      track => track.id === id
    )[0].index || 0

    if (this.preview && previewURL) {
      this.preview.pause()
      this.preview.removeEventListener('canplay', this.playPreview)
    }
    if (previewURL) {
      this.preview = new Audio()
      this.preview.src = previewURL
      this.preview.volume = 0.2
      this.playPreview = () => {
        if (!this._mounted) return
        this.preview.play()
        updatePlayingNode(id, name, artists, popularity, previewURL)
      }
      this.preview.addEventListener('canplay', this.playPreview)
    }

    fetchRecommendations(clickedTracks.join(','))
      .then(res => res.json())
      .then(({ tracks }) => {
        tracks.map((track) => {
          if (nodes.findIndex(node => node.id === track.id) === -1) {
            nodes.push(track)
            links.push({
              source: clickedNodeIndex,
              target: nodes.indexOf(track)
            })
          }
          return { tracks, links }
        })

        if (this._mounted) updateNodesAndLinks(nodes, links, clickedTracks, state => this.setState(state))
      })
      .catch((error) => {
        alert('Couldn\'t fetch song recommendations... Please refresh the page.'); // eslint-disable-line
        console.error(error); // eslint-disable-line
      })
  }

  render () {
    const {
      updateTempNode
    } = this.props
    const {
      nodes, links, width, height
    } = this.state

    return (
      <svg width={width} height={height} transform={`translate(-${width / 4}, -${height / 4})`}>
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
              id, name, artists, popularity, preview_url: previewURL, x = 0, y = 0
            }) => (
              <Node
                id={id}
                radius={popularity / 2.5 + 17}
                // hacky green-ish to red-ish color scale
                color={`hsl(${130 * (popularity / 100)}, 100%, 60%)`}
                key={`node-${id}`}
                x={x}
                y={y}
                onClick={() => this.updatePlayingNode({ id, name, artists, popularity, previewURL }, { x, y })}
                onMouseEnter={() => updateTempNode(id, name, artists, popularity, previewURL)}
              >
                {name}
              </Node>
            ))
            }
          </g>
        </g>
      </svg>
    )
  }
}

export default NodeGraph
