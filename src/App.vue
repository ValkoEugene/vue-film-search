<template>
  <div id="app">
    <navbar />

    <films :films="films" :loading="loading" @loadNextPage="loadFilms" />
    <film-info v-if="id" :id="id"/>
  </div>
</template>

<script>
// Используемые плагины
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.min.css'

import Navbar from './components/Navbar'
import Films from './components/Films'
import FilmInfo from './components/FilmInfo'

import store from './store'

export default {
  name: 'App',
  components: {
    'navbar': Navbar,
    'films': Films,
    'film-info': FilmInfo
  },
  store,
  data: () => ({
    // Список фильмов
    films: [],

    // Страница для пагинации
    page: 0,

    // Флаг является ли страница последней
    lastPage: false,

    // Флаг загрузки
    loading: false
  }),
  computed: {
    // Ключ дял запросов к OMDB API
    apikey () {
      return this.$store.state.apikey
    },

    // Название фильма
    title () {
      return this.$store.state.searchTitle
    },

    // ID выбранного фильма
    id () {
      return this.$store.state.selectedFilmId
    },

    // URL для работы с www.omdbapi.com
    omdbUrl () {
      return `http://www.omdbapi.com/?apikey=${this.apikey}`
    },

    // Url для поиска фильмов
    searchUrl () {
      return `${this.omdbUrl}&s=${this.title}&page=${this.page}`
    }
  },
  watch: {
    title: 'search'
  },
  methods: {
    // Поиск фильмов
    search (title) {
      if (!title) {
        return
      }

      this.page = 0
      this.films = []

      this.loadFilms()
    },

    // Загрузить след. страницу с списком фильмов
    loadFilms () {
      if (this.lastPage) {
        return
      }

      this.loading = true
      ++this.page

      axios.get(this.searchUrl)
        .then(response => response.data)
        .then(({ Search }) => {
          Search ? this.films = [...this.films, ...Search]
            : Promise.reject(new Error('Movie not found!'))
        })
        .then(() => (this.loading = false))
        .catch(error => {
          this.loading = false
          alertify.error(`${error}`).dismissOthers()
        })
    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

.ajs-message.ajs-error.ajs-visible{
  color: white
}

#app {
  overflow: hidden;
}
</style>
