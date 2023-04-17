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
    }),
    methods: {
        showMessage(msg, color,duration = 3000) {
            this.snackbarMessage = msg;
            this.btnColor = color;
            this.snackbar = true;
            setTimeout(() => {
                this.snackbar = false;
            }, duration);
        },
    },
};
</script>
