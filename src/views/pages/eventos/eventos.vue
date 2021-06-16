<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Crear clasificacion</b-button>
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
                :items="clasificacion"
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
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"><b-icon icon="pencil" class=""></b-icon> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarclasificacion(data.item.id)"><b-icon icon="trash" class=""></b-icon> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"><b-icon icon="eye" class=""></b-icon> Ver </b-dropdown-item-button>
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
                  <ValidationProvider name="descripcion" rules="required|alpha_spaces" v-slot="{ errors }">
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
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                :id="'exampleRadios1'+index"
                                :value="calisficacion.id"
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
                      <b-form-input id="date-time" v-model="form.fecha_programacion"  type="datetime-local"></b-form-input>
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
              <hr>
              <h5>Invitados</h5>
            <b-row>
                <div class="col-12">
                    <div class=" row">
                        <div class="form-group col-3">
                            <label>Nombre </label>
                                <input v-model="form.nombre"  type="text" class="form-control" placeholder=" ">
                        </div>
                        <div class="form-group col-3">
                    <label>Cargo</label>
                        <input v-model="form.cargo"  type="text" class="form-control" placeholder=" ">
                     </div>
                        <div class="form-group col-3">
                            <label>Email </label>
                                <input v-model="form.email"  type="text" class="form-control" placeholder=" ">
                        </div>
                        <div class="form-group col-3">
                    <label>Telefono </label>
                        <input v-model="form.telefono"  type="text" class="form-control" placeholder=" ">
                     </div>
                    </div>
                </div >
                <div class="col-12">
                  <label></label>
                  <button class="btn btn-success btn-block mb-2" @click="cargarInvitados()" :disabled="form.objetivo===''">+</button>
                </div >
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
          text: "clasificacion",
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
      fields: ["nombre","descripcion","color","actions"],
      clasificacion: [], 
      editMode:false,
      form:{
        'id': '',
        'nombre':'',
        'cargo':'',
        'email':'',
        'telefono':'',
        'color':'',
        'descripcion':'',
        'cliente_id':'',
        'created_at':'',
        'updated_at':'',
        'invitados':[],
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
              this.agregarclasificacion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarclasificacion();
          } else {
        }});
      }
    },
   async agregarclasificacion(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/eventos/calisficacion', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarclasificacion();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
    async editarclasificacion(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/eventos/calisficacion', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarclasificacion();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarclasificacions(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/eventos/calisficacion/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarclasificacion();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarclasificacion(id){
        this.$swal({
          title: 'Desea borrar esta area?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarclasificacions(id);
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
        for (let index = 0; index < this.clasificacion.length; index++) {
          if (this.clasificacion[index].id===id) {
            this.form.id=this.clasificacion[index].id;
            this.form.nombre=this.clasificacion[index].nombre;
            this.form.descripcion=this.clasificacion[index].descripcion;
            this.form.color=this.clasificacion[index].color;
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
    cargarInvitados(){
      this.form.objetivos.push({
       nombre:this.form.nombre,
       telefono:this.form.telefono,
       cargo:this.form.cargo,
       email:this.form.email,
      });
    },
    eliminarInvitados(index){
       this.form.invitados.splice(index, 1);  
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
      },
   watch: {
      cliente: function () {
       this.listarclasificacion();
       this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.c
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.clasificacion.length;
    },
  },
}
</script>
