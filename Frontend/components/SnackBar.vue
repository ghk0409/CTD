<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar">
            {{ snackbarMessage }}
            <template v-slot:action="{ attrs }">
                <v-btn :color="btnColor" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        snackbar: false,
        btnColor: "pink",
        snackbarMessage: "",
        timerId: null,
    }),
    methods: {
        showMessage(msg, color, duration = 3000) {
            // 이전 타이머를 취소
            if (this.timerId) {
                clearTimeout(this.timerId);
            }

            this.snackbarMessage = msg;
            this.btnColor = color;
            this.snackbar = true;
            // 타이머 아이디 설정
            this.timerId = setTimeout(() => {
                this.snackbar = false;
                this.timerId = null; // 초기화
            }, duration);
        },
    },
};
</script>
