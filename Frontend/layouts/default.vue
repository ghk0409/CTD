<template>
  <div class="layout_wrapper">
    <v-app>
      <Navigation />
      <CtdLoGo />
      <v-main>
        <v-fade-transition>
          <Nuxt />
        </v-fade-transition>
      </v-main>
    </v-app>
  </div>
</template>
<script lang="ts">
</script>
<style scoped></style>