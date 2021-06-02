<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear subprocesos</b-button>
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
                :items="cargos"
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

    <b-modal id="modal" false size="lg"  title="Gestión de subprocesos" hide-footer>
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
                <label>Proceso</label>
                  <ValidationProvider name="proceso" rules="required" v-slot="{ errors }">
                    <input v-model="form.proceso"  type="text" class="form-control" placeholder=" " :disabled="ver">
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Nombre subproceso</label>
                    <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                          <input v-model="form.nombre_subprocesos"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Objetivo del subproceso</label>
                    <ValidationProvider name="objetivo" rules="required" v-slot="{ errors }">
                          <textarea v-model="form.objetivo_subprocesos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                  <label>Líder del subproceso</label>
                  <ValidationProvider name="lider" rules="required" v-slot="{ errors }">
                    <select v-model="form.lider_subproceso"  name="tipo" class="form-control form-control-lg" >
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
                    <label>Codigo del prefijo</label>
                    <ValidationProvider name="codigo" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>

                <b-col>
                  <div class="form-group">
                  <label>Actividades del subproceso</label>
                   <ValidationProvider name="actividades" rules="required" v-slot="{ errors }">
                          <div class="row m-0">
                              <input v-model="form.actividades_subprocesos"  type="text" class="form-control col-8  mr-3" placeholder=" " :disabled="ver">
                              <b-button class="col-3" pill>Agregar</b-button>
                          </div>
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
      subprocesos: [], 
      editMode:false,
  form:{
          "id": "",
          "tipos_procesos": "",
          "proceso": "",
          "nombre_subprocesos": "",
          "objetivo_subprocesos": "",
          "lider_subproceso": "",
          "codigo":"",
          "actividades_subprocesos":""
      }
    }
  },
  computed:{
        ...mapState(['counter'])
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
              this.agregarSubproceso();
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
        for (let index = 0; index < this.subprocesos.length; index++) {
          if (this.subprocesos[index].id===id) {

            this.id = this.subprocesos[index].id,
            this.tipos_procesos = this.subprocesos[index].tipos_procesos,
            this.proceso = this.subprocesos[index].proceso,
            this.nombre_subprocesos = this.subprocesos[index].nombre_subprocesos,
            this.objetivo_subprocesos = this.subprocesos[index].objetivo_subprocesos,
            this.lider_subproceso = this.subprocesos[index].lider_subproceso,
            this.codigo = this.subprocesos[index].codigo,
            this.actividades_subproceso = this.subprocesos[index].actividades_subproceso
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
    rows() {
      return this.subprocesos.length;
    },
  },
}
</script>
