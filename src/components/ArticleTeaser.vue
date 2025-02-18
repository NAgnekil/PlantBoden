<script setup>
  import { ref, onMounted } from 'vue'
  import { useFlowerStore } from '../stores/flowerStore.js'

  const flowerStore = useFlowerStore()

  onMounted(async () => {
    await flowerStore.fetchArticles()
  })
</script>

<template>
  <section class="article-cards-container">
    <router-link
      v-for="article in flowerStore.articles"
      :to="`/article/${article.id}`"
    >
      <div class="card">
        <img class="card-img" :src="article.img" />
        <div class="card-content">
          <h2>{{ article.cardHeadline }}</h2>
          <p class="teaser">{{ article.cardDescription }}</p>
        </div>
      </div>
    </router-link>
  </section>
</template>

<style scoped>
  .article-cards-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    a {
      display: flex;
    }
  }
  .card {
    flex: 1;
    min-width: 250px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0px 3px 5px -1px #ccc;
    border-radius: 8px;
    transition:
      opacity 0.5s ease-in-out,
      transform 0.3s ease;
    object-fit: cover;
    &:hover {
      transform: scale(1.08);
    }
  }

  .card-img {
    width: 250px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  .card-content {
    padding: 0.3rem 1rem;
    flex: 1;
  }

  a {
    text-decoration: none;
    color: var(--color-dark-grey);
    max-width: 250px;
  }
</style>
