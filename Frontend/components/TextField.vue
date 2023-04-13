<template>
    <v-form>
        <v-container>
            <v-text-field v-model="message" :append-outer-icon="'mdi-plus'" :prepend-icon="icon" filled
                clear-icon="mdi-close-circle" clearable label="To Do" type="text" color="rgb(22,22,22)"
                @click:append-outer="sendMessage" @click:prepend="changeIcon" @click:clear="clearMessage"></v-text-field>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">
export default {
    data: () => ({
        message: '',
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
        sendMessage() {
            this.resetIcon()
            this.clearMessage()
        },
        clearMessage() {
            this.resetIcon()
            this.message = ''
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