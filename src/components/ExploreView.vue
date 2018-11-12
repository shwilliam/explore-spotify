<template>
  <div class="explore-graph">
    <span class="loading" v-if="loading && !error">loading...</span>
    <span class="error" v-if="error">please refresh to try again</span>
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

const baseUrl = 'https://api.spotify.com/v1';

export default {
  name: 'explore-graph',
  props: ['token'],
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
    this.initGraph();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initGraph() {
      // fetch initial recommendations, make links to center node
      this.fetchRecommendedTracks()
        .then(res => res.json())
        .then(({ tracks }) => {
          const links = [];
          const recommendations = [{ id: '' }]; // center node

          tracks.map((track) => {
            recommendations.push(track);
            links.push({
              source: 0,
              target: recommendations.indexOf(track),
            });
            return { recommendations, links };
          });

          this.links = links;
          this.recommendations = recommendations;
        })
        .catch((err) => {
          this.error = true;
          return console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchRecommendedTracks(limit = 10, trackSeed = '2wq3IABSPtBFush3qsfZoK') {
      // defaults to Belle and Sebastian's 'Step Into My Office, Baby'
      return fetch(
        `${baseUrl}/recommendations?limit=${limit}&seed_tracks=${trackSeed}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        },
      );
    },
    handleNodeClick(id) {
      this.loading = true;
      const clickedNodeIndex = this.recommendations.filter(track => track.id === id)[0].index;

      this.clickedTracks.push(id); // TODO: limit to 5
      const allClickedTracks = this.clickedTracks.join(',');

      this.fetchRecommendedTracks(10, allClickedTracks)
        .then(res => res.json())
        .then(({ tracks }) => {
          const indexOffset = this.recommendations.length;

          tracks.map((track) => {
            this.recommendations = [...this.recommendations, track];
            this.links = [...this.links, {
              source: clickedNodeIndex,
              target: tracks.indexOf(track) + indexOffset,
            }];
          });
        })
        .catch((err) => {
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
  },
};
</script>

<style scoped>
span.loading,
span.error {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
