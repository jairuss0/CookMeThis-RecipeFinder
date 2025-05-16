<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'
import { getAreaList } from '@/composables/api'
import { getCategoriesList } from '@/composables/api'
import Loader from '@/components/Loader.vue'
const { categories, categoryListLoading, fetchCategoryList } = getCategoriesList()
const { areas, areaListLoading, fetchAreaList } = getAreaList()

defineProps({
  search: {
    type: String,
    default: '',
  },
})

// define emit one for v-model search and one for searchType
const emit = defineEmits(['update:search', 'searchType'])
const updateSearch = (event, type) => {
  emit('update:search', event.target.value)
  emit('searchType', type)
}

// fetch the list for filters once the component has been rendered
onMounted(async () => {
  try {
    await fetchCategoryList()
    await fetchAreaList()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="collapse collapse-arrow bg-base-100 border border-base-300 max-w-7xl">
      <input type="checkbox" name="my-accordion-2" checked="checked" />
      <div class="collapse-title font-semibold">Browse recipes using filters</div>
      <div
        v-if="areaListLoading || categoryListLoading"
        class="collapse-content flex w-full justify-center p-3"
      >
        <Loader />
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-2 px-5 collapse-content">
        <div class="flex flex-col gap-2 min-h-[40vh]">
          <h2
            class="mb-5 font-bold text-lg mx-auto relative after:content-[''] after:block after:w-16 after:h-1 after:bg-success after:mt-1"
          >
            Category
          </h2>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            <div v-for="(category, index) in categories" :key="index">
              <input
                type="radio"
                name="radio"
                :value="category.strCategory"
                @click="updateSearch($event, 'category')"
                class="radio radio-xs radio-accent"
              />
              <label class="ms-2">{{ category.strCategory }}</label>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 min-h-[30vh]">
          <h2
            class="mb-5 font-bold text-lg mx-auto relative after:content-[''] after:block after:w-16 after:h-1 after:bg-success after:mt-1"
          >
            Area
          </h2>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            <div v-for="(area, index) in areas" :key="index">
              <input
                type="radio"
                name="radio"
                :value="area.strArea"
                @click="updateSearch($event, 'area')"
                class="radio radio-xs radio-accent"
              />
              <label class="ms-2">{{ area.strArea }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
