<template>
  <svg class="search-results" :height="size.height" :width="size.width">
    <g :transform="`translate(${size.width / 2}, ${size.height / 2})`">
      <g class="reults">
        <g
          v-for="result in results"
          class="result"
          :transform="`translate(${result.x || 0}, ${result.y || 0})`"
          :key="`result-${results.indexOf(result)}`"
        >
          <text :key="result.name">{{result.name}}</text>
          <circle
            :id="result.id"
            @click="emitClick(result.id, result.popularity)"
            class="result"
            :r="result.popularity / 2"
            :fill="`hsl(${130 * (result.popularity/100)}, 100%, 50%)`"
            :key="`circle-${result.id}`"
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
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';

export default {
  name: 'search-results',
  props: ['results'],
  data() {
    return {
      renderTrigger: 0,
      force: null,
      size: { width: 0, height: 0 },
    };
  },
  methods: {
    emitClick(id, popularity) {
      this.$emit('click', { id, popularity });
    },
    handleResize() {
      this.size.width = window.innerWidth;
      this.size.height = window.innerHeight;
    },
    rerender() {
      // update 'key' attr to force rerender
      this.renderTrigger += 1;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeMount() {
    this.force = forceSimulation(this.results)
      .force('charge', forceManyBody().strength(-1200)) // TODO: correct to window resize
      .force('forceX', forceX().strength(0.4))
      .force('forceY', forceY().strength(0.6)) // optimized for landscape-oriented window
      .force('center', forceCenter())
      .alphaDecay(0.9)
      .on('tick', this.rerender);
  },
};
</script>

<style scoped>
li {
  list-style: none;
  cursor: pointer;
}
</style>
