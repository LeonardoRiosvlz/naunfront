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
                    <b-dropdown-item-button v-if="data.item.id===1" @click="$bvModal.show('modal_subgrupo')">Subgrupos</b-dropdown-item-button>
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



        <b-modal id="modal_subgrupo" false size="xl"  title="Gestor de subgrupos de estandares" hide-footer>
          <div class="clearfix mb-3">
            <b-button class="float-right btn-info" left @click="$bvModal.show('modal_subgrupo_form');editMode=false" v-if="subgrupos.length<11">Agregar</b-button>
          </div>
          <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Sub Grupo</th>
                  <th scope="col">Desde</th>
                  <th scope="col">Hasta</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="grupo in subgrupos" :key="grupo.id">
                  <th scope="row">{{grupo.id}}</th>
                  <td>{{grupo.nombre}}</td>
                  <td>{{grupo.desde}}</td>
                  <td>{{grupo.hasta}}</td>
                  <td v-if="!ver">
                        <a href="javascript:void(0);" @click="setearSub(grupo.id);editMode=true" class="text-info" v-b-tooltip.hover title="editar">
                            <i class="mdi mdi-pencil font-size-18"></i>
                        </a>
                  </td>
                </tr>
              </tbody>
            </table>
        </b-modal>



        <b-modal id="modal_subgrupo_form" false size="lg"  title="Gestor de subgrupos" hide-footer>
          <ValidationObserver  ref="form">
                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Nombre del subgrupo de estandares</label>
                            <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                                <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Codigo</label>
                            <ValidationProvider name="codigo" rules="required" v-slot="{ errors }" >
                                <input v-model="form.codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>                    
                    <b-col>
                        <div class="form-group">
                            <label>Desde</label>
                            <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                                <input v-model="form.desde"   type="number" id="quantity" name="quantity" min="1" max="5" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label>Hasta</label>
                            <ValidationProvider name="codigo" rules="required" v-slot="{ errors }" >
                                <input v-model="form.hasta"  type="number" id="quantity" name="quantity" min="1" max="5" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
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
        
        <button class="btn btn-block float-right btn-success" @click="switchLocsub" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLocsub" v-if="!ver && editMode">Editar</button>
     </b-modal>


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
                  </b-row>
                  <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Codigo</label>
                            <ValidationProvider name="codigo" rules="required" v-slot="{ errors }" >
                                <input v-model="form.codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>                    
                    <b-col>
                        <div class="form-group">
                            <label>Desde</label>
                            <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                                <input v-model="form.desde"   type="number" id="quantity" name="quantity" min="1" max="5" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label>Hasta</label>
                            <ValidationProvider name="codigo" rules="required" v-slot="{ errors }" >
                                <input v-model="form.hasta"  type="number" id="quantity" name="quantity" min="1" max="5" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
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
      subgrupos: [],
      form:{
            'id':'',
            'nombre':'',
            'descripcion':'',
            'codigo':'',  
            'desde':'',  
            'desde':'',  
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
   switchLocsub(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarGrupoestandarsub();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarGrupoestandarsub();
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
    async editarGrupoestandarsub(){
        let data = new FormData();
      
      var formulario = this.form;
        
        for (var key in formulario) {
          data.append(key,formulario[key]);
      }
      console.log(formulario);
        await this.axios.put('api/estandares/subgrupos', data, {
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
               this.$root.$emit("bv::hide::modal", "modal_subgrupo_form", "#btnShow");
               ///limpiar el formulario
                this.resete();
              }
            }).catch(e => {
               this.$swal(
                   'Ocurrió un problema!',
                    '',
                    'warning');
          });
      },
      async agregarGrupoestandarsub(){
        let data = new FormData();
          var formulario = this.form;
            for (var key in formulario) {
              data.append(key,formulario[key]);
            }
          console.log(formulario)
          await this.axios.post('api/estandares/subgrupos', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(response => {
                if (response.status==200) {
                  this.$swal(
                      'Agregado exito!',
                        '',
                        'success');
                  this.listargruposestandares();
                  this.$root.$emit("bv::hide::modal", "modal_subgrupo_form", "#btnShow");
                  ///limpiar el formulario   
                  this.resete();
                  }
                }).catch(e => {
               this.$swal(
                   'Ocurrió un problema!',
                    '',
                    'warning');
              });
          },
     async eliminarGrupoestandares(id){
        let data = new FormData();
        data.append('id',id);
        console.log(id);
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
              this.form.codigo = this.grupos[index].codigo;
              this.form.desde = this.grupos[index].desde;
              this.form.hasta = this.grupos[index].hasta;
              this.form.descripcion = this.grupos[index].descripcion;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
        
      },
      setearSub(id) {
        for (let index = 0; index < this.subgrupos.length; index++) {
          if (this.subgrupos[index].id===id) {
              this.form.id = this.subgrupos[index].id;
              this.form.nombre = this.subgrupos[index].nombre;
              this.form.codigo = this.subgrupos[index].codigo;
              this.form.desde = this.subgrupos[index].desde;
              this.form.hasta = this.subgrupos[index].hasta;
              this.form.descripcion = this.subgrupos[index].descripcion;
            this.$root.$emit("bv::show::modal", "modal_subgrupo_form", "#btnShow");
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
        this.listargruposestandares();
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
