<template>
  <div class="layout_wrapper">
    <v-app>
      <Navigation />
      <CtdLoGo />
      <v-main>
        <SnackBar ref="snackbar" />
        <v-fade-transition>
          <Nuxt />
        </v-fade-transition>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import SnackBar from '@/components/SnackBar.vue';
export default {
  components: {
    SnackBar,
  },
  mounted() {
    // 스낵바 전역 설정 
    this.$root.$on('showSnackbar', (msg, color, duration) => {
      this.$refs.snackbar.showMessage(msg, color, duration);
    });
  },
};
</script>
<style scoped></style>