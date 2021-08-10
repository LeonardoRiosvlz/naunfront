<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body overflow-auto">
            <div class="row" v-if="notificaciones.length<1">
              <div class="col-lg-12">
                <b-card no-body>
                  <b-row no-gutters class="align-items-center">

                    <b-col md="8">
                      <b-card-body title="No tienes notificaciones">
                      </b-card-body>
                    </b-col>
                    <b-col md="12">
                      <b-card-img src="" class="rounded-0"></b-card-img>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
            </div> 
          <simplebar style="min-height:530px; max-height:530px;" v-else>
            <a v-for="(msg, index) in notificaciones" :key="index"  class="text-reset notification-item">
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
                     Remitente: {{msg.remitente.nombre }} {{msg.remitente.apellido }}
    
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{msg.created_at | capitalize }}
                    </p>
                    <div class="row" style="margin-left:92%">
                        <div class="col-6">
                            <button class="btn btn-sm btn-success my-1" v-if="msg.status==='Pendiente'"  @click="editarNotificacion(msg.id)"><i class="fas fa-eye"></i></button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-sm btn-danger my-1"   @click="eliminarNotificacion(msg.id)"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>

import vue2Dropzone from "vue2-dropzone";
import simplebar from "simplebar-vue";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import moment from 'moment';


/**
 * Dashboard component
 */
export default {
  components: {
    vueDropzone: vue2Dropzone,
    Layout,
    PageHeader,
    ValidationProvider,
    ValidationObserver,
    simplebar
  },
  data() {
    return {
      title: "Usuarios",
      items: [
        {
          text: "Notificaciones"
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      ver:false,
      url:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      email: "",
      password: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["cargo","descripcion","actions"],
      notificaciones: [], 
      editMode:false,
      form:{
          'id':'',
          'cargo':'',
          'descripcion':'',
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarUsers();
  },
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          let fecha = moment();
            let dias =fecha.diff(value, 'days'); 
            let horas =fecha.diff(value, 'hours'); 
            let minutos =fecha.diff(value, 'minutes'); 
          if (dias>1) {
           return "hace " + dias + " dias."; 
          } if (dias== 0 && horas>1) {
               return "hace " + horas + " horas."; 
          } else {
               return "hace " + minutos + " minutos."; 
          }

        }
    },
  methods: {

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarCargo();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarCargos();
          } else {
        }});
      }
    },
   async agregarCargo(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/cargos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarCargos();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
    async editarNotificacion(id){
     let data = new FormData();
     data.append("id",id);
   
        await this.axios.put('api/notificacion', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarNotificaciones();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarNotificacions(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/notificacion/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarNotificaciones();
                }
              }).catch(e => {

            this.$swal(
                    'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
      }, 
      eliminarNotificacion(id){
        this.$swal({
          title: 'Desea borrar?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarNotificacions(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
      },
      setear(id) {
        for (let index = 0; index < this.cargos.length; index++) {
          if (this.cargos[index].id===id) {
            this.form.id=this.cargos[index].id;
            this.form.cargo=this.cargos[index].cargo;
            this.form.descripcion=this.cargos[index].descripcion;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      setEmail(){
        this.form.username=this.form.email;
        console.log("holas");
      },
      setRoles(){
        if (this.form.tipo==="Administrador") {
            this.form.codigo="";
            this.form.entidad="No";
            this.form.cargo=""
            this.form.roles="3"
        } else if(this.form.tipo==="Coordinador") {
            this.form.entidad="No";
            this.form.cargo="";
            this.form.roles="2"
        }else{
            this.form.roles="1"
        }
      },
      onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
      },
      toggleModal () {
        this.modal = !this.modal
      },
          async listarNotificaciones(index){
      await this.axios.get('api/notificacion/todas').then(response => {
        if (response.status==200) {
            this.notificaciones=response.data.rows;
          }

        }).catch(e => { 
    });
    },
      session(){
        if (localStorage.getItem('token')) {
          const token=localStorage.getItem('token');
          this.guardarUsuario(token);
          }else{
          this.$router.push({ name: 'Home' });
          }
        }
  },
    created(){
        this.session();
        this.listarNotificaciones();

      },
     mounted() {

    },
    computed: {
    rows() {
      return this.cargos.length;
    },
  },
}
</script>
