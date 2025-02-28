<script setup>
  import { onMounted, ref } from 'vue'
  import { useFlowerStore } from '../stores/flowerStore.js'
  import FlowerCard from './FlowerCard.vue'
  import FlowerDetailsCard from './FlowerDetailsCard.vue'

  const flowerStore = useFlowerStore()

  onMounted(async () => {
    await flowerStore.loadFlowers()
  })

  const selectedFlower = ref(null)
  const isPopupVisible = ref(false)

  const showPopup = (flower) => {
    selectedFlower.value = flower
    isPopupVisible.value = true
  }

  const closePopup = () => {
    isPopupVisible.value = false
  }
</script>

<template>
  <div class="timeline">
    <div
      v-for="(group, date) in flowerStore.groupedByDate"
      :key="date"
      class="timeline-item"
    >
      <!-- Datum på vänster sida -->
      <div class="timeline-date">
        {{ date }}
      </div>

      <!-- Linje och cirkel -->
      <div class="timeline-line">
        <div class="timeline-dot"></div>
      </div>

      <!-- Kort på höger sida -->
      <div class="timeline-card-container">
        <div class="timeline-card">
          <FlowerCard
            v-for="flower in group"
            :key="flower.id"
            :flower="flower"
            @open-popup="showPopup"
          />
        </div>
      </div>
    </div>
    <FlowerDetailsCard
      :flower="selectedFlower"
      :isVisible="isPopupVisible"
      @close="closePopup"
    />
  </div>
</template>

<style scoped>
  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    margin: auto;
    margin: 3rem 0 5rem 0;
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    position: relative;
    margin: 0;
    align-items: stretch;
  }

  .timeline-date {
    width: 100px;
    text-align: right;
    font-weight: bold;
    padding-right: 20px;
    margin-top: 70px;
    font-size: 3rem;
  }

  .timeline-line {
    width: 4px;
    background: var(--color-green);
    flex-shrink: 0;
    position: relative;
    flex-grow: 1;
  }

  .timeline-dot {
    width: 12px;
    height: 12px;
    background: var(--color-green);
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    margin-top: 100px;
  }

  .timeline-card-container {
    flex-grow: 1;
    padding-left: 20px;
    margin-top: 85px;
  }

  .timeline-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    width: 515px;
  }
  .card {
    padding: 0 0.2rem;
    width: 100px;
  }
  ::v-deep(.name-headline) {
    font-size: 0.9rem;
  }
  ::v-deep(span) {
    display: none;
  }
  ::v-deep(.image-wrapper) {
    width: 100%;
    height: 100px;
  }
</style>
