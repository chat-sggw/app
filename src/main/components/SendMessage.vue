<template>
  <form @submit.prevent="send" class="input-container primary">
    <v-text-field
      class="text-field"
      name="message-text"
      label="Wiadomość"
      v-model="message"
      single-line
      dark
      hide-details
    ></v-text-field>
    <v-btn flat icon dark @click="send">
      <v-icon>send</v-icon>
    </v-btn>
  </form>
</template>

<script>
export default {
  props: ['conversationId'],
  data() {
    return {
      message: ''
    };
  },
  methods: {
    send() {
      if (this.message) {
        this.$store.dispatch('sendMessage', {
          conversationId: this.conversationId,
          text: this.message
        });
        this.message = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: center;
  padding-left: 1em;
  height: 56px;
}
.text-field {
  margin-top: -18px;
  flex: 1;
}
</style>

