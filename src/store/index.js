import Vue from 'vue'
import Vuex from 'vuex'
import idb from '@/api/idb';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    servers:[]
  },
  mutations: {

  },
  actions: {
    async deleteServer(context, server) {
      console.log('store is being asked to delete '+server.id);
      await idb.deleteServer(server); 
    },
    async getServers(context) {
      context.state.servers = [];
      let servers = await idb.getServers();
      servers.forEach(c => {
        context.state.servers.push(c);
      });
    },
    async saveServer(context, servers) {
      await idb.saveServer(servers);
    }
  }
})
