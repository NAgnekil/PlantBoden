<script setup>
  import { defineProps, ref, onMounted, watch } from 'vue'
  import axios from 'axios'
  import { useFlowerStore } from '../stores/flowerStore.js'
  import FlowerCard from '../components/FlowerCard.vue'
  import FlowerDetailsCard from '../components/FlowerDetailsCard.vue'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    categoryName: String,
    flowers: Array
  })

  const flowerStore = useFlowerStore()
  const { flowers } = storeToRefs(flowerStore)

  const chosenCategoryObject = ref(null)
  const chosenCategoryDescription = ref('')
  const chosenCategoryImg = ref('')
  const categoryList = ref([])
  const selectedFlower = ref(null)
  const isPopupVisible = ref(false)

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
    categoryList.value = [
      ...flowers.value.filter((flower) => {
        const flowerCategory = flower.category.trim().toLowerCase()
        const selectedCategory = props.categoryName.trim().toLowerCase()
        return flowerCategory === selectedCategory
      })
    ]
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

  const showPopup = (flower) => {
    selectedFlower.value = flower
    isPopupVisible.value = true
  }

  const closePopup = () => {
    isPopupVisible.value = false
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
    <div class="cards-container">
      <FlowerCard
        v-for="flower in categoryList"
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
  .category-container {
    margin-top: 0;
    width: 100%;
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
        background-color: rgba(255, 255, 255, 0.3);
      }
      .category-name {
        font-family: Aboreto, sans-serif;
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 20px 30px;
        text-align: center;
        font-size: 6rem;
        font-weight: 600;
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
        line-height: 1.7rem;
      }
      h3 {
        font-size: 1.5rem;
        margin: 2.2rem 0 0 0;
        font-weight: 500;
        + p {
          margin-top: 0.6rem;
        }
      }
      p {
        line-height: 1.4rem;
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
    margin-bottom: 2rem;

    .varieties-header {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      margin-top: 0;
    }
    .cards-container {
      display: flex;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 2rem;
      height: unset;
      .card {
        max-width: 180px;
        .image-wrapper {
          width: 180px;
          height: 180px;
        }
      }
    }
  }
</style>
