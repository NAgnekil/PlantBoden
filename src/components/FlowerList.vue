  <script setup>
    defineProps({
      flowers: Array,
      filteredFlowers: Array,
      searchQueryExists: Boolean
    })
  </script>
  
<template>
  <section v-if="flowers">
    <div class="product-cards" v-if="searchQueryExists">
      <div class="card" v-for="flower in filteredFlowers" :key="flower.id">
        <img class="product-img" :src="flower.mainImg" alt="" />
        <h2>{{ flower.name }}</h2>
      </div>
    </div>
    <div class="product-cards" v-else>
      <div class="card" v-for="flower in flowers" :key="flower.id">
        <img class="product-img" :src="flower.mainImg" alt="" />
        <h2>{{ flower.name }}</h2>
      </div>
    </div>
  </section>
  <section v-else>Laddar data...</section>
</template>


<style lang="css" scoped>
  section {
    margin-right: 2rem;
    width: 100%;
  }
  .product-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    .card {
      max-width: 220px;
      .product-img {
        height: 220px;
        width: 220px;
      }
    }
  }
</style>
