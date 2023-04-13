<template>
  <div>
    <div class="content_wrapper">
      <div v-if="todos.length === 0">
        <ImgSlider/>
      </div>
      <ul v-else>
        <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
      </ul>
    </div>
    <div class="input_wrapper">
      <TextField ref="TextField"/>
    </div>
  </div>
</template>

<script lang="ts">
import TextField from '@/components/TextField.vue';

export default {
  components: {
    TextField,
  },
  data: () => ({
    todos: [],
  }),
};
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