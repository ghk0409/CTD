<template>
  <div class="layout_wrapper">
    <div class="app">
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">

</script>
<style>

.layout_wrapper{
  background: #232526E6; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #232526E6, #414345E6);
  background: linear-gradient(to right, #232526E6, #414345E6);
}
.app {
  max-width: 450px;
  margin: 0 auto;
  background-color: rgb(255, 255, 252);
}
</style>