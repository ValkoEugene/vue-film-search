<!-- Navbar с вводом названия фильмов -->

<template>
  <div>
    <nav class="navbar">
      <h1 class="navbar-brand text-light">Search films</h1>

        <form class="form-inline w-50">
          <input
            class="form-control w-75"
            type="search"
            placeholder="..."
            aria-label="Search"
            v-model="filmTitle"
            @keyup.enter="search"
          >
          <button
            class="btn btn-success ml-2"
            type="button"
            :disabled="!isValid"
            @click="search"
          >
            Search
          </button>
        </form>
    </nav>
  </div>
</template>

<script>
import alertify from 'alertifyjs'

export default {
  name: 'Navbar',
  data: () => ({
    // Название фильма
    filmTitle: '',

    // Флаг валидации
    isValid: false
  }),
  methods: {
    // Отправляем событие с названием фильма
    search () {
      this.$store.commit('setSearchTitle', this.filmTitle)
    },

    // Валидация названия (только англ. буквы и символы)
    validate (value) {
      if (!value) {
        this.isValid = false
        return
      }

      const filter = /[^a-zA-z0-9_+\-!?&%#:()= ]/

      this.isValid = !filter.test(value)

      if (!this.isValid) {
        alertify.error('Only english characters allowed!').dismissOthers()
      }
    }
  },
  watch: {
    filmTitle: 'validate'
  }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

.navbar {
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  @extend .navbar-expand-lg;
  @extend .bg-primary;
  @extend .d-flex;
  @extend .justify-content-between;
  @extend .navbar-light;
}
</style>
