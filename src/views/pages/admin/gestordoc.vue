<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;resete();">Registar documentos</b-button>
    </div>
    <div class="row m-0 justify-content-between">
        <div class="row m-0 col-6 pl-0">
            <div class="col-4 pl-0">
                <div class="form-group">
                <label>Proceso</label>
                    <select v-model="form.status"  name="tipo" class="form-control form-control-lg" >
                        <option v-for="(pros, index) in procesos" :key="index" :value="pros.id">{{pros.nombre}}</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                <label>Subproceso</label>
                    <select v-model="form.status"  name="tipo" class="form-control form-control-lg" >
                        <option v-for="(subpros, index) in subprocesos" :key="index" :value="subpros.id">{{subpros.nombre}}</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                <label>Tipo de documento</label>
                    <select v-model="form.status"  name="tipo" class="form-control form-control-lg" >
                        <option v-for="(docs, index) in tiposdocumentos" :key="index" :value="docs.id">{{docs.nombre}}</option>
                    </select>
                </div>
            </div>
        </div>

    </div>
  

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"></h4>
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
              <div class="col-sm-12 col-md-6 row m-0 justify-content-end">
                <div class="clearfix mb-3 pr-3">
                    <b-button class="float-right btn-info" left>Exportar</b-button>
                </div>
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
                :items="documentos"
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
                    <b-dropdown-item-button><a :href="'gestordocs/'+data.item.id" style="color:#000"> VIsta al Documento </a></b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarDoc(data.item.id)"> Eliminar </b-dropdown-item-button>
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

        <b-modal id="modal" false size="lg"  title="Gestion de documentos" hide-footer>
          <ValidationObserver  ref="form">
              <b-row class="mb-3">
                <div class="col-md-5">
                    <div class="form-group">
                      <label>Vas a: </label>
                      <ValidationProvider name="tipo de documento" rules="required" v-slot="{ errors }" >
                        <select v-model="form.creado" name="tipo" class="form-control form-control-lg" :disabled="ver">
                            <option value="Creado" selected>Subir documento creado</option>
                            <option value="No creado">Crear documento</option>
                        </select>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </div>
              </b-row>

                <b-tabs  content-class="p-3 text-muted">
                  <b-tab active class="border-0">
                    <template v-slot:title>
                      <span class="d-inline-block d-sm-none">
                        <i class="fas fa-home"></i>
                      </span>
                      <span class="d-none d-sm-inline-block">INFORMACION GENERAL</span>
                    </template>
                  <b-row class="mt-3">
                  <b-col>
                    <div class="form-group ">
                      <label>Nombre del documento</label>
                      <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group">
                      <label>Tipo de docemento</label>
                      <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                        <select v-model="form.tipo_id"  name="tipo" class="form-control form-control-lg" :disabled="ver">
                            <option :value="tipo.id" v-for="(tipo,index) in tiposdocumentos" :key="index">{{tipo.nombre}}</option>
                        </select>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-group">
                        <label>Consecutivo</label>
                        <ValidationProvider name="prefijo" rules="required" v-slot="{ errors }">
                              <input v-model="form.consecutivo"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="form-group">
                        <label>Versión</label>
                        <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                              <input v-model="form.version"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-group">
                        <label>Proceso</label>
                        <ValidationProvider name="proceso" rules="required" v-slot="{ errors }" >
                          <select v-model="form.proceso_id"  name="tipo" class="form-control form-control-lg" :disabled="ver"  @change="capSubproceso()">
                            <option :value="proceso.id" v-for="(proceso,index) in procesos" :key="index" >{{proceso.nombre}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    <b-col>
                      <div v-if="subproceso.length!= 0 " class="form-group">
                        <label>Subproceso</label>
                        <ValidationProvider name="subproceso" rules="required" v-slot="{ errors }">
                          <select v-model="form.subproceso_id"  name="tipo" class="form-control form-control-lg" :disabled="ver" >
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
                        <label>Sede</label>
                          <ValidationProvider name="sede" rules="required" v-slot="{ errors }" >
                              <v-select  v-model="form.sedes_id"  :options="sedes" :disabled="ver" :reduce="sedes => sedes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                              <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                      </div>
                    </b-col>
                    <div v-if="form.creado==='Creado'" class="col-sm-6 mt-4">
                    <b-form-file
                        v-model="logo"
                        placeholder="Seleccione una imagen..."
                        drop-placeholder="Drop file here..."
                         @change="onFileChangeLogo"
                    ></b-form-file>
                  </div>
                  </b-row>
                     
                    </b-tab>
                    <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-user"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">RESPONSABLES</span>
                      </template>
                        <h5 class="mt-3">Responsabilidades</h5>
                        <b-row>
                        <b-col>
                          <div class="form-group">
                            <label>Elaboró</label>
                              <ValidationProvider name="elaboró" rules="required" v-slot="{ errors }" >
                                <v-select  v-model="form.elabora_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                        </b-col>
                        <b-col v-if="form.creado==='No creado'">  
                          <div class="form-group">
                            <label>Fecha de elaboración</label>
                            <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                  <input v-model="form.elaboracion" type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                  <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <div class="form-group">
                            <label>Revisó</label>
                            <ValidationProvider name="revisó" rules="required" v-slot="{ errors }" >
                              <v-select  v-model="form.revisa_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre" ></v-select>
                              <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                          </div>
                        </b-col>
                        <b-col v-if="form.creado==='No creado'">
                          <div class="form-group">
                            <label>Fecha de revisión</label>
                            <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                  <input v-model="form.revision"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                  <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                        </b-col>
                      </b-row>  
                      <b-row>
                        <b-col>
                          <div class="form-group">
                            <label>Aprobó</label>
                            <ValidationProvider name="aprobó" rules="required" v-slot="{ errors }" >
                                <v-select  v-model="form.aprueba_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                        </b-col>
                        <b-col v-if="form.creado==='No creado'">
                          <div class="form-group">
                            <label>Fecha de aprobación</label>
                            <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                  <input v-model="form.aprobacion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                  <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                        </b-col>
                      </b-row>
                    </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">NORMATIVIDAD</span>
                        </template>
                      <h5 class="mt-3">Normatividad asociada</h5> 
                      <b-row class="align-items-center mb-3">
                        <b-col>
                          <div class="form-group m-0">
                            <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                              <v-select  v-model="titulo"  :options="normativas" :disabled="ver" :reduce="normativas => normativas"  :getOptionLabel="option => option.nombre" ></v-select>
                              <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                          </div>
                        </b-col>
                        <b-button  @click="cargarNorma" class="float-right btn-success py-1"> agregar</b-button>
                      </b-row>
                      <div class="card mt-3">
                        <div class="row m-0 justify-content-end">
                          <button class="btn" @click="show = false"   v-if="show"><b-card-sub-title >Ocultar</b-card-sub-title></button>
                          <button class="btn" @click="show = true"  v-else><b-card-sub-title >Ver</b-card-sub-title></button>
                        </div>
                        <div v-if="show" class="mb-3">
                          <b-row v-for="(norma, index) in form.normativas" :key="index" class="px-3 ">
                            <b-col class="form-group w-100">
                              <label>{{norma.nombre}}</label>
                              <ValidationProvider name="contenido" rules="required" v-slot="{ errors }">
                                <input v-model="norma.texto" type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </b-col>
                          </b-row>
                        </div>
                      </div> 
                    </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">EMISIÓN</span>
                        </template>
                        <b-row class="mt-3">
                            <b-col>
                              <div class="form-group">
                                <label>Fecha de emisión</label>
                                <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                      <input v-model="form.fecha_emicion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                      <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                              </div>
                            </b-col>
                            <b-col>
                              <div class="form-group">
                                <label>Tiempos de alerta para emisión</label>
                                  <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                      <select @change="suma" v-model="form.intervalo" name="tipo" class="form-control form-control-lg" :disabled="ver">
                                        <option value="1 mes">1 mes</option>
                                        <option value="2 meses">2 mes</option>
                                        <option value="4 meses">4 mes</option>
                                        <option value="6 meses">6 mes</option>
                                        <option value="12 meses">12 mes</option>
                                      </select>
                                      <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                              </div>
                            </b-col>
                          </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label>Estado</label>
                              <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                  <select  v-model="form.status" name="tipo" class="form-control form-control-lg" :disabled="ver">
                                    <option value="Inaahabilitado">Inahabilitado</option>
                                    <option value="En elaboración">En elaboración</option>
                                    <option value="Elborado">Elaborado</option>
                                  </select>
                                  <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                    </b-tab>
              </b-tabs>

          </ValidationObserver>
        {{form}}
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
import summernote from '@/components/summer'
import moment from 'moment'

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
           text: "Sistema integral de gestión"
        },
        {
          text: "Gestion de documentos",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      url_logo:null,
      logo:null,
      ver:false,
      url:"",
      url_perfil:"",
      modal: true,
      foto:null,
      file:null,
      perfil:null,
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
      fields: ["nombre", "version", "fecha_emicion", "fecha_alerta", "actions"],
      procesos: [], 
      subprocesos:[],
      subproceso:[],
      tiposdocumentos:[],
      cargos:[],
      tipos:[],
      editMode:false,
      usuarios:[],
      normativa:[],
      show:true,
      normativas:[],
      titulo:'',
      documentos:[],
      articulo:"",
      sedes:"",
      rango:0,
      form:{
            'id': 6,
            'tipo_id': '',
            'subproceso_id':'',
            'proceso_id':'',
            'creado':'',
            'nombre': null,
            'archivo': '',
            'normativas':[],
            'consecutivo':'',
            'version':'',
            'elaboracion':'',
            'revision':'',
            'aprobacion':'',
            'fecha_alerta':'',
            'fecha_emicion':'',
            'intervalo':'',
            'status':'',
            'sedes_id':'',
            'elabora_id':'',
            'aprueba_id':'',
            'revisa_id':''
          }
        }
  },

  methods: {
    suma(){
      var regex = /(\d+)/g;
      for (let index = 0; index <  this.form.intervalo.match(regex).length; index++) {
          var valor = this.form.intervalo.match(regex)
          this.rango = valor[index]
      }
      let fecha = moment(this.form.fecha_emicion).format("YYYY-MM-DDTHH:MM");
      this.form.fecha_alerta = moment(fecha).add(this.rango, 'month').format("YYYY-MM-DDTHH:MM");
      console.log(this.form.fecha_alerta)
    },
    capSubproceso(proceso){
      for (let index = 0; index < this.procesos.length; index++) {
       if(this.procesos[index].id == this.form.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
         console.log(this.subproceso)
       }
        
      }
    },
    cargarNorma(){
      this.form.normativas.push({
        id : this.titulo.id,
        nombre : this.titulo.nombre,
        texto : ''
      });
    },
   async listarperfil(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/perfil/lista',data)
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async listartipos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/normatividad/listar',data)
            .then((response) => {
              this.tipos = response.data.rows;
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
      async listardocscreados(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/documentos/listar',data)
            .then((response) => {
              this.documentos = response.data;
              console.log(response)
            })
            .catch((e)=>{
              console.log('error' + e);
            })
      },
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
              this.agregarDocumento();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarDocumento();
          } else {
        }});
      }
    },
   async editarDocumento(){
        let data = new FormData();
      var formulario = this.form;
         for (var key in formulario) {
          if (key=='normativas') {
                data.append(key,JSON.stringify(formulario[key]));
            } else {
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/documentos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
              console.log(response)
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listardocscreados();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
  async agregarDocumento(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          if (key=='normativas') {
              data.append(key,JSON.stringify(formulario[key]));
          } else {
              data.append(key,formulario[key]);
          }
      }
      console.log(formulario)
       await this.axios.post('api/documentos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listardocscreados();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario   
               this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssag);
              this.$swal(e.response.data);
          });
      },
     async eliminarDocs(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/documentos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listardocscreados();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarDoc(id){
        this.$swal({
          title: 'Desea borrar este documento?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarDocs(id);
          }
        })
      },
        resete(){
          var formulario = this.form;
          for (var key in formulario) {
            if (key=='normativas') {
                 this.form[key]=[];
            }else{
                this.form[key]="";
            }
        }
         this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.documentos.length; index++) {
          if (this.documentos[index].id===id) {
              this.form.id = this.documentos[index].id;
              this.form.tipo_id = this.documentos[index].tipo_id;
              this.form.nombre = this.documentos[index].nombre;
              this.form.normativas = JSON.parse(this.documentos[index].normativas);
              this.form.creado = this.documentos[index].creado;
              this.form.consecutivo = this.documentos[index].consecutivo;
              this.form.version = this.documentos[index].version;
              this.form.subproceso_id = this.documentos[index].subproceso_id;
              this.form.elaboracion = this.documentos[index].elaboracion;
              this.form.revision = this.documentos[index].revision;
              this.form.aprobacion = this.documentos[index].aprobacion;
              this.form.fecha_alerta = this.documentos[index].fecha_alerta;
              this.form.fecha_emicion = this.documentos[index].fecha_emicion;
              this.form.intervalo = this.documentos[index].intervalo;
              this.form.status = this.documentos[index].status;
              this.form.proceso_id = this.documentos[index].proceso_id;
              this.form.sedes_id = this.documentos[index].sedes_id;
              this.form.elabora_id = this.documentos[index].elabora_id;
              this.form.aprueba_id = this.documentos[index].aprueba_id;
              this.form.revisa_id = this.documentos[index].revisa_id;
              this.url_logo=this.documentos[index].archivo;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },

       async  listarSedes(){
        let data = new FormData();
          data.append("cliente_id",this.cliente.id);
          await this.axios.post('api/sedes/listar',data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(response => {
                if (response.status==200) {
                  console.log(response.status)
                    this.sedes = response.data.rows
                  }
                }).catch(e => {
                  console.log(e.response.data.menssage);
                  this.$swal(e.response.data);
            });
      },
        async  listartiposdoc(){
            let data = new FormData();
            data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/documentos/tipo/listar',data)
            .then((response) => {
                console.log(response.data)
                this.tiposdocumentos = response.data;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
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
        async listartipos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/tipo_procesos/listar',data)
            .then((response) => {
              this.tipos = response.data.rows;
            })
            .catch((e)=>{
              console.log('error' + e);
            })
      },
      async listarNormatividad(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/normatividad/listar',data)
            .then((response) => {
              this.normativas = response.data.rows;
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
      onFileChangeLogo(e) {
        const logo = e.target.files[0];
        this.url_logo = URL.createObjectURL(logo);
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
    watch: {
      cliente: function () {
        this.listarperfil();
        this.listartipos();
        this.listarProceso();
        this.listarSubproceso();
        this.listartiposdoc();
        this.listarNormatividad();
        this.listardocscreados();
        this.listarCargos();
        this.listarSedes();
        this.title=this.cliente.nombre_prestador;
      },
    },
    created(){
      this.session();
      console.log(this.form)
      },
     mounted() {
        const $ = require('jquery')
        window.$ = $
          $(document).ready(function() {
          $('.summernote').summernote({
            placeholder: 'Escribe aquí',
            tabsize: 2,
            height: 100,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview', 'help']]
            ],
            callbacks: {
              onImageUpload: function(files) {
                for (let i = 0; i < files.length; i++) {
                  self.lastFile = files[i]
                  self.sendFile()
                }
              },
              onChange: function(content, e) {
                  let len = content.length
                  self.validateLimit(len)
              }
            }
          });
        });
    },
    computed: {
     ...mapState(['usuarioDB','cliente']),

    rows() {
      return this.documentos.length;
    },
  },
}
</script>
