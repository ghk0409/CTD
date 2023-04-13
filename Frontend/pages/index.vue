<template>
  <div>
    <div class="content_wrapper">
      
      <h3>작업 진행중, Loading</h3>
    </div>
    <div class="input_wrapper">
      <TextField />
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style scoped>
.content_wrapper {
  padding-bottom: 10vh;
}

.input_wrapper {
  width: 450px;
  position: fixed;
  bottom: 0.6vh;
  transform: translateY(-25%);
  z-index: 1;
}
</style>