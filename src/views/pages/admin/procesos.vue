<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear procesos</b-button>
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
            <div class="table-responsive mb-0">
              <b-table
                :items="procesos"
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
                    <b-dropdown-item-button @click="eliminarCargo(data.item.id)"> Eliminar </b-dropdown-item-button>
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

    <b-modal id="modal" false size="lg"  title="Gestión de procesos" hide-footer>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Tipo de proceso</label>
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                    <select v-model="form.tipos_procesos"  name="tipo" class="form-control form-control-lg">
                        <option value="Tipo de proceso">Tipo de proceso</option>
                        <option value="Tipo de proceso">Tipo de proceso</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                <label>Versión</label>
                  <ValidationProvider name="version" rules="required" v-slot="{ errors }">
                    <input v-model="form.version"  type="text" class="form-control" placeholder=" " :disabled="ver">
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Nombre proceso</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.nombre_procesos"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Objetivo del proceso</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <textarea v-model="form.objetivo_procesos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                  <label>Líder del proceso</label>
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                    <select v-model="form.lider_proceso"  name="tipo" class="form-control form-control-lg" >
                        <option value="Administrador">Activo</option>
                        <option value="Coordinador">No activo</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
                </b-col>
              </b-row>    

              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Tiene subprocesos</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                      <select v-model="form.subprocesos"  name="tipo" class="form-control form-control-lg" >
                          <option value="Administrador">Si</option>
                          <option value="Coordinador">No</option>
                      </select>
                      <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                  <label>Subprocesos relacionados</label>
                   <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <input v-model="form.subprocesos_relacionados"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row> 

              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Codigo</label>
                    <ValidationProvider name="codigo" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>

              </b-row> 

              <b-card class="shadow-lg">
                <h5 class="mb-2">Actividades del subproceso</h5>
                <b-row class="justify-content-end mr-3">
                  <b-col>
                    <button style="float:right" v-b-tooltip.hover title="Agregar un item a la lista" class="btn btn-success my-4 btn-sm btn-block" type="button" @click="cargar(cliente.nombre_prestador)"  name="button" v-if="!ver" >Agregar Item</button>
                  </b-col>
                </b-row>
                <div v-for="(acvidades, index) in form.actividades" :key="index">
                <b-row>
                  <b-col>
                      <div class="form-group">
                      <label>Titulo</label>
                      <ValidationProvider name="titulo" rules="required" v-slot="{ errors }">
                              <div class="row m-0">
                                  <input :id="index+'titulo'"  v-model="acvidades.titulo"  type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"/>
                              </div>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>

                    <b-col>
                      <div class="form-group">
                      <label>Subtitulo</label>
                      <ValidationProvider name="subtitulo" rules="required" v-slot="{ errors }">
                              <div class="row m-0">
                                  <input :id="index+'subtitulo'"  v-model="acvidades.subtitulo"   type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"/>
                              </div>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                      <div class="form-group">
                      <label>Descripción</label>
                      <ValidationProvider name="descripción" rules="required" v-slot="{ errors }">
                              <div class="row m-0">
                                  <textarea :id="index+'descripcion'"  v-model="acvidades.descripcion"  type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"></textarea>
                              </div>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>
                </b-row>
                </div>
                <pre>{{form}}</pre>
 

              </b-card>   
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
          text: "Gestión de clientes"
        },
        {
          text: "Procesos",
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
      fields: ["Nombre_proceso","Tipo_proceso", "version", "Objetivo","Actions"],
      procesos: [], 
      editMode:false,

  form:{
          'id': 6,
          'tipos_procesos': '',
          'version': '',
          'nombre_procesos': null,
          'objetivo_procesos': '',
          'lider_proceso': '',
          'subprocesos': '',
          'subprocesos_relacionados':'',
          'codigo':'',
          'actividades':[],
      }
    }
  },

  methods: {
    cargar(index){
      this.form.actividades.push({
        titulo:"",
        subtitulo:"",
        descripcion:"",
      });
      },
      eliminarItem(index){
        this.form.actividades.splice(index, 1);  
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
              this.agregarCliente();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarCargos();
          } else {
        }});
      }
    },
   async editarCliente(){
        let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.post('api/cargos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarCargos();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
    async editarCliente(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/cargos', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarCargos();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
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
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarCargo(id){
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
            this.eliminarCargos(id);
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
        for (let index = 0; index < this.procesos.length; index++) {
          if (this.procesos[index].id===id) {

              this.form.id = this.procesos[index].id,
              this.form.tipos_procesos = this.procesos[index].tipo_procesos,
              this.form.version = this.procesos[index].verision,
              this.form.nombre_procesos = this.procesos[index].nombre_procesos,
              this.form.objetivo_procesos = this.procesos[index].objetivo_procesos,
              this.form.lider_proceso = this.procesos[index].lider_proceso,
              this.form.subprocesos = this.procesos[index].subprocesos,
              this.form.subprocesos_relacionados = this.procesos[index].subprocesos_relacionados,
              this.form.codigo = this.procesos[index].codigo,
              this.form.actividades_subprocesos = this.procesos[index].actividades_subprocesos,

            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async  listarCargos(){
       await this.axios.get('api/cargos')
        .then((response) => {
          this.cargos = response.data.rows;
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
        this.listarCargos();

      },
     mounted() {

    },
    computed: {
     ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.procesos.length;
    },
  },
}
</script>
