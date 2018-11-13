<template>
  <div class="explore-graph">
    <button @click="clearGraph" class="clear" v-if="recommendations">
      clear
    </button>
    <span class="loading" v-if="loading && !error">loading...</span>
    <span class="error" v-if="error">please click <a href="/">here</a> to try again</span>
    <Graph
      v-if="recommendations"
      :nodes="recommendations"
      :links="links"
      :size="windowSize"
      @click="handleNodeClick"
    />
  </div>
</template>

<script>
import Graph from './Graph.vue';

export default {
  name: 'explore-graph',
  props: ['token', 'initialTrackProps'],
  components: {
    Graph,
  },
  data() {
    return {
      recommendations: [],
      links: [],
      clickedTracks: [],
      windowSize: { width: 0, height: 0 },
      error: null,
      loading: true,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.initGraph(this.initialTrackProps);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initGraph({ id, popularity }) {
      this.fetchRecommendedTracks(id)
        .then(res => res.json())
        .then(({ tracks }) => {
          const links = [];
          const recommendations = [{ id, popularity }]; // center node
          tracks.map(track => {
            recommendations.push(track);
            track.popularity &&
              links.push({
                source: 0,
                target: recommendations.indexOf(track),
              });
            return { recommendations, links };
          });

          this.links = links;
          this.recommendations = recommendations;
        })
        .catch(err => {
          this.error = true;
          return console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchRecommendedTracks(trackSeed, limit = 10) {
      return fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${trackSeed}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        },
      );
    },
    handleNodeClick(id) {
      this.loading = true;
      const clickedNodeIndex = this.recommendations.filter(
        track => track.id === id,
      )[0].index;

      let { clickedTracks } = this;
      if (clickedTracks.length === 5) {
        clickedTracks = clickedTracks.slice(1, 5);
      }
      clickedTracks.push(id);

      const allClickedTracks = clickedTracks.join(',');
      this.fetchRecommendedTracks(allClickedTracks)
        .then(res => res.json())
        .then(({ tracks }) => {
          const indexOffset = this.recommendations.length;

          tracks.map(track => {
            this.recommendations = [...this.recommendations, track];
            this.links = [
              ...this.links,
              {
                source: clickedNodeIndex,
                target: tracks.indexOf(track) + indexOffset,
              },
            ];
            return { recommendations: this.recommendations, links: this.links };
          });
        })
        .catch(err => {
          this.error = true;
          return console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleResize() {
      this.windowSize.width = window.innerWidth;
      this.windowSize.height = window.innerHeight;
    },
    clearGraph() {
      this.$emit('clear');
    },
  },
  watch: {
    initialTrackProps: 'initGraph',
  },
};
</script>

<style scoped>
button.clear {
  color: white;
  background-color: black;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  border: none;
  cursor: pointer;
}
</style>
