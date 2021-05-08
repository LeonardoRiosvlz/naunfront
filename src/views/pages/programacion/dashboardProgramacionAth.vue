<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-vertical"></i>
                </template>
                <!-- item-->
                <b-dropdown-item  @click="setear();form.status='Programada'" v-if="!programacion[0].Tecnico_ath">PROGRAMAR</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item  @click="setear();form.status='Reprogramada'" v-if="programacion[0].Tecnico_ath">REPROGRAMAR</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item>Profit</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item>Action</b-dropdown-item>
              </b-dropdown>

              <h4 class="card-title mb-3"> CONSECUTIVO ATH-{{programacion[0].id}}</h4>
                <b-card no-body >
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4" v-if="programacion[0].cajero_ath.entidad">
                      <b-card-img :src="programacion[0].cajero_ath.entidad.imagen" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body title="ATH">
                        <b-card-text style="margin:0">{{programacion[0].titulo}}</b-card-text>

                        <p class="card-text">
                          <small class="text-muted">{{programacion[0].titulo}}</small>
                        </p>
                        <p class="card-text">
                          <small class="text-danger"> {{programacion[0].fecha_vencimiento | capitalize }}</small>
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              <div>
                <div class="text-center">
                 <h4 class="text-danger" v-if="!programacion[0].Tecnico_ath">Llamada no programada</h4> 
                </div>
                <b-card no-body v-if="programacion[0].Tecnico_ath">
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4">
                      <b-card-img :src="programacion[0].Tecnico_ath.imagen" rounded="circle"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body :title="'Técnico:'+programacion[0].Tecnico_ath.nombre+''+ programacion[0].Tecnico_ath.apellido">
                          <b-card-text style="margin:0">Tipo : {{programacion[0].Tecnico_ath.tipo_tecnico}}</b-card-text>
                          <b-card-text style="margin:0">Codigo : {{programacion[0].Tecnico_ath.codigo}}</b-card-text>
                          <b-card-text style="margin:0">Dirección : {{programacion[0].Tecnico_ath.direccion}}</b-card-text>
                          <b-card-text style="margin:0">Teléfono : {{programacion[0].Tecnico_ath.telefono}}</b-card-text>
                          <b-card-text style="margin:0">Email : {{programacion[0].Tecnico_ath.email}}</b-card-text>
                        <p class="card-text">
                          <small class="text-danger"> {{programacion[0].vencimiento_tecnico | capitalize }}</small>
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
            </div>
          </div>
      </div>
      <div class="col-lg-8">
       <div class="card">
          <div class="card-body">
            <h4 class="card-title">Detalles de consecutivo</h4>
            <b-tabs justified nav-class="nav-tabs-custom" content-class="text-muted">
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">F.S.T./Abonos</span>
                </template>
                <Fst />
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Gestion</span>
                </template>
                  <Gestion />
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-cog"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Cierre</span>
                </template>
         
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    
      <div class="col-lg-12">
  
      </div>
    </div>


    <b-modal id="programar" false size="lg"  title="Programar" hide-footer>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                  <div class="form-group">
                    <label v-if="programacion[0].requiere_cita==='Si'">Fecha de cita </label><label v-else>Fecha limite </label>
                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                      <b-form-input id="date-time" v-model="form.vencimiento_tecnico"  type="datetime-local"></b-form-input>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Tecnicos de la regional</label>
                    <ValidationProvider name="Tecnico" rules="required" v-slot="{ errors }">
                          <select v-model="form.codigo_tecnico"  name="cotizacion_visita" @change="buscarTecnico()"  class="form-control " >
                              <option value=""></option>
                              <option v-for="tecnicos in tecnicos" :key="tecnicos.codigo" :value="tecnicos.codigo">{{tecnicos.nombre}} {{tecnicos.apellido}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Código Tecnico</label>
                    <ValidationProvider name="codigo tecnico" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo_tecnico"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col class="p-2" >
                  <div class="form-group" style="margin-top:20px">
                    <button class="btn btn-info btn-block" @click="buscarTecnico()" :disabled="ver"> Buscar Tecnico</button>
                   </div>
                </b-col>
              </b-row>
              <b-row>
              <b-col>
                 <b-card no-body v-if="tecnico.length>0">
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4">
                      <b-card-img :src="tecnico[0].imagen" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body :title="'Técnico:'+tecnico[0].nombre+''+ tecnico[0].apellido">
                          <b-card-text style="margin:0">Tipo : {{tecnico[0].tipo_tecnico}}</b-card-text>
                          <b-card-text style="margin:0">Codigo : {{tecnico[0].codigo}}</b-card-text>
                          <b-card-text style="margin:0">Dirección : {{tecnico[0].direccion}}</b-card-text>
                          <b-card-text style="margin:0">Teléfono : {{tecnico[0].telefono}}</b-card-text>
                          <b-card-text style="margin:0">Email : {{tecnico[0].email}}</b-card-text>
                          <b-card-text style="margin:0" v-if="tecnico[0].tipo_tecnico==='Contratista'">Email : {{tecnico[0].nombre_cuenta}}</b-card-text>
                          <b-card-text style="margin:0" v-if="tecnico[0].tipo_tecnico==='Contratista'">Email : {{tecnico[0].cuenta}}</b-card-text>
                      <p class="card-text">
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
              </b-row>         
        </ValidationObserver>
        <pre>{{form}}</pre>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Programar</button>
     </b-modal>



  </Layout>
</template>

<script>

import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import moment from 'moment';
import Fst from './fst';
import Gestion from './gestion';
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
    Fst,
    Gestion
  },
  data() {
   
     return {
      fileSingle: [],
      title: "PROCESOS",
      items: [
        {
          text: "Servicios ATH"
        },
        {
          text: "Detalles",
          active: true
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
      cajero: [], 
      tecnicos: [], 
      tecnico: [],
      consecutivo: [], 
      programacion: [{
        id:"",
        cajero_ath:{
          entidad:""
        }
        
      }], 
      editMode:false,
      form:{
          'id':'',
          'cargo':'',
          'descripcion':'',
          'tecnico_id':'',
          'codigo_Tecnico':'',
          'status':'',
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
          value = fecha.diff(value, 'hours')+ " horas para caducar."; 
          
          return value
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

        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.confirmarProgramar();
            } 
          });        
        
    },
    async programar(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.post('/api/programacion/ath/programar', data).then(response => {
            if (response.status==200) {
               this.$swal('Programado con exito','','success');
               this.loadConsecutivo();
               this.$root.$emit("bv::hide::modal", "programar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarCargos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/cargos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarCargos();
                }
              }).catch(e => {

                this.$swal(e.response.data);
          });
      }, 
      async buscarTecnico(){
        let data = new FormData();
        data.append('codigo',this.form.codigo_tecnico);
        await this.axios.post('/api/user/tecnico',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
      
                this.tecnico=response.data;
                if (this.tecnico.length>0) {
                  this.form.tecnico_id=this.tecnico[0].id;
                }else{
                  this.$swal('No existe tecnico con este codigo','','warning');
                }
                }
              }).catch(e => {

                this.$swal(e.response.data);
          });
      },
      confirmarProgramar(){
        this.$swal({
          title: 'Desea realizar este cambio?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.programar();
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
    async loadConsecutivo(){
      let data = new FormData();
       data.append('id',this.consecutivo.id);
       await this.axios.post('api/programacion/ath/find',data)
        .then((response) => {
          this.programacion = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      setear(){
        this.form.id=this.programacion[0].id;
        this.form.regional=this.programacion[0].cajero_ath.ciudad.regional_id;
        this.$root.$emit("bv::show::modal", "programar", "#btnShow");
        this.loadRegional();
      },
      async loadRegional(){
      let data = new FormData();
       data.append('id',this.form.regional);
       await this.axios.post('api/user/regional',data)
        .then((response) => {
          this.tecnicos = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
      },
      toggleModal () {
        this.modal = !this.modal
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
        this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
        this.loadConsecutivo();
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
