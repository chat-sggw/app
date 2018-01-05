<template>
  <v-app>
    <main>
      <v-content>
        <div>
          Logged in :)
        </div>
        <v-btn color="primary" @click="logout">Testowe wylogowanie</v-btn>
        <v-btn flat color="orange" @click="() => fetchContacts()">Pobierz kontakty</v-btn>
        <v-btn flat color="orange" @click="() => fetchConversation()">Pobierz rozmowy</v-btn>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    logout() {
      return this.$store.dispatch('logout');
    },
    ...mapActions([
      'changeCounter',
      'fetchContacts',
      'fetchConversation'
    ])
  }
};
</script>

<style lang="scss" scoped>
  nav.toolbar {
    -webkit-app-region: drag;
    button {
      -webkit-app-region: no-drag;
    }
  }
</style>
