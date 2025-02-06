<script setup>
  import { ref, watch } from 'vue'

  defineProps({
    flowers: Array,
    sortOrder: String,
    sortCategory: String,
    sortMonth: String
  })

  const emit = defineEmits([
    'update:sortOrder',
    'update:sortCategory',
    'update:sortMonth'
  ])

  const sortByCategory = (order) => {
    emit('update:sortCategory', order)
    emit('update:sortOrder', '')
    emit('update:sortMonth', '')
  }

  const sortByMonth = (order) => {
    emit('update:sortMonth', order)
    emit('update:sortOrder', '')
    emit('update:sortCategory', '')
  }

  const sortFlowers = (order) => {
    emit('update:sortOrder', order)
    emit('update:sortCategory', '')
    emit('update:sortMonth', '')
  }
</script>

<template>
  <div>
    <nav>
      <div class="dropdown-trigger">
        <p>Sortera</p>
        <ul class="dropdown">
          <li @click="sortFlowers('asc')">Bokstavsordning A-Z</li>
          <li @click="sortFlowers('desc')">Bokstavsordning Z-A</li>
          <li @click="sortByCategory('category')">Kategorier</li>
          <li @click="sortByMonth('asc')">Månad för sådd</li>
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
    justify-content: flex-end;
  }
  nav {
    margin: 0 3rem;
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
      right: 0;
      margin: 0;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 3px 5px -1px #ccc;
      z-index: 10;
      transition: opacity 0.3s linear, visibility 0.3s linear;
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
