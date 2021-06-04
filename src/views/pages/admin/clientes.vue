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
                :items="clientes"
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
               <template v-slot:cell(contacto)="data">
                  {{data.item.nombre_contacto}}
               </template>


              <template v-slot:cell(documento)="data">
                  {{data.item.tipo_documento}}-{{data.item.numero_documento}} 
               </template>

               
               <template v-slot:cell(estado)="data">
                  <b-badge v-if="data.item.user.status === 'activo'" variant="success">ACTIVO </b-badge>
                  <b-badge v-else variant="danger">NO ACTIVO</b-badge>
               </template>
               
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
                              <option value="Persona jurídica">Persona jurídica</option>
                              <option value="Profesional">Profesional</option>
                              <option value="Independiente">Independiente</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Tipo de documento</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_documento" name="tipo" :disabled="ver" class="form-control form-control-lg" >
                              <option value="Nit">Nit</option>
                              <option value="Cedula ciudadanía">Cedula ciudadanía</option>
                              <option value="Cedula extranjería">Cedula extranjería</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>



            <b-row>
                <b-col>
                   <label class="links">Número del documento</label>
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
                            <select v-model="form.codigo_departamento" @change="depp()" name="ciudad" class="form-control" :disabled="ver" >
                                <option v-for="departamento in colombia" :value="departamento.id" :key="departamento.id">{{departamento.departamento}}</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <div class="col-sm-6">
                   <label class="links">Codigo del departamento</label>
                   <div class="form-group">
                       <ValidationProvider name="codigo del departamento" rules="required" v-slot="{ errors }">
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
                    <ValidationProvider name="municipio" rules="required" v-slot="{ errors }">
                          <input v-model="form.municipio" name="municipio" class="form-control form-control-lg"  placeholder=" " :disabled="ver">
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
                          <select v-model="form.naturaleza_juridica" :disabled="ver" name="tipo" class="form-control form-control-lg" >
                              <option value="Privada">Privada</option>
                              <option value="Mixta">Mixta</option>
                              <option value="Publica">Publica</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Clase de prestador</label>
                        <ValidationProvider name="clase de prestador" rules="required" v-slot="{ errors }">
                          <select v-model="form.clase_prestador" name="tipo" :disabled="ver" class="form-control form-control-lg" >
                              <option value="Instituciones –IP">Instituciones –IPS</option>
                              <option value="Profesional independiente">Profesional independiente</option>
                              <option value="Transporte especial de pacientes">Transporte especial de pacientes</option>
                              <option value="Objeto social diferente a la prestación de servicios de salud">Objeto social diferente a la prestación de servicios de salud</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>ESE</label>
                    <ValidationProvider name="ESE" rules="required" v-slot="{ errors }">
                          <select v-model="form.ese" name="tipo" :disabled="ver" class="form-control form-control-lg" >
                              <option value="Si">Si</option>
                              <option value="No">No</option>
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
                    <label>Nivel de atención</label>
                    <ValidationProvider name="nivel de atención" rules="required" v-slot="{ errors }">
                          <select v-model="form.nivel_atencion" :disabled="ver" name="tipo" class="form-control form-control-lg" >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
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
                          <select v-model="form.caracter_territorial" :disabled="ver" name="tipo" class="form-control form-control-lg" >
                              <option value="Nacional">Nacional</option>
                              <option value="Deparatamental">Deparatamental</option>
                              <option value="Distrital">Distrital</option>
                              <option value="Municipal">Municipal</option>
                              <option value="Indigena">Indigena</option>
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
                                <input v-model="form.cargo_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>


                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Telefono contacto</label>
                            <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                                <input v-model="form.telefono_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
                        <ValidationProvider name="estado" rules="required" v-slot="{ errors }">
                            <select v-model="form.status" :disabled="ver"  name="tipo" class="form-control form-control-lg" >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
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
            "contacto",
            "tipo_cliente",
            "documento",
            "departamento", 
            "municipio", 
            "naturaleza_juridica", 
            "email",
            "estado",
            "actions"
            ],
      clientes: [], 
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
      this.form.departamento=this.colombia[this.form.codigo_departamento].departamento;
      console.log(this.colombia[this.form.codigo_departamento].departamento);
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
            this.editarContacto();
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
               this.listarContactos();
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

    async editarContacto(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/clientes', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarContactos();
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
        for (let index = 0; index < this.clientes.length; index++) {
          if (this.clientes[index].id===id) {

            this.form.id =this.clientes[index].id;
            this.form.logo=this.clientes[index].logo;
            this.form.tipo_cliente=this.clientes[index].tipo_cliente;
            this.form.tipo_documento=this.clientes[index].tipo_documento;
            this.form.numero_documento=this.clientes[index].numero_documento;
            this.form.departamento=this.clientes[index].departamento;
            this.form.codigo_departamento=this.clientes[index].codigo_departamento;
            this.form.municipio=this.clientes[index].municipio;
            this.form.codigo_municipio=this.clientes[index].codigo_municipio;
            this.form.naturaleza_juridica=this.clientes[index].naturaleza_juridica;
            this.form.nombre_prestador=this.clientes[index].nombre_prestador;        
            this.form.codigo_prestador=this.clientes[index].codigo_prestador;
            this.form.codigo=this.clientes[index].codigo;
            this.form.clase_prestador=this.clientes[index].clase_prestador;
            this.form.ese=this.clientes[index].ese;
            this.form.direccion=this.clientes[index].direccion;
            this.form.telefono=this.clientes[index].telefono;
            this.form.fax=this.clientes[index].fax;
            this.form.celular=this.clientes[index].celular;
            this.form.email=this.clientes[index].email;
            this.form.razon_social=this.clientes[index].razon_social;
            this.form.representante_legal=this.clientes[index].representante_legal;
            this.form.numero_sede=this.clientes[index].numero_sede;    
            this.form.nivel_atencion=this.clientes[index].nivel_atencion;
            this.form.caracter_territorial=this.clientes[index].caracter_territorial;
            this.form.nombre_contacto=this.clientes[index].nombre_contacto;
            this.form.cargo_contacto=this.clientes[index].cargo_contacto;
            this.form.telefono_contacto=this.clientes[index].telefono_contacto;
            this.form.celular_contacto=this.clientes[index].celular_contacto;
            this.form.email_contacto=this.clientes[index].email_contacto;
            this.form.status=this.clientes[index].user.status;
            this.url_logo=this.clientes[index].user.imagen;
            this.form.user_id=this.clientes[index].user_id;
            ///this.depp();




            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async  listarContactos(){
       await this.axios.get('api/clientes')
        .then((response) => {
          this.clientes = response.data.rows;
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
       this.listarContactos();

      },
     mounted() {

    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.clientes.length;
    },
  },
}
</script>
