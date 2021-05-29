<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear clientes</b-button>
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

    <b-modal id="modal" false size="lg"  title="Gestión de clientes" hide-footer>
          <ValidationObserver ref="form">
            <b-row>
                <b-col>
                    <label>Logo</label>
                   <div  class="flex-column row align-items-center w-100 mb-3" id="preview mb-2">
                     <img v-if="logo" width="150px" style="float:center!importan" class="rounded"  :src="url_logo" />
                   </div>
                    <b-form-file
                        v-model="logo"
                        placeholder="Seleccione una imagen..."
                        drop-placeholder="Drop file here..."
                         @change="onFileChangeLogo"
                    ></b-form-file>
               </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Tipo de cliente</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_cliente" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Persona jurídica</option>
                              <option value="Coordinador">Profesional</option>
                              <option value="Tecnico">Independiente</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Tipo de documento</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_documento" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Nit</option>
                              <option value="Coordinador">Cedula ciudadanía</option>
                              <option value="Tecnico">Cedula extranjería</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>



            <b-row>
                <b-col>
                   <label class="links">Numero del documento</label>
                   <div class="form-group">
                       <ValidationProvider name="numero" rules="required" v-slot="{ errors }">
                            <input v-model="form.numero_documento"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </b-col>
                <b-col>
                   <label class="links">Nombre del prestador</label>
                   <div class="form-group">
                       <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                            <input v-model="form.nombre_prestador"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </b-col>
                <b-col>
                   <label class="links">Codigo de prestador</label>
                   <div class="form-group">
                       <ValidationProvider name="codigo" rules="required" v-slot="{ errors }">
                            <input v-model="form.codigo_prestador"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </b-col>
            </b-row>



            <b-row>
                <b-col>
                    <div class="form-group">
                        <label>Departamento</label>
                        <ValidationProvider name="departamento" rules="required" v-slot="{ errors }">
                            <select v-model="form.departamento" name="ciudad" class="form-control" :disabled="ver" >
                                <option v-for="departamento in colombia" :value="departamento.departamento" :key="departamento.id">{{departamento.departamento}}</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <div class="col-sm-6">
                   <label class="links">Codigo del departamento</label>
                   <div class="form-group">
                       <ValidationProvider name="codigo del departamento" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.codigo_departamento"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
            </b-row>    



             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Municipio</label>
                    <ValidationProvider name="tipo" rules="municipio" v-slot="{ errors }">
                          <input v-model="form.municipio" name="tipo" class="form-control form-control-lg"  placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Codigo del municipio</label>
                        <ValidationProvider name="codigo " rules="required" v-slot="{ errors }">
                            <input v-model="form.codigo_municipio"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
            </b-row>



              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Naturaleza jurídica</label>
                    <ValidationProvider name="naturaleza jurídica" rules="required" v-slot="{ errors }">
                          <select v-model="form.naturaleza_juridica" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Privada</option>
                              <option value="Coordinador">Mixta</option>
                              <option value="Tecnico">Publica</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Clase de prestador</label>
                        <ValidationProvider name="clase de prestador" rules="required" v-slot="{ errors }">
                          <select v-model="form.clase_prestador" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Instituciones –IPS</option>
                              <option value="Coordinador">Profesional independiente</option>
                              <option value="Tecnico">Transporte especial de pacientes</option>
                              <option value="Tecnico">Objeto social diferente a la prestación de servicios de salud</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>ESE</label>
                    <ValidationProvider name="ESE" rules="required" v-slot="{ errors }">
                          <select v-model="form.ese" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Si</option>
                              <option value="Coordinador">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>



            <b-row>
                <b-col>
                    <div class="form-group">
                        <label>Telefonos</label>
                        <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                            <input v-model="form.telefono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Fax</label>
                        <ValidationProvider name="fax" rules="required" v-slot="{ errors }">
                                <input v-model="form.fax"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Celular</label>
                        <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                            <input v-model="form.celular"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
              </b-row>    


            <b-row>
                <b-col>
                    <div class="form-group">
                        <label>Dirección</label>
                        <ValidationProvider name="direccion" rules="required" v-slot="{ errors }">
                            <input v-model="form.direccion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>

                 <div class="col-sm-6">
                   <label class="links">Correo electronico</label>
                   <div class="form-group">
                       <ValidationProvider name="correo electronico" rules="required" v-slot="{ errors }">
                            <input v-model="form.email"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
            </b-row> 


              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Razón social</label>
                    <ValidationProvider name="razón social" rules="required" v-slot="{ errors }">
                        <input v-model="form.razon_social"   type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Representante legal</label>
                        <ValidationProvider name="representante legal" rules="required" v-slot="{ errors }">
                            <input v-model="form.representante_legal"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                 <b-col>
                    <div class="form-group">
                    <label>Nivel de atencion</label>
                    <ValidationProvider name="nivel de atención" rules="required" v-slot="{ errors }">
                          <select v-model="form.razon_social" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Si</option>
                              <option value="Coordinador">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>


            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Caracter territorial</label>
                    <ValidationProvider name="caracter territorial" rules="required" v-slot="{ errors }">
                          <select v-model="form.caracter_territorial" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Nacional</option>
                              <option value="Coordinador">Deparatamental</option>
                              <option value="Coordinador">Distrital</option>
                              <option value="Coordinador">Municipal</option>
                              <option value="Coordinador">Indigena</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>


                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Nombre contacto</label>
                            <ValidationProvider name="nombre cotacto" rules="required" v-slot="{ errors }">
                                    <input v-model="form.nombre_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                        <label>Cargo</label>
                        <ValidationProvider name="cargo" rules="required" v-slot="{ errors }">
                                <input v-model="form.cargos_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>


                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Telefono</label>
                            <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                                <input v-model="form.telenfono_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label>Celular</label>
                            <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                                <input v-model="form.celular_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>



                <b-row>
                    <div class="col-sm-6">
                        <label class="links">Correo electronico del contacto</label>
                        <div class="form-group">
                            <ValidationProvider name="correo electronico" rules="required" v-slot="{ errors }">
                                    <input v-model="form.email_contacto"  type="email" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Estado</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                            <select v-model="form.status"  name="tipo" class="form-control form-control-lg" >
                                <option value="Administrador">Activo</option>
                                <option value="Coordinador">No activo</option>
                            </select>
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
import { colombia } from "./colombia";

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
      colombia:colombia,
      title: "Administracion",
      items: [
        {
          text: "Gestión de clientes"
        },
        {
          text: "clientes",
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
      url_logo:"",
      modal: true,
      file:null,
      logo:null,
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
            "Tipo de cliente",
            "Tipo de documento",
            "Numero de documento", 
            "Departamento", 
            "Codigo de departamento", 
            "Municipio", 
            "Codigo de municipio", 
            "Naturaleza jurídica", 
            "Nombre del prestador",
            "Codigo del prestador",
            "Codigo",
            "Clase del prestador",
            "ESE",
            "Dirección",
            "Telefono",
            "Fax",
            "Celular",
            "email",
            "Razon social",
            "Representante legal",
            "Numero de sede",
            "Nivel de atención",
            "Caracter territorial",
            "Nombre del contacto",
            "Telefono del contacto",
            "Celular del contacto",
            "email del contacto",
            "Estado"
            ],
      cargos: [], 
      editMode:false,
      form:{
        'id':'', 
        'logo': '',
        'tipo_cliente':'',
        'tipo_documento':'',
        'numero_documento':'',
        'departamento':'',
        'codigo_departamento':'',
        'municipio':'',
        'codigo_municipio':'',
        'naturaleza_juridica':'',
        'nombre_prestador':'',        
        'codigo_prestador':'',
        'codigo':'',
        'clase_prestador':'',
        'ese':'',
        'direccion':'',
        'telefono':'',
        'fax':'',
        'celular':'',
        'email':'',
        'razon_social':'',
        'representante_legal':'',
        'numero_sede':'',    
        'nivel_atencion':'',
        'caracter_territorial':'',
        'nombre_contacto':'',
        'cargo_contacto':'',
        'telefono_contacto':'',
        'celular_contacto':'',
        'email_contacto':'',
        'status':'',
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarUsers();
    console.log(this.colombia)
  },
  methods: {
    depp(){
      this.form.departamento=this.colombia[this.form.dep].departamento;
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
              this.agregarContacto();
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

   async agregarContacto(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        if (this.logo) {
        data.append('filename',this.logo);
       }
       await this.axios.post('api/clientes', data, {
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

    async editarCargos(){
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
        for (let index = 0; index < this.cargos.length; index++) {
          if (this.cargos[index].id===id) {
            this.form.id=this.cargos[index].id;
            this.form.cargo=this.cargos[index].cargo;
            this.form.descripcion=this.cargos[index].descripcion;
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
    created(){
        this.session();
        this.listarCargos();

      },
     mounted() {

    },
    computed: {
    rows() {
      return this.cargos.length;
    },
  },
}
</script>
