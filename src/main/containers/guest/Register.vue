<template>

  <div class="user-modal-container">
    <v-form class="form-register" ref="form">
      <v-layout row v-if="error">
        <v-flex>
          <app-alert @dismissed="onDismissed" :text="error" />
        </v-flex>
      </v-layout>

      <v-layout row justify-space-around>
        <v-flex>
          <v-text-field
                  name="login"
                  label="Login"
                  id="login"
                  v-model="username"
          />
        </v-flex>
      </v-layout>

      <v-layout row justify-space-around>
        <v-flex>
          <v-text-field
                  name="email"
                  label="E-mail"
                  v-model="email"
          />
        </v-flex>
      </v-layout>

      <v-layout row justify-space-around>
        <v-flex>
          <v-text-field
                  name="input"
                  label="Hasło"
                  hint="Przynajmniej 6 znaków w tym znaki specjalne"
                  v-model="password"
                  min="6"
                  :append-icon="hiddenPassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (hiddenPassword = !hiddenPassword)"
                  :type="hiddenPassword ? 'password' : 'text'"
                  counter
          />
        </v-flex>
      </v-layout >

      <v-flex class="text-xs-center">
        <v-btn class="button-submit" dark color="accent" @click="register">
          Zarejestruj
        </v-btn>
        <div>
          <v-layout row  justify-space-around>
            <v-btn flat @click="signin">
              Logowanie
            </v-btn>
          </v-layout>

        </div>
      </v-flex>

    </v-form>
  </div>

</template>


<script>
import ErrorAlert from '../../components/ErrorAlert';

export default {
  data() {
    return {
      hiddenPassword: true,
      email: null,
      username: null,
      password: null
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  methods: {
    register() {
      return this.$store.dispatch('register', {
        username: this.username,
        password: this.password,
        email: this.email
      })
        .then(() => this.$router.push({ name: 'login' }))
        .catch(e => console.error(e));
    },
    signin() {
      return this.$router.push({ name: 'login' });
    },
    onDismissed() {
      this.$store.commit('clearError');
    }
  },
  components: {
    'app-alert': ErrorAlert
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

  .user-modal-container .form-register {
    align-items: center;
    /*width: 55%;*/
    max-width: 400px;
    margin: auto;
    position: relative;
    padding: 25px 25px 25px 25px;
    cursor: initial;
  }

</style>
