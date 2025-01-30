<script setup>
  import { ref, onMounted, computed } from 'vue'
  import FlowerList from './FlowerList.vue'
  import QuerySection from './QuerySection.vue'
  import { fetchFlowers } from '../../fetchFlowers'

  let flowers = ref([])
  let searchQueryExists = ref(false)
  let categories = ref([])
  let colors = ref([])
  let cultivationTypes = ref([])
  let canPlantInPots = ref(null)
  let searchQuery = ref('')
  let chosenCategory = ref('')
  let chosenColor = ref([])
  let chosenCultivationType = ref('')
  let chosenAnswerAboutPots = ref(null)

  onMounted(async () => {
    flowers.value = await fetchFlowers()
    flowers.value = flowers.value.sort((a, b) => a.name.localeCompare(b.name))
    categories.value = [
      ...new Set(flowers.value.map((flower) => flower.category))
    ].sort()
    cultivationTypes.value = [
      ...new Set(flowers.value.map((flower) => flower.cultivationType))
    ]
    canPlantInPots.value = [
      ...new Set(flowers.value.map((flower) => flower.canPlantInPots))
    ]
    colors.value = [
      ...new Set(flowers.value.flatMap((flower) => flower.color))
    ].sort()
    //NOTE TO SELF:
    // Set är en datastruktur som tar bort dubbletter.
    // Set skapar en unik uppsättning, men den måste konverteras tillbaka till en vanlig array. spread-operatorn (...) gör det = "sprider ut" värdena och skapar en ny array.
    // flatMap() går igenom varje blomma (flower) i flowers.value och samlar ihop alla färger från varje blomma i en enda enkel lista. Vi använder flatMap här för att colors är en array i databasen. Hade det varit en enkel string, som category är, hade vi bara använt map().
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
    if (chosenCultivationType.value) {
      result = result.filter(
        (flower) => flower.cultivationType === chosenCultivationType.value
      )
    }
    if (
      chosenAnswerAboutPots.value !== null &&
      chosenAnswerAboutPots.value !== undefined
    ) {
      result = result.filter(
        (flower) => flower.canPlantInPots === chosenAnswerAboutPots.value
      )
    }
    if (chosenColor.value.length) {
      result = result.filter((flower) =>
        chosenColor.value.some((color) => flower.color.includes(color))
      )
      //NOTE TO SELF: some() kollar om NÅGOT element i en array uppfyller ett villkor. Den returnerar true om den hittar minst ett element som matchar, annars false.
    }
    searchQueryExists.value = true
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
      v-model:chosenAnswerAboutPots="chosenAnswerAboutPots"
      :categories="categories"
      :colors="colors"
      :cultivationTypes="cultivationTypes"
      :canPlantInPots="canPlantInPots"
    />
    <FlowerList
      :flowers="flowers"
      :filteredFlowers="updateFilteredFlowers"
      :searchQueryExists="searchQueryExists"
    />
  </div>
</template>

<style scoped>
  .main-content {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
