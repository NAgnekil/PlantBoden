<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  import ColorPicker from './ColorPicker.vue'
  import CategoryPicker from './CategoryPicker.vue'

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
  const chosenCategory = ref([])
  const chosenCultivationType = ref('')
  const chosenColor = ref([])
  const chosenAnswerAboutPots = ref(null)

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
        placeholder="Sök efter fröer"
      />
    </div>
    <CategoryPicker
      v-model:chosenCategory="chosenCategory"
      :categories="categories"
    />
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
    width: 30%;
    padding: 0 1rem;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-right: 2px solid var(--color-light-grey);
  }

  .searchfield-wrapper {
    margin: 0 2rem 1rem 0;
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
</style>
