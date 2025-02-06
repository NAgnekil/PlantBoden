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
    <hr />
  </section>
</template>

<style scoped>
  section {
    width: 80%;
  }
  .category-hero {
    background-size: cover;
    height: 300px;
    width: 100%;
    position: relative;
    display: block;
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
  hr {
    border-top: 2px solid var(--color-dark-grey);
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
    margin: 0 0 2.5rem 0;
  }
</style>
