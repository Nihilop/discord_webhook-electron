<template>
  <div class="home">
    <h1>accueil</h1>
    <p>Ceci est une version BETA, merci de faire remonter les bugs.</p>
    <p>Vous pouvez rejoindre mon serveur ici : <a @click="openNav('https://discord.gg/ZhH6JYZAdz')" style="color:RGB(114,137,218)" target="_blank">Discord Nihilo.fr</a></p>
    <h1>Tuto rapide</h1>
    <img class="tutoGif" src="/../../assets/img/tuto.gif">
    <p>note : Il suffit de selectionner la partie concernée du webhook pour faire apparaitre la fenêtre de modification (images comprises, URL nécessaire).</p>
    <!-- <div class="authWrap">
      <el-button @click="discoAuth">Connexion</el-button> 
    </div> -->
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
.tutoGif {
  max-width: 100%;
  border: 1px solid white;
  margin: 15px auto;
}
</style>
