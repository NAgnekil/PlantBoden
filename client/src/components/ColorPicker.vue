<script setup>
  import { ref } from 'vue'

  defineProps({ modelValue: Array, colors: Array })
  defineEmits(['update:modelValue'])

  const colorIsOpen = ref(false)

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
    return colorMap[color] || '#000'
  }
</script>

<template>
  <div class="accordion-menu">
    <input type="checkbox" id="tab1" />
    <label
      class="accordion-label"
      for="tab1"
      @click="colorIsOpen = !colorIsOpen"
      >Filtrera på färg
      <span class="arrow" :class="{ rotated: colorIsOpen }"
        ><i class="fas fa-chevron-down"></i></span
    ></label>
    <div class="accordion-content color-checkboxes">
      <div class="checkbox" v-for="color in colors" :key="color">
        <input
          type="checkbox"
          :id="color"
          :value="color"
          :checked="modelValue.includes(color)"
          @change="
            $emit(
              'update:modelValue',
              $event.target.checked
                ? [...modelValue, color]
                : modelValue.filter((c) => c !== color)
            )
          "
          class="hidden-checkbox"
        />
        <label
          :for="color"
          class="color-label"
          :style="{
            backgroundColor: getHexColor(color),
            border: color === 'Vit' ? '2px solid #ccc' : 'none'
          }"
        >
          <span v-if="modelValue.includes(color)" class="check-icon">✔</span>
        </label>
        <span class="color-name">{{ color }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped>
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  .accordion-menu {
    overflow: hidden;
  }
  .accordion-label {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: -0.2rem;
  }
  .accordion-content {
    max-height: 0;
    transition: all 0.35s;
  }
  input:checked ~ .accordion-content {
    max-height: 100vh;
    padding-bottom: 1rem;
    margin-top: 1rem;
  }
  hr {
    border-top: 1px solid var(--color-dark-grey);
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
    margin: 0 0 1rem 0;
  }

  .arrow {
    transform: translateY(-50%);
    transition: transform 0.4s ease;
    pointer-events: none;
    margin-top: 10px;
  }

  .arrow.rotated {
    transform: translateY(-50%) rotate(180deg);
  }

  .color-checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow: hidden;
    transition:
      max-height 0.5s ease-in-out,
      opacity 0.3s ease-in-out;
    .checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      .color-label {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        .check-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
        }
      }
      .color-name {
        display: none;
        font-size: 14px;
        color: #6c6c6a;
      }
    }
  }
</style>
