<template>
  <div id="app">
    <header id="titlebar">
      <div id="drag-region">
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
  </div>
</template>

<script>
require('./renderer')
import Navbar from '@/components/Navbar.vue'
import { PhX, PhCornersOut, PhMinus, PhCornersIn } from 'phosphor-vue'
export default {
  name: 'app',
  components: {
    Navbar,
    PhX,
    PhCornersOut,
    PhMinus,
    PhCornersIn
  }
}
</script>

<style>
@import url('~element-ui/lib/theme-chalk/index.css');
@font-face {
 font-family: "discord";
 src: url("/assets/fonts/Discord.woff2") format("woff2");
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

p, pre {
  
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

</style>
