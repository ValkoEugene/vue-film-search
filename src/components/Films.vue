<template>
  <div
    class="main-content"
    :class="{'align-items-stretch': haveFilms}"
    @scroll.passive="loadNextPage"
    ref="content"
  >
    <h1 v-if="!haveFilms">Нет элементов</h1>

    <template v-else>
      <film-card
        v-for="film in films"
        :key="film.imdbID"
        :poster="film.Poster"
        :title="film.Title"
        :type="film.Type"
        :year="film.Year"
        :id="film.imdbID"
      />
    </template>

    <preloader v-if="loading" :class="preloaderWidth"/>
  </div>
</template>

<script>
import FilmCard from './FilmCard'
import Preloader from './Preloader'

export default {
  name: 'Films',
  components: {
    'film-card': FilmCard,
    'preloader': Preloader
  },
  props: {
    // Список фильмов
    films: {
      type: Array,
      default: () => []
    },

    // Флаг загрузки
    loading: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({

  }),
  computed: {
    // Флаг наличия фильмов
    haveFilms () {
      return !!(this.films.length > 0 || this.loading === true)
    },

    // Количество фильмов
    filmsAmount () {
      return this.films.length
    },

    // Класс определяющий длину preloader
    preloaderWidth () {
      switch (this.filmsAmount % 3) {
        case 0:
          return 'w-75'
        case 1:
          return 'w-50'
        case 2:
          return 'w-25'
      }
    }
  },
  methods: {
    // Загрузить
    loadNextPage () {
      this.$nextTick(() => {
        if (this.loading) {
          return
        }

        const content = this.$refs.content

        // Не загружаем если до конца страницы больше 200px
        if (!(content.scrollHeight - content.scrollTop - 200 < content.offsetHeight)) {
          return
        }

        this.$emit('loadNextPage')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

.main-content {
  @extend .d-flex;
  @extend .align-items-center;
  @extend .flex-wrap;
  @extend .justify-content-center;
  @extend .container-fluid;
  @extend .bg-light;

  margin-top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
