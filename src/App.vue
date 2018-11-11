<template>
  <div id="app">
    <ExploreView :token="accessToken" />
  </div>
</template>

<script>
import queryString from 'query-string';

import ExploreView from './components/ExploreView.vue';

export default {
  name: 'app',
  data() {
    return {
      accessToken: undefined,
    };
  },
  components: {
    ExploreView,
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
#app {
  width: 100%;
  height: 100%;
}
</style>
