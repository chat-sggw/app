<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-title><router-link :to="{ name: 'main' }" class="white--text">ChatRadio</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <TitleBarButtons></TitleBarButtons>
    </v-toolbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import TitleBarButtons from '../../components/TitleBarButtons';

export default {
  components: {
    TitleBarButtons
  }
};
</script>

<style lang="scss" scoped>
a.white--text {
  text-decoration: none !important;
}
</style>

