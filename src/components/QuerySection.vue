<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    categories: Array,
    colors: Array
  })

  const emit = defineEmits([
    'update:searchName',
    'update:chosenCategory',
    'update:chosenColor'
  ])

  const searchName = ref('')
  const chosenCategory = ref('')
  const chosenColor = ref([])

  watch(chosenColor, (newValue) => {
    emit('update:chosenColor', newValue)
  })

  watch(searchName, (newValue) => {
    emit('update:searchName', newValue)
  })

  watch(chosenCategory, (newValue) => {
    emit('update:chosenCategory', newValue)
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
  </section>
</template>
