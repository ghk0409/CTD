<template>
    <v-card class="fill-height">
        <v-card-title>
            <span class="text-h5">AI Advice for you</span>
        </v-card-title>
        <v-card-text>
            <template v-if="coachingContent">
                {{ coachingContent }}
                <!-- <div v-html="formattedcoachingContent"></div> -->
            </template>
            <template v-else>
                시간이 10초 정도 소요됩니다. 잠시만 기다려주세요.
            </template>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    middleware: 'auth',
    data() {
        return {
            coachingContent: '',
        };
    },
    computed: {
        formattedcoachingContent() {
            return this.coachingContent.replace(/(\d+)\.\s/g, '$&<br>');
            
        },
    },
    async mounted() {
        try {
            const response = await this.$axios.$post('/ai/claude');
            this.coachingContent = response.data.claude;
        } catch (error) {
            console.error(error);
            this.$root.$emit('showSnackbar', '네트워크 에러가 발생했습니다. 다시 시도해주세요.', 'red', 5000);
        }
    },
}
</script>