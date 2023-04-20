<template>
    <v-form>
        <v-container>
            <v-text-field v-model="todo" :append-outer-icon="'mdi-plus'" :prepend-icon="icon" filled
                clear-icon="mdi-close-circle" clearable label="To Do" type="text" color="rgb(22,22,22)"
                @click:append-outer="sendTodo" @click:prepend="changeIcon" @click:clear="clearTodo"
                @keydown.enter.prevent="sendTodo"></v-text-field>
        </v-container>
    </v-form>
</template>
  
<script>
import axios from 'axios';

export default {    
    data: () => ({
        todo: '',
        isDone: 0,
        iconIndex: 0,
        icons: [
            'mdi-emoticon',
            'mdi-emoticon-cool',
            'mdi-emoticon-dead',
            'mdi-emoticon-excited',
            'mdi-emoticon-happy',
            'mdi-emoticon-neutral',
            'mdi-emoticon-sad',
            'mdi-emoticon-tongue',
        ],
    }),

    computed: {
        icon() {
            return this.icons[this.iconIndex]
        },
    },

    methods: {
        async sendTodo() {
            try {
                if (this.$root.$auth.loggedIn) {
                    const response = await axios.post('http://localhost:3001/todos', {
                        content: this.todo,
                        feel: this.iconIndex,
                    }, {
                        headers: {
                            Authorization: `${this.$root.$auth.getToken('local')}`,
                        },
                    });
                    
                    this.$parent.$data.todos.push({
                        content: this.todo,
                        feel: this.iconIndex,
                        status: this.isDone,
                    });

                    this.resetIcon();
                    this.clearTodo();
                } else {
                    console.log("로그인이 필요합니다.");
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        },
        clearTodo() {
            this.resetIcon()
            this.todo = ''
        },
        resetIcon() {
            this.iconIndex = 0
        },
        changeIcon() {
            this.iconIndex === this.icons.length - 1
                ? this.iconIndex = 0
                : this.iconIndex++
        },
    },
}
</script>
<style scoped></style>