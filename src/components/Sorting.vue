<script setup>
  import { useFlowerStore } from '../stores/flowerStore'

  const flowerStore = useFlowerStore()
</script>

<template>
  <div class="sorting-container">
    <nav class="sorting-menu">
      <div class="dropdown-trigger">
        <p>Sortera</p>
        <ul class="dropdown">
          <li @click="flowerStore.sortOrder = 'asc'">Bokstavsordning A-Z</li>
          <li @click="flowerStore.sortOrder = 'desc'">Bokstavsordning Z-A</li>
          <li @click="flowerStore.sortCategory = 'category'">Kategorier</li>
          <li @click="flowerStore.sortMonth = 'asc'">Månad för sådd</li>
          <li>Datum för sådd</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  div {
    width: 100%;
    display: flex;
    margin-top: 1rem;
  }
  nav {
    margin: 0;
    display: block;
    text-align: center;
    font-size: 0.8rem;
    .dropdown-trigger {
      position: relative;
      display: inline-block;
      font-size: 1rem;
      font-family: 'Fredoka', sans-serif;
      p {
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
      visibility: hidden;
      min-width: 180px;
      opacity: 0;
      position: absolute;
      padding-left: 0;
      top: 100%;
      left: 0;
      margin: 0;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 3px 5px -1px #ccc;
      z-index: 10;
      transition:
        opacity 0.3s linear,
        visibility 0.3s linear;
      li {
        clear: both;
        text-align: left;
        border-style: none;
        padding: 0.7rem;
        list-style-type: none;
        cursor: pointer;
        &:hover {
          background-color: #f0f0f0; /* Lägg till en hover-effekt för listobjekt */
        }
      }
    }
  }
</style>
