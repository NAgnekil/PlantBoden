<script setup>
  import { useFlowerStore } from '../stores/flowerStore.js'
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import FlowerCard from '../components/FlowerCard.vue'
  import FlowerDetailsCard from '../components/FlowerDetailsCard.vue'

  const props = defineProps({
    articleID: String
  })

  const flowerStore = useFlowerStore()
  const { getFlowersByCategory } = storeToRefs(flowerStore)

  const chosenArticle = ref(null)
  const flowerCategoryList = ref([])
  const selectedFlower = ref(null)
  const isPopupVisible = ref(false)

  onMounted(async () => {
    await flowerStore.fetchArticles()
    await flowerStore.loadFlowers()
    extractArticle()
  })

  const extractArticle = () => {
    chosenArticle.value = flowerStore.articles.find(
      (article) => article.id === props.articleID
    )
    if (chosenArticle.value) {
      flowerCategoryList.value = getFlowersByCategory.value(
        chosenArticle.value.category
      )
    }
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
  <div v-if="chosenArticle" class="article-container">
    <header>
      <h1>{{ chosenArticle.title }}</h1>
      <span class="teaser"> {{ chosenArticle.description }}</span>
    </header>
    <hr />
    <section class="preamble">
      <img :src="chosenArticle.img" alt="" />
      <p v-html="chosenArticle.preamble"></p>
    </section>
    <hr />

    <section class="main-article" v-html="chosenArticle.mainArticle"></section>
    <section class="conclusion">
      <img :src="chosenArticle.illustration" alt="" />
      <p class="conclusion" v-html="chosenArticle.conclusion"></p>
    </section>
  </div>
  <div v-else>Artikeln hittades inte</div>
  <section class="flowerlist-container" v-if="flowerCategoryList.length > 0">
    <h1 class="varieties-header">Dina sorter</h1>
    <div class="cards-container">
      <FlowerCard
        v-for="flower in flowerCategoryList"
        :key="flower.id"
        :flower="flower"
        @open-popup="showPopup"
      />
      <FlowerDetailsCard
        :flower="selectedFlower"
        :isVisible="isPopupVisible"
        @close="closePopup"
      />
    </div>
  </section>
</template>

<style>
  .article-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin-bottom: 10rem;
  }
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin: 2rem 0 1rem 0;
      font-family: Aboreto, sans-serif;
      font-size: 4rem;
    }
    span {
      text-align: center;
      font-family: Pompiere, sans-serif;
      font-size: 2rem;
      font-weight: 200;
    }
  }
  .preamble,
  .conclusion {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    line-height: 2rem;
    font-weight: 200;
    img {
      width: 350px;
      height: 350px;
      object-fit: cover;
      border-radius: 8px;
    }
    + hr {
      margin-bottom: 0;
    }
  }
  .conclusion {
    flex-direction: row-reverse;
    align-items: flex-start;
    p {
      margin-top: 0;
    }
    img {
      max-width: 200px;
      height: unset;
    }
  }
  .main-article {
    padding-top: 2rem;
    h3 {
      font-size: 1.5rem;
      margin: 0;
      font-weight: 500;
    }
    p,
    li {
      line-height: 1.4rem;
    }
    .info-items {
      margin-top: 0;
    }
    .bold-text {
      font-weight: 500;
    }
    .qa-question {
      margin-bottom: 0;
    }
    .qa-answer {
      margin-top: 0;
    }
    hr {
      box-shadow: unset;
      margin: 2.2rem 0;
    }
    .flex-container {
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: 10rem;
      div {
        p {
          font-size: 1.3rem;
        }
        ul {
          padding-left: 1rem;
        }
      }
    }
    ol {
      li {
        &::marker,
        .point-headline {
          font-size: 1.2rem;
        }
      }
      .head-list-element {
        margin-top: 2.3rem;
      }
    }
  }

  hr {
    border-top: 1px solid #939393;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
    margin: 1.5rem 0;
    width: 100%;
  }
</style>
