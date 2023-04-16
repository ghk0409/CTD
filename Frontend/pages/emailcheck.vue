<template>
    <v-sheet width="300" class="mx-auto mt-10">
        <h3 class="text-center">계정님 환영합니다.</h3>
        <p class="text-center mt-8">회원 승인을 위해 하단 버튼을 클릭해주세요.</p>
        <p class="text-center mt-3">CTD를 이용해주셔서 감사합니다.</p>
        <v-form @submit.prevent class="mt-8">
            <v-btn type="submit" block class="mt-2">CONFIRM</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
</script>