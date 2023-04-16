<template>
    <v-sheet width="300" class="mx-auto mt-7">
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="email" label="new email" :rules="emailRules"></v-text-field>
            <v-text-field v-model="password" label="password" type="password" :rules="passwordRules"></v-text-field>
            <v-text-field v-model="password" label="confirm password" type="password" :rules="passwordRules"></v-text-field>
            <v-btn type="submit" block class="mt-2">submit</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        email: '',
        emailRules: [
            value => {
                if (value?.length > 3) return true

                return 'email must be at least 3 characters.'
            },
        ],
        password: '',
        passwordRules: [
            value => {
                if (/[^0-9]/.test(value)) return true
                
                return 'password can not contain digits.'
            },
        ],
    }),
}
</script>