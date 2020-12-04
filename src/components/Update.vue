<template>
    <div class="updatePage">
        <h1>Mise à jour </h1>
        <el-button type="primary" @click="checkUpdate">check update</el-button>
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
const { ipcRenderer } = require('electron');
export default {
    name: 'updater',
    data() {
        return {
            appVersion: null,
            updateModal: false,
            downloaded: false
        }
    },
    created() {
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