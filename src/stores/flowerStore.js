import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchFlowers } from '../../fetchFlowers'
import axios from 'axios'

export const useFlowerStore = defineStore('flowerStore', () => {
  const flowers = ref([])
  const categories = ref([])
  const colors = ref([])
  const cultivationTypes = ref([])
  const coldPlantingTypes = ref([])
  const articles = ref([])

  const loadFlowers = async () => {
    flowers.value = await fetchFlowers()
    flowers.value.sort((a, b) => a.name.localeCompare(b.name))

    categories.value = [
      ...new Set(flowers.value.map((flower) => flower.category))
    ].sort()
    colors.value = [
      ...new Set(flowers.value.flatMap((flower) => flower.color))
    ].sort()
    cultivationTypes.value = [
      ...new Set(flowers.value.map((flower) => flower.cultivationType))
    ]
    coldPlantingTypes.value = [
      ...new Set(flowers.value.map((flower) => flower.canBeColdPlanted))
    ].sort((a, b) => {
      if (a === 'Yes') return -1 // 'Yes' kommer före 'No'
      if (b === 'Yes') return 1
      return 0
    })
    //NOTE TO SELF:
    // Set är en datastruktur som tar bort dubbletter.
    // Set skapar en unik uppsättning, men den måste konverteras tillbaka till en vanlig array. spread-operatorn (...) gör det = "sprider ut" värdena och skapar en ny array.
    // flatMap() går igenom varje blomma (flower) i flowers.value och samlar ihop alla färger från varje blomma i en enda enkel lista. Vi använder flatMap här för att colors är en array i databasen. Hade det varit en enkel string, som category är, hade vi bara använt map().
  }

  const fetchArticles = async () => {
    try {
      const response = await axios.get('../database.json')
      articles.value = response.data.articles
      return articles.value
    } catch (error) {
      console.error('Kunde inte hämta artiklar:', error)
      throw error
    }
  }

  const getFlowersByCategory = computed(() => {
    return (categoryName) =>
      flowers.value.filter((flower) => flower.category === categoryName)
  })

  return {
    flowers,
    categories,
    loadFlowers,
    getFlowersByCategory,
    colors,
    cultivationTypes,
    coldPlantingTypes,
    fetchArticles,
    articles
  }
})
