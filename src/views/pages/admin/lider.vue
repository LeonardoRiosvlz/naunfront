<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear lider</b-button>
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
                :items="areas"
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
                    <b-dropdown-item-button @click="eliminarArea(data.item.id)"><b-icon icon="trash" class=""></b-icon> Eliminar </b-dropdown-item-button>
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




    <b-modal id="modal" false size="lg"  title="Lider de proceso" hide-footer>
          <ValidationObserver ref="form">
            <b-row class="justify-content-center mb-3">
                  <div class="col-sm-6">
                    <label>pefil</label>
                   <div id="preview mb-2" class="row justify-content-center mb-3">
                     <img v-if="perfil" width="200px" height="200px" style="float:center!importan; border-radius:100%" class=""  :src="url_perfil" />
                   </div>
                    <b-form-file
                        v-model="perfil"
                        placeholder="Seleccione su foto..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangePerfil"
                    ></b-form-file>
               </div>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Nombre y Apellido</label>
                    <ValidationProvider name="nombre y apellido" rules="required" v-slot="{ errors }">
                            <input v-model="form.nombre_apellido"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Numero de cedula</label>
                    <ValidationProvider name="numero de cedula" rules="required" v-slot="{ errors }">
                        <input v-model="form.numero_cedula"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row> 

            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Cargo</label>
                    <ValidationProvider name="cargo" rules="required" v-slot="{ errors }">
                            <input v-model="form.cargo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Telefono</label>
                    <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                        <input v-model="form.telefono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>


            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Celular personal</label>
                    <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                            <input v-model="form.celular_personal"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Celular corporativo</label>
                    <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                        <input v-model="form.celular_corporativo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>      

             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Correo electronico</label>
                    <ValidationProvider name="correo" rules="required" v-slot="{ errors }">
                            <input v-model="form.email"  type="email" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Nombre de usuario</label>
                    <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                        <input v-model="form.nombre_usuario"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>

             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Estado</label>
                    <ValidationProvider name="estado" rules="required" v-slot="{ errors }">
                          <select v-model="form.estado"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option value="no activado">No activado</option>
                              <option value="activado">Ativado</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>

             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Tipo de proceso al que pertenece</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                            <input v-model="form.tipo_proceso_pertenece"  type="email" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Proceso que lidera</label>
                    <ValidationProvider name="proceso" rules="required" v-slot="{ errors }">
                        <input v-model="form.proceso_lidera"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
          text: "Gestión corporativa"
        },
        {
          text: "Lider",
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
      fields: [
          "Nombre y Apellido",
          "Numero de cedula",
          "Cargo",
          "Telefono",
          "Celular personal",
          "Celular corporativo",
          "Correo electronico",
          "Nombre de usuario",
          "Estado",
          "Tipo de proceso al que pertenece",
          "Proceso que lidera",
          "actions"],
      areas: [], 
      editMode:false,
      form:{
          'id':'',
          'nombre_apellido':'',
          'numero_cedula':'',
          'cargo':'',
          'telefono':'',
          'celular_personal':'',
          'celular_corporativo':'',
          'email':'',
          'nombre_usuario':'',
          'estado':'',
          'tipo_proceso_pertenece':'',
          'proceso_lidera':''
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
              this.agregarArea();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarAreas();
          } else {
        }});
      }
    },
   async agregarArea(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/areas', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarAreas();
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
    async editarAreas(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/areas', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarAreas();
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
     async eliminarAreas(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/areas/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarAreas();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarAreas(id){
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
            this.eliminarAreas(id);
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
        for (let index = 0; index < this.areas.length; index++) {
          if (this.areas[index].id===id) {
            this.form.id=this.areas[index].id;
            this.form.nombre=this.areas[index].nombre;
            this.form.descripcion=this.areas[index].descripcion;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      listarAreas(){
        this.axios.get('api/areas')
        .then((response) => {
          this.areas = response.data.rows;
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
      const perfil = e.target.files[0];
      this.url_perfil = URL.createObjectURL(perfil);
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
        this.listarAreas();
      },
    computed: {
    rows() {
      return this.areas.length;
    },
  },
}
</script>
