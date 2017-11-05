<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-title class="white--text">SGGW Chat</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'chat-app'
  };
</script>

<style lang="scss">
  html {
    overflow-y: auto;
  }

  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(~material-design-icons/iconfont/MaterialIcons-Regular.eot); /* For IE6-8 */
    src: local('Material Icons'),
        local('MaterialIcons-Regular'),
        url(~material-design-icons/iconfont/MaterialIcons-Regular.woff2) format('woff2'),
        url(~material-design-icons/iconfont/MaterialIcons-Regular.woff) format('woff'),
        url(~material-design-icons/iconfont/MaterialIcons-Regular.ttf) format('truetype');
  }

  nav.toolbar {
    -webkit-app-region: drag;
    button {
      -webkit-app-region: no-drag;
    }
  }
</style>
