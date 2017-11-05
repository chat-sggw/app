<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Hello world</h3>
              <div>Entered on {{datetime}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title>
            <div>
              <div>Counter: {{counter}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="() => changeCounter(-1)">-1</v-btn>
            <v-btn flat color="orange" @click="() => changeCounter(1)">+1</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-actions>
            <router-link to="home">
              <v-btn flat color="primary" to="other">Go to other page</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'landing-page',
  computed: {
    datetime() {
      return this.$moment().format('YYYY-MM-DD hh:mm');
    },
    counter() {
      return this.$store.state.Counter.main;
    }
  },
  methods: {
    ...mapActions([
      'changeCounter'
    ])
  }
};
</script>

<style lang="scss" scoped>
</style>
