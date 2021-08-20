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
                <b-dropdown-item @click="listarLibres()">Adjuntar Oprotunidades de mejora</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>



        <div class="chat-leftsidebar-nav">
          <b-tabs pills fill content-class="py-4" justified>
             <b-tab active>
              <template v-slot:title>
                <i class="ri-attachment-line font-size-20"></i>
                <span class="mt-2 d-none d-sm-block">O.M. VINCULADAS</span>
              </template>
              <div class="card-body border-bottom py-2">
                <div class="search-box chat-search-box">
                  <div class="position-relative">
                    <input type="text" v-model="search" class="form-control" placeholder="Buscar..." />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
              <b-card-text>
                <ul class="list-unstyled chat-list">
                  <li v-for="mejora in filteredItems"  :key="mejora.di" v-if="mejora.acciones.length==0">
                      <div class="media align-items-center pl-4">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body">OM</span
                          >
                        </div>

                        <div class="media-body p-0">
                          <h5 class="font-size-14 mb-0">{{mejora.oportunidad_mejoras}}</h5>
                          <p class="text-mouted m-0">Acciones programadas: {{mejora.acciones.length}}</p>
                          <button class="btn btn-danger btn-sm  mr-2" v-if="mejora.acciones.length<1" @click="desvincularCuestion(mejora.id)">Desvincular <i class="ri-close-line"></i></button>
                          <button class="btn btn-success btn-sm  ml-1" @click="setear_mejora(mejora.id,mejora.oportunidad_mejoras)">Programar <i class="ri-time-line"></i></button>
                        </div>
                      </div>
                      <hr>
                  </li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="ri-time-line font-size-20"></i>
                <span class="mt-2 d-none d-sm-block">O.M. PROGRAMADAS</span>
              </template>
              <div class="card-body border-bottom py-2">
                <div class="search-box chat-search-box">
                  <div class="position-relative">
                    <input type="text" v-model="search" class="form-control" placeholder="Buscar..." />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
              <b-card-text>
                <ul class="list-unstyled chat-list">
                  <li v-for="mejora in filteredItems"  :key="mejora.di" v-if="!mejora.acciones.length==0">
                      <div class="media align-items-center pl-4">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body">OM</span
                          >
                        </div>

                        <div class="media-body p-0">
                          <h5 class="font-size-14 mb-0">{{mejora.oportunidad_mejoras}}</h5>
                          <p class="text-mouted m-0">Acciones programadas: {{mejora.acciones.length}}</p>
                          <button class="btn btn-danger btn-sm  mr-2" v-if="mejora.acciones.length<1" @click="desvincularCuestion(mejora.id)">Desvincular <i class="ri-close-line"></i></button>
                          <button class="btn btn-success btn-sm  ml-1" @click="setear_mejora(mejora.id,mejora.oportunidad_mejoras)">Programar <i class="ri-time-line"></i></button>
                        </div>
                      </div>
                      <hr>
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
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"></h4>
                    <div class="row mt-4" style="min-heigth:500px">
                      <div class="col-sm-12 col-md-6">
                        <div id="tickets-table_length" class="dataTables_length">
                          <label class="d-inline-flex align-items-center">
                            Mirar
                            <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entradas
                          </label>
                        </div>
                      </div>
                      <!-- Search -->
                      <div class="col-sm-12 col-md-6">
                        <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                          <label class="d-inline-flex align-items-center">
                            Buscar:
                            <b-form-input
                              v-model="filter"
                              type="search"
                              placeholder=""
                              class="form-control form-control-sm ml-2"
                            ></b-form-input>
                          </label>
                        </div>
                      </div>
                      <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0" style="min-heigth:500px">
                      <b-table
                        :items="acciones"
                        :fields="fields"
                        responsive="sm"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        @filtered="onFiltered"
                      >
                        <template v-slot:cell(periodo)="data">
                          {{data.item.mejora.plan_accion.bases_autoevaluacion.periodo.nombre}}
                        </template>
                        <template v-slot:cell(grupo_de_estandares)="data">
                          {{data.item.mejora.autoevaluacion.grupo_estandare.nombre}}
                        </template>
                        <template v-slot:cell(numero_de_estandar)="data">
                          {{data.item.mejora.autoevaluacion.estandare.numero}}
                        </template>
                        <template v-slot:cell(status)="data">
                            <span v-if="data.item.status==='NO INICIADA'" class="badge badge-danger">NO INICIADA</span>
                            <span v-if="data.item.statu==='EN DESARROLLLO'" class="badge badge-info">EN DESARROLLLO</span>
                            <span v-if="data.item.status==='REALIZADA'" class="badge badge-success">REALIZADA</span>
                        </template>

                        <template v-slot:cell(actions)="data">

                        <b-dropdown size="sm" class="">
                          <template v-slot:button-content>
                            Action
                            <i class="mdi mdi-chevron-down"></i>
                          </template>
                            <b-dropdown-item-button @click="editMode=true;ver=false;setearAccion(data.item.id)"> Editar </b-dropdown-item-button>
                            <b-dropdown-item-button @click="eliminarAccionC(data.item.id)">Eliminar </b-dropdown-item-button>
                            <b-dropdown-item-button ><a :href="'/avances-planes-accion/'+data.item.id" style="color:#000">Registrar avances</a></b-dropdown-item-button>
                        </b-dropdown>
                        </template>
                      </b-table>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="dataTables_paginate paging_simple_numbers float-right">
                          <ul class="pagination pagination-rounded mb-0">
                            <!-- pagination -->
                            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-lg-3">
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal_libres" false size="xl"  title="Oportunidades de mejora no vinculadas al plan de acción" hide-footer>
      <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body m-0 py-0 pb-0">
                   
                    <div class="row">
                      <div class="col-md-12">
                         <h5 class="text-LEFT">Vinculación Masiva</h5>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <input type="number" min="1" v-model="desde" max="124" class="form-control" id="formGroupExampleInput" placeholder="entre">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <input type="number" min="2" v-model="hasta" max="125" class="form-control" id="formGroupExampleInput" placeholder="hasta">
                        </div>
                      </div>
                      <div class="col-md-2">
                          <button class="btn btn-success btn-block" :disabled="!desde||!hasta" @click="adjuntarMasivamenteCuestion()"> Vincular </button>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                                <select  v-model="grupoid"  name="tipo" class="form-control" >
                                    <option :value="grupo.id" v-for="(grupo,index) in grupos" :key="index">{{grupo.nombre}}</option>
                                </select>
                        </div>
                      </div>
                    <div class="col-md-2">
                          <button class="btn btn-success btn-block" @click="filtrar()"> BUSCAR </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <b-row>
      <div class="card col-6" v-for="libre in libres" :key="libre.id">
        <div class="card-body">
          <h5 class="card-title">{{libre.oportunidad_mejoras}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Número de estandar: {{libre.autoevaluacion.estandare.numero}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Código de estandar: {{libre.autoevaluacion.estandare.codigo}}</h6>
          <h4 class="card-subtitle mb-2 text-center text-success">Total: <span class="badge badge-primary">{{libre.total}}</span></h4>
          <a href="#" @click="ajuntarLibreCuestion(libre.id)" class="card-link"><i class="ri-attachment-2"></i> Programar</a>
        </div>
      </div>
    </b-row>
</b-modal>




      <b-modal id="modal_acciones" false size="lg"  title="Programar acciones" hide-footer>
        <div class="card">
          <h6 class="text-center"> OPORTUNIDAD DE MEJORA </h6>
          <p class="p-2">{{mejora.oportunidad_mejoras}}</p>
        </div>
                <ValidationObserver  ref="form">
                  <div class="row">
                        <div class="col-md-12">
                            <h5 class="font-size-14 mb-4">Clasificación de actividades</h5>
                            <div class="row">
                                <div class="col-3" v-for="(clasificacion, index) in clasificacion" :key="index">
                                            
                                    <div class="form-check mb-3">
                                        <input
                                        v-model="accion.clasificacion_id"
                                        class="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        :id="'exampleRadios1'+index"
                                        :value="clasificacion.id"
                                        checked
                                        />
                                        <label class="form-check-label " for="exampleRadios1" :style="'color:'+clasificacion.color">{{clasificacion.nombre}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Proceso</label>
                          <ValidationProvider name="proceso" rules="required" v-slot="{ errors }" >
                            <select v-model="accion.proceso_id"  name="tipo" class="form-control " :disabled="ver"  @change="capSubproceso()">
                              <option :value="proceso.id" v-for="(proceso,index) in procesos" :key="index" >{{proceso.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label>Subproceso</label>
                          <ValidationProvider name="subproceso" rules="required" v-slot="{ errors }">
                            <select v-model="accion.subproceso_id"  name="tipo" class="form-control " :disabled="ver" >
                               <option value="NA">NA</option>
                              <option :value="subprocesos.id" v-for="(subprocesos,index) in subproceso" :key="index" >{{subprocesos.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Descripción de las acciones a realizar</label>
                          <ValidationProvider name="descripcion de la accion" rules="required" v-slot="{ errors }">
                                <textarea v-model="accion.descripcion_accion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Evidencia solicitada</label>
                          <ValidationProvider name="evidencias solicitada" rules="required" v-slot="{ errors }">
                                <textarea v-model="accion.evidencia_solicitada"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row> 
                      <b-col>
                        <div class="form-group">
                          <label >Fecha de planeación </label>
                          <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                            <b-form-input id="date-time" v-model="accion.fecha_programada"  type="datetime-local"></b-form-input>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label >Fecha de cumplimiento </label>
                          <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                            <b-form-input id="date-time" v-model="accion.fecha_ejecucion"  type="datetime-local"></b-form-input>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>  
                    <b-row>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Responsable</label>
                              <v-select  v-model="accion.responsable_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                        </div>
                      </div>
                    </b-row>
                </ValidationObserver>
                <div class="row mx-0 justify-content-between">
                      <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
                      <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
                </div>
        </b-modal>


  </Layout>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
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
    vSelect,
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
      cargo:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      desde: "",
      hasta: "",
      grupoid: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      periodos: [],
      cargos: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["periodo","grupo_de_estandares","numero_de_estandar","total","status","actions"],
      bases: [], 
      libres: [], 
      todas: [],
      procesos: [],  
      subprocesos:[],
      subproceso:[],
      mejoras: [], 
      acciones: [], 
      estandares:[], 
      autoevaluaciones:[],
      clasificacion:[],
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
      mejora:[],
      accion:{
            'id': '',
            'mejora_id': '',
            'clasificacion_id': '',
            'proceso_id': '',
            'subproceso_id': '',
            'responsable_id': '',
            'total':1,
            'fecha_ejecucion':'',
            'fecha_programada':'',
            'evidencia_solicita':'',
            'descripcion_accion':'',
            'responsable_id':'',
            'subproceso_id':'',
            'proceso_id':'',
          },
          buscador:{
              'tipo_id': '',
              'subproceso_id':'',
              'proceso_id':'',
            },
          dato:'',
          filtro:[],
          search:'',
    }
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
    ...mapActions(['guardarUsuario']),
    datear(){
      if (this.dato) {
              this.filtro=this.mejoras.find(post => post.id == this.dato);
      }else{
        this.filtro = this.mejoras;
      }
    },
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarAcccionCuestion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarAccionCuestion();
          } else {
        }});
      }
    },
    async listarclasificacion(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/eventos/calisficacion/listar',data)
        .then((response) => {
          this.clasificacion = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    agregarAcccionCuestion(id){
        this.$swal({
          title: 'Desea progrmar una acción para esta mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.programarAcccion();
          }
        })
    },
    async  programarAcccion(){
     let data = new FormData();
       var formulario = this.accion;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/acciones', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_acciones", "#btnShow");
              this.listarAcciones();
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
      editarAccionCuestion(id){
        this.$swal({
          title: 'Desea editar esta acción?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.editarAcccion();
          }
        })
    },
    async  editarAcccion(){
     let data = new FormData();
       var formulario = this.accion;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.put('api/acciones', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Editado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_acciones", "#btnShow");
              this.listarAcciones();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
          eliminarAccionC(id){
        this.$swal({
          title: 'Desea borrar esta acción?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarAccion(id);
          }
        })
      },
      async eliminarAccion(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/acciones/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarPlan();
                this.listarAcciones();
                }
              }).catch(e => {
                  this.$swal(
                    'No se pudo eliminar!',
                      '',
                      'danger'
                );
          });
      },
      setearAccion(id) {
        for (let index = 0; index < this.acciones.length; index++) {
          this.acciones[index];
          if (this.acciones[index].id===id) {
            console.log(this.acciones[index]);
            this.accion.id=this.acciones[index].id;
            this.accion.mejora_id=this.acciones[index].mejora_id;
            this.accion.clasificacion_id=this.acciones[index].clasificacion_id;
            this.accion.proceso_id=this.acciones[index].proceso_id;
            this.accion.subproceso_id=this.acciones[index].subproceso_id;
            this.accion.responsable_id=this.acciones[index].responsable_id;
            this.accion.total=this.acciones[index].total;
            this.mejora=this.acciones[index].mejora;
            this.accion.fecha_ejecucion=moment(this.acciones[index].fecha_ejecucion).format("YYYY-MM-DDTHH:MM");
            this.accion.fecha_programada=moment(this.acciones[index].fecha_programada).format("YYYY-MM-DDTHH:MM");
            this.accion.evidencia_solicitada=this.acciones[index].evidencia_solicitada;
            this.accion.descripcion_accion=this.acciones[index].descripcion_accion;
            this.accion.responsable_id=this.acciones[index].responsable_id;
            if (!this.acciones[index].subproceso_id) {
              this.accion.subproceso_id="NA"
            }else{
              this.accion.subproceso_id=this.acciones[index].subproceso_id;
            }
            this.accion.proceso_id=this.acciones[index].proceso_id;
            this.editMode=true;
            this.$root.$emit("bv::show::modal", "modal_acciones", "#btnShow");
           
          }
        }
          
      },
   capSubproceso(){
      for (let index = 0; index < this.procesos.length; index++) {
       if(this.procesos[index].id == this.accion.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
         console.log(this.subproceso)
       }
      if(this.procesos[index].id == this.buscador.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
         console.log(this.subproceso)
       }
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
      ajuntarLibreCuestion(id){
        this.$swal({
          title: 'Desea adjuntar esta oportnidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.adjuntarMejora(id);
          }
        })
      },
      async adjuntarMejora(id){
     let data = new FormData();
      data.append('id',id);
      data.append('plan_id',this.$route.params.id);
       await this.axios.post('api/mejoras/adjuntar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.listarLibres();
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
      desvincularCuestion(id){
        this.$swal({
          title: 'Desea devincular esta oportnidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.desvincularMejora(id);
          }
        })
      },
      async desvincularMejora(id){
     let data = new FormData();
      data.append('id',id);
      data.append('plan_id',this.$route.params.id);
       await this.axios.post('api/mejoras/desvincular', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Desvinculado con exito!',
                    '',
                    'success');
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },  
      adjuntarMasivamenteCuestion(id){
        this.$swal({
          title: 'Desea vincular las oportunidades de mejora en este rango de puntuación?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.adjuntarMasivamente(id);
          }
        })
      },
      async adjuntarMasivamente(id){
      let data = new FormData();
        data.append('desde',this.desde);
        data.append('hasta',this.hasta);
        data.append('cliente_id',this.usuarioDB.id);
        data.append('plan_id',this.$route.params.id);
        await this.axios.post('api/mejoras/adjuntarrango', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Vinculadas con exito!',
                      '',
                      'success');
                this.listarLibres();
                this.listarPlan();
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
             if (response.status==200) {
               console.log(response.data);
              this.form.id=response.data.id; 
              this.form.nombre=response.data.nombre; 
              this.form.descripcion=response.data.descripcion; 
              this.form.base_id=response.data.base_id; 
              this.mejoras=response.data.mejoras; 
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async listarAcciones(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/acciones/listar', data)
          .then((response) => {
             if (response.status==200) {
               console.log(response);
              this.acciones=response.data; 
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
               this.mejora=response.data; 
               this.accion.mejora_id=response.data.id;
               this.editModeMejora=true;
               this.$root.$emit("bv::show::modal", "modal_acciones", "#btnShow");
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
      async  listarProceso(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/procesos/listar',data)
            .then((response) => {
                this.procesos = response.data.rows;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
         },
        async  listarSubproceso(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/subprocesos/listar',data)
            .then((response) => {
                this.subprocesos = response.data.rows;
                console.log(response.data)
            })
            .catch((e)=>{
                console.log('error' + e);
            })
      },
    async listarLibres(){
      let data = new FormData();
      data.append('base_id',this.form.base_id);
      data.append('cliente_id',this.usuarioDB.id);
        await this.axios.post('api/mejoras/libres',data)
          .then((response) => {
             if (response.status==200) {
               this.libres=response.data
               this.$root.$emit("bv::show::modal", "modal_libres", "#btnShow");
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
      async filtrar(){
      let data = new FormData();
      data.append('periodo_id',this.form.periodo_id);
      data.append('grupo_id',this.grupoid);
        await this.axios.post('api/mejoras/filtrarPeriodo',data)
          .then((response) => {
             if (response.status==200) {
                 this.libres=response.data;
                 if (this.libres.length<1) {
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
      async listarMejoras(){
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
    async listarCargos(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/cargos/listar',data)
          .then((response) => {
            this.cargos = response.data;
            this.listarperfil();
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
        this.listargruposestandares();
        this.listarCargos();
        this.listarProceso();
        this.listarSubproceso();
        this.listarclasificacion();
        this.listarAcciones();
      },
   watch: {
      cliente: function () {
       this.listarCargos();
       this.listarPlan();
       this.form.cliente_id=this.cliente.id;
       this.title=this.cliente.nombre_prestador;
       this.form.cliente_id=this.usuarioDB.id;
       this.listargruposestandares();
       this.listarProceso();
       this.listarSubproceso();
       this.listarclasificacion();
       this.listarAcciones();
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.acciones.length;
    },
    filteredItems() {
      return this.mejoras.filter(item => {
         return item.oportunidad_mejoras.indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
}
</script>
<style scoped>

</style>
