<template>
  <div id="app" v-if="accessToken">
    <ExploreView
      v-if="initialTrackProps"
      :initialTrackProps="initialTrackProps"
      :token="accessToken"
      @clear="showSearchView"
    />
    <SearchView v-else :token="accessToken" @select="setInitialTrackProps" />
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
      initialTrackProps: null,
    };
  },
  methods: {
    setInitialTrackProps({ id, popularity }) {
      this.initialTrackProps = { id, popularity };
    },
    showSearchView() {
      this.initialTrackProps = null;
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
