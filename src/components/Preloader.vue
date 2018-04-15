<template>
  <div class="m-1 preloader_wrapper">
    <div>
      <span class="preloader"/>
      <h5>{{ title }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    // Текст дл preloader
    title: {
      type: String,
      default: 'Загрузка...'
    }
  }
}
</script>

<style scoped>
.preloader_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preloader {
  display: block;
  margin: auto;
  width: 50px;
  height: 50px;
  border: 2px #595555 solid;
  border-radius: 50%;
  border-right: 2px #9E9E9E solid;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  form {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
