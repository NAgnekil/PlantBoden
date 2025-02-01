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

  const getHexColor = (color) => {
    const colorMap = {
      Aprikos: '#F8AF88',
      Blå: '#7459D9',
      Brun: '#51282D',
      Cerise: '#B3124F',
      Cream: '#F5F5DC',
      'Gammel-rosa': '#D27985',
      Gräddvit: '#ECE9E0',
      Grön: '#97B13B',
      Gul: '#FCD008',
      Korall: '#F97B56',
      Laxrosa: '#FF7E70',
      Lila: '#AD50E6',
      Ljusrosa: '#F7C6E3',
      Magenta: '#DD27A6',
      Orange: '#FCA834',
      Persika: '#F8A351',
      Rosa: '#F596C8',
      Röd: '#DB0614',
      Terrakotta: '#c16b4c',
      Vinröd: '#8C0029',
      Vit: '#F7FDF9'
    }
    return colorMap[color] || '#000' // Standard svart om ingen färg matchar
  }

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
    <input
      class="searchfield-name"
      v-model="searchName"
      placeholder="Sök efter en blomma"
    >Sök efter en blomma</input>
    <div class="color-checkboxes">
      <div class="checkbox" v-for="color in colors" :key="color">
        <input
          type="checkbox"
          :id="color"
          :value="color"
          v-model="chosenColor"
          class="hidden-checkbox"
        />
        <label
          :for="color"
          class="color-label"
          :style="{ backgroundColor: getHexColor(color) }"
        >
          <span v-if="chosenColor.includes(color)" class="check-icon">✔</span>
        </label>
        <span class="color-name">{{ color }}</span>
      </div>
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

<style scoped>
  .searchfield-name {
    width: 50%;
    height: 3rem;
    border-radius: 8px;
    border: 1px solid #ece9e0;
  }
  .color-checkboxes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0 1rem;
    width: 100%;
    .checkbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin: 0.2rem 0.5rem;
      max-width: 2.5rem;
      .hidden-checkbox {
        display: none;
      }
      .color-label {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        border: 2px solid #ccc;
        transition: all 0.3s ease-in-out;
        margin-bottom: 0.5rem;
        &:hover {
          transform: scale(1.1);
        }
        .check-icon {
          font-size: 20px;
          color: white;
          font-weight: bold;
        }
      }

      .color-name {
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
</style>
