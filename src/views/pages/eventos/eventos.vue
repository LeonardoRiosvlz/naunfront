<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Crear</b-button>
    </div>
    <b-button class="mb-3" v-b-toggle.sidebar-right>Filtrar enventos</b-button>
    <b-sidebar id="sidebar-right" title="Filtros" right shadow>
      <div class="px-3 py-2">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="info">Rango</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                  <b-col>
                    <div class="form-group">
                      <label >Desde </label>
                        <b-form-input id="date-time" v-model="buscador.desde"  type="datetime-local"></b-form-input>
                    </div>
                  </b-col>
                   <b-col>
                    <div class="form-group">
                      <label >Hasta </label>
                        <b-form-input id="date-time" v-model="buscador.hasta"  type="datetime-local" @change="filtro()" :disabled="!buscador.desde"></b-form-input>
                    </div>
                  </b-col>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info">Caracteristicas</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                  <b-col>
                    <label>Clasificacion del evento</label>
                      <select class="custom-select" id="date-time" v-model="buscador.clasificacion_id" @change="filtro()">
                          <option :value="clasificacion.id" v-for="clasificacion in clasificacion" :key="clasificacion.id">{{clasificacion.nombre}}</option>
                      </select>
                    </b-col>
                    <b-col>
                        <label>Estado</label>
                          <select class="custom-select" id="date-time" v-model="buscador.status" @change="filtro()">
                              <option value="Creada">Creada</option>
                              <option value="Programada">Programada</option>
                              <option value="Cumplida">Cumplida</option>
                              <option value="No realizada">No realizada</option>
                          </select>
                    </b-col>
                    <b-col>
                        <label>Periodo</label>
                          <select class="custom-select" id="date-time" v-model="buscador.periodo" @change="filtro()">
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                          </select>
                  </b-col>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </b-sidebar>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-md-4">
                <b-card bg-variant="warning" class="text-white-15">
                  <h5 class="mt-0 mb-0 text-white">
                    <i class="mdi mdi-clock mr-3"></i> PROGRAMADAS
                  </h5>
                </b-card>
              </div>
              <div class="col-md-4">
                <b-card bg-variant="success" class="text-white-15">
                  <h5 class="mt-0 mb-0 text-white">
                    <i class="mdi mdi-calendar-check mr-3"></i> CUMPLIDAS
                  </h5>
                </b-card>
              </div>
              <div class="col-md-4">
                <b-card bg-variant="danger" class="text-white-15">
                  <h5 class="mt-0 mb-0 text-white">
                    <i class="mdi mdi-alert-outline mr-3"></i> NO REALIZADAS
                  </h5>
                </b-card>
              </div>  
            </div> 
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="eventos"
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
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;buscarEvento(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarEvento(data.item.id)"> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"> Ver </b-dropdown-item-button>
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




    <b-modal id="modal" false size="lg"  title="Gestión de actividades" hide-footer>

          <ValidationObserver ref="form">
            <div class="row">
                <div class="col-lg-12">
                      <b-tabs content-class="p-3 text-muted">
                        <b-tab active class="border-0">
                          <template v-slot:title>
                            <span class="d-inline-block d-sm-none">
                              <i class="fas fa-home"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">INFORMACION GENERAL</span>
                          </template>
                            <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Nombre</label>
                                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row>
                              <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Descripción</label>
                                  <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                        <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row> 
                              <div class="row">
                                <div class="col-md-12">
                                    <h5 class="font-size-14 mb-4">Clasificacion de actividades</h5>
                                    <div class="row">
                                        <div class="col-3" v-for="(clasificacion, index) in clasificacion" :key="index">
                                            
                                            <div class="form-check mb-3">
                                                <input
                                                v-model="form.clasificacion_id"
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
                                    <label >Fecha de programacion </label>
                                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                                      <b-form-input id="date-time" v-model="form.fecha_programada"  type="datetime-local"></b-form-input>
                                      <span style="color:red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                </b-col>
                                <b-col>
                                <ValidationProvider name="lider" rules="required" v-slot="{ errors }">
                                  <label>Periodo</label>
                                    <select class="custom-select" id="date-time" v-model="form.periodo">
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                      </select>
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                              </b-col>
                            </b-row>  
                            <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Lugar</label>
                                  <ValidationProvider name="lugar" rules="required" v-slot="{ errors }">
                                        <input v-model="form.lugar"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                            </b-row> 
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="far fa-user"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">RESPONSABLES</span>
                          </template>
                           <b-row>
                              <div class="col-10">
                                <div class="form-group">
                                  <label>Cargo</label>
                                      <v-select  v-model="cargo"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                               <div class="col-2">
                                  <button class="btn btn-success my-4" @click="vincularResponsable()" :disabled="!form.cargo_id">Vincular</button>
                               </div>
                            </b-row>
                            <div class="row" v-if="editMode">
                              <div class="col-lg-6" v-for="responsable in responsables" :key="responsable.id">
                                <b-card no-body>
                                  <b-row no-gutters class="align-items-center">
                                    <b-col md="4">
                                      <b-card-img :src="require('@/assets/images/small/img-2.jpg')" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="8">
                                      <b-card-body :title="responsable.cargo.nombre">
                                        <b-card-text>{{responsable.cargo.user.nombre}}</b-card-text>
                                         <button class="btn btn-danger" @click="desvincularResponsable(responsable.id)">Desvincular</button>
                                      </b-card-body>
                                    </b-col>
                                  </b-row>
                                </b-card>
                              </div>
                            </div>
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="far fa-user"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">COMPROMETIDOS</span>
                          </template>
                           <b-row>
                              <div class="col-10">
                                <div class="form-group">
                                  <label>Cargo</label>
                                      <v-select  v-model="cargo"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                               <div class="col-2">
                                  <button class="btn btn-success my-4" @click="vincularComprometido()" :disabled="!form.cargo_id">Vincular</button>
                               </div>
                            </b-row>
                            <div class="row" v-if="editMode">
                              <div class="col-lg-6" v-for="responsable in comprometidos" :key="responsable.id">
                                <b-card no-body>
                                  <b-row no-gutters class="align-items-center">
                                    <b-col md="4">
                                      <b-card-img :src="require('@/assets/images/small/img-2.jpg')" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="8">
                                      <b-card-body :title="responsable.cargo.nombre">
                                        <b-card-text>{{responsable.cargo.user.nombre}}</b-card-text>
                                         <button class="btn btn-danger" @click="desvincularComprometido(responsable.id)">Desvincular</button>
                                      </b-card-body>
                                    </b-col>
                                  </b-row>
                                </b-card>
                              </div>
                            </div>
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="fas fa-cog"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">INVITADOS EXTERNOS</span>
                          </template>
                           <h5>Invitados</h5>
                            <b-row v-if="editMode">
                                <div class="col-11">
                                    <div class=" row">
                                        <div class="form-group col-3">
                                            <label>Nombre </label>
                                                <input v-model="nombre"  type="text" class="form-control" placeholder=" ">
                                        </div>
                                        <div class="form-group col-3">
                                    <label>Cargo</label>
                                        <input v-model="cargo"  type="text" class="form-control" placeholder=" ">
                                    </div>
                                        <div class="form-group col-3">
                                            <label>Email </label>
                                                <input v-model="email"  type="text" class="form-control" placeholder=" ">
                                        </div>
                                        <div class="form-group col-3">
                                    <label>Telefono </label>
                                        <input v-model="telefono"  type="text" class="form-control" placeholder=" ">
                                    </div>
                                    </div>
                                </div >
                                <div class="col-1 my-2">
                                  <label></label>
                                  <button class="btn btn-success btn-block mb-2" @click="cargarInvitados()" >+</button>
                                </div >
                              </b-row>    
                              <table class="table" v-if="editMode">
                                <thead>
                                  <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Eliminar</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(invitado,index) in form.invitados_externos" :key="index">
                                    <th scope="row">{{invitado.nombre}}</th>
                                    <td>{{invitado.cargo}}</td>
                                    <td>{{invitado.telefono}}</td>
                                    <td>{{invitado.email}}</td>
                                    <td><button class="btn btn-danger" @click="eliminarInvitados(index)">Eliminar</button></td>
                                  </tr>
                                </tbody>
                              </table>
                        </b-tab>
                      </b-tabs>
                </div>
        
              </div>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>

  </Layout>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import vue2Dropzone from "vue2-dropzone";
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
    vSelect
  },
  data() {
    return {
      title: "Administracion",
      items: [
        {
          text: "Gestión de eventos"
        },
        {
          text: "actividades",
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
      fields: ["nombre","lugar","fecha_programada","status","actions"],
      clasificacion: [], 
      eventos: [],
      cargos: [],
      cargo:'',
      editMode:false,
      form:{
        'id':'',
        'nombre':'',
        'descripcion':'',
        'observaciones':'',
        'lugar':'',
        'invitados_externos':[],
        'periodo':'',
        'status':'',
        'fecha_programada':'',
        'fecha_ejecucion':'',
        'cliente_id':'',
        'clasificacion_id':'',
      },
      buscador:{
        'clasificacion_id':'',
        'desde':'',
        'hasta':'',
        'status':'',
        'periodo':'',
      },
      comprometidos:[],
      responsables:[],
      nombre:'',
      cargo:'',
      telefono:'',
      email:'',
    }
  },

  created(){
    this.listarUsers();
 
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
              this.agregarEvento();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarEvento();
          } else {
        }});
      }
    },
   buscarAgregados(){
     for (let index = 0; index < this.comprometidos.length; index++) {
      if (this.comprometidos[index].cargo.id===this.cargo) {
           this.$swal('Ya este cargo ha sido vinculado!','','warning');
           this.cargo="";
           return;
      } 
     }
     for (let index = 0; index < this.responsables.length; index++) {
      if (this.responsables[index].cargo.id===this.cargo) {
           this.$swal('Ya este cargo ha sido vinculado!','','warning');
           this.cargo="";
           return;
      } 
     }
   },
   async filtro(){
     let data = new FormData();
     var formulario = this.buscador;
        for (var key in formulario) {
          if (key=='invitados_externos') {
              data.append(key,JSON.stringify(formulario[key]));
          } else {
              data.append(key,formulario[key]);
          }
      }
      data.append('cliente_id',this.cliente.id);
    await this.axios.post('api/eventos/filtro',data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then(response => {
          if (response.status==200) {
                this.eventos=response.data;
                }
          }).catch(e => {
            console.log(e.response.data.menssage);
            this.$swal(e.response.data);
      });
  },
   async agregarEvento(){
     let data = new FormData();
     var formulario = this.form;
        for (var key in formulario) {
          if (key=='invitados_externos') {
              data.append(key,JSON.stringify(formulario[key]));
          } else {
              data.append(key,formulario[key]);
          }
      }
       await this.axios.post('api/eventos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               this.listarEventos();
               this.buscarEvento(response.data.id);
               this.editMode=true;         
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },

    async editarEvento(){
     let data = new FormData();
     var formulario = this.form;
        for (var key in formulario) {
          if (key=='invitados_externos') {
              data.append(key,JSON.stringify(formulario[key]));
          } else {
              data.append(key,formulario[key]);
          }
      }
        await this.axios.put('api/eventos', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarEventos();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarEventos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/eventos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarEventos();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
    async buscarEvento(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/eventos/find',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                    this.form.id=response.data.id;
                    this.form.nombre=response.data.nombre;
                    this.form.descripcion=response.data.descripcion;
                    this.form.observaciones=response.data.observaciones;
                    this.form.lugar=response.data.lugar;
                    this.form.invitados_externos=JSON.parse(response.data.invitados_externos);
                    this.form.periodo=response.data.periodo;
                    this.form.status=response.data.status;
                    this.form.fecha_programada=moment(response.data.fecha_programada).format("YYYY-MM-DDTHH:MM");
                    this.form.fecha_ejecucion=response.data.fecha_ejecucion;
                    this.form.cliente_id=response.data.cliente_id;
                    this.form.clasificacion_id=response.data.clasificacion_id;
                    this.responsables=response.data.responsables;
                    this.comprometidos=response.data.comprometidos;
                    this.$root.$emit("bv::show::modal", "modal", "#btnShow");
                    }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },
      vincularResponsable(){
        this.$swal({
          title: 'Desea vincularlo a esta activida?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.vincularResponsables();
          }
        })
      },
      async vincularResponsables(){
        let data = new FormData();
        data.append('cargo_id',this.form.cargo_id);
        data.append('evento_id',this.form.id);

        await this.axios.post('api/eventos/responsables/agregar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Vinculado con exito!',
                      '',
                      'success'
                );
                this.buscarEvento(this.form.id);
                }
              }).catch(e => {
                this.$swal(
                      'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
      },
            vincularComprometido(){
        this.$swal({
          title: 'Desea vincularlo a esta activida?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.vincularComprometidos();
          }
        })
      },
      async vincularComprometidos(){
        let data = new FormData();
        data.append('cargo_id',this.form.cargo_id);
        data.append('evento_id',this.form.id);

        await this.axios.post('api/eventos/comprometidos/agregar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Vinculado con exito!',
                      '',
                      'success'
                );
                this.buscarEvento(this.form.id);
                }
              }).catch(e => {
                this.$swal(
                      'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
      },  
      eliminarEvento(id){
        this.$swal({
          title: 'Desea borrar esta actividad?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarEventos(id);
          }
        })
      },
      async desvincularResponsables(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/eventos/responsables/eliminar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Desvinculado con exito!',
                      '',
                      'success'
                );
                this.buscarEvento(this.form.id);
                }
              }).catch(e => {
                this.$swal(
                      'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
      }, 
     desvincularResponsable(id){
        this.$swal({
          title: 'Desea desvincular este cargo?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.desvincularResponsables(id);
          }
        })
      },
            async desvincularComprometidos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/eventos/comprometidos/eliminar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Desvinculado con exito!',
                      '',
                      'success'
                );
                this.buscarEvento(this.form.id);
                }
              }).catch(e => {
                this.$swal(
                      'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
      }, 
     desvincularComprometido(id){
        this.$swal({
          title: 'Desea desvincular este cargo?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.desvincularComprometidos(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
          if (!this.form[key]==="invitados_externos") {
              this.form[key]="";
          }  
       }
       this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.eventos.length; index++) {
          if (this.eventos[index].id===id) {
            this.form.id=this.eventos[index].id;
            this.form.nombre=this.eventos[index].nombre;
            this.form.descripcion=this.eventos[index].descripcion;
            this.form.observaciones=this.eventos[index].observaciones;
            this.form.lugar=this.eventos[index].lugar;
            this.form.inivitados_externos=JSON.parse(this.eventos[index].inivitados_externos);
            this.form.periodo=this.eventos[index].periodo;
            this.form.status=this.eventos[index].status;
            this.form.fecha_programada=moment(this.eventos[index].fecha_programada).format("YYYY-MM-DDTHH:MM");
            this.form.fecha_ejecucion=this.eventos[index].fecha_ejecucion;
            this.form.cliente_id=this.eventos[index].cliente_id;
            this.form.clasificacion_id=this.eventos[index].clasificacion_id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
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
    async listarEventos(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/eventos/listar',data)
        .then((response) => {
          this.eventos = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },  
    cargarInvitados(){
      this.form.invitados_externos.push({
       nombre:this.nombre,
       telefono:this.telefono,
       cargo:this.cargo,
       email:this.email,
      });
    },
    eliminarInvitados(index){
       this.form.invitados_externos.splice(index, 1);  
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
        this.listarclasificacion();
        this.listarEventos();
        this.listarCargos();
      },
   watch: {
      cliente: function () {
        this.listarclasificacion();
        this.listarEventos();
        this.listarCargos();
       this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.cliente_id;
     
      },
      cargo:function(){
        this.buscarAgregados();
        this.form.cargo_id=this.cargo;
      }
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.eventos.length;
    },
  },
}
</script>
