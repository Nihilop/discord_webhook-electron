<template>
    <div>
      <header>
        <el-page-header @back="back" title="Retour" :content="server.name" class="themewhite"/>

        <nav class="tabsNav">
          <ul>
            <li :class="{'active': show == 1}" :style="{ borderColor: blue }" @click.prevent="show = 1"><span>Webhook</span></li>
            <li :class="{'active': show == 2}" :style="{ borderColor: blue }" @click.prevent="show = 2"><span>settings</span></li>
            <li :class="{'active': show == 3}" :style="{ borderColor: blue }" @click.prevent="show = 3"><span>historique</span></li>
          </ul>
        </nav>
      </header>
      <div class="container">
        <div id="Field" class="showUp" v-if="show == 1">

          <el-row :gutter="50">
            <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12" style="position:relative; margin-top: 24px">

              <div class="usernameBot">

                <el-popover class="myPopOver" placement="right" title="Avatar" ref="avatarCtrl" width="300" trigger="click">
                  <el-input clearable class="botAvatar myInput" placeholder="Avatar" v-model="hookData.avatar" />
                </el-popover>
                <img v-if="!hookData.avatar" src="/../../assets/img/avatar.png" v-popover:avatarCtrl>
                <img v-if="hookData.avatar" :src="hookData.avatar" v-popover:avatarCtrl>

                <el-popover class="myPopOver" placement="bottom" title="botName" ref="botName" width="300" trigger="click">
                  <el-input clearable class="botAvatar myInput" :placeholder="this.server.usernameBot" v-model="hookData.botName" />
                </el-popover>
                <h2 v-popover:botName> {{ hookData.botName || server.usernameBot || 'BotHook'}} </h2>

                <div class="formControl colopickerwrapper">
                  <span style="padding:0 15px; float:left; line-height:40px">Choisir une couleur :</span>
                  <el-color-picker class="colorpicker" v-model="hookData.color"></el-color-picker>
                </div>
              </div>
              
              <el-form :model="hookData" :rules="rules" class="discWebhook_form">
                <span class="colorIndicator" :style="{ background: hookData.color }"></span>
                <!-- Author -->

                <el-popover class="myPopOver" placement="bottom" title="Auteur informations" ref="authorCtrl" width="300" trigger="click">
                  <el-input clearable class="author myInput" placeholder="Auteur" v-model="hookData.author" />
                  <el-input clearable class="authorAvatar myInput" placeholder="Auteur avatar (url)" v-model="hookData.authorAvatar" />
                  <el-input clearable v-if="hookData.author" class="authorLink myInput" placeholder="Auteur link" v-model="hookData.authorLink" />
                </el-popover>
                <div class="popTrigger authorWrapper" v-popover:authorCtrl>
                  <img v-if="hookData.authorAvatar" :src="hookData.authorAvatar">
                  <img v-if="!hookData.authorAvatar" src="/../../assets/img/avatar.png">
                  <p v-if="hookData.author" style="color:white">{{ hookData.author }}</p>
                  <p v-if="!hookData.author" style="color:gray">Auteur</p>
                </div>


                <!-- Title -->

                <el-popover class="myPopOver" placement="bottom" title="Titre principal" ref="titleCtrl" width="300" trigger="click">
                  <el-input clearable class="myInput" placeholder="Titre (non obligatoire)" v-model="hookData.masterTitle" />
                  <el-input clearable class="myInput" v-if="hookData.masterTitle" placeholder="Avec un lien ?" v-model="hookData.masterTitleLink" />
                </el-popover>
                <div class="popTrigger masterTitleWrapper" v-popover:titleCtrl>
                  <p v-if="hookData.masterTitle" style="color:white">{{ hookData.masterTitle }}</p>
                  <p v-if="!hookData.masterTitle" style="color:gray">Titre principal</p>
                </div>

                <!-- description -->
                <textarea v-if="hasDesc" placeholder="description (non obligatoire)" v-model="hookData.desc" />
                <!-- thumbnail -->
                <div class="thumbnailImg">
                  <el-popover class="myPopOver" placement="left" title="Thumbnail" ref="thumbnailCtrl" width="300" trigger="click">
                    <el-input clearable class="myInput" placeholder="thumbnail url" v-model="hookData.thumbnail" />
                  </el-popover>
                  <div class="popTrigger" v-popover:thumbnailCtrl>
                    <img v-if="hookData.thumbnail" :src="hookData.thumbnail">
                    <img v-if="!hookData.thumbnail" src="/../../assets/img/thumbnail.png">
                  </div>
                </div>

                <!-- content -->
                <div class="masterObligatoireContent">
                  <el-form-item label="" prop="title">
                    <el-input class="masterContent" placeholder="Titre (obligatoire)" v-model="hookData.title" prop="title" />
                  </el-form-item>
                  <el-form-item label="" prop="message">
                    <el-input type='textarea' class="masterContent" placeholder="Message" v-model="hookData.message" prop="message" />
                  </el-form-item>
                </div>
                <!-- image -->

                <!-- <el-upload
                  class="image-uploader"
                  :action="this.$store.dispatch('saveHook', this.hookData.image)"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :auto-upload='false'
                  v-model="hookData.image">
                  <img v-if="hookData.image" :src="hookData.image" class="image">
                  <i v-else class="el-icon-plus image-uploader-icon"></i>
                </el-upload> -->


                <el-popover class="myPopOver" placement="bottom" title="image" ref="imageCtrl" width="300" trigger="click">
                  <el-input clearable class="myInput" placeholder="image (url)" v-model="hookData.image" />
                  <div v-for="(imageArray, index) in addImageField" v-bind:key='index'>
                    <el-input clearable  class="myInput" placeholder="image (url)" v-model="hookData.images" />
                  </div>
                  <!-- COM : <el-button class="myInput" @click="addImage"><PhPlus :size="14" color="black" /></el-button> -->
                </el-popover>
                <div class="popTrigger webhookImg" v-popover:imageCtrl>
                  <img v-if="hookData.image" :src="hookData.image">
                  <p v-if="!hookData.image" class="addImage"></p>
                </div>


                <!-- footer -->
                <div v-if="hasFooter">
                  <el-popover class="myPopOver" placement="left" title="Thumbnail" ref="footerCtrl" width="300" trigger="click">
                    <el-input clearable class="myInput" placeholder="thumbnail url" v-model="hookData.footerImg" />
                  </el-popover>
                  <div class="popTrigger footerImg" v-popover:footerCtrl>
                    <img v-if="hookData.footerImg" :src="hookData.footerImg">
                    <img v-if="!hookData.footerImg" src="/../../assets/img/thumbnail.png">
                  </div>
                  <input placeholder="Texte bas de page" v-model="hookData.footerTxt" />
                </div>
                <div class="inlineFooter">
                  <p style="padding:0 15px">date ?</p>
                  <el-switch v-model="server.date"></el-switch>
                </div>
              </el-form>

            </el-col>
            <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
              <el-table class="tableauInfo"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  prop="commande"
                  label="Commandes"
                  width="auto">
                </el-table-column>
                <el-table-column
                  prop="resultat"
                  label="Résultats"
                  width="auto">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>


          <div class="btnControl">
            <el-tooltip class="item" effect="light" content="Revenir aux serveurs" placement="top">
              <el-button type="danger" @click="back"><ph-caret-double-left :size="24" /></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="Envoyer le message" placement="top">
              <el-button v-if="sendeable = true" type="success" submit="true" @click="sendMessage"><ph-paper-plane-right :size="24" /></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="Prévisualiser le message" placement="top">
              <el-button v-if="sendeable = true" type="primary" @click="previewModeVisible = true"><ph-corners-out :size="24" /></el-button>
            </el-tooltip>
            
          </div>

          

        </div>
        <div class="showUp optionContainer" v-if="show == 2">
           <div class="formControl">
            <span style="padding:0 15px">Ajouter une description ? (Non obligatoire)</span>
            <el-switch v-model="hasDesc"></el-switch>
          </div>
          <div class="formControl">
            <span style="padding:0 15px">Ajouter une bas de page ? (Non obligatoire)</span>
            <el-switch v-model="hasFooter"></el-switch>
          </div>
          <div class="formControl">
            <span style="padding:0 15px">Mode développeur ?</span>
            <el-switch v-model="devMode"></el-switch>
          </div>
          <el-form>
            <el-form-item label="Nom du serveur">
              <el-input clearable placeholder="Nom du serveur (court)" v-model="server.name"></el-input>
            </el-form-item>
            <el-form-item label="Description">
              <el-input clearable type="textarea" placeholder="Courte description" v-model="server.desc"></el-input>
            </el-form-item>
            <el-form-item label="Nom du bot (peut être configurer directement dans discord)">
              <el-input clearable placeholder="Nom du bot" v-model="server.usernameBot"></el-input>
            </el-form-item>
            <el-form-item label="Webhook url">
              <el-input clearable placeholder="Lien webhook" v-model="server.url">
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="btnControl">
            <el-button type="danger" @click="backed">Annuler</el-button>
            <el-button type="success" @click="save">Ajouter</el-button>
          </div>

        </div>
        <div class="showUp" v-if="show == 3">
          <p class="serverDesc">{{server.desc}}</p>
        </div>
      </div>
      <el-dialog title="Preview" :visible.sync="previewModeVisible" fullscreen='true'>
        <discord-messages style="margin: 24px 0">
          <discord-message>
            <discord-embed
              slot="embeds"
              :color="hookData.color"
              :title="hookData.masterTitle"
              :thumbnail="hookData.thumbnailImg"
              :image="hookData.image"
              :footer-image="hookData.footerImg"
              :timestamp="server.date"
              :author-name="hookData.author"
              :author-image="hookData.authorAvatar"              
            >
              {{ hookData.desc }}
              <embed-fields slot="fields">
                <embed-field :title="hookData.title" >
                  {{hookData.message}}
                </embed-field>
              </embed-fields>
              <span slot="footer">{{ hookData.footerTxt }}</span>
            </discord-embed>
          </discord-message>
        </discord-messages>
        <div class="btnControl">
          <el-button @click="previewModeVisible = false" style="line-height:26px; float:left;">Quitter la prévisualisation</el-button>
          <el-button type="primary" @click="sendMessage"><span class="sendMessageBtn" >Envoyer </span><ph-paper-plane-right :size="24" class="sendMessageIcon" /></el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { Webhook, MessageBuilder } from 'discord-webhook-node';
import { PhCaretDoubleLeft, PhPlus, PhPaperPlaneRight, PhCornersOut } from "phosphor-vue";


export default {
  components: {
    PhCaretDoubleLeft,
    PhPlus,
    PhPaperPlaneRight,
    PhCornersOut
  },
  data() {
    var validateTitle = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error('Veuillez entrer un titre'));
        } else {
          if (this.hookData.title !== '') {
            this.$refs.hookData.validateField('title');
          }
          callback();
        }
      };
    var validateMessage = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('Veuillez entrer un message'));
      } else {
        if (this.hookData.message !== '') {
          this.$refs.hookData.validateField('message');
        }
        callback();
      }
    };
    return {
      visible: false,
      blue: '#409EFF',
      devMode: false,
      previewModeVisible: false,
      sendeable: false,
      hookData: {
        botName: null,
        author: null,
        authorAvatar: null,
        authorLink: null,
        color: '#409EFF',
        masterTitle: null,
        masterTitleLink: null,
        thumbnail: null,
        image: null,
        images: [], 
        desc: null,
        title: null,
        message: null,
        footerTxt: null,
        footerImg: null
      },
      rules: {
        title: { required: true, validator: validateTitle, trigger: 'blur' },
        message: { required: true, validator: validateMessage, trigger: 'blur' }        
      },
      errorEmpty: null,
      hookDatas: [],
      server:null,
      hook: null,
      hasDesc: false,
      hasFooter: true,
      show: 1,
      tableData: [{
          commande: '<# TXTCHANNELID>',
          resultat: 'Lien vers le channel text',

        },{
          commande: '<# VOICECHANNELID>',
          resultat: "affiche le nom du chan (vocal)",
        }, {
          commande: '<@& ROLEID>',
          resultat: 'Affiche le role',

        }, {
          commande: '<@ USERID>',
          resultat: "affiche le nom d'utilisateur",
        }, {
          commande: 'Ajouter une image ?',
          resultat: "Ex : https://imgur.com/",
        },
      ]
    }
  },
  created() {
    if(this.$route.params.server) {
      this.server = this.$route.params.server;
      this.hook = new Webhook({
        url: this.$route.params.server.url,
        throwErrors: true,
        retryOnLimit: true
      });
      
    } else {
      this.server = { name:'', desc: '', url: '', date: false, usernameBot: '' };
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.hookData.image = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 8;
      if (!isLt2M) {
        this.$message.error('L\'avatar ne peut pas excéder 2Mb !');
      }
      return isLt2M;
    },
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
      this.$router.push('/webhook');
    },
    backed() {
      this.show = 1;
    },
    async save() {
      await this.$store.dispatch('saveServer', this.server);
      console.log('back');
      this.$notify({
        title: 'Succès',
        type: 'success',
        message: 'Paramètres sauvgardés',
        position: 'bottom-right'
      })
    },

    sendMessage() { //Ajouter la validation avant le pop du dialog, puis set la const embed. Faire en sorte de pouvoir ajouter de nouveau Fields (.addField) & plusieurs embed. & couleur


        const embed = new MessageBuilder();
        if(this.hookData.botName == null || this.hookData.botName == '') {
          this.hook.setUsername(this.server.usernameBot);
        } else  {
          this.hook.setUsername(this.hookData.botName);
        } 
        
        this.hook.setAvatar(this.hookData.avatar);
        
        embed.setTitle(this.hookData.masterTitle)
        embed.setAuthor(this.hookData.author, this.hookData.authorAvatar, this.hookData.authorLink)
        embed.setURL(this.hookData.masterTitleLink)
        embed.addField(this.hookData.title, this.hookData.message) //la seule chose absolument obligatoire dans le form
        //.addField('Second field', 'this is not inline')
        embed.setColor(this.hookData.color)
        embed.setThumbnail(this.hookData.thumbnail)
        embed.setDescription(this.hookData.desc)
        embed.setImage(this.hookData.image)
        embed.setFooter(this.hookData.footerTxt, this.hookData.footerImg)
        if(this.server.date == true){
          embed.setTimestamp();
        }

        this.$confirm('Voulez-vous envoyer ce message ?', 'Attention', {
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
          type: 'warning'
        }).then(() => {
          (async () => {
            try {
              
              await this.hook.send(embed)
              this.$notify({
                title: 'Succès',
                type: 'success',
                message: 'Message envoyé',
                position: 'bottom-right'
              })
              if(this.previewModeVisible === true) {
                this.previewModeVisible = false
              }
            }
            catch(e){
              
              this.$notify({
                title: 'Erreur',
                type: 'error',
                message: "Une erreur dans le formulaire, vérifier si toutes les informations sont bien remplis (Liens des images, etc) ainsi qu'un titre & un message non vide.",
                position: 'bottom-right'
              })
              if(this.devMode == true) {
                this.$message.error(e.message);
              }
              if(this.previewModeVisible === true) {
                this.previewModeVisible = false
              }
            }
          })()
      })
    },
    addImageField(){
      this.hookDatas.push(this.hookData.image)
    },
    delImage: function (index) {
      this.hookDatas.splice(this.hookDatas.image, index);
    },
  }
}
</script>
<style lang="scss">
  @import '~@asigloo/vue-dynamic-forms/src/styles/themes/default.scss';
</style>
<style scoped>
.image-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
}
.image-uploader .el-upload:hover {
  border-color: #409EFF;
}
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  margin: 15px auto;
  text-align: center;
}
.image {
  width: 178px;
  height: 178px;
  display: block;
}
.colopickerwrapper {
  position: absolute;
  top: 0; right: 0;
  margin: 0;
  padding: 0;
  float: right;
}
.optionContainer {
  width: 60%;
  margin: auto;
}
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
  width: 80%;
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

.inlineFooter {
  display: inline-flex;
  padding: 0 24px;
  margin: 15px 0;
  color: white;
  line-height: 0px;

}

.inlineFooter p  {
  display: block;
  float: left;
  margin-top: 10px;
}

.title {
  margin: 0;
  font-family: 'discord';
}

.buttonsWrapper { 
  display: block;
  width: fit-content;
  margin: 0 auto;
}

.buttonsValidation {
  margin: 25px !important
}


.discWebhook_form {
  position: relative;
  background:rgb(27, 28, 31);
  padding:15px;
  border-radius: 3px;
  width: calc(100% - 50px);
  margin-top:24px;
  margin-left: 50px;
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

.myInput {
  margin-top: 10px;
}
.myPopOver > div {
  padding: 30px !important
}
.discWebhook_form input:focus {
  border: none;
  border-bottom: 1px solid white;
  outline: 0;
}
.tableauInfo {
  margin: 99px 0;
  border-radius: 5px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  background: #222;
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


.masterObligatoireContent {
  position: relative;
  width: 100%;
  display: block;
  margin: 55px 0;
}
.masterContent {
  padding: 0 10px;
  box-sizing: border-box;
  background-color: transparent !important;
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
.usernameBot {
  display: inline-block;
  width: fit-content;
}
.usernameBot img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  float: left;
}
.usernameBot h2 {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  margin: 0;
  padding: 0 24px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5em;

}
.sendMessageBtn {
  display: block;
  line-height: 24px;
  float: left;
  padding: 0 15px
}

.sendMessageIcon {
  padding: 0 5px
}
</style>