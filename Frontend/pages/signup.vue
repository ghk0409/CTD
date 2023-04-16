<template>
    <v-sheet width="300" class="mx-auto mt-7">
        <v-form fast-fail ref="form" @submit.prevent="submitForm">
            <v-text-field v-model="email" label="new email" :rules="emailRules" required></v-text-field>
            <v-text-field v-model="password" label="password" type="password" :rules="passwordRules"
                required></v-text-field>
            <v-text-field v-model="confirmPassword" label="confirm password" type="password" :rules="confirmPasswordRules"
                required></v-text-field>
            <v-btn type="submit" block class="mt-2">submit</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        email: '',
        emailRules: [
            value => !!value || '이메일을 입력해주세요.',
            value => /.+@.+/.test(value) || '이메일이 올바른 형식이 아닙니다.'
        ],
        password: '',
        passwordRules: [
            value => !!value || '비밀번호를 입력해주세요.',
            value => (value && value.length >= 8) || '비밀번호는 8자 이상으로 구성되어야 합니다.',
            value => /[A-Z]/.test(value) || '비밀번호는 대문자가 포함되어야 합니다.',
            value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || '비밀번호는 특수문자가 포함되어야 합니다.'
        ],
        confirmPassword: '',
    }),
    computed: {
        confirmPasswordRules() {
            return [
                value => !!value || '비밀번호를 입력해주세요.',
                value => value === this.password || '비밀번호가 일치하지 않습니다.'
            ];
        },
    },
    methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          const response = await this.$axios.$post('/users/join', {
            email: this.email,
            password: this.password,
          });
          //완료 후 처리 -> 스낵바 추가 예정
          this.$router.push('/');
        } catch (error) {
          //실패 후 처리 -> 스낵바 추가 예정
          console.error('Signup failed:', error);
        }
      }
    },
  },
}
</script>