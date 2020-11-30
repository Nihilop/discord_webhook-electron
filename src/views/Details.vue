<template>
    <div>
      <header>
        <el-page-header @back="back" title="Retour" :content="server.name" class="themewhite"/>

        <nav class="tabsNav">
          <ul>
            <li :class="{'active': show == 1}" :style="{ borderColor: hookData.color }" @click.prevent="show = 1"><span>Webhook</span></li>
            <li :class="{'active': show == 2}" :style="{ borderColor: hookData.color }" @click.prevent="show = 2"><span>settings</span></li>
            <li :class="{'active': show == 3}" :style="{ borderColor: hookData.color }" @click.prevent="show = 3"><span>historique</span></li>
          </ul>
        </nav>
      </header>
      <div class="container">
        

        <div id="Field" class="showUp" v-if="show == 1">


          <div class="formControl">
            <span style="padding:0 15px; float:left; line-height:40px">Choisir une couleur :</span>
            <el-color-picker class="colorpicker" v-model="hookData.color"></el-color-picker>
          </div>
         
          <!-- <discord-messages>
            <discord-message>
              <discord-embed
                slot="embeds"
                :color="hookData.color"
                title="Some title"
                :url="hookData.masterTitleLink"
                thumbnail="https://i.imgur.com/wSTFkRM.png"
                image="https://i.imgur.com/wSTFkRM.png"
                footer-image="https://i.imgur.com/wSTFkRM.png"
                timestamp="01/01/2018"
                author-name="Some name"
                author-image="https://i.imgur.com/wSTFkRM.png"
                author-url="https://discord.js.org/"
              >
                <p v-if="hookData.desc">{{hookData.desc}}</p>
                <embed-fields slot="fields">
                  <embed-field title="Regular field title">
                    Some value here
                  </embed-field>
                  <embed-field :inline="true" title="Inline field title">
                    Some value here
                  </embed-field>
                  <embed-field :inline="true" title="Inline field title">
                    Some value here
                  </embed-field>
                  <embed-field :inline="true" title="Inline field title">
                    Some value here
                  </embed-field>
                </embed-fields>
                <span slot="footer">Some footer text here</span>
              </discord-embed>
            </discord-message>
          </discord-messages> -->
          
          <form class="discWebhook_form" @change="valuesChanged">
            <span class="colorIndicator" :style="{ background: hookData.color }"></span>
            <!-- Author -->
      
            <el-popover placement="bottom" title="Auteur informations" ref="authorCtrl" width="200">
              <el-input class="author" placeholder="Auteur" v-model="hookData.author" />
              <el-input class="authorAvatar" placeholder="Auteur avatar (url)" v-model="hookData.authorAvatar" />
              <el-input class="authorLink" placeholder="Auteur link" v-model="hookData.authorLink" />
            </el-popover>
            <div class="popTrigger authorWrapper" v-popover:authorCtrl>
              <img v-if="hookData.authorAvatar" :src="hookData.authorAvatar">
              <img v-if="!hookData.authorAvatar" src="/../../assets/img/avatar.png">
              <p v-if="hookData.author" style="color:white">{{ hookData.author }}</p>
              <p v-if="!hookData.author" style="color:gray">Auteur</p>
            </div>
      
            
            <!-- Title -->
        
            <el-popover placement="bottom" title="Titre principal" ref="titleCtrl" width="200">
              <el-input placeholder="Titre (non obligatoire)" v-model="hookData.masterTitle" />
              <el-input v-if="hookData.masterTitle" placeholder="Avec un lien ?" v-model="hookData.masterTitleLink" />
            </el-popover>
            <div class="popTrigger masterTitleWrapper" v-popover:titleCtrl>
              <p v-if="hookData.masterTitle" style="color:white">{{ hookData.masterTitle }}</p>
              <p v-if="!hookData.masterTitle" style="color:gray">Titre principal</p>
            </div>

            <!-- description -->
            <textarea v-if="hasDesc" placeholder="description (non obligatoire)" v-model="hookData.desc" />
            <!-- thumbnail -->
            <div class="thumbnailImg">
              <el-popover placement="left" title="Thumbnail" ref="thumbnailCtrl" width="200">
                <el-input placeholder="thumbnail url" v-model="hookData.thumbnail" />
              </el-popover>
              <div class="popTrigger" v-popover:thumbnailCtrl>
                <img v-if="hookData.thumbnail" :src="hookData.thumbnail">
                <img v-if="!hookData.thumbnail" src="/../../assets/img/thumbnail.png">
              </div>
            </div>

            <!-- content -->
            <input class="masterContent" placeholder="Titre (obligatoire)" v-model="hookData.title" />
            <textarea class="masterContent" placeholder="Message" v-model="hookData.message" />

            <!-- image -->
        
            <el-popover placement="bottom" title="image" ref="imageCtrl" width="200">
              <el-input placeholder="image (url)" v-model="hookData.image" />
            </el-popover>
            <div class="popTrigger webhookImg" v-popover:imageCtrl>
              <img v-if="hookData.image" :src="hookData.image">
              <p v-if="!hookData.image" class="addImage"><PhPlus :size="24" color="rgba(255,255,255,1)" /></p>
            </div>

            <!-- footer -->
            <div v-if="hasFooter">
              <el-popover placement="left" title="Thumbnail" ref="footerCtrl" width="200">
                <el-input placeholder="thumbnail url" v-model="hookData.footerImg" />
              </el-popover>
              <div class="popTrigger footerImg" v-popover:footerCtrl>
                <img v-if="hookData.footerImg" :src="hookData.footerImg">
                <img v-if="!hookData.footerImg" src="/../../assets/img/thumbnail.png">
              </div>
              <input placeholder="Texte bas de page" v-model="hookData.footerTxt" />
            </div>
          </form>
          <div class="btnControl">
            <el-button type="danger" @click="back"><ph-caret-double-left :size="24" /></el-button>
            <el-button type="success" submit="true" @click="sendMessage"><ph-paper-plane-right :size="24" /></el-button>
          </div>

        </div>
        <div class="showUp" v-if="show == 2">
           <div class="formControl">
            <span style="padding:0 15px">Ajouter une description ? (Non obligatoire)</span>
            <el-switch v-model="hasDesc"></el-switch> 
          </div>
          <div class="formControl">
            <span style="padding:0 15px">Ajouter une bas de page ? (Non obligatoire)</span>
            <el-switch v-model="hasFooter"></el-switch>
          </div>
        </div>
        <div class="showUp" v-if="show == 3">
          <p class="serverDesc">{{server.desc}}</p>
        </div>

        <!-- <hr>
        <button class="addField disable"><PhPlus :size="24" color="rgba(255,255,255,0.6)" /></button> -->

        
      </div>
    </div>
</template>
<script>
import { Webhook, MessageBuilder } from 'discord-webhook-node';

import { PhCaretDoubleLeft, PhPlus, PhPaperPlaneRight } from "phosphor-vue";


export default {
  components: {
    PhCaretDoubleLeft,
    PhPlus,
    PhPaperPlaneRight
  },
  data() {
    return {
      visible: false,
      hookData: {
        author: null,
        authorAvatar: null,
        authorLink: null,
        color: '#409EFF',
        masterTitle: null,
        masterTitleLink: null,
        thumbnail: null,
        image: null, //faire une array pour plusieurs images
        desc: null,
        title: null,
        message: null,
        footerTxt: null,
        footerImg: null,
        dateNow: false
      },
      server:null,
      hook: null,
      hasDesc: false,
      hasFooter: true,
      show: 1,
    }
  },
  created() {
    if(this.$route.params.server) {
      this.server = this.$route.params.server;
      this.hook = new Webhook(this.$route.params.server.url);
    } else {
      this.server = { name:'', desc: '', url: '' };
    }
  },
  methods: {
    valuesChanged(values) {
      this.$forceUpdate(); // this is only to refresh the fields on the <pre> tags, not necessary for other purpouses
      this.hookData = {
        ...this.hookData,
        ...values
      }; 
    },
    navigate: function(e){
      if (e.target.dataset.show) {
        e.preventDefault();
        this.show = e.target.dataset.show;
      }
    },
    async back() {
      console.log('back');
      this.$router.push('/webhook');
    },

    sendMessage() { //Ajouter la validation avant le pop du dialog, puis set la const embed. Faire en sorte de pouvoir ajouter de nouveau Fields (.addField) & plusieurs embed. & couleur

        const embed = new MessageBuilder()

       
          .setTitle(this.hookData.masterTitle)
          .setAuthor(this.hookData.author, this.hookData.authorAvatar, this.hookData.authorLink)
          .setURL(this.hookData.masterTitleLink)
          .addField(this.hookData.title, this.hookData.message) //la seule chose absolument obligatoire dans le form
          //.addField('Second field', 'this is not inline')
          .setColor(this.hookData.color)
          .setThumbnail(this.hookData.thumbnail)
          .setDescription(this.hookData.desc)
          .setImage(this.hookData.image)
          .setFooter(this.hookData.footerTxt, this.hookData.footerImg)
          .setTimestamp();
     
            
          
        

        this.$confirm('Voulez-vous envoyer ce message ?', 'Attention', {
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
          type: 'warning'
        }).then(() => {
          this.hook.send(embed)
          this.$notify({
            title: 'Succès',
            type: 'success',
            message: 'Message envoyé',
            position: 'bottom-right'
          });
            
          }).catch(() => {
            this.$notify({
              title: 'Annulation',
              type: 'warning',
              message: 'Message non envoyé',
              position: 'bottom-right'
            });          
          });

    },


      // submit () {
      //   const data = {
      //     hookDiscord: this.hookDiscord
      //   }
        
        
      //     console.log(data, null, 2)
      //   }    
      }
};
</script>
<style lang="scss">
  @import '~@asigloo/vue-dynamic-forms/src/styles/themes/default.scss';
</style>
<style scoped> 

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-up-enter,
.fade-up-leave-to {
  height: 0;
  transform: translateY(30px);
  opacity: 0;
}

header {
  position:relative;
  display: block;
  width: 100%;
  min-height:200px;
  background:#222
}
.container {
  width: 60%;
  margin: 15px auto;
}
.serverDesc {
  width: 100%;
  background: rgba(0,0,0,.2);
  padding: 24px;
  border-radius: 5px;
  color: gray;
  font-size: 13px;
}
.fieldWrapper {
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  background:RGB(41,43,47);
}
.columns {
  /* background-color: RGB(64,68,75) !important; */
  width: 100%;
  display: inline-flex;
  
}
.columns div {
  margin: 0 15px;
}
.inline {
  display: inline-flex;
  padding: 0 24px;
  margin: 34px 0;
}

.title {
  margin: 0;
  font-family: 'discord';
}

.discWebhook_form {
  position: relative;
  background:rgb(27, 28, 31);
  padding:15px;
  border-radius: 3px;
  margin-top: 20px;
  max-width:600px;
  margin:24px auto;
}
.colorIndicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.discWebhook_form input, .discWebhook_form textarea {
  background:transparent;
  border: none;
  outline: 0;
  color: white;
  margin: 5px 0;
}

.discWebhook_form textarea {
  width: 100%;
  resize: vertical;
}

.disable {
  pointer-events: none;
  cursor:not-allowed !important;
}

.discWebhook_form el-input {
  margin: 5px 0;
}
.discWebhook_form input:focus {
  border: none;
  border-bottom: 1px solid white;
  outline: 0;
}
.popTrigger {
  cursor: pointer;
  user-select: none;
  width:fit-content;
}
.authorWrapper {
  display: flex;
  align-items: center;
  width: fit-content;
}
.authorWrapper img, .authorWrapper p {
  display: inline-flex;
  width: auto;
  height: 30px;
}
.authorWrapper img {
  border-radius: 50%;
}
.authorWrapper p {
  margin: 0;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

hr {
  margin: 34px auto;
  height: 1px;
  width: 50%;
  background: rgba(255,255,255,0.2);
  border:none;
}

.addField {
  position: relative;
  display: block;
  padding: 12px;
  width: 100%;
  min-width: 100px;
  min-height: 100px;
  height: fit-content;
  background:transparent;
  border: 2px dashed rgba(255,255,255,0.3);
  border-radius: 5px;
  font-size: 2em;
  transition: all 0.5s;
  cursor: pointer;
}

.addImage {
  position: relative;
  display: block;
  padding: 13px 13px;
  background:transparent;
  border: 2px dashed rgba(255,255,255,0.3);
  box-sizing: border-box;
  border-radius: 5px;
  transition: all 0.5s;
  cursor: pointer;
}
.webhookImg img {
  display: block;
  width: 100%;
  margin: 24px 0;
  border-radius: 5px;
}

.masterContent {
  width: 100%;
  background: rgba(255,255,255,0.3) !important;
  color: #222 !important;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
}
.masterContent:focus {
  background: rgba(255,255,255,1) !important;
}
textarea.masterContent {
  min-height: 150px;
}

.el-page-header__content, .themewhite {
  color:white !important;
  font-family: discord !important;
  text-transform: uppercase;
}
.themewhite {
  padding: 24px;
}
.el-tabs__nav-wrap::after {
  background: transparent !important;
}

.thumbnailImg {
  position: absolute;
  
  top: 15px; right: 15px;
}

.thumbnailImg div img {
  width: 70px;
  border-radius: 5px;
}
.footerImg img {
  width: 24px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
.formControl {
  width: fit-content;
  margin: 24px auto;
  color: gray;
  font-family: discord;
  font-size: 12px;
}
.btnControl {
  width: fit-content;
  margin: 50px auto;
}
.tabsNav {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%;
}

.tabsNav ul {
  width: 50%;
  list-style: none;
  margin:auto;
  text-align: center;
}
.tabsNav ul li {
  display: inline-block;
  width: fit-content;
  padding: 10px 14px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: white;
}
.tabsNav ul li.active {
  border-bottom: 2px solid;
}

.showUp {
  animation: showup 0.5s forwards;
  transform: translateY(30%);
}
@keyframes showup {
  to {
    transform: translateY(0);
  }
}
.colorpicker {
  background: white;
  border: 1px solid gray;
  outline: 0;
  border-radius: 5px;
}
.el-color-picker__trigger {
  border: 0px solid transparent !important;
}
</style>