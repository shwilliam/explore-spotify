<template>
  <ExploreView :token="accessToken" v-if="accessToken" />
</template>

<script>
import queryString from 'query-string';
import ExploreView from './components/ExploreView.vue';

export default {
  name: 'app',
  data() {
    return { accessToken: undefined };
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
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
