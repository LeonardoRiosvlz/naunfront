<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
      <div class="d-lg-flex mb-4">
      <div class="chat-leftsidebar">
        <div class="p-3 border-bottom">
          <div class="media">

            <div class="media-body">
              <h5 class="font-size-15 mt-0 mb-1">{{form.nombre}}</h5>
            </div>
            <div>
              <b-dropdown class="chat-noti-dropdown" right variant="white">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-horizontal font-size-20"></i>
                </template>
                <b-dropdown-item @click="listarLibreas()">Adjuntar Oprotunidades de mejora</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>



        <div class="chat-leftsidebar-nav">
          <b-tabs pills fill content-class="py-4" justified>
             <b-tab active>
              <template v-slot:title>
                <i class="ri-timer-flash-fill font-size-20"></i>
                <span class="mt-2 d-none d-sm-block">Adjuntas</span>
              </template>
              <b-card-text>
                <h5 class="font-size-14 px-3 mb-3">Adjuntas</h5>
                <ul class="list-unstyled chat-list">
                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body"
                            >G</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">General</h5>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="ri-time-line font-size-20"></i>
                <span class="mt-2 d-none d-sm-block">Programadas</span>
              </template>
              <b-card-text>
                <h5 class="font-size-14 px-3 mb-3">Prgrmadas</h5>
                <ul class="list-unstyled chat-list">
                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body"
                            >G</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">General</h5>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <div class="w-100 user-chat mt-4 mt-sm-0">
        <div class="p-3 px-lg-4 user-chat-border">
          <div class="row">
            <div class="col-md-4 col-6">
              <h5 class="font-size-15 mb-1 text-truncate">Plan de accion </h5>
              <p class="text-muted text-truncate mb-0">
                Periodo: 2020
              </p>
            </div>
          </div>
        </div>

        <div class="px-lg-2 chat-users">
          <div class="chat-conversation p-3">
          </div>
          <div class="px-lg-3">
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";


/**
 * Dashboard component
 */
export default {
  components: {
    vueDropzone: vue2Dropzone,
    Layout,
    PageHeader,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      title: "Administracion",
      items: [
        {
          text: "Gestión de clientes"
        },
        {
          text: "AUTOEVALUACION CUALITATIVA",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      gallery_antes:null,
      ver:false,
      url:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      email: "",
      grupoid: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      periodos: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["id","grupo_de_estandares","numero_de_estandar","total","status","actions"],
      bases: [], 
      base: [], 
      todas: [],
      mejoras: [], 
      estandares:[], 
      autoevaluaciones:[],
      grupos:[], 
      subgrupos:[], 
      editMode:false,
      editModeMejora:false,
      priorizada:0,
      sinpriorizar:0,
      programadas:0,
      form:{
            'id': '',
            'nombre':'',
            'descripcion':'',
          },
          mejora:{
            'id': '',
            'status': 'SIN PRIORIZAR',
            'oportunidad_mejoras': '',
            'puntaje_volumen': 1,
            'puntaje_costo': 1,
            'puntaje_riesgo':1,
            'total':1,
          }
    }
  },

  methods: {
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarAutoevaluacion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarAutoevaluacion();
          } else {
        }});
      }
    },
    switchLocMejora(){
      if (!this.editModeMejora) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.AgregarMejoraC();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarMejoraC();
          } else {
        }});
      }
    },
//////mejora///////
      AgregarMejoraC(){
        this.$swal({
          title: 'Desea agregar una nueva  oportnidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.agregarMejora();
          }
        })
      },
      async agregarMejora(){
     let data = new FormData();
      var formulario = this.mejora;
        for (var key in formulario) {
            if (key=='fortalezas') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       data.append("autoevaluacion_id",this.form.id);
       await this.axios.post('api/mejoras', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.setear_mejoras(this.form.id);
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
      editarMejoraC(id){
        this.$swal({
          title: 'Desea editar esta oportunidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.editarMejora(id);
          }
        })
      },  
    async editarMejora(){
     let data = new FormData();
       var formulario = this.mejora;
        for (var key in formulario) {
            if (key=='fortalezas') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/mejoras', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarAutoevaluacion();
               this.listarMejoras();
               this.$root.$emit("bv::hide::modal", "modal_mejora", "#btnShow");
               ///limpiar el formulario
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
    eliminarOportunidadC(id){
        this.$swal({
          title: 'Desea borrar esta oportunidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarOportnidaM(id);
          }
        })
      },
      async eliminarOportnidaM(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/mejoras/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.setear_mejoras(this.form.id);
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },
//////mejora///////      
    async listarPlan(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/planes/accion/find', data)
          .then((response) => {
            console.log(response);
             if (response.status==200) {
               console.log(response.data);
              this.form.id=response.data.id; 
              this.form.nombre=response.data.nombre; 
              this.form.descripcion=response.data.descripcion; 
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async setear_mejoras(id){
        console.log(id);
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/autoevaluacion/find',data)
          .then((response) => {
            console.log(response);
             if (response.status==200) {
              this.mejoras=response.data.mejoras;   
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async setear_mejora(id){
        console.log(id);
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/mejoras/find',data)
          .then((response) => {
            console.log(response);
             if (response.status==200) {
               console.log(response.data.id);
              this.mejora.id=response.data.id; 
              this.mejora.oportunidad_mejoras=response.data.oportunidad_mejoras; 
              this.mejora.puntaje_costo=response.data.puntaje_costo; 
              this.mejora.puntaje_riesgo=response.data.puntaje_riesgo; 
              this.mejora.puntaje_volumen=response.data.puntaje_volumen; 
              this.mejora.status=response.data.status; 
              this.mejora.total=response.data.total; 
               this.editModeMejora=true;
               this.$root.$emit("bv::show::modal", "modal_mejora", "#btnShow");
               this.calculo(); 
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
    async listarbases(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/basesau/listar',data)
        .then((response) => {
          this.bases = response.data;

        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
   async listarAutoevaluacion(){
       console.log("hey");
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/autoevaluacion/listar',data)
        .then((response) => {
          this.autoevaluaciones = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async  listarestandares(){
          await this.axios.get('api/estandares/listar')
          .then((response) => {
              this.estandares = response.data;
          })
          .catch((e)=>{
              console.log('error' + e);
          })
      },

        async  listarestandares(){
            await this.axios.get('api/estandares/listar')
            .then((response) => {
                this.estandares = response.data;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
        },
        async  listargruposestandares(){
            await this.axios.get('api/estandares/grupos/listar')
            .then((response) => {
                console.log(response.data)
                this.grupos = response.data;
                for (let index = 0; index < this.grupos.length; index++) {
                  if (this.grupos[index].id==1) {
                     this.subgrupos=this.grupos[index].subgrupo_estandares;
                  } 
                }
            })
            .catch((e)=>{
                console.log('error' + e);
            })
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
      async listarMejoras(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/mejoras/todas',data)
          .then((response) => {
             if (response.status==200) {
                 this.todas=response.data;
                 this.form.periodo_id=this.base.periodo.id;
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
      async filtrar(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
      data.append('grupo_id',this.grupoid);
        await this.axios.post('api/mejoras/filtrar',data)
          .then((response) => {
             if (response.status==200) {
                 this.todas=response.data;
                 console.log(this.todas.length);
                 if (this.todas.length<1) {
                  this.$swal(
                    'No existen oprutnidades de mejoras para este grupo!',
                      '',
                      'warning'
                    );
                 }
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
      async listarperiodos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/periodo/listar',data)
            .then((response) => {
            this.periodos = response.data;
            })
            .catch((e)=>{
            console.log('error' + e);
            })
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
        this.listarPlan();
      },
   watch: {
      cliente: function () {
       this.listarPlan();
       this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.id;
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.todas.length;
    },
  },
}
</script>
