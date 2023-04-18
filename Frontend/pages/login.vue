<template>
    <v-sheet width="300" class="mx-auto mt-7">
        <v-form fast-fail ref="loginForm" @submit.prevent="onLogin">
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
            value => !!value || '이메일을 입력해주세요.',
            value => /^.+@.+\..{2,}$/.test(value) || '이메일이 올바른 형식이 아닙니다.',
        ],
        password: '',
        passwordRules: [
            value => !!value || '비밀번호를 입력해주세요.',
        ],
    }),
    methods: {
        async onLogin() {
            if (this.$refs.loginForm.validate()) {
                try {
                    const response = await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password,
                        },
                    })
                    if (response.data.ok === true) {

                        this.$root.$emit('showSnackbar', '로그인되었습니다.', 'blue', 5000);
                    } else {
                        this.$root.$emit('showSnackbar', '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.', 'red', 5000);
                    }
                } catch (error) {
                    if (error.response) {
                        this.$root.$emit('showSnackbar', '로그인에 실패했습니다. 다시 시도해주세요.', 'red', 5000);
                    } else {
                        this.$root.$emit('showSnackbar', '네트워크 에러가 발생했습니다. 다시 시도해주세요.', 'red', 5000);
                    }
                }
            }
        },
    },
}
</script>