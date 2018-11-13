<template>
  <div id="app">
    <SearchView :token="accessToken" @select="setInitialTrack" />
    <ExploreView
      v-if="accessToken && initialTrackId"
      :initialTrackId="initialTrackId"
      :token="accessToken"
    />
  </div>
</template>

<script>
import queryString from 'query-string';

import ExploreView from './components/ExploreView.vue';
import SearchView from './components/SearchView.vue';

export default {
  name: 'app',
  components: {
    ExploreView,
    SearchView,
  },
  data() {
    return {
      accessToken: null,
      initialTrackId: null,
    };
  },
  methods: {
    setInitialTrack(trackId) {
      this.initialTrackId = trackId;
    },
  },
  created() {
    this.accessToken = queryString.parse(window.location.search).access_token;

    if (!this.accessToken) {
      window.location.href = 'https://explore-spotify-login.herokuapp.com/login';
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
span.loading,
span.error {
  color: white;
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
}
span.loading {
  background-color: black;
}
span.error {
  background-color: red;
}
</style>
