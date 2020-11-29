<template>
    <div>
        <nav id="serversID">
            <router-link class="nav-item home-item" to="/"><PhActivity :size="24" /></router-link>
            <router-link class="nav-item" to="/webhook"><img class="iconMenu" src="/../../assets/webhook.png" ></router-link>
            <!-- <router-link v-for="(server,idx) in servers" :key="idx" class="nav-item" :to="{name: 'server_view', params: {server: server}}">{{ server.name }}</router-link> -->
            <!-- <router-link class="nav-item addItem" to="/Edit"><PhPlus :size="24" /></router-link> -->
            <router-link class="settings-item" to="/about"><PhGearSix :size="24" /></router-link>
        </nav>
    </div>
</template>

<script>
import { PhGearSix, PhActivity, PhPlus } from "phosphor-vue";
import Server from '@/components/Server';
export default {
    name: "NavBar",
    components: {
      PhGearSix,
      PhActivity,
      PhPlus,
      Server
    },
    computed: {
      servers() {
        return this.$store.state.servers;
      }
    }
}
</script>
<style scoped>
#serversID {
  position: fixed;
  width: 80px;
  height: calc(100vh - (var(--headerCTRL-size) + 80px));
  left: 0;
  top: var(--headerCTRL-size);
  background:transparent;
  overflow: auto;
}

.nav-item {
  --sizeItem: 52px;
  position: relative;
  display: block;
  width: var(--sizeItem);
  height: var(--sizeItem);
  border-radius: 50%;
  background:RGB(47,49,54);
  margin: 15px auto;
  line-height: var(--sizeItem);
  text-align: center;
}
.router-link-exact-active {
  color: white !important;
  background:RGB(67,181,129);
}

.router-link-exact-active:before {
  position: absolute;
  content: '';
  width: 5px;
  height: 80%;
  top: 10%;
  left: -17px;
  background: white;
  border-radius: 5px;
}
.iconMenu {
  width: 24px;
  margin-top: 13px;
}
.nav-item:hover {
  background:RGB(67,181,129);
  color: white;
}

.home-item {
  background:RGB(114,137,218);
  border-radius: 8px;
  line-height: 70px;
}
.home-item:hover {
  background:RGB(114,137,218);
  color: white;
  border:none
}
.addItem {
  color: RGB(67,181,129);
  line-height: 65px;
}
.settings-item {
  position: fixed;
  width: 80px;
  height: 80px;
  line-height: 100px;
  bottom: 0;
  left:0;
  text-align: center;
  background: inherit;
  color: white;
}
</style>