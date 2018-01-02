<template>
  <div class="user-modal-container">
    <v-form class="form-login">
      <v-text-field label="Login"
                    v-model="username"
      ></v-text-field>
      <v-text-field label="Hasło"
                    type="password"
                    v-model="password"
      ></v-text-field>
      <v-checkbox
                  label="Zapamiętaj mnie"
                  v-model="checkbox"
      ></v-checkbox>
      <v-flex class="text-xs-center">
        <v-btn class="button-submit" color="accent" @click="login" :disabled="!valid">
          Zaloguj
        </v-btn>
        <div>
          <v-btn flat @click="signup">
            Rejestracja
          </v-btn>
        </div>
      </v-flex>
    </v-form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      username: '',
      password: '',
      select: null,
      checkbox: false
    }),
    methods: {
      async login() {
        await this.$store.dispatch('authenticate', { username: 'test', password: '1234' }); // Użyj danych z formularza
        return this.$router.push({ name: 'main' });
      },
      signup() {
        return this.$router.push({ name: 'register' });
      }
    }
  };
</script>

<style lang="scss" scoped>

  .user-modal-container {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 3;
    font-size: 14px;
  }

  .user-modal-container .form-login {
    align-items: center;
    width: 55%;
    max-width: 400px;
    margin: auto;
    position: relative;
    padding: 25px 25px 25px 25px;
    cursor: initial;
  }

  .user-modal-container .form-login button {
    text-transform: capitalize;
  }

  .user-modal-container .form-login .button-submit {
    background-color: #0d47a1;
    color: white;
    width: auto;
    height: auto;
    min-width: 150px;
    max-height: 30px;
    min-height: 25px;
    margin-bottom: 30px;
  }

</style>
