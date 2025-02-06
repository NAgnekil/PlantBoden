<template>
  <div id="description-container"></div>
</template>

<script>
// Funktion för att hämta beskrivning för en kategori
const getCategoryDescription = (category) => {
  data.categoryDescriptions[category] ||
    'Beskrivning saknas för denna kategori.'
  const dahliaDescription = getCategoryDescription('Dahlia')
  console.log(dahliaDescription)
},
const getCategoryDescriptionHTML = (category) => {
  fetch('database.json')
    .then((response) => response.json())
    .then((data) => {
      // Hämta HTML-strängen från JSON
      const htmlContent = data.description

      // Rendera HTML-strängen i ett HTML-element
      const container = document.getElementById('description-container')
      container.innerHTML = htmlContent
    })
    .catch((error) => console.error('Error loading JSON:', error))
}
</script>

<style lang="css" scoped></style>
