<script setup>
  import { ref } from 'vue'
  import FlowerCard from './FlowerCard.vue'
  import FlowerDetailsCard from './FlowerDetailsCard.vue'
  import Sorting from './Sorting.vue'
  import { useFlowerStore } from '../stores/flowerStore'
  import { storeToRefs } from 'pinia'

  const flowerStore = useFlowerStore()
  const { sortedFlowers } = storeToRefs(flowerStore)

  const selectedFlower = ref(null)
  const isPopupVisible = ref(false)

  const getMonth = (month) => {
    const monthMap = {
      1: 'Januari',
      2: 'Februari',
      3: 'Mars',
      4: 'April',
      5: 'Maj',
      6: 'Juni',
      7: 'Juli',
      8: 'Augusti',
      9: 'September',
      10: 'Oktober',
      11: 'November',
      12: 'December'
    }
    return monthMap[month] || '???'
  }

  const showPopup = (flower) => {
    selectedFlower.value = flower
    isPopupVisible.value = true
  }

  const closePopup = () => {
    isPopupVisible.value = false
  }
</script>

<template>
  <div v-if="sortedFlowers" class="cards-container" id="cards-container">
    <Sorting />
    <template v-if="flowerStore.sortCategory === 'category'">
      <div
        v-for="(group, category) in flowerStore.groupedByCategory"
        :key="category"
      >
        <h1>{{ category }}</h1>
        <hr />
        <div class="card-container">
          <FlowerCard
            v-for="flower in group"
            :key="flower.id"
            :flower="flower"
            @open-popup="showPopup"
          />
        </div>
      </div>
    </template>

    <template v-else-if="flowerStore.sortMonth === 'asc'">
      <div
        v-for="(group, month) in flowerStore.groupedByMonth"
        :key="month"
        class="month-div"
      >
        <h1>{{ getMonth(month) }}</h1>
        <hr />
        <div class="card-container">
          <FlowerCard
            v-for="flower in group"
            :key="flower.id"
            :flower="flower"
            @open-popup="showPopup"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="product-cards">
        <FlowerCard
          v-for="flower in sortedFlowers"
          :key="flower.id"
          :flower="flower"
          @open-popup="showPopup"
        />
      </div>
    </template>
    <FlowerDetailsCard
      :flower="selectedFlower"
      :isVisible="isPopupVisible"
      @close="closePopup"
    />
  </div>
</template>

<style lang="css">
  section {
    width: 100%;
  }

  .cards-container {
    width: 70%;
    height: 100vh;
    margin-bottom: 2rem;
  }

  /* SPECIFIKA STILAR FÖR PRODUCT-CARDS */
  .product-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .product-cards .card {
    max-width: 150px;
  }

  .product-cards .image-wrapper {
    width: 150px;
    height: 150px;
  }

  /* SPECIFIKA STILAR FÖR PRODUCT-CARDS-SORTED */
  .product-cards-sorted {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cards-by-sort {
    display: flex;
    flex-direction: column;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .card-container .card {
    max-width: 120px;
  }

  .card-container .image-wrapper {
    width: 120px;
    height: 120px;
  }

  .cards-by-sort h1 {
    font-size: 2rem;
    margin-bottom: 0;
  }

  .cards-by-sort hr {
    border-top: 2px solid var(--color-dark-grey);
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
    margin: 0 0 1rem 0;
  }

  .month-div {
    width: 100%;
  }
</style>
