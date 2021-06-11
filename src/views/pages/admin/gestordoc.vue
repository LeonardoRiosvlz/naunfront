<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;resete();">Crear normativa</b-button>
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
                :items="normativa"
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
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarProceso(data.item.id)"> Eliminar </b-dropdown-item-button>
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

        <b-modal id="modal" false size="lg"  title="Crear documentos" hide-footer>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Nombre</label>
                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                     <input v-model="form.tipo"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
                <b-col>
                  <div class="form-group">
                    <label>Prefijo</label>
                    <ValidationProvider name="prefijo" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
               
              </b-row>
              <b-row>
                 <b-col>
                  <div class="form-group">
                    <label>Versión</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                 <b-col>
                  <div class="form-group">
                    <label>Consecutivo</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Proceso</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                 <b-col>
                  <div class="form-group">
                    <label>Subproceso</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Codigo del documento</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                  <b-col>
                  <div class="form-group">
                    <label>Alcance</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row> 
              <h5 class="mt-5">Responsabilidades</h5>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Elabora</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Fecha de elaboración</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Revisión</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Fecha de revisión</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row> 
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Aprueba</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Fecha de aprobación</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
                <b-row class="justify-content-center mb-3">
                <b-col>
                  <div class="form-group">
                    <label>Tiempos de alertas para revisión</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Registros asociados</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row> 
              <b-row>
                 <b-col>
                  <div class="form-group">
                    <label>Estado</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                      <select v-model="form.tipo_id"  name="tipo" class="form-control form-control-lg" :disabled="ver">
                          <option :value="tipo.id" v-for="(tipo,index) in tiposdocumentos" :key="index">{{tipo.nombre}}</option>
                      </select>
                      <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Fecha</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
                 <div class="col-sm-6">
                   <div id="preview mb-2" class="row justify-content-center mb-3">
                     <img  width="100px" height="100px" style="float:center!importan; border-radius:100%" class=""  :src="url_perfil" />
                   </div>
                    <b-form-file
                        v-model="foto"
                        :disabled="ver"
                        placeholder="Seleccione su documento..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangePerfil"
                    ></b-form-file>
               </div>
              </b-row>
               <textarea class="summernote" id="descripcion"></textarea>
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
import summernote from '@/components/summer'


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
          text: "Gestión de clientes"
        },
        {
          text: "Normatividad",
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
      fields: ["nombre","tipo_documento", "prefijo","version","actions"],
      procesos: [], 
      subprocesos:[],
      tiposdocumentos:[],
      tipos:[],
      editMode:false,
      usuarios:[],
      normativa:[],
      show:true,
  form:{
      'id': 6,
      'tipo': '',
      'nombre': null,
      'descripcion': '',
      'archivo': '',
      }
    }
  },

  methods: {

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
              this.agregarProceso();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarProceso();
          } else {
        }});
      }
    },
   async editarProceso(){
        let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/normatividad', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
              console.log(response)
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarProceso();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
  async agregarProceso(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/normatividad', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarProceso();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario   
               this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
     async eliminarProcesos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/normatividad/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarProceso();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarProceso(id){
        this.$swal({
          title: 'Desea borrar este cargo?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarProcesos(id);
          }
        })
      },
      resete(){
        var formulario = this.form;

        for (var key in formulario) {
           this.form[key]="";
        }
       this.form.actividades = [],
       
       this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.normativa.length; index++) {
          if (this.normativa[index].id===id) {
              this.form.id = this.normativa[index].id;
              this.form.tipo = this.normativa[index].tipo;
              this.form.nombre = this.normativa[index].nombre;
              this.form.descripcion = this.normativa[index].descripcion;
              this.url_perfil = this.normativa[index].archivo;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
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
      onFileChangePerfil(e) {
        const foto = e.target.files[0];
        this.url_perfil = URL.createObjectURL(foto);
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
      return this.normativa.length;
    },
  },
}
</script>
