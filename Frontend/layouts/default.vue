<template>
  <div class="layout_wrapper">
    <div class="app">
      <CtdLoGo/>
      <div class="nuxt_wrapper">
        <Nuxt />
      </div>
      <Navigation />
    </div>
  </div>
  
</template>
<script lang="ts">
</script>
<style scoped>
.layout_wrapper {
  min-height: 100vh;
}
.nuxt_wrapper {
  padding-bottom: 56px;
  min-height: 92vh;
  /* Adjust this value based on the height of your v-bottom-navigation */
}
</style>