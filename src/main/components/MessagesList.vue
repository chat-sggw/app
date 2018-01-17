<template>
<v-container
  fluid
  style="min-height: 0;"
  grid-list-lg
>
  <v-layout column wrap>
    <v-flex v-for="message of messages" v-bind:key="message.id" :message="message" :style="{ 'align-self': isMine(message.authorId) ? 'flex-end' : 'flex-start' }">
      <v-card v-if="isMine(message.authorId)" color="primary" class="white--text">
        <v-card-title class="text-xs-right">
          <div>
            <div>{{ message.text }}</div>
            <div class="grey--text text--lighten-2">{{ formatDate(message.sendDateTime) }}</div>
          </div>
        </v-card-title>
      </v-card>
      <v-card v-else color="grey lighten-2">
        <v-card-title>
          <div>
            <div>{{ message.text }}</div>
            <div class="grey--text">{{ formatDate(message.sendDateTime) }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import * as moment from 'moment';

export default {
  props: ['messages'],
  methods: {
    isMine(authorId) {
      return this.$store.getters.isMe(authorId);
    },
    formatDate(dateString) {
      return moment(dateString).format('DD-MM-YYYY H:mm');
    }
  }
};
</script>
