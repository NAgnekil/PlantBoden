<template>
  <form @submit.prevent="uploadImage">
    <label>Kategori:</label>
    <select v-model="selectedCategory" @change="fetchPlants">
      <option disabled value="">Välj kategori</option>
      <option v-for="category in categories" :key="category">{{ category }}</option>
    </select>

    <label>Växtnamn:</label>
    <select v-model="selectedPlantName">
      <option disabled value="">Välj växt</option>
      <option v-for="plant in filteredPlants" :key="plant._id">
        {{ plant.name }}
      </option>
    </select>

    <label>Bild:</label>
    <input type="file" @change="handleFile" />

    <button type="submit">Ladda upp bild</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue';

  const categories = [
    'Aster',
    'Celosia',
    'Dahlia',
    'Lejongap',
    'Luktärt',
    'Phlox',
    'Ranunkel',
    'Risp',
    'Solros',
    'Övrigt',
    'Kryddor',
    'Grönsaker'
  ]; // t.ex.
  const selectedCategory = ref('');
  const selectedPlantName = ref('');
  const filteredPlants = ref([]);
  const imageFile = ref(null);

  const fetchPlants = async () => {
      if (!selectedCategory.value) return;
    const res = await fetch(
      `http://localhost:3000/api/plants?category=${selectedCategory.value}`
    );
    const data = await res.json();
    filteredPlants.value = data;
  };

  const handleFile = (e) => {
    imageFile.value = e.target.files[0];
  };

  const uploadImage = async () => {
    if (!imageFile.value || !selectedPlantName.value || !selectedCategory.value)
      return;

    const formData = new FormData();
    formData.append('image', imageFile.value);
    formData.append('category', selectedCategory.value);
    formData.append('name', selectedPlantName.value);

    const res = await fetch(`http://localhost:3000/api/upload/image`, {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    alert(result.message || 'Bild uppladdad!');
  };
</script>
