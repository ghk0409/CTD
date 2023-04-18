<template>
    <v-sheet width="300" class="mx-auto mt-7">
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="email" label="email" :rules="emailRules"></v-text-field>
            <v-text-field v-model="password" label="password" type="password" :rules="passwordRules"></v-text-field>
            <v-btn type="submit" block class="mt-2">Log in</v-btn>
            <v-btn block class="mt-3" to="/signup">Sign up</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        email: '',
        emailRules: [
            value => {
                if (value?.length > 0) return true
                return '이메일을 입력해주세요.'
            },
        ],
        password: '',
        passwordRules: [
            value => {
                if (value?.length > 0) return true
                return '비밀번호를 입력해주세요.'
            },
        ],
    }),
}
</script>