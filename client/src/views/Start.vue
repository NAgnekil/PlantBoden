<script setup>
  import { onMounted } from 'vue';
  import { useFlowerStore } from '../stores/flowerStore';
  import PlantList from '../components/PlantList.vue';
  import QuerySection from '../components/QuerySection.vue';

  const flowerStore = useFlowerStore();

  onMounted(async () => {
    await flowerStore.loadFlowers();
    await fetch('/api/plants');
  });
</script>

<template>
  <div class="main-content">
    <QuerySection />
    <PlantList />
  </div>
</template>

<style scoped>
  .main-content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  #cards-container {
    overflow: auto;
    padding-left: 1rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &::after {
      content: '';
      display: block;
      height: 150px;
    }
  }
</style>
