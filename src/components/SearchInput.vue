<template>
  <form class="search-input" @submit.prevent="makeSearch">
    <label for="query-input">
      Search for a song:
      <input v-model="input" type="text" name="query-input">
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
        .filter(word => Boolean(word.length))
        .join('+');

      if (cleanedQuery.length) this.$emit('search', cleanedQuery);
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
