<template>
  <svg class="graph" @click="handleClick" :width="width" :height="height">
    <g :transform="'translate(' + width / 2 + ', ' + height / 2 + ')'" >
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
          <text>{{node.name}}</text>
          <circle
            :id="node.id"
            class="node"
            r="8"
            fill="crimson"
            :key="`circle-${node.id}`"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'graph',
  props: ['nodes', 'links', 'width', 'height'],
  methods: {
    handleClick(e) {
      e.target.tagName === 'circle' && this.$emit('click', e.target.id);
    },
  },
};
</script>

<style scoped>
svg.graph text {
  font-size: 8px;
}
</style>
