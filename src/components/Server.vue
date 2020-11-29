<template>
<div>
     
  <div class="cardy" >
    
    <p @click="$emit('view',server)">
      {{ server.name }} 
    </p>
    <div class="cardController">
      <ph-pencil-line class="iconCard" :size="15" weight="thin" @click="$emit('edit',server)" color="rgba(255,255,255,.3)" />
      <el-popover
        placement="bottom"
        width="220"
        v-model="visible">
        <p style="overflow: hidden;">Voulez-vous vraiment supprimer ceci?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">Annuler</el-button>
          <el-button type="primary" size="mini"  @click="$emit('delete',server); visible = false">Confirmer</el-button>
        </div>
        <ph-trash-simple class="iconCard" slot="reference" :size="15" weight="thin"  color="rgba(255,255,255,.3)" />
      </el-popover> 
    </div>
  </div>
 
</div>
</template>

<script>
import { PhPencilLine, PhTrashSimple } from "phosphor-vue";
export default {
  props: ['server'], 
  components:  {
    PhPencilLine,
    PhTrashSimple
  },
  data() {
    return {
      visible: false,
      
    }
  },
  created() {
    console.log('server created');
  },
  methods: {

  }
};
</script>
<style scoped>
.cardy {
  position: relative;
  display: block;
  min-width: 100px;
  width: 100%;
  height: 100px;
  background:RGB(41,43,47);
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}
.iconCard {
  margin-right: 5px;
}
.iconCard:hover {
  color: rgba(255,255,255,1);
}
.cardController {
  position:absolute;
  top: 5px; right: 5px;
  z-index: 999;
  opacity: 1;
  transition:all 0.5s;
}

.cardy p {
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  line-height: 100px;
  
  text-align: center;
  z-index: 0;
  transition: all 0.5s;
  color: gray;
  top: 0;
  margin: 0;
  padding: 0;
}


.cardy:hover p   {
  transform: scale(1.05);
}
button {
  border: none;
}
.droptrigger {
  position: absolute;
  width: 20px; height: 20px;
  top: 5px;
  right: 5px;
  z-index: 999;
}
.title {
  font-family: 'discord';
  padding: 0;
}


</style>
