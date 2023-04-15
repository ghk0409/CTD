<template>
  <div>
    <div class="content_wrapper">
      <div v-if="todos.length === 0">
        <p>하단의 To Do를 입력해보세요.</p>
      </div>
      <div v-else>
        <v-card v-if="todos.length > 0">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <div v-for="(todoObj, i) in todos" :key="`${i}-${todoObj.todo}`">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="todoObj.isDone" :color="todoObj.isDone && 'grey' || 'primary'">
                    <template v-slot:label>
                      <div :style="{ textDecoration: todoObj.isDone ? 'line-through' : 'none' }" class="ms-4"
                        v-text="todoObj.todo">
                      </div>
                    </template>
                  </v-checkbox>
                </v-list-item-action>

                <v-spacer></v-spacer>

                <v-scroll-x-transition>
                  <v-icon v-if="todoObj.isDone" color="success">
                    mdi-check
                  </v-icon>
                </v-scroll-x-transition>
              </v-list-item>
            </div>
          </v-slide-y-transition>
        </v-card>
      </div>
    </div>
    <v-fab-transition>
      <v-btn color="red" fab dark small absolute bottom right>
        <v-icon>mdi-account-key</v-icon>
      </v-btn>
    </v-fab-transition>
    <div class="input_wrapper">
      <TodoInput ref="TodoInput" />
    </div>
  </div>
</template>

<script lang="ts">
import TodoInput from '~/components/TodoInput.vue';

export default {
  components: {
    TodoInput,
  },
  data: () => ({
    todos: [],
  }),
};
</script>

<style scoped lang="scss">
.content_wrapper {
  padding-bottom: 10vh;
  padding-top: 1vh;
  padding-left: 5vh;
  padding-right: 5vh;
}

.input_wrapper {
  width: 450px;
  position: fixed;
  bottom: 0.6vh;
  transform: translateY(-25%);
  z-index: 1;
}

p {
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
  color: rgba(22, 22, 22, 0.6);
}
</style>