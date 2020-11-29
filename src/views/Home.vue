<template>
  <div class="home">
    <h1>accueil</h1>
    <p>Ceci est une version BETA, merci de faire remonter les bugs.</p>
    <p>Vous pouvez rejoindre mon serveur ici : <a @click="openNav('https://discord.gg/ZhH6JYZAdz')" style="color:RGB(114,137,218)" target="_blank">Discord Nihilo.fr</a></p>
  </div>
</template>

<script>
const { shell } = require('electron')

export default {
  components: {

  },
  methods: {
    openNav(url) {
      shell.openExternal(url)
    }
  }
};
</script>

<style scoped>
.home {
  width: 80%;
  margin: 50px auto;
}
p {
  font-size: 14px;
  color: gray;
}
a {
  cursor: pointer;
}
</style>
