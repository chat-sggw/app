<template>
<div class="messages-side">
  <v-toolbar dark color="primary">
    <v-toolbar-title>Messages</v-toolbar-title>
  </v-toolbar>
  <MessagesList :messages="messages" class="messages-list"></MessagesList>
  <SendMessage :conversationId="conversationId"></SendMessage>
</div>
</template>

<script>
import MessagesList from '../../components/MessagesList';
import SendMessage from '../../components/SendMessage';

export default {
  data() {
    return {
      conversationId: null
    };
  },
  created() {
    this.conversationId = this.$route.params.id;
    this.fetchConversations();
  },
  computed: {
    messages() {
      return this.$store.getters.getConversationById(this.conversationId);
    }
  },
  watch: {
    $route(to) {
      this.conversationId = to.params.id;
      this.fetchConversations();
    }
  },
  methods: {
    fetchConversations() {
      return this.$store.dispatch('fetchConversation', { conversationId: this.conversationId });
    }
  },
  components: {
    MessagesList,
    SendMessage
  }
};
</script>

<style lang="scss" scoped>
.messages-side {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.messages-list {
  flex: 1;
  overflow: auto;
}
</style>

