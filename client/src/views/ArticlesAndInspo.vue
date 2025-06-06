<script setup>
  import ImageCarousel from '../components/ImageCarousel.vue'
  import ArticleTeaser from '../components/ArticleTeaser.vue'
</script>

<template>
  <div class="articlesandinspo-wrapper">
    <h1>Artiklar</h1>
    <ArticleTeaser />
    <hr />
    <h1>Inspirationsbilder</h1>
    <ImageCarousel />
  </div>
</template>

<style scoped>
  .articlesandinspo-wrapper {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    hr {
      border-top: 2px solid var(--color-dark-grey);
      box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
      margin: 2rem;
      width: 100%;
    }
  }
</style>
