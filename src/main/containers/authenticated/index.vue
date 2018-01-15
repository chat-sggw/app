<template>
  <v-app>
    <main class="app">
      <UserSide class="user"></UserSide>
      <MessageSide class="message"></MessageSide>
    </main>
  </v-app>
</template>

<script>
import UserSide from './UserSide';
import MessageSide from './MessageSide';
import * as backgroundService from '../../services/background.service';

export default {
  created() {
    backgroundService.init();
  },
  destroyed() {
    backgroundService.stop();
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
