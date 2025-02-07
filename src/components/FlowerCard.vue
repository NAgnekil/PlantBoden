<script setup>
  defineProps({
    flower: Object
  })

  const getName = (name) => {
    const match = name.match(/^(.*?)\s*["“](.*?)["”]\s*(.*?)$/)
    return match
      ? { name: match[1].trim(), subname: match[2].trim() }
      : { name: name.trim(), subname: '' }
  }
</script>
<template>
  <div class="card">
    <div class="image-wrapper">
      <img class="product-img main-img" :src="`/${flower.mainImg}`" alt="" />
      <img
        class="product-img hover-img"
        v-if="flower.additionalImages?.[0]"
        :src="`/${flower.additionalImages[0]}`"
        alt=""
      />
    </div>
    <h2 class="name-headline">{{ getName(flower.name).name }}</h2>
    <span v-if="getName(flower.name).subname">
      "{{ getName(flower.name).subname }}"
    </span>
  </div>
</template>
<style>
  /* GEMENSAM BAS-STIL FÖR ALLA KORTLISTOR */
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    .image-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;
      height: auto;
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
    .name-headline {
      margin: 0.3rem 0;
    }
  }

</style>
