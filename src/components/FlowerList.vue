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

<script setup>
  defineProps({
    flowers: Array,
    filteredFlowers: Array,
    searchQueryExists: Boolean
  })
</script>

<style lang="css" scoped>
  .product-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    width: 800px;
    .card {
      max-width: 250px;
      .product-img {
        height: 250px;
        width: 250px;
      }
    }
  }
</style>
