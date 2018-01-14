<template>
  <div class="user-modal-container">
    <v-form class="form-login" ref="form">
      <v-layout row v-if="error">
        <v-flex>
          <app-alert @dismissed="onDismissed" :text="error"></app-alert>
        </v-flex>
      </v-layout>
      <v-text-field label="Login" v-model="username"></v-text-field>
      <v-text-field label="Hasło" type="password" v-model="password"></v-text-field>
      <v-flex class="text-xs-center">
        <v-btn class="button-submit" dark color="accent" @click="login">
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
import ErrorAlert from '../../components/ErrorAlert';

export default {
  data() {
    return {
      valid: true,
      username: 'Test1',
      password: '1qaz@WSX',
      select: null,
      checkbox: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  methods: {
    async login() {
      const isUser = await this.$store.dispatch('authenticate', { username: this.username, password: this.password });

      if (isUser) {
        return this.$router.push({ name: 'main' });
      }
      return null;
    },
    signup() {
      return this.$router.push({ name: 'register' });
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

  .user-modal-container .form-login {
    align-items: center;
    /*width: 55%;*/
    max-width: 400px;
    margin: auto;
    position: relative;
    padding: 25px 25px 25px 25px;
    cursor: initial;
  }

</style>
