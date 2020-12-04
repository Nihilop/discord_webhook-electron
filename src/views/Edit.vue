<template>
  <div class="container">
      <el-form>
        <el-form-item label="Nom du serveur">
          <el-input placeholder="Nom du serveur (court)" v-model="server.name"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" placeholder="Courte description" v-model="server.desc"></el-input>
        </el-form-item>
        <el-form-item label="Nom du bot (peut être configurer directement dans discord)">
          <el-input placeholder="Nom du bot" v-model="server.usernameBot"></el-input>
        </el-form-item>
        <el-form-item label="Webhook url">
          <el-input placeholder="Lien webhook" v-model="server.url">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>
        <div class="ctrl_hidding">
          <input type="checkbox" v-model="server.date">
        </div>
      </el-form>
      <!-- <input type="file" ref="imageRef" @change="previewFiles"> -->
      <el-button type="danger" @click="back">Annuler</el-button>
      <el-button type="success" @click="save">Ajouter</el-button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      server:null
    }
  },
  created() {
    if(this.$route.params.server) {
      this.server = this.$route.params.server;
    } else {
      this.server = { name:'', desc: '', url: '', image: '', date: false, usernameBot: '' };
    }
  },
  methods: {
    previewFiles() {
      this.image = this.$refs.imageRef.image
    },
    async save() {
      await this.$store.dispatch('saveServer', this.server);
      console.log('back');
      this.$router.push('/webhook');
    },
    back() {
      console.log('back');
      this.$router.push('/webhook');
    }
  }
};
</script>
<style scoped>
.container {
  width: 60%;
  margin: 50px auto;
}
.ctrl_hidding {
  display:none;
}
</style>