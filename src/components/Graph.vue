<template>
  <svg class="graph" @click="handleClick" :height="size.height" :width="size.width">
    <g :transform="`translate(${size.width / 2}, ${size.height / 2})`" >
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
          v-if="node.popularity"
          :transform="`translate(${node.x || 0}, ${node.y || 0})`"
          :key="`node-${nodes.indexOf(node)}`"
        >
          <text :key="node.name">{{node.name}}</text>
          <circle
            :id="node.id"
            class="node"
            :r="node.popularity / 2"
            :fill="`hsl(${130 * (node.popularity/100)}, 100%, 50%)`"
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
  props: ['nodes', 'links', 'size'],
  data() {
    return {
      renderTrigger: 0,
      force: null,
    };
  },
  beforeMount() {
    this.force = forceSimulation(this.nodes)
      .force('charge', forceManyBody().strength(-1200)) // TODO: correct to window resize
      .force('forceX', forceX().strength(0.4))
      .force('forceY', forceY().strength(0.6)) // optimized for landscape-oriented window
      .force('center', forceCenter())
      .force('link', forceLink().links(this.links))
      .alphaDecay(0.9)
      .on('tick', this.rerender);
  },
  beforeUpdate() {
    this.force
      .alpha(0.7)
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
      // update 'key' attr to force rerender
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
