<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Look to Get Cooking!',
  },
  description: {
    type: String,
    default: 'Explore popular meals and snacks!',
  },
  isSearchPage: {
    type: Boolean,
    default: true,
  },
  search: {
    type: String,
    default: '',
  },
})
// define emits to emit the search value to the parent component
// this is used to update the search value and the type in the parent component
const emit = defineEmits(['update:search', 'searchType'])

// update search prop to be pass into the parent component
const updateSearch = (event) => {
  emit('update:search', event.target.value)
  emit('searchType', 'ingredients') // pass the new data to parent component
}
</script>
<template>
  <div class="flex flex-col items-center min-h-[40vh] justify-center p-3">
    <h1 class="text-success text-4xl sm:text-5xl font-bold">{{ title }}</h1>
    <p class="text-lg text-base-content/70 py-2.5 mb-2">{{ description }}</p>
    <label class="input w-full max-w-3xl" v-if="isSearchPage">
      <svg
        class="h-[1em] text-xl opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <!-- emit the search value to the parent component when keyup enter -->
      <input
        type="search"
        :value="search"
        class="grow"
        @keyup.enter="updateSearch"
        placeholder="Search for recipes by ingredient"
      />
    </label>
  </div>
</template>
