<script setup>
  import { onMounted } from 'vue'
  import { useFlowerStore } from '../stores/flowerStore'
  import ColorPicker from './ColorPicker.vue'
  import CategoryPicker from './CategoryPicker.vue'

  const flowerStore = useFlowerStore()

  onMounted(async () => {
    await flowerStore.loadFlowers()
    await flowerStore.fetchArticles()
  })

  const cultivationTypeNames = {
    allCultivationTypes: 'Alla',
    SowIndoors: 'Förodlas',
    SowOutdoors: 'Direktsås'
  }

  const coldPlantingNames = {
    allColdPlantingTypes: 'Alla',
    Yes: 'Ja',
    No: 'Nej'
  }

  // Uppdatera storen direkt vid val
  const handleCultivationTypeChange = (event) => {
    flowerStore.setCultivationType(event.target.value)
  }

  const handleColdPlantingChange = (event) => {
    flowerStore.setColdPlantingType(event.target.value)
  }
</script>

<template>
  <section class="query-section-wrapper">
    <div class="query-section">
      <!-- Sökfält -->
      <div class="searchfield-wrapper">
        <input
          class="searchfield-name"
          :value="flowerStore.searchQuery"
          @input="(e) => flowerStore.setSearchQuery(e.target.value)"
          placeholder="Sök efter fröer"
        />
      </div>

      <!-- Kategoriväljare -->
      <CategoryPicker
        v-model="flowerStore.chosenCategory"
        :categories="flowerStore.categories"
      />

      <!-- Färgväljare -->
      <ColorPicker
        v-model="flowerStore.chosenColor"
        :colors="flowerStore.colors"
      />

      <!-- Såddtyp -->
      <div class="cultivation-container">
        <p>Typ av sådd</p>
        <div class="radios">
          <input
            class="radio-button"
            type="radio"
            id="allCultivationTypes"
            value="allCultivationTypes"
            :checked="
              flowerStore.chosenCultivationType === 'allCultivationTypes'
            "
            @change="handleCultivationTypeChange"
            name="cultivationType"
          />
          <label for="allCultivationTypes">Alla</label
          ><span class="checkmark"></span>
        </div>
        <div
          class="radios"
          v-for="cultivationType in flowerStore.cultivationTypes"
          :key="cultivationType"
        >
          <input
            class="radio-button"
            type="radio"
            :id="cultivationType"
            :value="cultivationType"
            :checked="flowerStore.chosenCultivationType === cultivationType"
            @change="handleCultivationTypeChange"
            name="cultivationType"
          />
          <label :for="cultivationType">
            {{
              cultivationTypeNames[cultivationType] || cultivationType
            }} </label
          ><span class="checkmark"></span>
        </div>
      </div>

      <!-- Vintersådd -->
      <div class="coldplant-container">
        <p>Passar för vintersådd</p>
        <div class="radios">
          <input
            class="radio-button"
            type="radio"
            id="allColdPlantingTypes"
            value="allColdPlantingTypes"
            :checked="
              flowerStore.chosenColdPlantingType === 'allColdPlantingTypes'
            "
            @change="handleColdPlantingChange"
            name="coldPlantingType"
          />
          <label for="allColdPlantingTypes">Alla</label
          ><span class="checkmark"></span>
        </div>
        <div
          class="radios"
          v-for="type in flowerStore.coldPlantingTypes"
          :key="type"
        >
          <input
            class="radio-button"
            type="radio"
            :id="type"
            :value="type"
            :checked="flowerStore.chosenColdPlantingType === type"
            @change="handleColdPlantingChange"
            name="coldPlantingType"
          />
          <label :for="type">
            {{ coldPlantingNames[type] || type }} </label
          ><span class="checkmark"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .query-section-wrapper {
    width: 300px;
    position: sticky;
    top: 140px;
    height: 100vh;
    overflow: auto;
    margin: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .query-section {
    height: 150vh;
    padding: 0 1rem;
    margin: 0 0 0 1rem;
    display: flex;
    flex: 1;
    padding: 20px;
    overflow: auto;
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
  .cultivation-container,
  .coldplant-container {
    p {
      margin: 0 0 1rem 0;
    }
    .radios {
      padding-bottom: 0.6rem;
      display: block;
      position: relative;
      cursor: pointer;
      .radio-button {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
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
