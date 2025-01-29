<script setup>
  import { ref, onMounted, watch, computed } from 'vue'
  import FlowerList from './FlowerList.vue'
  import QuerySection from './QuerySection.vue'
  import { fetchFlowers } from '../../fetchFlowers'

  let flowers = ref([])
  let searchQueryExists = ref(false)
  let categories = ref([])
  let colors = ref([])
  let searchQuery = ref('')
  let chosenCategory = ref('')
  let chosenColor = ref([])

  onMounted(async () => {
    flowers.value = await fetchFlowers()
    categories.value = [
      ...new Set(flowers.value.map((flower) => flower.category))
    ].sort()
    colors.value = [
      ...new Set(flowers.value.flatMap((flower) => flower.color))
    ].sort()
  })

  const updateFilteredFlowers = computed(() => {
    let result = flowers.value
    if (searchQuery.value) {
      result = result.filter((flower) =>
        flower.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
    if (chosenCategory.value) {
      result = result.filter(
        (flower) => flower.category === chosenCategory.value
      )
    }
    if (chosenColor.value.length) {
      console.log('Valda färger:', chosenColor.value)
      result = result.filter((flower) =>
        chosenColor.value.some((color) => flower.color.includes(color))
      )
      //NOTE TO SELF: some() kollar om NÅGOT element i en array uppfyller ett villkor. Den returnerar true om den hittar minst ett element som matchar, annars false.
    }
    searchQueryExists.value = true
    return result
  })

  watch(chosenCategory, (newCategory) => {
    console.log('Vald kategori: ' + newCategory)
  })
</script>

<template>
  <QuerySection
    v-model:searchName="searchQuery"
    v-model:chosenCategory="chosenCategory"
    v-model:chosenColor="chosenColor"
    :categories="categories"
    :colors="colors"
  />
  <FlowerList
    :flowers="flowers"
    :filteredFlowers="updateFilteredFlowers"
    :searchQueryExists="searchQueryExists"
  />
</template>

<style scoped></style>
