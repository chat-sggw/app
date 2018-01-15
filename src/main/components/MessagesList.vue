<template>
<v-container
  fluid
  style="min-height: 0;"
  grid-list-lg
>
  <v-layout row wrap>
    <v-flex xs12 v-for="message of messages" v-bind:key="message.id" :message="message">
      <v-card v-if="isMine(message.authorId)" color="primary" class="white--text">
        <v-card-title>
          {{ message.text }}
        </v-card-title>
      </v-card>
      <v-card v-else color="grey lighten-2">
        <v-card-title>
          {{ message.text }}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  props: ['messages'],
  methods: {
    isMine(authorId) {
      return this.$store.getters.isMe(authorId);
    }
  }
};
</script>
