import {
  forceCenter,
  forceManyBody,
  forceSimulation,
  forceLink,
  forceX,
  forceY,
} from 'd3-force';

let force = null;

export function initGraph(nodes, width, height) {
  force = forceSimulation(nodes)
    .force('charge', forceManyBody().strength(-500))
    .force('forceX', forceX().strength((height / width) * 0.05))
    .force('forceY', forceY().strength((width / height) * 0.05))
    .force('center', forceCenter())
    .alphaDecay(0.1);
  return force;
}

export function updateNodesAndLinks(nodes, links, clickedTracks, callback) {
  force.nodes(nodes).alpha(0.4).alphaDecay(0.02).force('link', forceLink().links(links).strength(0.3));
  force.restart();
  callback({
    nodes,
    links,
    clickedTracks,
  });
  return { nodes, links };
}

export function stopForce() {
  force.stop();
}

export default { initGraph, updateNodesAndLinks, stopForce };
