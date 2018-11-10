<template>
  <div id="app">
    <ExploreGraph :token="accessToken" />
  </div>
</template>

<script>
import queryString from 'query-string';

import ExploreGraph from './components/ExploreGraph.vue';

export default {
  name: 'app',
  data() {
    return {
      accessToken: undefined,
    };
  },
  components: {
    ExploreGraph,
  },
  created() {
    this.accessToken = queryString.parse(window.location.search).access_token;

    if (!this.accessToken) {
      window.location.href = 'https://explore-spotify-login.herokuapp.com/login';
    }
  },
};
</script>
