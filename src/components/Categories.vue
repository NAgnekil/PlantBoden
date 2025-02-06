<template>
  <div id="description-container"></div>
</template>

<script>
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
      const htmlContent = data.description
      const container = document.getElementById('description-container')
      container.innerHTML = htmlContent
    })
    .catch((error) => console.error('Error loading JSON:', error))
}
</script>

<style lang="css" scoped></style>
