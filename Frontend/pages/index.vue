<template>
  <div>
    <div class="content_wrapper">
      <div v-if="todos.length === 0">
        <p>하단의 To Do를 입력해보세요.</p>
      </div>
      <div v-else>
        <v-card v-if="todos.length > 0">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <div v-for="(todoObj, i) in todos" :key="`${i}-${todoObj.content}`">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="todoObj.status" :color="todoObj.status==1 && 'grey' || 'primary'">
                    <template v-slot:label>
                      <div :style="{ textDecoration: todoObj.status == 1 ? 'line-through' : 'none' }" class="ms-4"
                        v-text="todoObj.content">
                      </div>
                    </template>
                  </v-checkbox>
                </v-list-item-action>
                <v-spacer></v-spacer>
                <v-scroll-x-transition>
                  <v-icon v-if="todoObj.status==1" color="success">
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
      <v-btn v-if="!this.$auth.loggedIn" color="red" to="/login" fab dark small fixed
        :style="{ right: 'calc(50% - 200px)', bottom: '150px' }">
        <v-icon>mdi-account-key</v-icon>
      </v-btn>
      <v-btn v-if="this.$auth.loggedIn" color="green" fab dark small fixed
        :style="{ right: 'calc(50% - 200px)', bottom: '150px' }" @click="logout()">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-fab-transition>
    <div class="input_wrapper">
      <TodoInput ref="TodoInput" />
    </div>
  </div>
</template>

<script>
import TodoInput from '~/components/TodoInput.vue';
import axios from 'axios';
export default {
  
  async asyncData({ app }) {
    try {
      if (app.$auth.loggedIn) {
        const response = await axios.get('http://localhost:3001/todos', {
          headers: {
            Authorization: `${app.$auth.getToken('local')}`,
          },
        });
        return { todos: response.data.data };
      }
      return { todos: [] };
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      return { todos: [] };
    }
  },
  components: {
    TodoInput,
  },
  data: () => ({
    todos: [],
  }),
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$root.$emit('showSnackbar', '로그아웃되었습니다.', 'blue', 5000);
        this.$router.go(); // 리로드
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    },
  },
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