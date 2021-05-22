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
                <b-dropdown-item  @click="setear();form.status='Programada'" v-if="!programacion[0].Tecnico_ath">Programar</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item  @click="setear();form.status='Reprogramada'" v-if="programacion[0].Tecnico_ath">Reprogramar</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item @click="escalar()">Escalar</b-dropdown-item>
  
                <b-dropdown-item @click="cerrar()">Cerrar</b-dropdown-item>

                <b-dropdown-item @click="rechazar()">Rechazar</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item @click="archivar()">Archivar</b-dropdown-item>
              </b-dropdown>

              <h4 class="card-title mb-3"> CONSECUTIVO ATH-{{programacion[0].id}}</h4>
       
                  <b-badge variant="warning" v-if="programacion[0].status==='Pendiente'">Pendiente</b-badge>
                  <b-badge variant="info" v-if="programacion[0].status==='Programada'">Programada</b-badge>
                  <b-badge variant="info" v-if="programacion[0].status==='Reprogramada'">Reprogramada</b-badge>
                  <b-badge variant="success" v-if="programacion[0].status==='Escalada'">Escalada</b-badge>
                  <b-badge variant="danger" v-if="programacion[0].status==='Rechazada'">Rechazada</b-badge>
                  <b-badge variant="primary" v-if="programacion[0].status==='Archivada'">Archivada</b-badge>
                  <b-badge variant="primary" v-if="programacion[0].status==='Cerrada'">Cerrada</b-badge>
                  <b-badge variant="success" v-if="programacion[0].status==='Aceptada'">Aceptada</b-badge>
                  <b-badge variant="warning" v-if="programacion[0].status==='Devuelta'">Devuelta</b-badge>
                  <b-badge variant="primary" v-if="programacion[0].status==='Creada'">Creada</b-badge>
              <div class="row">
                <div class="col-md-12 col-sm-6">
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
                </div>
                <div class="col-md-12 col-sm-6">
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
              <div>
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
                  <span class="d-none d-sm-inline-block">Gestión</span>
                </template>
                  <Gestion />
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-cog"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Notas</span>
                </template>
                 <Chat />
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
                    <label v-if="programacion[0].requiere_cita==='Si'">Fecha de cita </label><label v-else>Fecha límite para el técnico </label>
                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                      <b-form-input id="date-time" v-model="form.vencimiento_tecnico"  type="datetime-local"></b-form-input>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Técnicos de la regional</label>
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
                    <label>Código Técnico</label>
                    <ValidationProvider name="codigo tecnico" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo_tecnico"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col class="p-2" >
                  <div class="form-group" style="margin-top:20px">
                    <button class="btn btn-info btn-block" @click="buscarTecnico()" :disabled="ver"> Buscar Técnico</button>
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
   
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Programar</button>
     </b-modal>


    <b-modal id="modal_escalar" false size="lg"  title="Escalado" hide-footer>
          <ValidationObserver ref="form"> 
              <b-row>

                <b-col>
                    <div class="form-group">
                    <label>Motivo de escalado</label>
                    <ValidationProvider name="motivo escalado" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="motivo_escalado"
                              v-model="form.motivo_escalado"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" v-if="form.motivo_escalado" @click="enviarEscalado()">Enviar</button>
     </b-modal>

    <b-modal id="modal_cierre" false size="lg"  title="Cerrar" hide-footer>
          <ValidationObserver ref="form"> 
              <b-row>

                <b-col>
                    <div class="form-group">
                    <label>Motivo de cierre</label>
                    <ValidationProvider name="motivo cierre" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="motivo_cierre"
                              v-model="form.motivo_cierre"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" v-if="form.motivo_cierre" @click="enviarCierre()">Enviar</button>
     </b-modal>



    <b-modal id="modal_archivar" false size="lg"  title="Archivar" hide-footer>
          <ValidationObserver ref="form"> 
              <b-row>

                <b-col>
                    <div class="form-group">
                    <label>Motivo de archivado</label>
                    <ValidationProvider name="motivo archivado" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="motivo_archivado"
                              v-model="form.motivo_archivado"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" v-if="form.motivo_archivado" @click="enviarArchivado()">Enviar</button>
     </b-modal>



    <b-modal id="modal_rechazo" false size="lg"  title="Rechazar" hide-footer>
          <ValidationObserver ref="form"> 
              <b-row>

                <b-col>
                    <div class="form-group">
                    <label>Motivo de rechazo</label>
                    <ValidationProvider name="motivo escalado" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="motivo_rechazo"
                              v-model="form.motivo_rechazo"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" v-if="form.motivo_rechazo" @click="enviarRechazo()">Enviar</button>
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
import Chat from './chat';

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
    Gestion,
    Chat
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
          'motivo_escalado':'',
          'motivo_rechazo':'',
          'motivo_archivado':'',
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
      enviarEscalado(){
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
            this.procesarEscalado();
          }
        })
      },
      
      async procesarEscalado(){
        let data = new FormData();
        data.append('id',this.form.id);
        data.append('motivo_escalado',this.form.motivo_escalado);
        await this.axios.post('/api/programacion/ath/escalar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
              this.$swal(
                    'Editado con exito!',
                      '',
                      'success'
                );
                  this.loadConsecutivo();
                     this.$root.$emit("bv::hide::modal", "modal_escalar", "#btnShow");
                }
              }).catch(e => {

                this.$swal(e.response.data);
          });
      },

      enviarCierre(){
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
            this.procesarCierre();
          }
        })
      },
      async procesarCierre(){
        let data = new FormData();
        data.append('id',this.form.id);
        data.append('motivo_cierre',this.form.motivo_cierre);
        await this.axios.post('/api/programacion/ath/cerrar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
              this.$swal(
                    'Editado con exito!',
                      '',
                      'success'
                );
                  this.loadConsecutivo();
                     this.$root.$emit("bv::hide::modal", "modal_cierre", "#btnShow");
                }
              }).catch(e => {

                this.$swal(e.response.data);
          });
      },
       enviarArchivado(){
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
            this.procesarArchivado();
          }
        })
      },
      async procesarArchivado(){
        let data = new FormData();
        data.append('id',this.form.id);
        data.append('motivo_archivado',this.form.motivo_archivado);
        await this.axios.post('/api/programacion/ath/archivar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
              this.$swal(
                    'Editado con exito!',
                      '',
                      'success'
                );
                  this.loadConsecutivo();
                     this.$root.$emit("bv::hide::modal", "modal_archivar", "#btnShow");
                }
              }).catch(e => {

                this.$swal(e.response.data);
          });
      },
      enviarRechazo(){
        this.$swal({
          title: 'Desea rechazar esta programación?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.procesarRechazo();
            
          }
        })
      },
      async procesarRechazo(){
        let data = new FormData();
        data.append('id',this.form.id);
        data.append('coordinador_id',this.form.coordinador_id);
        data.append('motivo_rechazo',this.form.motivo_rechazo);
        await this.axios.post('/api/programacion/ath/rechazar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
              this.$swal(
                    'Rechazado con exito!',
                      '',
                      'success'
                );
                  this.loadConsecutivo();
                     this.$root.$emit("bv::hide::modal", "modal_rechazo", "#btnShow");
                }
              }).catch(e => {

                this.$swal(e.response.data);
          });
      },
    async loadConsecutivo(){
      this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
      let data = new FormData();
      console.log(this.consecutivo.id);
       data.append('id',this.consecutivo.id);
       await this.axios.post('api/programacion/ath/find',data)
        .then((response) => {
          this.programacion = response.data;
          console.log(this.programacion);
          localStorage.setItem("consecutivo", JSON.stringify(this.programacion[0]));
         this.consecutivo=this.programacion;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      setear(){
        this.form.id=this.programacion[0].id;
        this.form.regional=this.programacion[0].cajero_ath.ciudad.regional_id;
        this.form.vencimiento_tecnico=moment(this.consecutivo[0].fecha_vencimiento).format("YYYY-MM-DDTHH:MM");
        this.$root.$emit("bv::show::modal", "programar", "#btnShow");
        this.loadRegional();
      },
      escalar(){
        this.form.id=this.programacion[0].id;
        this.form.motivo_escalado="";
        this.$root.$emit("bv::show::modal", "modal_escalar", "#btnShow");
      },
      cerrar(){
        this.form.id=this.programacion[0].id;
        this.form.motivo_escalado="";
        this.$root.$emit("bv::show::modal", "modal_cierre", "#btnShow");
      },
      archivar(){
        this.form.id=this.programacion[0].id;
        this.form.motivo_archivado="";
        this.$root.$emit("bv::show::modal", "modal_archivar", "#btnShow");
      },
      rechazar(){
        this.form.id=this.programacion[0].id;
        this.form.coordinador_id=this.programacion[0].coordinador_id;
        this.form.motivo_rechazo="";
        this.$root.$emit("bv::show::modal", "modal_rechazo", "#btnShow");
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
