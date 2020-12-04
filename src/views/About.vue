<template>
  <div class="about">
    <h1>This is an about & settings page</h1>
    
    <Updater />
  </div>
</template>
<script>

import { PhArrowsClockwise } from "phosphor-vue";
import Updater from '@/components/Update.vue'
export default {
  
  components: {
    
    PhArrowsClockwise,
    Updater
  }
}
</script>
<style scoped>
.about {
  width: 60%;
  margin: 24px auto;
}
</style>
