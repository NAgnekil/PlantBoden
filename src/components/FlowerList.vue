<script setup>
  import { ref, computed } from 'vue'

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

  const hoveredFlower = ref(null)

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
      const month = extractMonth(flower.sowingDate)
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
            <div class="image-wrapper">
              <img
                class="product-img main-img"
                :src="`/${flower.mainImg}`"
                alt=""
              />
              <img
                class="product-img hover-img"
                v-if="flower.additionalImages?.[0]"
                :src="`/${flower.additionalImages[0]}`"
                alt=""
              />
            </div>
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
            <div class="image-wrapper">
              <img
                class="product-img main-img"
                :src="`/${flower.mainImg}`"
                alt=""
              />
              <img
                class="product-img hover-img"
                v-if="flower.additionalImages?.[0]"
                :src="`/${flower.additionalImages[0]}`"
                alt=""
              />
            </div>
            <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
            <span>"{{ getName(flower.name).subname }}"</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="product-cards" v-if="searchQueryExists">
        <div class="card" v-for="flower in filteredFlowers" :key="flower.id">
          <div class="image-wrapper">
            <img
              class="product-img main-img"
              :src="`/${flower.mainImg}`"
              alt=""
            />
            <img
              class="product-img hover-img"
              v-if="flower.additionalImages?.[0]"
              :src="`/${flower.additionalImages[0]}`"
              alt=""
            />
          </div>
          <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
          <span>"{{ getName(flower.name).subname }}"</span>
        </div>
      </div>
      <div class="product-cards" v-else>
        <div class="card" v-for="flower in flowers" :key="flower.id">
          <div class="image-wrapper">
            <img
              class="product-img main-img"
              :src="`/${flower.mainImg}`"
              alt=""
            />
            <img
              class="product-img hover-img"
              v-if="flower.additionalImages?.[0]"
              :src="`/${flower.additionalImages[0]}`"
              alt=""
            />
          </div>
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
      .image-wrapper {
        position: relative;
        display: inline-block;
        width: 220px;
        height: 220px;
        .product-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          transition:
            opacity 0.5s ease-in-out,
            transform 0.3s ease;
          object-fit: cover;
          &:hover {
            transform: scale(1.15);
          }
        }
        .main-img {
          opacity: 1;
        }

        .hover-img {
          opacity: 0;
        }
        &:hover .hover-img {
          opacity: 1;
        }

        &:hover .main-img {
          opacity: 0;
        }
        &:not(:has(.hover-img)):hover .main-img {
          opacity: 1;
        }
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
          .image-wrapper {
            position: relative;
            display: inline-block;
            width: 120px;
            height: 120px;
            .product-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 8px;
              transition:
                opacity 0.5s ease-in-out,
                transform 0.3s ease;
              object-fit: cover;
              &:hover {
                transform: scale(1.15);
              }
            }
            .main-img {
              opacity: 1;
            }

            .hover-img {
              opacity: 0;
            }
            &:hover .hover-img {
              opacity: 1;
            }

            &:hover .main-img {
              opacity: 0;
            }
            &:not(:has(.hover-img)):hover .main-img {
              opacity: 1;
            }
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

  .image-wrapper {
    position: relative;
    .product-img {
      border-radius: 8px;
      transition:
        transform 0.3s ease,
        opacity 0.4s ease-in-out;
      background: linear-gradient(145deg, #2a2a2a, #383838);

      &:hover {
        transform: scale(1.15);
      }
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
      pointer-events: none;
    }
    &:hover .overlay {
      opacity: 1;
      transform: scale(1.15);
    }
  }
</style>
