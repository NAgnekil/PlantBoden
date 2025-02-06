<script setup>
  import { ref, onMounted } from 'vue'
  import { fetchFlowers } from '../../fetchFlowers'

  const flowers = ref([])
  const categories = ref([])

  onMounted(async () => {
    flowers.value = await fetchFlowers()
    categories.value = [
      ...new Set(flowers.value.map((flower) => flower.category))
    ].sort()
  })
</script>

<template>
  <header>
    <h1>Fröboden</h1>
    <div class="image">
      <div class="image-overlay"></div>
    </div>
    <nav>
      <ul class="menu-container">
        <li><router-link to="/">Start</router-link></li>
        <li class="dropdown-trigger">
          <a>Kategorier</a>
          <ul class="dropdown">
            <li
              v-for="category in categories"
              :key="category"
              class="dropdown-item"
            >
              <router-link :to="`/category/${category}`">
                {{ category }}</router-link
              >
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/articlesandinspo"
            >Artiklar & Inspiration</router-link
          >
        </li>
        <li>
          <router-link to="/gardenoverview">Trädgårdsöversikt</router-link>
        </li>
        <li><router-link to="/calendar">Kalender</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    background-color: #fdfcfb;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    box-shadow: 0px 3px 5px -1px #ccc;
    border-top: 4px solid var(--color-green);
    h1 {
      font-family: Aboreto, sans-serif;
      font-size: 2.2rem;
      letter-spacing: 0.2rem;
      margin: 1.5rem 3rem;
    }
    nav {
      margin: 0 3rem;
      display: block;
      text-align: center;
      font-size: 0.8rem;
      .menu-container li {
        list-style: none;
        margin: 0 auto;
        border-left: 2px solid var(--color-green);
        display: inline-block;
        padding: 0 15px;
        position: relative;
        text-decoration: none;
        text-align: center;
        a {
          color: var(--color-dark-grey);
          text-decoration: none;
          font-family: 'Aboreto', sans-serif;
          font-weight: 600;

          &:hover {
            color: var(--color-green);
          }
        }
        &:hover {
          cursor: pointer;
        }
        &:hover > ul,
        ul li ul:hover {
          visibility: visible;
          opacity: 1;
          display: block;
          min-width: 120px;
          text-align: left;
          padding-top: 20px;
          box-shadow: 0px 3px 5px -1px #ccc;
        }
        .dropdown-trigger {
          position: relative;
          display: inline-block;
          a {
            cursor: pointer;
            margin: 0;
          }
          &:hover .dropdown {
            visibility: visible;
            opacity: 1;
            display: block;
            min-width: 180px;
            text-align: left;
            box-shadow: 0px 3px 5px -1px #ccc;
          }
        }
        .dropdown {
          margin-top: 10px;
          min-width: 120px;
          left: 0;
          display: block;
          visibility: hidden;
          opacity: 0;
          position: absolute;
          padding-left: 0;
          top: 100%;
          margin: 0;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0px 3px 5px -1px #ccc;
          z-index: 10;
          transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out;
          .dropdown-item {
            clear: both;
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
            border-style: none;
            a {
              transition: all 0.5s ease;
              &:hover {
                padding-left: 10px;
                border-left: 2px solid var(--color-green);
                transition: all 0.3s ease;
              }
            }
          }
        }
      }
    }
  }

  .dropdown li {
    clear: both;
    text-align: left;
    border-style: none;
    list-style-type: none;
    cursor: pointer;
  }
</style>
