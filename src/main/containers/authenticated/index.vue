<template>
  <v-app>
    <main>
      <v-content>
        <div>
          Logged in :)
        </div>
        <v-btn color="primary" @click="logout">Testowe wylogowanie</v-btn>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  methods: {
    logout() {
      return this.$store.dispatch('logout');
    }
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
