<script setup>
  import { ref } from 'vue'
  import ImageCarousel from '../components/ImageCarousel.vue'
</script>

<template>
  <div class="articlesandinspo-wrapper">
    <ImageCarousel />
  </div>
</template>

<style scoped>
  .articlesandinspo-wrapper {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
