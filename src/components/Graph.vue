<template>
  <svg class="graph" @click="handleClick" :width="width" :height="height">
    <g :transform="`translate(${width / 2}, ${height / 2})`" >
      <g class="links">
        <line
          v-for="link in links"
          class="link"
          stroke="black"
          :x1="link.source.x"
          :y1="link.source.y"
          :x2="link.target.x"
          :y2="link.target.y"
          :key="`link-${links.indexOf(link)}`"
        />
      </g>
      <g class="nodes">
        <g
          v-for="node in nodes"
          class="node"
          :transform="`translate(${node.x || 0}, ${node.y || 0})`"
          :key="`node-${nodes.indexOf(node)}`"
        >
          <text :key="`node.name`">{{node.name}}</text>
          <circle
            :id="node.id"
            class="node"
            r="8"
            fill="crimson"
            :key="`circle-${node.id}`"
          />
        </g>
      </g>
      <g :key="renderTrigger"></g>
      <!-- used to force rerender -->
    </g>
  </svg>
</template>

<script>
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';

export default {
  name: 'graph',
  props: ['nodes', 'links', 'width', 'height'],
  data() {
    return {
      renderTrigger: 0,
      force: null,
    };
  },
  beforeMount() {
    this.force = forceSimulation(this.nodes)
      .force('charge', forceManyBody().strength(-100))
      .force('forceX', forceX().strength(0.1))
      .force('forceY', forceY().strength(0.1))
      .force('center', forceCenter())
      .force('link', forceLink().links(this.links))
      .alphaDecay(0.4)
      .alphaTarget(0.1)
      .on('tick', this.rerender);
  },
  beforeUpdate() {
    this.force.stop();
    this.force
      .alpha(0.5)
      .nodes(this.nodes)
      .force('link')
      .links(this.links);
    this.force.restart();
  },
  methods: {
    handleClick(e) {
      if (e.target.tagName === 'circle') {
        this.$emit('click', e.target.id);
      }
    },
    rerender() {
      // update 'key' value of links to force rerender
      this.renderTrigger += 1;
    },
  },
};
</script>

<style scoped>
svg.graph text {
  font-size: 8px;
}
</style>
