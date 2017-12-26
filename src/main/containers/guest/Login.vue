<template>
  <div>
    <div>Login</div>
    <v-btn color="primary" @click="login">Zaloguj</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async login() {
      await this.$store.dispatch('authenticate', { username: 'test', password: '1234' }); // Użyj danych z formularza
      return this.$router.push({ name: 'main' });
    }
  }
};
</script>
