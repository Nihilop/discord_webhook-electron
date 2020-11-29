<template>
  <div class="Webhook">
    <div class="grid-row">
      <div class="grid-item" v-for="(server,idx) in servers" :key="idx" >
        <Server :server="server" @delete="deleteServer" @edit="editServer" @view="viewServer" />
      </div>
      <div class="card">
        <router-link class="grid-item addItem" to="/Edit"><PhPlus :size="24" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Server from '@/components/Server';
import { PhPlus } from "phosphor-vue";

export default {
  name: 'Webhook',
  components: {
    Server,
    PhPlus
  },
  computed: {
    servers() {
      return this.$store.state.servers;
    }
  },
  created() {
    this.$store.dispatch('getServers');
  },
  methods: {

    async deleteServer(server) {
      console.log('delete', server.id);
      await this.$store.dispatch('deleteServer', server);
      this.$store.dispatch('getServers');
    },
    editServer(server) {
      console.log('edit', server.id);
      this.$router.push({ name: 'edit', params: {server: server} });
    },
    viewServer(server) {
      console.log('edit', server.id);
      this.$router.push({ name: 'server_view', params: {server: server} });
    }
  }
};
</script>

<style scoped>
.grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 50px;
}

.grid-item {
  flex-basis: 30%;
  -ms-flex: auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin: 5px;
  
}

.Webhook {
  position: relative;
  width: 80%;
  margin: auto;
}

.card {
  position: relative;
  display: block;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background:transparent;
  border: 2px dashed rgba(255,255,255,0.3);
  border-radius: 5px;
  font-size: 2em;
  transition: all 0.5s;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  margin: 5px;

}


</style>
