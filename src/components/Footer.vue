<script setup>
import { ref } from "vue";
</script>

<template>
  <footer>
    <div class="image"></div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  .image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-image: url(../assets/footer-image2.png);
  }
}
</style>
