<script setup>
  import { ref, onMounted, watchEffect } from 'vue'
  import { useFlowerStore } from '../stores/flowerStore'

  const props = defineProps({
    flower: Object,
    isVisible: Boolean
  })

  const flowerStore = useFlowerStore()
  const imageList = ref([])
  const activeImage = ref('')

  onMounted(async () => {
    await flowerStore.loadFlowers()
  })

  watchEffect(() => {
    if (props.flower) {
      imageList.value = [props.flower.mainImg, ...props.flower.additionalImages]
      activeImage.value = props.flower.mainImg
    }
  })
  const getHardiness = (hardiness) => {
    const hardinessMap = {
      HA: '💪 Härdighet: Härdig annuell',
      HHA: '🌼 Härdighet: Halvhärdig annuell',
      TA: '🥶 Härdighet: Ömtålig annuell',
      HP: '💪 Härdighet: Härdig perenn'
    }
    return hardinessMap[hardiness]
  }

  const getMonth = (month) => {
    const monthMap = {
      January: 'Januari',
      February: 'Februari',
      March: 'Mars',
      April: 'April',
      May: 'Maj',
      June: 'Juni',
      July: 'Juli',
      August: 'Augusti',
      September: 'September',
      October: 'Oktober',
      November: 'November',
      December: 'December'
    }
    return monthMap[month] || '???'
  }

  const handleThumbnailClick = (image) => {
    activeImage.value = image
  }

  const emit = defineEmits(['close'])

  const closePopup = () => {
    emit('close')
  }
</script>

<template>
  <div v-if="isVisible" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <button class="close-btn" @click="closePopup">✖</button>
      <h2 class="card-headline">{{ flower?.name }}</h2>
      <div class="card-content">
        <div class="gallery">
          <div class="main-image">
            <img
              :src="'/' + activeImage"
              :class="{ active: true }"
              alt="Main flower image"
            />
          </div>
          <div class="thumbnails">
            <img
              v-for="(image, index) in imageList"
              :key="index"
              :src="'/' + image"
              :class="{ active: image === activeImage }"
              @click="handleThumbnailClick(image)"
              alt="Thumbnail flower image"
            />
          </div>
        </div>
        <div class="information-container">
          <p>📏 Höjd: {{ flower?.height }}</p>
          <p>{{ getHardiness(flower?.hardiness) }}</p>
          <p>
            🌸 Blomningstid: {{ getMonth(flower?.harvestPeriod[0].start) }} -
            {{ getMonth(flower?.harvestPeriod[0].end) }}
          </p>
          <p v-if="flower?.cutAndComeAgain">✂️ Cut and Come Again</p>
          <p v-if="flower?.mediumProducer">⚖️ Medium Producer</p>
          <p v-if="flower?.oneAndDone">❌ One and Done</p>
          <p v-if="flower?.cultivationType === 'SowIndoors'">
            🌱 Förodlas: {{ flower?.sowingDate }}
          </p>
          <p v-else>🌱 Direktsådd: {{ flower?.sowingDate }}</p>
          <p>↔️ Plantavstånd: {{ flower?.plantDistanceInCm }} cm</p>
          <p class="flower-description" v-html="flower?.description"></p>
        </div>
      </div>
    </div>
  </div>
  <!-- Frågetecknet (flower?.name) kallas optional chaining, det gör att koden inte
   kraschar om flower är null eller undefined. Man kan också skriva det med en
  fallback: flower?.name ?? "Ingen blomma vald" -->
</template>

<style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    background: white;
    margin-top: 4rem;
    padding: 1rem 2rem 2rem 2rem;
    border-radius: 8px;
    max-width: 600px;
    max-height: 500px;
    text-align: center;
    position: relative;
    overflow-y: scroll;

    h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.7rem;
      font-weight: bold;
    }
    img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 8px;
    }
    .card-content {
      display: flex;
      flex-direction: row;
      .information-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 2rem;
        p {
          margin: 0;
          line-height: 1.5rem;
        }
        .flower-description {
          margin-top: 2rem;
          text-align: left;
        }
      }
    }
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 250px;
    .main-image img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 8px;
    }
    .thumbnails {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      img {
        width: 75px;
        height: 75px;
        object-fit: cover;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      img.active {
        opacity: 1;
        border: 2px solid currentColor;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
</style>
