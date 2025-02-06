<script setup>
  import { defineProps, ref, onMounted, watch } from 'vue'
  import axios from 'axios'

  const props = defineProps({
    categoryName: String
  })

  const chosenCategoryObject = ref(null)
  const chosenCategoryDescription = ref('')
  const chosenCategoryImg = ref('')

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

  onMounted(fetchCategoryDescription)

  watch(
    () => props.categoryName,
    () => {
      fetchCategoryDescription()
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
  }
</style>
