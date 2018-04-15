<template>
  <div class="modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ film.Title }}</h5>
          <button type="button" class="close" @click="unsetFilmId">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div v-if="loading">
            Загрузка...
          </div>

          <div class="container" v-else>
            <div class="row">
              <div class="col-4" :style="{ background: posterBackgroundStyle }" />

              <div class="col-8">
                <p>
                  Plot: {{ film.Plot }}
                </p>

                <p>
                  Country: {{ film.Country }}
                </p>

                <p>
                  Actors: {{ film.Actors }}
                </p>

                <p>
                  Imdb rating: {{ film.imdbRating }}
                </p>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="unsetFilmId">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import alertify from 'alertifyjs'

export default {
  name: 'FilmInfo',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    // Флаг загрузки
    loading: true,

    // Информация о фильме
    film: {},

    // URL картинки если нет постера
    nocontentUrl: 'https://aldebaran.ru/static/aldebaran/i/no-content.png'
  }),
  computed: {
    // Ключ дял запросов к OMDB API
    apikey () {
      return this.$store.state.apikey
    },

    // URL для работы с www.omdbapi.com
    omdbUrl () {
      return `http://www.omdbapi.com/?apikey=${this.apikey}`
    },

    // Url на получение информации о фильме
    filmUrl () {
      return `${this.omdbUrl}&i=${this.id}`
    },

    // URL постера
    posterUrl () {
      return this.film.Poster !== 'N/A' ? this.film.Poster : this.nocontentUrl
    },

    // Стилизация фона с постером
    posterBackgroundStyle () {
      return `url(${this.posterUrl}) center center / cover no-repeat`
    }
  },
  mounted () {
    this.getFilmInfo()
  },
  methods: {
    // Сбросить id выбранного фильма
    unsetFilmId () {
      this.$store.commit('setSelectedFilmId', '')
    },

    // Получить информацию о фильме
    getFilmInfo () {
      this.loading = true

      axios
        .get(this.filmUrl)
        .then(({ data }) => (this.film = data))
        .then(() => (this.loading = false))
        .catch(error => alertify.error(`Cannot get film: ${error}`).dismissOthers())
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>
