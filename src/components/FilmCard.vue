<template>
  <div class="card w-25 m-1">
    <img class="card-img-top" :src="posterUrl" :alt="title">
    <div class="card-body">
      <h5 class="card-title">
        {{ title }}
      </h5>
      <p class="card-text">
        Year: {{ year }}
      </p>
      <p class="card-text">
        Type: {{ type }}
      </p>
      <p class="test3">
        test3
      </p>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-primary" @click="select">
        details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilmCard',
  props: {
    // Постер
    poster: {
      type: String,
      default: ''
    },

    // Название
    title: {
      type: String,
      default: ''
    },

    // Тип
    type: {
      type: String,
      default: ''
    },

    // Год
    year: {
      type: String,
      default: ''
    },

    // ID фильма
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    // URL картинки если нет постера
    nocontentUrl: 'https://aldebaran.ru/static/aldebaran/i/no-content.png'
  }),
  computed: {
    // URL постера
    posterUrl () {
      return this.poster !== 'N/A' ? this.poster : this.nocontentUrl
    }
  },
  methods: {
    // Выбрать фильм
    select () {
      this.$store.commit('setSelectedFilmId', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.w-45{
  width: 45%important;
}
</style>
