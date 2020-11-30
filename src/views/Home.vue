<template>
  <div class="home">
    <h1>accueil</h1>
    <p>Ceci est une version BETA, merci de faire remonter les bugs.</p>
    <p>Vous pouvez rejoindre mon serveur ici : <a @click="openNav('https://discord.gg/ZhH6JYZAdz')" style="color:RGB(114,137,218)" target="_blank">Discord Nihilo.fr</a></p>
    <div class="authWrap">
      <el-button @click="discoAuth">Connexion</el-button>
    </div>
  </div>
</template>

<script>
const { shell } = require('electron')
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();



export default {
  components: {

  },
  methods: {
    openNav(url) {
      shell.openExternal(url)
    },
    discoAuth() {
      oauth.tokenRequest({
        clientId: "782733694208573471",
        clientSecret: "TIKngTBp1quOsDwzRfIwEj0hSJNAV3Mn",

        code: "query code",
        scope: "identify guilds",
        grantType: "authorization_code",
        
        redirectUri: "http://localhost:8080/callback",
      }).then(console.log)
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
