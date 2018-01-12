<template>

  <div class="user-modal-container">
    <v-form class="form-register" ref="form">
      <v-layout row v-if="error">
        <v-flex>
          <app-alert @dismissed="onDismissed" :text="error" />
        </v-flex>
      </v-layout>

      <v-layout row  justify-space-around>
        <v-flex>
          <v-text-field
                  name="login"
                  label="Login"
                  id="login"
          />
        </v-flex>
      </v-layout>

      <v-layout row  justify-space-around>
        <v-flex>
          <v-text-field
                  name="email"
                  label="E-mail"
          />
        </v-flex>
      </v-layout>

      <v-layout row  justify-space-around>
        <v-flex>
          <v-text-field
                  name="input"
                  label="Hasło"
                  hint="At least 8 characters"
                  v-model="password"
                  min="8"
                  :append-icon="visibility ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visibility = !visibility)"
                  :type="visibility ? 'password' : 'text'"
                  counter
          />
        </v-flex>
      </v-layout >

      <v-flex class="text-xs-center">
        <v-btn class="button-submit" color="accent" @click="register">
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
    export default {
      data() {
        return {
          visibility: false
        };
      },
      computed: {
        error() {
          return this.$store.getters.error;
        }
      },
      methods: {
        signin() {
          return this.$router.push({ name: 'login' });
        },
        onDismissed() {
          this.$store.commit('clearError');
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

  .user-modal-container .form-register {
    align-items: center;
    /*width: 55%;*/
    max-width: 400px;
    margin: auto;
    position: relative;
    padding: 25px 25px 25px 25px;
    cursor: initial;
  }

  .user-modal-container .form-register button {
    text-transform: capitalize;
  }

  .user-modal-container .form-register .button-submit {
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
