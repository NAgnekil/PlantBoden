<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    categories: Array
  })

  const emit = defineEmits(['update:chosenCategory'])

  const chosenCategory = ref([])
  const categoryIsOpen = ref(false)

  watch(chosenCategory, (newValue) => {
    emit('update:chosenCategory', newValue)
  })
</script>

<template>
  <div class="accordion-menu">
    <label class="accordion-label" @click="categoryIsOpen = !categoryIsOpen">
      Filtrera på kategori
      <span class="arrow" :class="{ rotated: categoryIsOpen }">
        <i class="fas fa-chevron-down"></i>
      </span>
    </label>
    <div :class="['accordion-content', { 'is-open': categoryIsOpen }]">
      <div
        v-for="category in categories"
        :key="category"
        class="label-container"
      >
        <label :for="category" class="category-label">
          <input
            type="checkbox"
            :id="category"
            :value="category"
            v-model="chosenCategory"
          />
          <span class="category-name">{{ category }}</span>
        </label>
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped>
  .accordion-menu {
    overflow: hidden;
    .accordion-label {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      margin-bottom: -0.2rem;
      .arrow {
        transform: translateY(-50%);
        transition: transform 0.4s ease;
        pointer-events: none;
        margin-top: 10px;
      }

      .arrow.rotated {
        transform: translateY(-50%) rotate(180deg);
      }
    }
    .accordion-content {
      max-height: 0; /* Börjar stängd */
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0; /* Börjar osynlig */
      transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out; /* Synkronisera båda övergångarna */

      &.is-open {
        max-height: 500px; /* Ett stort värde som garanterar att allt innehåll får plats */
        opacity: 1; /* Fullt synlig */
        .label-container:last-child {
          padding-bottom: 1rem; /* Justera detta värde efter behov */
        }
      }
      .label-container {
        .category-label {
          cursor: pointer;
          display: flex;
          font-size: 1rem;
          input {
            cursor: pointer;
            height: 0;
          }
          .category-name {
            width: 100%;
            padding: 0.5rem 1.5rem;
            border-radius: 8px;
          }
          &:hover input ~ .category-name {
            background-color: #ccc;
          }

          input:checked ~ .category-name {
            background-color: var(--color-green);
          }
        }
      }
    }
  }
  hr {
    border-top: 1px solid var(--color-dark-grey);
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
    margin: 0 0 1rem 0;
  }
</style>
