<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Crear plan</b-button>
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
            <div class="table-responsive mb-0" style="min-heigth:500px">
              <b-table
                :items="bases"
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
                <template v-slot:cell(autoevaluacion)="data">
                  {{data.item.bases_autoevaluacion.nombre}}
                </template>
                <template v-slot:cell(periodo)="data">
                  {{data.item.bases_autoevaluacion.periodo.nombre}}
                </template>
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"><b-icon icon="pencil" class=""></b-icon> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarbases(data.item.id)"><b-icon icon="trash" class=""></b-icon> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button ><b-icon icon="eye" class=""></b-icon><a :href="'/plan-accion/'+data.item.id" style="color:#000">Gestionar</a></b-dropdown-item-button>
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




    <b-modal id="modal" false size="lg"  title="Gestión de bases de autoevaluación" hide-footer>

          <ValidationObserver ref="form">
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
              <b-row class="">
                    <b-col>
                        <div class="form-group">
                        <label>Clasificación</label>
                        <ValidationProvider name="periodo" rules="required" v-slot="{ errors }" >
                            <select v-model="form.clasificacion_id"  name="periodo" class="form-control " :disabled="ver">
                                <option :value="clasificacion.id" v-for="(clasificacion,index) in clasificacion" :key="index">{{clasificacion.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row> 
                <b-row class="">
                    <b-col>
                        <div class="form-group">
                        <label>Base de auto evaluación</label>
                        <ValidationProvider name="periodo" rules="required" v-slot="{ errors }" >
                            <select v-model="form.base_id"  name="periodo" class="form-control " :disabled="ver">
                                <option :value="periodo.id" v-for="(periodo,index) in auto" :key="index">{{periodo.nombre}}</option>
                            </select>
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
        </ValidationObserver>
   
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
       
     </b-modal>
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
          text: "Plan de accion"
        },
        {
          text: "gestion",
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
      fields: ["nombre","autoevaluacion","periodo","actions"],
      bases:[], 
      auto:[], 
      periodos: [],
      clasificacion: [],  
      editMode:false,
      form:{
        'id': '',
        'nombre':'',
        'base_id':'',
        'descripcion':'',
        'cliente_id':'',
        'clasificacion_id':'',
        'created_at':'',
        'updated_at':'',
      }
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
              this.agregarbases();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarbases();
          } else {
        }});
      }
    },
   async agregarbases(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/planes/accion', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarbases();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
               this.$swal(
                   'No se pudo agregar!',
                    '',
                    'warning');
          });
      },
    async editarbases(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/planes/accion', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarbases();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarbasess(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/planes/accion/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarbases();
                }
              }).catch(e => {
                this.$swal(
                    'No se pudo editar!',
                      '',
                      'warning'
                );
          });
      }, 
      eliminarbases(id){
        this.$swal({
          title: 'Desea borrar este registro?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarbasess(id);
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
        for (let index = 0; index < this.bases.length; index++) {
          if (this.bases[index].id===id) {
            this.form.id=this.bases[index].id;
            this.form.nombre=this.bases[index].nombre;
            this.form.descripcion=this.bases[index].descripcion;
            this.form.base_id=this.bases[index].base_id;
            this.form.clasificacion_id=this.bases[index].clasificacion_id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async listarbases(){
      console.log("hola");
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/planes/accion/listar',data)
        .then((response) => {
          this.bases = response.data;
          console.log(bases);
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    async listarAutoevaluacion(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/basesau/listar',data)
        .then((response) => {
          this.auto = response.data;
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
      async listarclasificacion(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/planes/calisficacion/listar',data)
          .then((response) => {
            this.clasificacion = response.data;
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
        this.listarbases();
        this.listarperiodos();
         this.listarclasificacion();
         this.listarAutoevaluacion();
      },
   watch: {
      cliente: function () {
        this.listarAutoevaluacion();
        this.listarperiodos();
        this.listarbases();
        this.listarclasificacion();
        this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.c
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.bases.length;
    },
  },
}
</script>
