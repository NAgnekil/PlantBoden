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
    const order = { Övrigt: 1 }
    return (order[a] || 0) - (order[b] || 0) || a.localeCompare(b, 'sv')
  }

  const filteredFlowers = computed(() => {
    let result = flowers.value

    if (chosenCategory.value.length) {
      result = result.filter((flower) =>
        chosenCategory.value.includes(flower.category)
      )
    }
    if (chosenCultivationType.value !== 'allCultivationTypes') {
      result = result.filter(
        (flower) => flower.cultivationType === chosenCultivationType.value
      )
    }
    if (chosenColdPlantingType.value !== 'allColdPlantingTypes') {
      result = result.filter(
        (flower) => flower.canBeColdPlanted === chosenColdPlantingType.value
      )
    }
    if (chosenColor.value.length) {
      result = result.filter((flower) =>
        chosenColor.value.some((color) => flower.color.includes(color))
      )
      //NOTE TO SELF: some() kollar om NÅGOT element i en array uppfyller ett villkor. Den returnerar true om den hittar minst ett element som matchar, annars false.
    }

    if (searchQuery.value) {
      result = result.filter((flower) =>
        flower.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
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

  const setCultivationType = (type) => {
    chosenCultivationType.value = type
  }

  const setColdPlantingType = (type) => {
    chosenColdPlantingType.value = type
  }

  const searchQueryExists = computed(() => !!searchQuery.value)

  //-----------------------------------------------

  //SORTERINGSLOGIK

  const sortedFlowers = computed(() => {
    let result = [...filteredFlowers.value]

    if (sortOrder.value === 'desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortOrder.value === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sortCategory.value === 'category') {
      result.sort((a, b) => customSort(a.category, b.category))
    }

    if (sortMonth.value === 'asc') {
      result.sort((a, b) => {
        const monthA = extractMonth(a.sowingDate)
        const monthB = extractMonth(b.sowingDate)
        return monthA - monthB
      })
    }

    return result
  })

  const setSortOrder = (order) => {
    sortOrder.value = order
    sortCategory.value = ''
    sortMonth.value = ''
  }

  const setSortCategory = (category) => {
    sortCategory.value = category
    sortOrder.value = ''
    sortMonth.value = ''
  }

  const setSortMonth = (month) => {
    sortMonth.value = month
    sortOrder.value = ''
    sortCategory.value = ''
  }

  const groupedByCategory = computed(() => {
    if (sortCategory.value !== 'category') return null
    return sortedFlowers.value.reduce((groups, flower) => {
      const category = flower.category
      groups[category] = groups[category] || []
      groups[category].push(flower)
      return groups
    }, {})
  })

  const groupedByMonth = computed(() => {
    if (sortMonth.value !== 'asc') return null
    return sortedFlowers.value.reduce((groups, flower) => {
      const month = extractMonth(flower.sowingDate)
      groups[month] = groups[month] || []
      groups[month].push(flower)
      return groups
    }, {})
  })

  const groupedByDate = computed(() => {
    const sortedFlowersByDate = [...flowers.value].sort((a, b) => {
      const [dayA, monthA] = a.sowingDate.split('/').map(Number)
      const [dayB, monthB] = b.sowingDate.split('/').map(Number)

      return monthA - monthB || dayA - dayB
    })

    const chosenFlowersArray = sortedFlowersByDate.filter(
      (flower) => flower.chosen
    )

    return chosenFlowersArray.reduce((groups, flower) => {
      const date = flower.sowingDate
      groups[date] = groups[date] || []
      groups[date].push(flower)
      return groups
    }, {})
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
    articles,
    chosenCategory,
    searchQuery,
    filteredFlowers,
    chosenColdPlantingType,
    chosenColor,
    chosenCultivationType,
    setSearchQuery,
    setSortOrder,
    setSortCategory,
    setSortMonth,
    sortOrder,
    sortCategory,
    sortMonth,
    setColdPlantingType,
    setCultivationType,
    extractMonth,
    searchQueryExists,
    sortedFlowers,
    groupedByCategory,
    groupedByMonth,
    groupedByDate
  }
})
