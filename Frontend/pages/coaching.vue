<template>
    <v-card class="fill-height">
        <v-card-title>
            <span class="text-h5">AI Advice for you</span>
        </v-card-title>
        <v-card-text>
            {{ postContent }}
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    middleware: 'auth',
    data() {
        return {
            postContent: '',
        };
    },
    async mounted() {
        try {
            const response = await this.$axios.$post('/ai/claude');
            this.postContent = response.data.claude;
        } catch (error) {
            console.error(error);
        }
    },
}
</script>