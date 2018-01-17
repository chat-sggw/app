<template>
<div class="user-side">
  <v-toolbar dark>
    <v-menu offset-y>
      <v-btn icon slot="activator" dark>
        <v-icon>settings</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>{{ username }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-title>Wyloguj</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-toolbar-title>Kontakty</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon dark>message</v-icon>
  </v-toolbar>

  <div class="friends-list">
    <v-list subheader>
      <v-subheader>{{ conversationGroupTitle }}</v-subheader>
      <v-list-tile avatar v-for="friend in conversations" v-bind:key="friend.friendId" :to="{ name: 'conversation', params: { id: friend.conversationId } }">
        <v-list-tile-avatar>
          <img v-bind:src="friend.avatar"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="friend.userName"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>

  <v-card tile>
    <v-bottom-nav absolute :value="true" :active.sync="activeList" color="primary">
      <v-btn flat dark value="recent">
        <span>Ostatnie</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat dark value="friends">
        <span>Znajomi</span>
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn flat dark value="groups">
        <span>Grupy</span>
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn flat dark value="nearby">
        <span>W pobliżu</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeList: 'friends'
    };
  },
  computed: {
    conversationGroupTitle() {
      switch (this.activeList) {
        case 'recent': return 'Ostatnie konwersacje';
        case 'friends': return 'Znajomi';
        case 'groups': return 'Konwersacje grupowe';
        case 'nearby': return 'Osoby w zasięgu';
        default: return '';
      }
    },
    conversations() {
      if (this.activeList === 'friends') {
        return this.$store.state.contacts;
      }
      return [];
    },
    username() {
      return this.$store.state.userName;
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="scss" scoped>
.application .theme--dark.toolbar {
  background-color: #2F7D32;
}

.user-side {
  display: flex;
  flex-direction: column;
}

.friends-list {
  flex: 1;
  background: white;
}

.bottom-nav {
  box-shadow: 0 !important;
}
</style>


