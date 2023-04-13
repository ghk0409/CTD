<template>
    <v-bottom-navigation app :elevation="8" grow fixed>
        <v-btn value="home">
            <v-icon>mdi-home</v-icon>
            home
        </v-btn>
        <v-btn value="favorites">
            <v-icon>mdi-heart</v-icon>
            community
        </v-btn>
        <v-btn value="nearby">
            <v-icon>mdi-account-search</v-icon>
            coaching
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
.v-bottom-navigation {
    width: 450px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
}
</style>