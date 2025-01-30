<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'

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
  const chosenColor = ref([])
  const chosenCultivationType = ref('')
  const chosenAnswerAboutPots = ref(null)

  watch(chosenColor, (newValue) => {
    emit('update:chosenColor', newValue)
  })

  watch(searchName, (newValue) => {
    emit('update:searchName', newValue)
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
    <input v-model="searchName" placeholder="Sök efter en blomma" />

    <div class="checkboxes" v-for="color in colors" :key="color">
      <input type="checkbox" :id="color" :value="color" v-model="chosenColor" />
      <label :for="color">{{ color }}</label>
    </div>

    <select v-model="chosenCategory">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

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
