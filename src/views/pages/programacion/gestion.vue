<template>
  <div  >
    <div class="clearfix my-4">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal_gestion');editMode=false;resete();ver=false;">Gestionar </b-button>
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
            <div class="table-responsive mb-0"  style="min-height: 12em;">
              <b-table
                :items="formatos"
                :fields="fields"
                striped 
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(ASUNTO)="data">
                  {{data.item.asunto}}
                </template>
                 <template v-slot:cell(Legalizacion)="data">
                  {{data.item.descripcion}}
                </template>
                <template v-slot:cell(status)="data">
                  <b-badge variant="warning" v-if="data.item.status==='Pendiente'">{{data.item.status}}</b-badge>
                  <b-badge variant="success" v-if="data.item.status==='Aceptada'">{{data.item.status}}</b-badge>
                  <b-badge variant="danger" v-if="data.item.status==='Devuelta'">{{data.item.status}}</b-badge>
                </template>
                <template v-slot:cell(actions)="data">
                  <button v-b-tooltip.hover title="Ver "  type="button" class="btn btn-success btn-sm rounded-pill mr-1" @click="editMode=false;ver=true;setear(data.item.id)"  ><i class="ri-eye-line"></i>  </button>
                  <button v-b-tooltip.hover title="Editar " v-if="data.item.status==='Pendiente'"  type="button" class="btn btn-info btn-sm rounded-pill mr-1" @click="editMode=true;ver=false;setear(data.item.id)"><i class="ri-edit-2-fill"></i>  </button>
                  <button v-b-tooltip.hover title="Eliminar " v-if="data.item.status==='Pendiente'"  type="button" class="btn btn-danger btn-sm rounded-pill mr-1" @click="eliminarFormato(data.item.id)"><i class="ri-delete-bin-line"></i>  </button>
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

 



    <b-modal id="modal_aprobar" false size="lg"  title="Respuesta a gestión" hide-footer>
          <ValidationObserver ref="form"> 
             <b-row>  
                <b-col>
                  <div class="form-group">
                    <label v-if="form.requiere_cita==='Si'">Fecha de cita </label><label v-else>Fecha limite </label>
                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                      <b-form-input id="date-time" v-model="form.vencimiento_tecnico"  type="datetime-local"></b-form-input>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
               
              </b-row>
              <b-row>

                <b-col>
                    <div class="form-group">
                    <label>Observaciones</label>
                    <ValidationProvider name="observaciones analista" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.observaciones_analista"
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
        <button class="btn btn-block float-right btn-danger" v-if="form.observaciones_analista" @click="devolverGestionCuestion()">Enviar</button>
     </b-modal>







    <b-modal id="modal_gestion" false size="lg"  title="Gestión de mantenimiento" hide-footer>
           <div v-if="editMode||!editMode&&!ver"> 
          <ValidationObserver ref="form">
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Asunto</label>
                    <ValidationProvider name="asunto" rules="required" v-slot="{ errors }">
                          <input v-model="form.asunto"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.descripcion"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>       
              <b-row>
                <b-col>
                    <label>Fotos Antes </label>

                      <b-form-file multiple
                          v-model="gallery_antes"
                          placeholder="Seleccione su image..."
                          drop-placeholder="Drop file here..."
                          ref="inputFile1"
                      ></b-form-file>
                </b-col>
                <div class="col-12" v-if="editMode">
                    <div class="popup-gallery">
                      <a
                        class="float-left"
                        v-for="(item, index) in evidencias_antes"
                        :key="index"
                        @click="() => showImg(index)"
                      >
                        <div class="img-fluid">
                          <img :src="`${item}`" alt width="200" style="margin:10px"/>
                        </div>
                      </a>
                    </div>
                    <vue-easy-lightbox
                      :visible="visible"
                      :index="index"
                      :imgs="evidencias_antes"
                      @hide="visible = false"
                    ></vue-easy-lightbox>
                  </div>
              </b-row>
              <b-row>
                <b-col>
                    <label>Fotos Durante</label>

                      <b-form-file multiple
                          v-model="gallery_durante"
                          placeholder="Seleccione su image..."
                          drop-placeholder="Drop file here..."
                          ref="inputFile2"
                      ></b-form-file>
                </b-col>
                  <div class="col-12" v-if="editMode">
                    <div class="popup-gallery">
                      <a
                        class="float-left"
                        v-for="(item, index) in evidencias_durante"
                        :key="index"
                        @click="() => showImg2(index)"
                      >
                        <div class="img-fluid">
                          <img :src="`${item}`" alt width="200" style="margin:10px" />
                        </div>
                      </a>
                    </div>
                    <vue-easy-lightbox
                      :visible="visible2"
                      :index="index2"
                      :imgs="evidencias_durante"
                      @hide="visible2 = false"
                    ></vue-easy-lightbox>
                  </div>
              </b-row>

            <b-row>
                <b-col>
                    <label>Fotos despues</label>

                      <b-form-file multiple
                          v-model="gallery_despues"
                          placeholder="Seleccione su image..."
                          drop-placeholder="Drop file here..."
                          ref="inputFile3"
                      ></b-form-file>

                </b-col>
                  <div class="col-12" v-if="editMode">
                    <div class="popup-gallery">
                      <a
                        class="float-left"
                        v-for="(item, index) in evidencias_despues"
                        :key="index"
                        @click="() => showImg3(index)"
                      >
                        <div class="img-fluid">
                          <img :src="`${item}`" alt width="200" style="margin:10px" />
                        </div>
                      </a>
                    </div>
                    <vue-easy-lightbox
                      :visible="visible3"
                      :index="index3"
                      :imgs="evidencias_despues"
                      @hide="visible3= false"
                    ></vue-easy-lightbox>
                  </div>
              </b-row>  
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Actividades realizadas</label>
                    <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.observaciones"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>    
        </ValidationObserver>
        </div>
        <div class="row" v-if="ver">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Gestión del día: {{form.asunto}}</h4>
                <p class="card-title-desc">Descripción: {{form.descripcion}}</p>
                <p class="card-title-desc">Actividades realizadas: {{form.observaciones}}</p>
                <h4 class="card-title">Fotos Antes</h4>
                <div class="row">
                  <div class="col-12">
                    <div class="popup-gallery">
                      <a
                        class="float-left"
                        v-for="(item, index) in evidencias_antes"
                        :key="index"
                        @click="() => showImg(index)"
                      >
                        <div class="img-fluid">
                          <img :src="`${item}`" alt width="200" style="margin:10px"/>
                        </div>
                      </a>
                    </div>
                    <vue-easy-lightbox
                      :visible="visible"
                      :index="index"
                      :imgs="evidencias_antes"
                      @hide="visible = false"
                    ></vue-easy-lightbox>
                  </div>
                  <h4 class="card-title">Fotos Durante</h4>
                  <div class="col-12">
                    <div class="popup-gallery">
                      <a
                        class="float-left"
                        v-for="(item, index) in evidencias_durante"
                        :key="index"
                        @click="() => showImg2(index)"
                      >
                        <div class="img-fluid">
                          <img :src="`${item}`" alt width="200" style="margin:10px" />
                        </div>
                      </a>
                    </div>
                    <vue-easy-lightbox
                      :visible="visible2"
                      :index="index2"
                      :imgs="evidencias_durante"
                      @hide="visible2 = false"
                    ></vue-easy-lightbox>
                  </div>
                  <h4 class="card-title">Fotos Despues</h4>
                  <div class="col-12">
                    <div class="popup-gallery">
                      <a
                        class="float-left"
                        v-for="(item, index) in evidencias_despues"
                        :key="index"
                        @click="() => showImg3(index)"
                      >
                        <div class="img-fluid">
                          <img :src="`${item}`" alt width="200" style="margin:10px" />
                        </div>
                      </a>
                    </div>
                    <vue-easy-lightbox
                      :visible="visible3"
                      :index="index3"
                      :imgs="evidencias_despues"
                      @hide="visible3= false"
                    ></vue-easy-lightbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
  

          <!-- end col -->

                  <button class="btn btn-success btn-block" @click="devolver('Aceptada')"><i class="ri-check-line align-middle mr-2"></i> Aprobar</button>

                  <button class="btn btn-danger btn-block" @click="devolver('Devuelta')"><i class="ri-error-warning-line align-middle mr-2"></i> Devolver</button>

        
        
        </div>
        <!-- end row -->
        <button v-b-tooltip.hover title="Agregar "  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Agregar</button>
        <button v-b-tooltip.hover title="Editar"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>
  </div>
</template>
<script>
import VueEasyLightbox from "vue-easy-lightbox";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from 'moment';
/**
 * Transactions component
 */
export default {
    components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
    VueEasyLightbox
  },
  data() {
    return {
    imgs: "", // Img Url , string or Array of string
      visible: false,
      index: 0, // default: 0
       visible2: false,
      index2: 0, // default: 0
      visible3: false,
      index3: 0, // default: 0
      title: "Administracion",
      items: [
        {
          text: "Procesos"
        },
        {
          text: "Formato de solicitud de transferncia",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      formato:[],
      gallery_antes:null,
      gallery_durante:null,
      gallery_despues:null,
      ver:false,
      url:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      codigo: "",
      nombre: "",
      precio: "",
      password: "",
      total_abonado: 0,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      consecutivo:"",
      filterOn: [],
      terceros: [],
      entidades: [],
      abonos: [],
      imputaciones: [],
      imputacion_id: "",
      users: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["ASUNTO","status","actions"],
      formatos: [], 
      evidencias_antes: [], 
      evidencias_durante: [], 
      evidencias_despues: [], 
      cajero: [],
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
          'items':[],
          'id_entidad':'',
          'valor':'',
          'status':'',
          'requiere_cita':'',
          'vencimiento_tecnico':'',
          'id_programacion':'',
      },
      abono:{
          'id':'',
          'tecnico_id':'',
      }
    }
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.transactionData.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.transactionData.length;
    this.form.id_cajero = 2;
    this.listar();
  },
  filters: {
        moneda: function (value) {
          const formatterPeso = new Intl.NumberFormat('es-CO', {
             style: 'currency',
             currency: 'COP',
             minimumFractionDigits: 0
           })
           let valueFinal = formatterPeso.format(value);
           return valueFinal
        }
  },
  methods: {
    showSingle() {
      this.imgs = require("@/assets/images/small/img-2.jpg");
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    showSingle2() {
      this.imgs2 = require("@/assets/images/small/img-2.jpg");
      this.show2();
    },
    show2() {
      this.visible2 = true;
    },
    handleHide2() {
      this.visible2 = false;
    },
    showImg2(index) {
      this.index2 = index;
      this.visible2 = true;
    },
    showSingle3() {
      this.imgs3 = require("@/assets/images/small/img-2.jpg");
      this.show3();
    },
    show3() {
      this.visible3 = true;
    },
    handleHide3() {
      this.visible3 = false;
    },
    showImg3(index) {
      this.index3 = index;
      this.visible3 = true;
    },
    devolver(index){
      if (index==="Devuelta") {
        this.form.status="Devuelta";
        this.form.requiere_cita=this.consecutivo.requiere_cita;
        this.form.vencimiento_tecnico=moment(this.consecutivo.vencimiento_tecnico).format("YYYY-MM-DDTHH:MM");
        this.$root.$emit("bv::show::modal", "modal_aprobar", "#btnShow");
      }else{
        this.form.status="Aceptada"
        this.devolverGestionCuestion();
      }

    },
    cargar(){
         for (let index = 0; index < this.imputaciones.length; index++) {
            if( this.imputacion_id===this.imputaciones[index].id){
              this.form.items.push({
               nombre:this.imputaciones.nombre,
               codigo:this.imputaciones[index].codigo,
               descripcion:"",
               precio:"",
             });
            }
        }
      },
    eliminarItem(index){
       this.form.items.splice(index, 1);  
    },
    sumarItems(){

      this.form.valor=0;
      for (let index = 0; index < this.form.items.length; index++) {
        this.form.valor=this.form.valor+parseFloat(this.form.items[index].precio)
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
      async  listarUsers(){
    await  this.axios.get('api/user/adminstrador')
      .then((response) => {
        this.users = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
                this.$swal({
                  title: 'Desea cargar esta gestion?',
                  icon: 'question',
                  iconHtml: '',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  showCloseButton: true
                }).then((result) => {
                  if (result.isConfirmed) {
                     this.agregarGestion();
                  }
                })
             
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarFormato();
          } else {
        }});
      }
    },
      gestionar(id){
        this.$swal({
          title: 'Desea agregar esta gestion?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.subirGestion(id);
          }
        })
      },
      eliminarGestion(id){
        this.$swal({
          title: 'Desea eliminar este registro?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteGestion(id);
          }
        })
      },
      devolverGestionCuestion(){
        this.$swal({
          title: 'Desea notificar al técnico sobre el estado de esta gestión?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.responderGestion();
          }
        })
      },
    async deleteGestion(id,formato){
     let data = new FormData();
      data.append('id',id);
 
       await this.axios.post('api/gestion/delete', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Eliminado con exito!',
                    '',
                    'success');
               this.listarGestion(formato);
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
   async responderGestion(){
     let data = new FormData();
      var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
 
       await this.axios.post('api/gestion/respuesta', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'respondido con exito!',
                    '',
                    'success');
               this.listarGestion();
               this.$root.$emit("bv::hide::modal", "modal_aprobar", "#btnShow");
               this.$root.$emit("bv::hide::modal", "modal_gestion", "#btnShow");
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
    async subirGestion(){
     let data = new FormData();
      var formulario = this.abono;
        for ( var key in formulario) {
            data.append(key,formulario[key]);
        }
        if (this.file) {
          data.append('filename',this.file);
         }
       await this.axios.post('api/abonos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarAbonos(this.abono.formato_id);
               this.listarGestion();
               this.file=null;
               this.url="";
               this.abono.valor_abono="";
               this.abono.descripcion_abono="";
               this.abono.descripcion_abono="";
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
   async agregarGestion(){
     let data = new FormData();
      var formulario = this.form;
    if (this.gallery_antes) {
        for( var i = 0; i < this.gallery_antes.length; i++ ){         
          data.append('gallery_antes',this.gallery_antes[i]);
        } 
      }
    if (this.gallery_durante) {
        for( var i = 0; i < this.gallery_durante.length; i++ ){         
          data.append('gallery_durante',this.gallery_durante[i]);
        } 
      }
    if (this.gallery_despues) {
        for( var i = 0; i < this.gallery_despues.length; i++ ){         
          data.append('gallery_despues',this.gallery_despues[i]);
        } 
      }
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.post('api/gestion', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarGestion();
               this.$root.$emit("bv::hide::modal", "modal_gestion", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
                 this.$refs.inputFile1.reset();
                 this.$refs.inputFile2.reset();
                 this.$refs.inputFile3.reset();
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },

    async editarFormato(){
     let data = new FormData();
       var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        if (this.gallery_antes) {
          for( var i = 0; i < this.gallery_antes.length; i++ ){         
            data.append('gallery_antes',this.gallery_antes[i]);
          } 
        }
        if (this.gallery_durante) {
            for( var i = 0; i < this.gallery_durante.length; i++ ){         
              data.append('gallery_durante',this.gallery_durante[i]);
            } 
        }
        if (this.gallery_despues) {
            for( var i = 0; i < this.gallery_despues.length; i++ ){         
              data.append('gallery_despues',this.gallery_despues[i]);
            } 
        }
        await this.axios.put('api/gestion', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarGestion();
               this.$root.$emit("bv::hide::modal", "modal_gestion", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
                 this.$refs.inputFile1.reset();
                 this.$refs.inputFile2.reset();
                 this.$refs.inputFile3.reset();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
         });
      },
    async cancelarFormato(){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",this.form.id);
       data.append("status","Rechazado");
       data.append("observacion",this.form.observacion);
        await this.axios.post('api/formatos/status', data).then(response => {

            if (response.status==200) {
               this.$swal('Rechazado con exito','','success');
               this.listarGestion();
               this.$root.$emit("bv::hide::modal", "modal_cancelar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
                this.$swal('ocurrio un problema','','warning');
         });
      },
    async aprobarFormato(id){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",id);
       data.append("status","Aprobado");
       data.append("observacion","");
        await this.axios.post('api/formatos/status', data).then(response => {

            if (response.status==200) {
               this.$swal('Rechazado con exito','','success');
               this.listarGestion();
               this.$root.$emit("bv::hide::modal", "modal_cancelar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
                this.$swal('ocurrio un problema','','warning');
         });
      },
     async eliminarFormatos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/formatos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarGestion();
                }
              }).catch(e => {
            
                this.$swal(e.response.data);
          });
      }, 
      eliminarFormato(id){
        this.$swal({
          title: 'Desea borrar esta gestion?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarGestion(id);
          }
        })
      },
      cancelarGestion(id){
        this.$swal({
          title: 'Desea rechazar esta gestion?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.cancelarFormato();
          }
        })
      },
      aprobFormato(id){
        this.$swal({
          title: 'Deseas aprobar esta gestion?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.aprobarFormato(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.form.id_programacion=this.consecutivo.id;
       this.form.asunto=this.consecutivo.titulo;
       this.form.descripcion=this.consecutivo.descripcion;
       this.form.coordinador_id=this.consecutivo.coordinador_id;
       this.form.tecnico_id=this.consecutivo.tecnico_id;
       this.form.items=[];
      },
      setear(id) {
        for (let index = 0; index < this.formatos.length; index++) {
          if (this.formatos[index].id===id) {
            this.formato=this.formatos[index];
            this.evidencias_antes=this.formatos[index].evidencias_antes;
            this.evidencias_durante=this.formatos[index].evidencias_durante;
            this.evidencias_despues=this.formatos[index].evidencias_despues;
            this.form.observaciones=this.formatos[index].observaciones;
            this.form.asunto=this.formatos[index].asunto;
            this.form.id=this.formatos[index].id;
            this.form.id_programacion=this.formatos[index].id_programacion;
            this.form.descripcion=this.formatos[index].descripcion;
            this.$root.$emit("bv::show::modal", "modal_gestion", "#btnShow");
            return;
          }
        }
      },
      setearCancelado(id){
        this.form.id=id;
        this.$root.$emit("bv::show::modal", "modal_cancelar", "#btnShow");
      },
      async  listarGestion(){
      let data = new FormData();
      data.append('id',this.consecutivo.id);
      await  this.axios.post('api/gestion/find',data)
        .then((response) => {
            this.formatos = response.data;
            for (let index = 0; index <this.formatos.length; index++) {
              this.formatos[index].evidencias_antes=JSON.parse(this.formatos[index].evidencias_antes);
              this.formatos[index].evidencias_durante=JSON.parse(this.formatos[index].evidencias_durante);
              this.formatos[index].evidencias_despues=JSON.parse(this.formatos[index].evidencias_despues); 
            }
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    async  listarentidades(){
      await  this.axios.get('api/entidades')
        .then((response) => {
          this.entidades = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    async  listarimputaciones(){
      let data = new FormData();
      data.append('id',this.form.entidad_id);
      await  this.axios.post('api/imputaciones/find',data)
        .then((response) => {
          this.imputaciones = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      setEmail(){
        this.form.username=this.form.email;
    
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
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
      session(){
        if (localStorage.getItem('token')) {
          const token=localStorage.getItem('token');
          this.guardarUsuario(token);
          }else{
          this.$router.push({ name: 'Home' });
          }
        },

      loadConsectivo(){
        if (localStorage.getItem('consecutivo')) {
        this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
          this.form.consecutivo=this.consecutivo.consecutivo;
          this.form.tecnico_id=this.consecutivo.tecnico_id;
          this.form.entidad_id=1;
          this.form.codigo_tecnico=this.consecutivo.codigo_tecnico;
        }

      }
  },
  mounted(){
    this.loadConsectivo();
    this.listarGestion();
  }, 
    created(){
        this.session();       
      },
    computed: {
    rows() {
      return this.formatos.length;
    },
  },
};
</script>
