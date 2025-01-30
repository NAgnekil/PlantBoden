<script setup>
  import { ref } from 'vue'
</script>

<template>
  <header>
    <div class="image">
      <div class="image-overlay">
        <h1>Min Fröbank</h1>
      </div>
    </div>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    height: 175px;
    background-color: antiquewhite;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    h1 {
      font-family: Allura, sans-serif;
      font-size: 5rem;
      letter-spacing: 0.2rem;
      text-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    }
    .image {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-image: url(../assets/header-background.jpg);
      .image-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(249, 245, 242, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
