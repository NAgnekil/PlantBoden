<script setup>
  import { onMounted, ref } from 'vue';
  import { useFlowerStore } from '../stores/flowerStore';

  const flowerStore = useFlowerStore();
  const categories = ref([]);

  onMounted(async () => {
    await flowerStore.loadFlowers();
    categories.value = [
      ...new Set(
        flowerStore.flowers
          .map((flower) => flower.category)
          .filter((category) => category !== 'Övrigt')
      )
    ].sort();
  });
</script>

<template>
  <header>
    <router-link to="/"><h1>Plantboden</h1></router-link>
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
              class="dropdown-item cursor-box text"
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
    box-shadow: 0px 3px 5px -1px #ccc;
    border-top: 4px solid var(--color-green);
    z-index: 10;
    position: sticky;
    top: 0;
    h1 {
      font-family: Aboreto, sans-serif;
      font-size: 2.2rem;
      letter-spacing: 0.2rem;
      margin: 1.5rem 3rem;
      color: #000;
    }
    a {
      text-decoration: none;
      color: var(--color-dark-grey);
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
          padding: 10px 0;
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
            padding: 10px 0 10px 20px;
            border-style: none;
            transition: all 0.5s ease;
            &:hover {
              margin-left: 10px;
              padding-left: 15px;
              border-left: 2px solid var(--color-green);
              transition: all 0.5s ease;
              transform: scale(1.05);
              letter-spacing: 2px;
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
