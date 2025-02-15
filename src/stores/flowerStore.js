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
  const searchQuery = ref('')
  const chosenCategory = ref([])
  const chosenColor = ref([])
  const chosenCultivationType = ref('allCultivationTypes')
  const chosenColdPlantingType = ref('allColdPlantingTypes')
  const sortOrder = ref('')
  const sortCategory = ref('')
  const sortMonth = ref('')

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

  const filteredFlowers = computed(() => {
    let result = flowers.value

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

    // Filtrering baserat på sökning
    if (searchQuery.value) {
      result = result.filter((flower) =>
        flower.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    const searchQueryExists = computed(() => {
      return !!searchQuery.value
    })

    // Sortering
    if (sortOrder.value === 'desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    }

    return result
  })

  const getFlowersByCategory = computed(() => {
    return (categoryName) =>
      flowers.value.filter((flower) => flower.category === categoryName)
  })

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setSortOrder = (order) => {
    sortOrder.value = order
  }

  const setChosenCategory = (categories) => {
    chosenCategory.value = categories
  }

  const setChosenColor = (colors) => {
    chosenColor.value = colors
  }

  const setCultivationType = (type) => {
    chosenCultivationType.value = type
  }

  const setColdPlantingType = (type) => {
    chosenColdPlantingType.value = type
  }

  return {
    flowers,
    categories,
    loadFlowers,
    getFlowersByCategory,
    colors,
    cultivationTypes,
    coldPlantingTypes,
    fetchArticles,
    articles,
    chosenCategory,
    searchQuery,
    filteredFlowers,
    chosenColdPlantingType,
    chosenColor,
    chosenCultivationType,
    setSearchQuery,
    setSortOrder,
    sortMonth,
    sortCategory,
    sortOrder,
    setChosenCategory,
    setChosenColor,
    setColdPlantingType,
    setCultivationType,
    extractMonth
  }
})
