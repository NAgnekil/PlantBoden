<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useFlowerStore } from '../stores/flowerStore'
  import FlowerList from '../components/FlowerList.vue'
  import QuerySection from '../components/QuerySection.vue'
  import Sorting from '../components/Sorting.vue'

  const flowerStore = useFlowerStore()

  const searchQuery = ref('')
  const chosenCategory = ref([])
  const chosenColor = ref([])
  const chosenCultivationType = ref('allCultivationTypes')
  const chosenColdPlantingType = ref('allColdPlantingTypes')
  const sortOrder = ref('')
  const sortCategory = ref('')
  const sortMonth = ref('')
  const searchQueryExists = ref(false)

  onMounted(async () => {
    await flowerStore.loadFlowers()
  })

  const extractMonth = (dateString) => {
    const splitString = dateString.split('/')
    if (splitString.length === 2) {
      const month = parseInt(splitString[1])
      return isNaN(month) ? 0 : month
    }
    return 0
  }

  //NOTE TO SELF: För att Övrigt-kategorin ska hamna sist måste jag göra en fallback då Ö har ett högre Unicode-värde än de andra bokstäverna i det svenska alfabetet. Sorteringsfunktionen i JavaScript använder sig av Unicode-värden för att jämföra strängar, så Ö kommer hamna först i en stigande sortering (A-Z). Den här funktionen säger att om någon av kategorierna är "Övrigt", placera den sist
  const customSort = (a, b) => {
    if (a === 'Övrigt') return 1 // "Övrigt" ska hamna efter andra kategorier
    if (b === 'Övrigt') return -1 // Andra kategorier ska hamna före "Övrigt"
    return a.localeCompare(b, 'sv')
  }

  const updateFilteredFlowers = computed(() => {
    let result = flowerStore.flowers
    if (searchQuery.value) {
      result = result.filter((flower) =>
        flower.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      searchQueryExists.value = true
    }
    if (chosenCategory.value.length) {
      result = result.filter((flower) =>
        chosenCategory.value.includes(flower.category)
      )
      searchQueryExists.value = true
    }
    if (chosenCultivationType.value !== 'allCultivationTypes') {
      result = result.filter(
        (flower) => flower.cultivationType === chosenCultivationType.value
      )
      searchQueryExists.value = true
    }
    if (chosenColdPlantingType.value !== 'allColdPlantingTypes') {
      result = result.filter(
        (flower) => flower.canBeColdPlanted === chosenColdPlantingType.value
      )
      searchQueryExists.value = true
    }
    if (chosenColor.value.length) {
      result = result.filter((flower) =>
        chosenColor.value.some((color) => flower.color.includes(color))
      )
      searchQueryExists.value = true
      //NOTE TO SELF: some() kollar om NÅGOT element i en array uppfyller ett villkor. Den returnerar true om den hittar minst ett element som matchar, annars false.
    }
    if (sortOrder.value === 'desc') {
      result = result.sort((a, b) => b.name.localeCompare(a.name)) // Z-A
    } else if (sortOrder.value === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortCategory.value === 'category') {
      result.sort((a, b) => customSort(a.category, b.category))
    }
    if (sortMonth.value === 'asc') {
      return [...result].sort((a, b) => {
        const monthA = extractMonth(a.sowingDate)
        const monthB = extractMonth(b.sowingDate)
        return monthA - monthB // Jämför månaden numeriskt
      })
    }
    return result
  })
</script>

<template>
  <div class="main-content">
    <QuerySection
      v-model:searchName="searchQuery"
      v-model:chosenCategory="chosenCategory"
      v-model:chosenColor="chosenColor"
      v-model:chosenCultivationType="chosenCultivationType"
      v-model:chosenColdPlantingType="chosenColdPlantingType"
      :categories="flowerStore.categories"
      :colors="flowerStore.colors"
      :cultivationTypes="flowerStore.cultivationTypes"
      :coldPlantingTypes="flowerStore.coldPlantingTypes"
    />
    <FlowerList
      :flowers="updateFilteredFlowers"
      :filteredFlowers="updateFilteredFlowers"
      :searchQueryExists="!!searchQuery"
      :sortOrder="sortOrder"
      :sortMonth="sortMonth"
      :sortCategory="sortCategory"
      :extractMonth="extractMonth"
    />
  </div>
</template>

<style scoped>
  .main-content {
    margin-top: 1rem;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  #cards-container {
    overflow: auto;
    padding-left: 1rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &::after {
      content: '';
      display: block;
      height: 150px;
    }
  }
</style>
