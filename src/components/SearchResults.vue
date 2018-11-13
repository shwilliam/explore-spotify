<template>
  <ul class="search-results">
    <li v-for="track in results" :key="track.id" @click="emitClick(track.id, track.popularity)">
      {{track.name}}
      <!-- TODO: make nodes -->
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

<style scoped>
li {
  list-style: none;
  cursor: pointer;
}
</style>
