import {
  forceCenter,
  forceManyBody,
  forceSimulation,
  forceLink,
  forceX,
  forceY
} from 'd3-force'

let force = null

export function initGraph (nodes, width, height) {
  force = forceSimulation(nodes)
    .force('charge', forceManyBody().strength(-280))
    .force('forceX', forceX().strength((height / width) * 0.05))
    .force('forceY', forceY().strength((width / height) * 0.05))
    .force('center', forceCenter())
    .alphaDecay(0)
  return force
}

export function updateNodesAndLinks (nodes, links, setState) {
  force.nodes(nodes).alpha(2).alphaDecay(0.02).force('link', forceLink().links(links).strength(0.1))
  force.restart()
  setState(nodes, links)
  return { nodes, links }
}

export function stopForce () {
  force.stop()
}

export default { initGraph, updateNodesAndLinks, stopForce }
