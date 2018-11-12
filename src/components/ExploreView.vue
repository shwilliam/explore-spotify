<template>
  <div class="explore-graph">
    <span v-if="loading">loading...</span>
    <span v-if="errored">please refresh to try again</span>
    <Graph
      v-if="recommendations"
      :nodes="recommendations"
      :links="links"
      width="300"
      height="300"
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
      errored: null,
      loading: true,
    };
  },
  created() {
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
        });

        this.links = links;
        this.recommendations = recommendations;

        return { recommendations, links };
      })
      .catch((err) => {
        this.errored = true;
        return console.error(err);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
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
          this.errored = true;
          return console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
