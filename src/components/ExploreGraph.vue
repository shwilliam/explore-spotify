<template>
  <div class="explore-graph">
    <span v-if="loading">loading...</span>
    <span v-if="errored">please refresh to try again</span>
    <div v-else v-for="track in recommendations" :key="track.id">
      {{track.name}}
    </div>
  </div>
</template>

<script>
const baseUrl = 'https://api.spotify.com/v1';

export default {
  name: 'explore-graph',
  props: ['token'],
  data() {
    return {
      recommendations: null,
      errored: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchRecommendedTracks()
      .then(res => res.json())
      .then((data) => {
        this.recommendations = data.tracks;
        return data;
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
    fetchRecommendedTracks(limit = 10, artistSeed = '4I2BJf80C0skQpp1sQmA0h') {
      // defaults to 'Belle and Sebastian'
      return fetch(
        `${baseUrl}/recommendations?limit=${limit}&seed_artists=${artistSeed}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        },
      );
    },
  },
};
</script>
