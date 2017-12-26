<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'chat-app'
  };
</script>

<style lang="stylus">
  @require '~vuetify/src/stylus/settings/_colors.styl'
  $theme := {
    primary: #4CB050
    accent: #00E676
    secondary: $grey.darken-3
    info: $blue.base
    warning: $amber.base
    error: $red.accent-2
    success: $green.base
  }
  @require '~vuetify/src/stylus/main.styl'

  html {
    overflow-y: auto;
  }

  nav.toolbar {
    -webkit-app-region: drag;
    button {
      -webkit-app-region: no-drag;
    }
  }
</style>
