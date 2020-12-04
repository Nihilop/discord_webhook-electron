<template>
  <div id="app">
    <header id="titlebar">
      <div id="drag-region">
        <p style="font-size:12px; color:rgba(255,255,255,0.05); line-height:32px; padding:0 14px; margin:0;">Discord - Webhook / {{ appVersion }}</p>
        <div id="window-controls">
            <ph-minus id="min-button" class="winCtrl" :size="20" weight="thin" />
            <ph-corners-out id="max-button" class="winCtrl" :size="20" weight="thin" />
            <ph-corners-in id="restore-button" class="winCtrl" :size="20" weight="thin" />
            <ph-x id="close-button" class="winCtrl" :size="20" weight="thin" />
        </div>
      </div>
    </header>
    <Navbar />
    
    
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- Electron update -->
    <el-dialog
      title="Mise à jour"
      
      :visible.sync="updateModal"
      width="70%"
      top="20%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <span>Une mise à jour est disponible</span>

      <span slot="footer" class="dialog-footer">
        <div  v-if="downloaded = false" class="progress">
          <div class="bar"></div>
        </div>
        <el-button id="restartBtn" type="primary" v-if="downloaded = true" @click="restartApp">Quitter et installer</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
require('./renderer')
import Navbar from '@/components/Navbar.vue'
import { PhX, PhCornersOut, PhMinus, PhCornersIn } from 'phosphor-vue'
const { ipcRenderer } = require('electron');



export default {
  name: 'app',
  data() {
    return {
      appVersion: null,
      updateModal: false,
      downloaded: false
    }
  },
  components: {
    Navbar,
    PhX,
    PhCornersOut,
    PhMinus,
    PhCornersIn
  },
  created() {
    
    //test button checkupdate       
    ipcRenderer.on('oki_doki', () => {
      console.log('ok')
    })

    // GetVersion
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      this.appVersion = arg.version;
      console.log(arg.version)
    });

    //check available update
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      this.updateModal = true;
      console.log('Mise à jour dispo')
      makeUpdate()
    });

    // ipcRenderer.on('message', function(event, text) {
    //   var container = document.getElementById('messages');
    //   var message = document.createElement('div');
    //   message.innerHTML = text;
    //   container.appendChild(message);
    //   console.log(text)
    // })

    function makeUpdate() {
      
      // ipcRenderer.on('download_progress', function(progressObj) {   
      //   let dlweight = ' (' + progressObj.transferred + "/" + progressObj.total + ')';
      //   this.updateSpeed = progressObj.bytesPerSecond;
      //   this.percentage = progressObj.percent;
      //   console.log(dlweight, this.updateSpeed, this.percentage)
      // });
      
 
      ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded');
        this.downloaded = true
      });
   
    }
  },
  methods: {
    restartApp() {
      ipcRenderer.send('restart_app');
      console.log('restarting app...')
    },
    checkUpdate() {
      ipcRenderer.send('manualCheckUpdate')
    }
  }
}
</script>

<style>

@import url('~element-ui/lib/theme-chalk/index.css');
@font-face {
 font-family: "discord";
 src: url("/assets/fonts/Discord.woff2") format("woff2");
}
:root {
  --g-purple: linear-gradient(30deg, #85f, #9966ff);
  --g-yellow: linear-gradient(30deg, #fc0, #fc0);
  --g-red: linear-gradient(30deg, #f36, #f24);
  --g-blue: linear-gradient(30deg, rgb(118,140,219), RGB(111,133,211));
  --g-purple: linear-gradient(30deg, #85f, #9966ff);
}
#app {
  font-family: discord, 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;

  position: absolute;
  width: calc(100% - 80px);
  height: calc(100vh - 32px);
  top: 32px;
  right: 0;
  background: RGB(47,49,54);
  overflow: auto;
  border-top-left-radius: 5px;
}

html, body {
  background:RGB(41,43,47);
  overflow: hidden;
  height: 100%;
  height:100%;
  font-family: sans-serif;
}

::-webkit-scrollbar {
  width: 5px;
 
}
 
::-webkit-scrollbar-track {   
  border-radius: 9px;
}
 
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: antiquewhite;
}

h1, h2, h3, h4 {
  color: white;
  text-transform: uppercase;
}


a {
  text-decoration: none;
  color: rgba(255,255,255,0.5);
}

#titlebar {
  display: block;
  position: fixed;
  height: 32px;
  width: calc(100% - 2px);
  top: 0; left: 0;

}

.maximized #titlebar {
  width: 100%;
  padding: 0;
}

#main {
  height: calc(100% - 32px);
  margin-top: 32px;
  padding: 20px;
  overflow-y: auto;
}

#titlebar #drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}

#window-controls {
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

#window-controls {
  -webkit-app-region: no-drag;
}

#window-controls .winCtrl {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-top:6px;
  color:rgba(255,255,255,0.5)
}

#window-controls .winCtrl:hover {
  color:rgba(255,255,255,1)
}

#window-controls .winCtrl {
  user-select: none;
}

#min-button {
  grid-column: 1;
}
#max-button, #restore-button {
  grid-column: 2;
}
#close-button {
  grid-column: 3;
}

#restore-button {
  display: none !important;
}

.maximized #restore-button {
  display: flex !important;
}

.maximized #max-button {
  display: none;
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}
.progress {
  --size: 300px;
  --height: 10px;
  max-width: var(--size);
  width: 100%;
  height: var(--height);
  background: #2f2f2f;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  margin:auto;
}
.progress + .progress {
  margin-top: 15px;
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  animation: fill-loader-1 1.5s infinite ease;
  background: var(--g-blue);
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 200ms ease;
}
@keyframes fill-loader-1 {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
  }
  49% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  51% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }
  100% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }
}

</style>
