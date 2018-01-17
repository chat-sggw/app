<template>
  <v-app>
    <main class="app">
      <UserSide class="user"></UserSide>
      <MessageSide v-if="$route.params.id" class="message"></MessageSide>
      <div v-else class="message">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Wybierz konwersację</v-toolbar-title>
        </v-toolbar>
      </div>
    </main>
  </v-app>
</template>

<script>
import UserSide from './UserSide';
import MessageSide from './MessageSide';

export default {
  data() {
    return {
      geoLocationGetterIntervalId: null
    };
  },
  created() {
    this.$store.dispatch('fetchLocation');
    this.geoLocationGetterIntervalId = window.setInterval(() => this.$store.dispatch('fetchLocation'), 10000);
  },
  destroyed() {
    window.clearInterval(this.geoLocationGetterIntervalId);
  },
  components: {
    UserSide,
    MessageSide
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

  .app {
    display: flex;
    align-items: stretch;
  }

  .user {
    width: 350px;
  }

  .message {
    flex: 1;
  }
</style>
