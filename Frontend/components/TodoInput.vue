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
export default {
    data: () => ({
        todo: '',
        isDone :'',
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
        sendTodo() {
            this.$parent.$data.todos.push({
                todo : this.todo,
                isDone : false
            })
            this.resetIcon()
            this.clearTodo()
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
<style scoped>
</style>