import React from 'react'
import { fetchRecommendations } from '../assets/utils/spotify'
import { initGraph, updateNodesAndLinks, stopForce } from '../assets/utils/d3'

import { withSearchContext } from '../context/search'
import { withRecommendationsContext } from '../context/recommendations'
import { withAudioContext } from '../context/audio'
import { withHoverContext } from '../context/hover'

import Node from './Node'
import NodeLink from './NodeLink'

class NodeGraph extends React.PureComponent {
  state = {
    nodes: this.props.searchContext.searchResults,
    links: [],
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
    const {
      playingTrackAudio,
      pauseTrack
    } = this.props.audioContext

    this._mounted = false
    stopForce()
    if (playingTrackAudio) {
      pauseTrack()
      playingTrackAudio.removeEventListener('canplay', this.playPreview)
    }
  }

  handleNodeClick = (
    { id, name, artists, popularity, previewURL }, { x, y }
  ) => {
    const {
      setPlayingTrack,
      playingTrackAudio,
      setPlayingTrackAudio,
      playTrack,
      pauseTrack
    } = this.props.audioContext
    const {
      clickedTracks,
      addClickedTrack
    } = this.props.recommendationsContext
    const {
      hoveredTrack,
      lastHover
    } = this.props.hoverContext
    let { nodes, links } = this.state

    // touch acts as hover (double-click ≅ 500ms)
    if (hoveredTrack.id !== id || lastHover + 200 > (new Date()).valueOf()) return

    let updatedClickedNodes = clickedTracks.slice()
    updatedClickedNodes.push(id)

    let updatedNodes = nodes.slice()
    if (!clickedTracks.length) { // initial select
      updatedNodes = [{
        id, name, artists, popularity, x, y, previewURL
      }]
    }

    const clickedNodeIndex = updatedNodes.filter(
      track => track.id === id
    )[0].index || 0

    if (previewURL) {
      if (playingTrackAudio) {
        pauseTrack()
        playingTrackAudio.removeEventListener('canplay', this.playPreview)
      }
      const newAudio = new Audio()
      newAudio.src = previewURL
      this.playPreview = () => {
        if (!this._mounted) return
        playTrack()
        setPlayingTrack(id, name, artists, popularity, previewURL)
        addClickedTrack(id)
      }
      newAudio.addEventListener('canplay', this.playPreview)
      setPlayingTrackAudio(newAudio)
    }

    let recentClickedNodes = updatedClickedNodes.slice()
    if (updatedClickedNodes.length > 5) {
      recentClickedNodes = updatedClickedNodes.slice(-5)
    }

    fetchRecommendations(recentClickedNodes.join(','))
      .then(res => res.json())
      .then(({ tracks }) => {
        tracks.map((track) => {
          // filter repeated tracks
          if (updatedNodes.findIndex(node => node.id === track.id) === -1) {
            updatedNodes.push(track)
            links.push({
              source: clickedNodeIndex,
              target: updatedNodes.indexOf(track)
            })
          }
          return { tracks, links }
        })

        if (this._mounted) updateNodesAndLinks(updatedNodes, links, (nodes, links) => this.setState({ nodes, links }))
      })
      .catch((error) => {
        alert('Couldn\'t fetch song recommendations... Please refresh the page.'); // eslint-disable-line
        console.error(error); // eslint-disable-line
      })
  }

  render () {
    const {
      hoverContext
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
                onClick={() => this.handleNodeClick({ id, name, artists, popularity, previewURL }, { x, y })}
                onMouseEnter={() => hoverContext.setHoveredTrack(id, name, artists, popularity, previewURL)}
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

export default withSearchContext(withRecommendationsContext(withAudioContext(withHoverContext(NodeGraph))))
