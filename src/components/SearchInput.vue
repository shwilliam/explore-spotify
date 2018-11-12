<template>
  <form class="search-input" @submit.prevent="makeSearch">
    <label for="track-search">
      Search for a track:
      <input v-model="input" type="text" name="track-search">
    </label>
  </form>
</template>

<script>
import { debounce } from '../assets/helpers';

export default {
  name: 'search-input',
  data() {
    return {
      input: '',
      debouncedInput: '',
    };
  },
  methods: {
    makeSearch() {
      const cleanedQuery = this.input
        .split(' ')
        .map(word => word.trim())
        .join('+');

      this.$emit('search', cleanedQuery);
    },
  },
  watch: {
    input: debounce(function debounceFn(val) {
      this.debouncedInput = val;
    }, 500),
    debouncedInput(val, newVal) {
      this.makeSearch(newVal);
    },
  },
};
</script>
