<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  import ColorPicker from './ColorPicker.vue'

  const props = defineProps({
    categories: Array,
    colors: Array,
    cultivationTypes: Array,
    canPlantInPots: Array
  })

  const emit = defineEmits([
    'update:searchName',
    'update:chosenCategory',
    'update:chosenColor',
    'update:chosenCultivationType',
    'update:chosenAnswerAboutPots'
  ])

  const searchName = ref('')
  const chosenCategory = ref('')
  const chosenCultivationType = ref('')
  const chosenColor = ref([])
  const chosenAnswerAboutPots = ref(null)
  const isOpen = ref(false)

  watch(searchName, (newValue) => {
    emit('update:searchName', newValue)
  })

  watch(chosenColor, (newValue) => {
    emit('update:chosenColor', newValue)
  })

  watch(chosenCategory, (newValue) => {
    emit('update:chosenCategory', newValue)
  })

  watch(chosenCultivationType, (newValue) => {
    emit('update:chosenCultivationType', newValue)
  })

  watch(chosenAnswerAboutPots, (newValue) => {
    emit('update:chosenAnswerAboutPots', newValue)
  })
</script>

<template>
  <section class="query-section">
    <div class="searchfield-wrapper">
      <input
        class="searchfield-name"
        v-model="searchName"
        placeholder="Sök efter en blomma"
      />
    </div>
    <div class="dropdown-wrapper">
      <select
        class="filter-categories"
        v-model="chosenCategory"
        @click="isOpen = !isOpen"
      >
        <option class="select-placeholder" value="" disabled hidden selected>
          Filtrera på kategori
        </option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <span class="arrow" :class="{ rotated: isOpen }"
        ><i class="fas fa-chevron-down"></i
      ></span>
    </div>
    <ColorPicker v-model:chosenColor="chosenColor" :colors="colors" />
    <p>Typ av sådd</p>
    <div class="radios" v-for="type in cultivationTypes" :key="type">
      <input
        type="radio"
        :id="type"
        :value="type"
        v-model="chosenCultivationType"
        name="cultivationType"
      />
      <label :for="type">{{ type }}</label>
    </div>

    <p>Kan planteras i kruka</p>
    <div class="radios" v-for="answer in canPlantInPots" :key="answer">
      <input
        type="radio"
        :id="answer"
        :value="answer"
        v-model="chosenAnswerAboutPots"
        name="canPlantInPots"
      />
      <label v-if="answer === true" :for="answer">Ja</label>
      <label v-else :for="answer">Nej</label>
    </div>
  </section>
</template>

<style scoped>
  section {
    width: 20%;
    padding: 0 1rem;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-right: 2px solid var(--color-light-grey);
  }

  .searchfield-wrapper {
    margin-right: 2rem;
    .searchfield-name {
      width: 100%;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--color-light-grey);
      box-shadow: 0px 1px 3px -1px #ccc;

      &::placeholder {
        font-family: Fredoka, sans-serif;
        font-weight: 400;
        font-size: 1rem;
      }
    }
  }
  .searchfield-name:focus {
    border: 2px dashed var(--color-green);
    outline: none;
  }
  .dropdown-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .filter-categories {
    appearance: none;
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--color-light-grey);
    box-shadow: 0px 1px 3px -1px #ccc;
    font-size: 16px;
    background-color: white;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }

  .arrow {
    display: block;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    transition: transform 0.4s ease;
    pointer-events: none;
  }

  .arrow.rotated {
    transform: translateY(-50%) rotate(180deg);
  }
</style>
