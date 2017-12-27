<template>
  <form id="myForm" method="post" action="skrypt_przetwarzajacy.php">

    <v-layout row  justify-space-around>
    <v-flex xs8>
      <v-text-field
        name="login"
        label="Login"
        id="login"
      ></v-text-field>
    </v-flex>
    </v-layout>

    <v-layout row  justify-space-around>
    <v-flex xs8>
      <v-text-field
        name="email"
        label="E-mail"
      ></v-text-field>
    </v-flex>
    </v-layout>
    <v-layout row  justify-space-around>
    <v-flex xs8 >
      <v-text-field
        name="input-10-1"
        label="Hasło"
        hint="At least 8 characters"
        v-model="password"
        min="8"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
        counter
      ></v-text-field>
    </v-flex>
    </v-layout>

    <v-layout row  justify-space-around>
      <v-btn color="primary" @click="rejestruj">Zarejestruj</v-btn>
    </v-layout>
    <v-layout row  justify-space-around>
      <v-subheader @click="logowanie" class="black--text text--lighten-1">Logowanie</v-subheader>
    </v-layout>

  </form>

</template>

<script>
  export default {
    data() {
      return {
        e1: false,
        e2: false,
        e3: false,
        e4: false
      };
    }


  };
</script>


