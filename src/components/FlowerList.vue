<script setup>
  import { computed } from 'vue'

  const {
    flowers,
    filteredFlowers,
    searchQueryExists,
    sortCategory,
    sortMonth,
    extractMonth
  } = defineProps({
    flowers: Array,
    filteredFlowers: Array,
    searchQueryExists: Boolean,
    sortOrder: String,
    sortMonth: String,
    sortCategory: String,
    extractMonth: Function
  })

  const groupedByCategory = computed(() => {
    if (sortCategory !== 'category') return null

    return flowers.reduce((categories, flower) => {
      if (!categories[flower.category]) {
        categories[flower.category] = []
      }
      categories[flower.category].push(flower)
      return categories
    }, {})
  })

  const groupedByMonth = computed(() => {
    if (sortMonth !== 'asc') return null

    return flowers.reduce((months, flower) => {
      const month = extractMonth(flower.sowingDate) // Använd din extractMonth-funktion här
      if (!months[month]) {
        months[month] = []
      }
      months[month].push(flower)
      return months
    }, {})
  })

  const getName = (name) => {
    const match = name.match(/^(.*?)\s*["“](.*?)["”]\s*(.*?)$/)

    if (match) {
      return {
        name: match[1].trim(),
        subname: match[2].trim()
      }
    } else {
      return {
        name: name.trim(),
        subname: ''
      }
    }
  }

  const getMonth = (month) => {
    const monthMap = {
      1: 'Januari',
      2: 'Februari',
      3: 'Mars',
      4: 'April',
      5: 'Maj',
      6: 'Juni',
      7: 'Juli',
      8: 'Augusti',
      9: 'September',
      10: 'Oktober',
      11: 'November',
      12: 'December'
    }
    return monthMap[month] || '???'
  }
</script>

<template>
  <section v-if="flowers">
    <div class="product-cards-sorted" v-if="sortCategory === 'category'">
      <div
        class="cards-by-sort"
        v-for="(flowers, category) in groupedByCategory"
        :key="category"
      >
        <h1>{{ category }}</h1>
        <hr />
        <div class="card-container">
          <div class="card" v-for="flower in flowers" :key="flower.id">
            <img class="product-img" :src="flower.mainImg" alt="" />
            <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
            <span>"{{ getName(flower.name).subname }}"</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-cards-sorted" v-else-if="sortMonth === 'asc'">
      <div
        class="cards-by-sort"
        v-for="(flowers, month) in groupedByMonth"
        :key="month"
      >
        <h1>{{ getMonth(month) }}</h1>
        <hr />
        <div class="card-container">
          <div class="card" v-for="flower in flowers" :key="flower.id">
            <img class="product-img" :src="flower.mainImg" alt="" />
            <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
            <span>"{{ getName(flower.name).subname }}"</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="product-cards" v-if="searchQueryExists">
        <div class="card" v-for="flower in filteredFlowers" :key="flower.id">
          <img class="product-img" :src="flower.mainImg" alt="" />
          <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
          <span>"{{ getName(flower.name).subname }}"</span>
        </div>
      </div>
      <div class="product-cards" v-else>
        <div class="card" v-for="flower in flowers" :key="flower.id">
          <img class="product-img" :src="flower.mainImg" alt="" />
          <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
          <span>"{{ getName(flower.name).subname }}"</span>
        </div>
      </div>
    </div>
  </section>
  <section v-else>Laddar data...</section>
</template>

<style lang="css" scoped>
  section {
    margin-right: 2rem;
    width: 100%;
  }
  .product-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    h1,
    hr {
      display: none;
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
  .product-cards-sorted {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1.5rem;
    .cards-by-sort {
      display: flex;
      flex-direction: column;
      .card-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        .card {
          max-width: 120px;
          display: flex;
          flex-direction: column;
          .product-img {
            height: 120px;
            width: 120px;
          }
          .name-headline {
            margin-bottom: 0;
          }
          span {
            font-size: 0.7rem;
          }
        }
      }
      h1 {
        font-size: 2rem;
        margin-bottom: 0;
      }
      hr {
        border-top: 2px solid var(--color-dark-grey);
        box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
        margin: 0 0 1rem 0;
      }
    }
  }
</style>
