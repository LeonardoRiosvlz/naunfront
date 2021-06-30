<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;resete();">Agregar grupo</b-button>
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
                :items="grupos"
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
                    <b-dropdown-item-button @click="eliminarGrupoestandar(data.item.id)"> Eliminar </b-dropdown-item-button>
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

        <b-modal id="modal" false size="lg"  title="Gestor de grupos estandares" hide-footer>
          <ValidationObserver  ref="form">
                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Nombre del grupo de estandares</label>
                            <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                                <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label>Codigo</label>
                            <ValidationProvider name="codigo" rules="required" v-slot="{ errors }" >
                                <input v-model="form.codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <div class="col-sm-6">
                      <template>
                        <div class="form-group">
                                <label>Grupos de Estandares</label>
                                  <ValidationProvider name="tiempos de alerta" rules="required" v-slot="{ errors }">
                                      <select @change="suma" v-model="form.gruposestandares" name="tipo" class="form-control " :disabled="ver">
                                        <option value="1">Grupo de estandares del proceso de atencion al cliente asistencial</option>
                                        <option value="2">Grupo de estandares de direccionamiento</option>
                                        <option value="3">Grupo de estandares de gerencia</option>
                                        <option value="4">Grupo de estandares de gerencia de talento humano</option>
                                        <option value="5">Grupo de estandares de gerencia del ambiente fisico</option>
                                        <option value="6">Grupo de estandares de gestion de tecnologia</option>
                                        <option value="7">Grupo de estandares de gestion de tecnologia</option>
                                        <option value="8">Grupo de estandares de mejoramiento de la calidad</option>
                                      </select>
                                      <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                              </div>
                      </template>
                    </div>
                    <div class="col-sm-6" v-if="form.gruposestandares == 1">
                      <template>
                        <div class="form-group">
                                <label>Subgrupos de estandares</label>
                                  <ValidationProvider name="tiempos de alerta" rules="required" v-slot="{ errors }">
                                      <select @change="suma" v-model="form.subgruposestandares" name="tipo" class="form-control " :disabled="ver">
                                        <option value="1 mes">Derechos de los paciente</option>
                                        <option value="2 meses">Seguridad del paciente </option>
                                        <option value="4 meses">Acceso</option>
                                        <option value="6 meses">Registro e ingreso </option>
                                        <option value="12 meses">Evaluación de necesidades al ingreso</option>
                                        <option value="12 meses">Planeación de la atención</option>
                                        <option value="12 meses">Ejecución del tratamiento</option>
                                        <option value="12 meses">Evaluación de la atención</option>
                                        <option value="12 meses">Salida y seguimiento</option>
                                        <option value="12 meses">Referencia y contrarreferencia</option>
                                        <option value="12 meses">Redes integradas en salud</option>
                                      </select>
                                      <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                              </div>
                      </template>
                    </div>
                  </b-row>
                  <b-row>
                    <b-col class="form-group">
                        <label>Descripcion</label>
                        <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                              <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </b-col>
                  </b-row>
                
               
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
          text: "Sistema de gestion de calidad"
        },
        {
          text: "Grupos estandares de acreditacion",
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
      fields: ["nombre","codigo", "descripcion", "actions" ],
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
      fecha_suma:'',
      grupos: [],
      
      form:{
            'id': 6,
            'nombre':'',
            'descripcion':'',
            'codigo':'',
            'cliente_id':'',
            'gruposestandares':0,
            'subgruposestandares':0     
          }
        }
  },

  methods: {
    suma(){
    },
    capSubproceso(proceso){
      for (let index = 0; index < this.procesos.length; index++) {
       if(this.procesos[index].id == this.form.proceso){
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
              this.agregarGrupoestandar();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarGrupoestandar();
          } else {
        }});
      }
    },
   async editarGrupoestandar(){
        let data = new FormData();
      
      var formulario = this.form;
        
        for (var key in formulario) {
          data.append(key,formulario[key]);
      }
      console.log(formulario);
        await this.axios.put('api/estandares/grupos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
              console.log(response)
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listargruposestandares();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
  async agregarGrupoestandar(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
      console.log(formulario)
       await this.axios.post('api/estandares/grupos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listargruposestandares();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario   
               this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssag);
              this.$swal(e.response.data);
          });
      },
     async eliminarGrupoestandares(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/estandares/grupos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listargruposestandares();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarGrupoestandar(id){
        this.$swal({
          title: 'Desea borrar este grupo?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarGrupoestandares(id);
          }
        })
      },
      resete(){
          var formulario = this.form;
          for (var key in formulario) {
            this.form[key]="";
        }
        this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.grupos.length; index++) {
          if (this.grupos[index].id===id) {
              this.form.id = this.grupos[index].id;
              this.form.nombre = this.grupos[index].nombre;
              this.form.descripcion = this.grupos[index].descripcion;
              this.form.codigo = this.grupos[index].codigo;
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
                    this.sedes = response.data.rows
                  }
                }).catch(e => {
                  console.log(e.response.data.menssage);
                  this.$swal(e.response.data);
            });
      },
        async  listargruposestandares(){
            let data = new FormData();
            data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/estandares/grupos/listar',data)
            .then((response) => {
                console.log(response.data)
                this.grupos = response.data;
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
        this.listargruposestandares();
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
      return this.grupos.length;
    },
  },
}
</script>
