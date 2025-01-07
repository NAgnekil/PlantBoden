Vue.createApp({
  data() {
    return { message: 'Hej hej' }
  },
  methods: {
    onClick() {
      this.message = 'Hej då'
    }
  }
}).mount('#app')
