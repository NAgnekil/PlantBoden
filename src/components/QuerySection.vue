<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  import ColorPicker from './ColorPicker.vue'
  import CategoryPicker from './CategoryPicker.vue'

  const props = defineProps({
    categories: Array,
    colors: Array,
    cultivationTypes: Array,
  })

  const emit = defineEmits([
    'update:searchName',
    'update:chosenCategory',
    'update:chosenColor',
    'update:chosenCultivationType',
  ])

  const searchName = ref('')
  const chosenCategory = ref([])
  const chosenCultivationType = ref('all')
  const chosenColor = ref([])
  const cultivationTypeNames = {
    All: 'Alla',
    SowIndoors: 'Förodlas',
    SowOutdoors: 'Direktsås'
  }

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

    <div class="cultivation-container">
      <p>Typ av sådd</p>
      <div class="radios">
        <input
          class="radio-button"
          type="radio"
          id="all"
          value="all"
          v-model="chosenCultivationType"
          name="cultivationType"
        />
        <label for="all">Alla</label><span class="checkmark"></span>
      </div>
      <div class="radios" v-for="type in cultivationTypes" :key="type">
        <input
          class="radio-button"
          type="radio"
          :id="type"
          :value="type"
          v-model="chosenCultivationType"
          name="cultivationType"
        />
        <label :for="type">{{ cultivationTypeNames[type] || type }}</label
        ><span class="checkmark"></span>
      </div>
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
  .cultivation-container {
    p {
      margin: 0 0 1rem 0;
    }
    .radios {
      padding-bottom: 0.6rem;
      display: block;
      position: relative;
      cursor: pointer;
      .radio-button {
        display: none;
      }
      label {
        font-size: 1.2rem;
        margin: 1rem;
        cursor: pointer;
        font-size: 1.3rem;
        padding: 0.2rem 1.5rem;
        border-radius: 8px;
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        &:hover input ~ label {
          background-color: #ccc;
        }

        input:checked ~ label {
          background-color: var(--color-green);
        }
      }
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
      }
      &:hover input ~ .checkmark {
        background-color: #ccc;
      }

      input:checked ~ .checkmark {
        background-color: var(--color-green);
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }
      input:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }
    }
  }
</style>
