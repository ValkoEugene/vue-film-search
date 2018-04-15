import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Ключ дял запросов к OMDB API
    apikey: 'f04f5d57',

    // Строка поиска по заголовку
    searchTitle: '',

    // ID выбранного фильма
    selectedFilmId: ''
  },
  mutations: {
    // Установить строку поиска по заголовку
    setSearchTitle (state, title) {
      state.searchTitle = title
    },

    // Установить ID выбранного фильма
    setSelectedFilmId (state, id) {
      state.selectedFilmId = id
    }
  }
})
