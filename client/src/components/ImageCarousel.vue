<script setup>
  import { ref, onMounted } from 'vue'
  import 'vue3-carousel/carousel.css'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'

  const currentSlide = ref(0)

  const slideTo = (nextSlide) => (currentSlide.value = nextSlide)

  const galleryConfig = {
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade',
    mouseDrag: false,
    touchDrag: false,
    height: 320
  }

  const thumbnailsConfig = {
    height: 80,
    itemsToShow: 6,
    wrapAround: true,
    touchDrag: false,
    gap: 10
  }

  const images = ref([])

  onMounted(async () => {
    /* import.meta.glob(...) är en Vite-funktion som hämtar alla filer i angiven mapp
      och skapar ett objekt där varje fil har en egen "import-funktion", där den importerar sin url.
      Om vi inte använder import.meta.glob() måste vi manuellt lägga till/hårdkoda varje bilds url,
      vilket inte är optimalt dels för att listan kan vara lång men också för att innehållet i mappen
      kan förändras = bilder kan tas bort/läggas till. Med import.meta.glob() hämtar den alla bilder dynamiskt.*/
    const imageObject = import.meta.glob(
      '/src/assets/inspoimages/*.{jpg,png,webp}'
    )

    images.value = await Promise.all(
      /* Object.entries(imageModules) gör om objektet av bilder till en array per bild med nyckel & värde:
        Ungefär såhär ser det ut bakom spakarna efter denna funktion:
        ["/src/assets/inspoimages/image1.jpg", () => import("/src/assets/inspoimages/image1.jpg")]
        När vi importerar en bild med import(), returneras ett modul-objekt som innehåller bildens URL under namnet "default".*/
      Object.entries(imageObject).map(async ([path, importUrl], index) => {
        const urls = await importUrl()
        return {
          id: index + 1,
          url: urls.default
        }
      })
    )
  })
</script>

<template>
  <div class="image-carousel-wrapper">
    <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="Gallery Image" class="gallery-image" />
      </Slide>
    </Carousel>

    <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
      <Slide v-for="image in images" :key="image.id">
        <template #default="{ currentIndex, isActive }">
          <div
            :class="['thumbnail', { 'is-active': isActive }]"
            @click="slideTo(currentIndex)"
          >
            <img
              :src="image.url"
              alt="Thumbnail Image"
              class="thumbnail-image"
            />
          </div>
        </template>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
  .image-carousel-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 550px;
    height: 70%;
    margin-bottom: 4rem;
  }
  .carousel {
    --vc-nav-background: rgba(255, 255, 255, 0.7);
    --vc-nav-border-radius: 100%;
    &#gallery {
      height: 450px;
    }
  }

  img {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gallery-image {
    border-radius: 16px;
  }

  #thumbnails {
    margin-top: 10px;
  }

  .thumbnail {
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s ease-in-out;
  }

  .thumbnail.is-active,
  .thumbnail:hover {
    opacity: 1;
  }
</style>
