<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-dark.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="20" />
            </span>
          </a>

          <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-light.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="20" />
            </span>
          </a>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>
      </div>
      
      <div class="d-flex">
        <div class="dropdown d-inline-block d-lg-none ml-2">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            id="page-header-search-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="ri-search-line"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
            aria-labelledby="page-header-search-dropdown"
          >
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search ..." />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <b-dropdown
          class="d-none d-lg-inline-block d-lg-inline-block ml-1"
          menu-class="dropdown-menu-lg"
          right
          toggle-class="header-item noti-icon"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="ri-apps-2-line"></i>
          </template>
          <div class="px-lg-2">
            <div class="row no-gutters">
              <div class="col-4" v-for="clientes in clientes" :key="clientes.id">
                <a class="dropdown-icon-item" href="javascript: void(0);" @click="cambiarCliente(clientes)">
                  <img  src="@/assets/images/brands/slack.png" alt="Github" />
                  <span>{{clientes.nombre_prestador}}</span>
                </a>
              </div>
            </div>
            
          </div>
        </b-dropdown>

        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            @click="initFullScreen"
          >
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

        <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="ri-notification-3-line"></i>
            <span class="noti-dot"></span>
          </template>
          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">{{ $t('navbar.dropdown.notification.text')}}</h6>
              </div>
              <div class="col-auto">
                <a href="#!" class="small">{{ $t('navbar.dropdown.notification.subtext')}}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px;">
            <a v-for="(msg, index) in notificaciones" :key="index" href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs mr-3">
                  <span :class="msg.color">
                    <i :class="msg.icon"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">{{msg.titulo}}</h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">{{msg.descripcion}}</p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{msg.created_at | capitalize }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div class="p-2 border-top">
            <a
              class="btn btn-sm btn-link font-size-14 btn-block text-center"
              href="javascript:void(0)"
            >
              <i class="mdi mdi-arrow-right-circle mr-1"></i>
              {{ $t('navbar.dropdown.notification.button')}}
            </a>
          </div>
        </b-dropdown>

        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          class="d-inline-block user-dropdown"
        >
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-2.jpg"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1">{{usuarioDB.nombre}} {{usuarioDB.apellido}}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <a class="dropdown-item" href="/perfil">
            <i class="ri-user-line align-middle mr-1"></i>
            Perfil
          </a>

          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-danger"  @click="salir()">
            <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
            {{ $t('navbar.dropdown.kevin.list.logout') }}
          </a>
        </b-dropdown>


      </div>

  <notifications group="foo" />
    </div>
  </header>
</template>
<script>

import io from 'socket.io-client';
import simplebar from "simplebar-vue";
import i18n from "../i18n";
import {mapState,mapMutations, mapActions} from 'vuex'
import moment from 'moment';
export default {
  data() {
    return {
      socket : io('https://naun.herokuapp.com/'),
      canal: '',
      user: '',
      message: '',
      messages: [],
      clientes: [],
      notificaciones: [],
      languages: [
      ],
      current_language: "en"
    };
  },
  components: { simplebar },
  computed:{
    ...mapState(['usuarioDB','cliente'])
 },
    filters: {
        capitalize: function (value) {
          if (!value) return ''
          let fecha = moment();
          value ="hace " +fecha.diff(value, 'minutes')+ " minutos."; 
          
          return value
        }
    },
  methods: {
    sendMessage(e) {
        e.preventDefault();
        //console.log(this.socket.id);
        this.socket.emit('servidor', {
            user: this.user,
            message: this.message,
            usuario: this.socket.id
        });
        this.message = ''
    }, 
    ...mapActions(['cerrarSession','cargar','SetCliente']),
    cambiarCliente(index){
      console.log("h2y");
      this.SetCliente(index);
    },
     salir(){
      localStorage.removeItem('token');
      this.$router.push({ name: '/' });
      this.cerrarSession();
     },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale) {
      i18n.locale = locale;
      this.current_language = i18n.locale;
    },
  async chanel(index){
      let data = new FormData();
      data.append("canal",index);
      await this.axios.put('api/user/canal', data).then(response => {
        if (response.status==200) {
          }
        }).catch(e => { 
    });
    },
    async listarNotificaciones(index){
      await this.axios.get('api/notificacion/').then(response => {
        if (response.status==200) {
            this.notificaciones=response.data.rows;
          }
        }).catch(e => { 
    });
    },
   async  listarContactos(){
      await this.axios.get('api/clientes')
        .then((response) => {
          this.clientes = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
    },
  },
mounted(){
      if (localStorage.getItem('cliente')) {
          let client=localStorage.getItem('cliente');
          client=JSON.parse(client)
          this.cambiarCliente(client);
          console.log(client);
          }
},
  created(){
      this.listarContactos();
      
      this.listarNotificaciones();
      this.socket.on('connect', () => {
        this.chanel(this.socket.id)
      });
      this.socket.on('cliente', (data) => {
        console.log(data);
        this.listarNotificaciones();
        this.$notify({
          group: 'foo',
          title: 'Nueva notificacion',
          text: 'Hola tienes una nueva notificacion!'
        });
        this.cargar();
      });
      this.socket.on('chat', (data) => {
        console.log(this.usuarioDB.id);
         console.log(data);
        if (data==this.usuarioDB.id) {
          this.cargar();
       }else{
        this.$notify({
          group: 'foo',
          title: 'Nuevo chat',
          text: 'Hola tienes una nueva notificacion!'
        });
        this.cargar();
       }
        this.listarNotificaciones();
        
      });

  }
};
</script>
<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>