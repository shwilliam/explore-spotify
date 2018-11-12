<template>
  <div id="app">
    <span class="loading" v-if="loading && !error">loading...</span>
    <span class="error" v-if="error">please click <a href="/">here</a> to try again</span>
    <SearchInput @search="handleSearch" />
    <SearchResults :results="searchResults" @click="addNode" />

    <ExploreView
      v-if="accessToken && initialTrackID"
      :initialTrackID="initialTrackID"
      :token="accessToken"
    />
  </div>
</template>

<script>
import queryString from 'query-string';
import ExploreView from './components/ExploreView.vue';
import SearchInput from './components/SearchInput.vue';
import SearchResults from './components/SearchResults.vue';

const baseUrl = 'https://api.spotify.com/v1';

export default {
  name: 'app',
  data() {
    return {
      accessToken: null,
      initialTrackID: null,
      searchResults: null,
      loading: false,
      error: false,
    };
  },
  components: {
    ExploreView,
    SearchInput,
    SearchResults,
  },
  created() {
    this.accessToken = queryString.parse(window.location.search).access_token;

    if (!this.accessToken) {
      window.location.href = 'https://explore-spotify-login.herokuapp.com/login';
    }
  },
  methods: {
    addNode(id) {
      this.searchResults = [];
      this.initialTrackID = id;
    },
    fetchTracks(query, type = 'track') {
      return fetch(`${baseUrl}/search?q=${query}&type=${type}`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    },
    handleSearch(query) {
      this.loading = true;
      this.fetchTracks(query)
        .then(res => res.json())
        .then((data) => {
          this.searchResults = data.tracks.items;
        })
        .catch((err) => {
          this.error = true;
          return console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
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

div#app > span.loading,
div#app > span.error {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
