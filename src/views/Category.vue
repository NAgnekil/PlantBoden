<script setup>
  import { defineProps, ref, onMounted, watch } from 'vue'
  import axios from 'axios'
  import { useFlowerStore } from '../stores/flowerStore.js'

  const props = defineProps({
    categoryName: String
  })

  const flowerStore = useFlowerStore()

  const chosenCategoryObject = ref(null)
  const chosenCategoryDescription = ref('')
  const chosenCategoryImg = ref('')
  const categoryList = ref([])

  const fetchCategoryDescription = async () => {
    const allDescriptions = await fetchAllCategoryDescriptions()

    const categoryObject = allDescriptions.find(
      (item) => Object.keys(item)[0] === props.categoryName
    )

    if (categoryObject) {
      chosenCategoryObject.value = categoryObject[props.categoryName]
      chosenCategoryDescription.value = chosenCategoryObject.value.desc
      chosenCategoryImg.value = chosenCategoryObject.value.img
    }
  }

  const updateCategoryList = () => {
    categoryList.value = flowerStore.getFlowersByCategory(props.categoryName)
  }

  onMounted(async () => {
    await flowerStore.loadFlowers()
    await fetchCategoryDescription()
    updateCategoryList()
  })

  watch(
    () => props.categoryName,
    async () => {
      await flowerStore.loadFlowers()
      await fetchCategoryDescription()
      updateCategoryList()
    }
  )

  const fetchAllCategoryDescriptions = async () => {
    try {
      const response = await axios.get('../database.json')
      return response.data.categoryDescriptions
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  const getName = (name) => {
    const match = name.match(/^(.*?)\s*["“](.*?)["”]\s*(.*?)$/)
    return match
      ? { name: match[1].trim(), subname: match[2].trim() }
      : { name: name.trim(), subname: '' }
  }
</script>

<template>
  <section class="category-container">
    <div
      class="category-hero"
      :style="{ backgroundImage: `url('${chosenCategoryImg}')` }"
    >
      <h1 class="category-name">{{ categoryName }}</h1>
    </div>
    <div class="description-container" v-html="chosenCategoryDescription"></div>
    <hr />
  </section>
  <section class="flowerlist-container">
    <h1 class="varieties-header">Dina sorter</h1>
    <div class="product-cards">
      <div class="card-container">
        <div class="card" v-for="flower in categoryList" :key="flower.id">
          <img class="product-img" :src="`/${flower.mainImg}`" alt="" />
          <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
          <span>"{{ getName(flower.name).subname }}"</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  .category-container {
    width: 100%;
    margin-top: -2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .category-hero {
      background-size: cover;
      height: 350px;
      width: 100%;
      position: relative;
      display: block;
      margin-bottom: 2rem;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(
          255,
          255,
          255,
          0.3
        ); /* Change the color and opacity as needed */
      }
      .category-name {
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 20px 30px;
        text-align: center;
        font-size: 6rem;
        font-weight: 400;
        margin: 1rem 0 0.5rem 0;
        text-shadow: 0 0px 14px rgba(0, 0, 0, 0.8);
        color: #ededed;
      }
    }
    .description-container {
      width: 60%;
      .preamble {
        font-size: 1.3rem;
        margin-bottom: 2rem;
      }
      h3 {
        font-size: 1.5rem;
        margin: 2.2rem 0 0 0;
        font-weight: 500;
        + p {
          margin-top: 0.6rem;
        }
      }
      .summary {
        font-size: 1.3rem;
        margin-top: 2rem;
      }
      .subheader {
        font-weight: 700;
        margin-bottom: 0.4rem;
        margin-top: 1.4rem;
        + p {
          margin-top: 0;
        }
      }
    }
    hr {
      border-top: 1px solid var(--color-dark-grey);
      box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
      margin: 3rem 0;
      width: 60%;
    }
  }
  .flowerlist-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .varieties-header {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      margin-top: 0;
    }
    .product-cards {
      .card-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
      }
      .card {
        max-width: 220px;
        margin-bottom: 0.5rem;
        .product-img {
          height: 220px;
          width: 220px;
        }
        .name-headline {
          margin: 0.3rem 0;
        }
      }
    }
  }
</style>
