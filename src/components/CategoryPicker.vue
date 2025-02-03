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
    <input type="checkbox" id="tab2" />
    <label
      class="accordion-label"
      for="tab2"
      @click="categoryIsOpen = !categoryIsOpen"
      >Filtrera på kategori
      <span class="arrow" :class="{ rotated: categoryIsOpen }"
        ><i class="fas fa-chevron-down"></i></span
    ></label>
    <div class="accordion-content">
      <div
        v-show="categoryIsOpen"
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
          /><span class="category-name">{{ category }}</span></label
        >
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped>
  .accordion-menu {
    overflow: hidden;
    input {
      &:checked ~ .accordion-content {
        max-height: 100vh;
        padding-bottom: 1rem;
      }
    }
    #tab2 {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
    .accordion-label {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
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
      max-height: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
      .label-container {
        .category-label {
          cursor: pointer;
          font-size: 1.3rem;
          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
          }
          .category-name {
            padding: 0.2rem 1.5rem;
            border-radius: 8px;
          }
          /* On mouse-over, add a grey background color */
          &:hover input ~ .category-name {
            background-color: #ccc;
          }

          /* When the checkbox is checked, add a blue background */
          input:checked ~ .category-name {
            background-color: var(--color-green);
          }
        }
      }
    }
  }
  hr {
    border-top: 2px solid var(--color-dark-grey);
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
    margin: 0 0 1rem 0;
  }
</style>
