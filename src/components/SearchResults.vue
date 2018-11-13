<template>
  <ul class="search-results">
    <li v-for="track in results" :key="track.id" @click="emitClick(track.id, track.popularity)">
      <span v-for="artist in track.album.artists" :key="artist.id" :id="track.id">
        {{artist.name}}
      </span>
      , {{track.name}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'search-results',
  props: ['results'],
  methods: {
    emitClick(id, popularity) {
      this.$emit('click', { id, popularity });
    },
  },
};
</script>
