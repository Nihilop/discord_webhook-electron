<template>
<div>
     
  <div class="card">
    
    <a class="title" @click="$emit('view',server)" >
      {{ server.name }} 
    </a>
    <div class="cardController">
      <ph-pencil-line class="iconCard" :size="20" weight="thin" @click="$emit('edit',server)" color="rgba(255,255,255,.3)" />
 

      <el-popover
        placement="bottom"
        width="160"
        v-model="visible">
        <p>Voulez-vous vraiment supprimer ceci?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">Annuler</el-button>
          <el-button type="primary" size="mini"  @click="$emit('delete',server); visible = false">Confirmer</el-button>
        </div>
        <ph-trash-simple class="iconCard" slot="reference" :size="20" weight="thin"  color="rgba(255,255,255,.3)" />
      </el-popover>
     
      

      <!-- <button @click="$emit('delete',server)">Delete</button >
      <button @click="$emit('edit',server)">Edit</button>
      <button @click="$emit('view',server)">view</button> -->
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
.card {
  min-width: 150px;
  width: 100%;
  background:RGB(41,43,47);
  border-radius: 5px;
  cursor: pointer;
}
.iconCard {
  margin-right: 5px;
}
.iconCard:hover {
  color: rgba(255,255,255,1);
}
.cardController {
  position:absolute;
  top: 15px; right: 15px;
  z-index: 9;
  opacity: 1;
  transition:all 0.5s;
}

.card a {
  display: block;
  width: 100%; height: 100%;
  line-height: 120px;
  left: 0; top: 0;
  text-align: center;
  z-index: 1;
  transition: all 0.5s;
}


.card:hover a , .card:active a, .card:focus a   {
  transform: scale(1.1);
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
}


</style>
