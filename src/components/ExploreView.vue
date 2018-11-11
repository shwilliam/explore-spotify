<template>
  <div class="explore-graph">
    <span v-if="loading">loading...</span>
    <div v-else>
      <Graph
        :nodes="recommendations"
        :links="links"
        :force="force"
        :key="updateTrigger"
        width="300"
        height="300"
        @click="handleNodeClick"
      />
    </div>
    <span v-if="errored">please refresh to try again</span>
  </div>
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
      updateTrigger: 0,
    };
  },
  computed: {
    force() {
      return forceSimulation(this.recommendations)
        .force('charge', forceManyBody().strength(-100))
        .force('forceX', forceX().strength(0.2))
        .force('forceY', forceY().strength(0.1))
        .force('center', forceCenter())
        .force('link', forceLink().links(this.links))
        .on('tick', this.rerender);
    },
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

      this.clickedTracks.push(id);
      const allClickedTracks = this.clickedTracks.join(',');

      this.fetchRecommendedTracks(10, allClickedTracks)
        .then(res => res.json())
        .then(({ tracks }) => {
          const indexOffset = this.recommendations.length;

          tracks.map((track) => {
            this.recommendations.push(track);
            this.links.push({
              source: clickedNodeIndex,
              target: tracks.indexOf(track) + indexOffset,
            });
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
    rerender() {
      // update attr value of 'key', force rerender
      this.updateTrigger += 1;
    },
  },
};
</script>
