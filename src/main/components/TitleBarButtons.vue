<template>
  <div>
    <v-btn flat icon @click="onMinimize" v-if="isElectron">
      <v-icon>mdi-window-minimize</v-icon>
    </v-btn>
    <v-btn flat icon ripple @click="onClose" v-if="isElectron">
      <v-icon>mdi-window-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
function isElectron() {
  return !process.env.IS_WEB;
}

async function getRemote() {
  if (!isElectron()) {
    return undefined;
  }

  const { remote } = await import('electron');
  return remote;
}

export default {
  computed: {
    isElectron() {
      return isElectron();
    }
  },
  methods: {
    async onMinimize() {
      const remote = await getRemote();
      if (remote) {
        const window = remote.getCurrentWindow();
        window.minimize();
      }
    },
    async onClose() {
      const remote = await getRemote();
      if (remote) {
        const window = remote.getCurrentWindow();
        window.close();
      }
    }
  }
};
</script>
