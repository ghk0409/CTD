<template>
    <div class="content_wrapper">
        <v-card class="mx-auto" max-width="300" tile>
            <v-list dense flat>
                <v-list-item-group v-model="selectedItem" color="black">
                    <v-list-item v-for="(item, i) in items" :key="i" @click="itemAction(item)">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>
<script>
export default {
    middleware: 'auth',
    data: () => ({
        selectedItem: 0,
        items: [
            { text: '로그아웃', icon: 'mdi-account-lock-open', },
        ],
    }),
    methods: {
        itemAction(item) {
            if (item.text === '로그아웃') {
                this.logout();
            }
        },
        async logout() {
            try {
                await this.$auth.logout();
                this.$root.$emit('showSnackbar', '로그아웃되었습니다.', 'blue', 5000);
                this.$router.push('/');
            } catch (error) {
                console.error('로그아웃 실패:', error);
            }
        },
    }
}
</script>
<style scoped>
.content_wrapper {
    padding-bottom: 10vh;
    padding-top: 5vh;
    padding-left: 5vh;
    padding-right: 5vh;
}
</style>