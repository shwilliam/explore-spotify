<template>
  <div class="search-view">
    <span class="loading" v-if="loading && !error">loading...</span>
    <span class="error" v-if="error">please click <a href="/">here</a> to try again</span>

    <SearchInput @search="fetchSearchResults" />
    <SearchResults :results="searchResults" @click="addNode" />
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';
import SearchResults from './SearchResults.vue';

export default {
  name: 'search-view',
  props: ['token'],
  components: {
    SearchInput,
    SearchResults,
  },
  data() {
    return {
      error: false,
      loading: false,
      searchResults: null,
    };
  },
  methods: {
    addNode(id) {
      this.searchResults = [];
      this.$emit('select', id);
    },
    fetchSearchResults(query) {
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
    fetchTracks(query, type = 'track') {
      return fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=${type}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        },
      );
    },
  },
};
</script>
