<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear sedes</b-button>
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

    <b-modal id="modal" false size="lg"  title="Gestión de sedes" hide-footer>
        <h5>Datos generales del prestador</h5>
          <ValidationObserver ref="form">
            <b-row>
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
                <div class="col-sm-6">
                   <label class="links">Nombre del prestador</label>
                   <div class="form-group">
                       <ValidationProvider name="nombre del prestador" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.nombre_prestador"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
                <div class="col-sm-6">
                   <label class="links">Codigo de prestador</label>
                   <div class="form-group">
                       <ValidationProvider name="codigo del prestador" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.codigo_prestador"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
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
                       <ValidationProvider name="codigo del departemento" rules="required|alpha_spaces" v-slot="{ errors }">
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
                          <input v-model="form.municipio" name="tipo" class="form-control form-control-lg"  placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Codigo municipio</label>
                        <ValidationProvider name="codigo del municipio" rules="required|alpha_spaces" v-slot="{ errors }">
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
                
            </b-row>
             <b-row>
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
                 <b-col>
                    <div class="form-group">
                    <label>Nivel del prestador</label>
                    <ValidationProvider name="nivel del prestador" rules="required" v-slot="{ errors }">
                          <select v-model="form.razon_social" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Si</option>
                              <option value="Coordinador">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>
            <h5>Datos de la sede</h5>



            <b-row>
                <b-col>
                    <div class="form-group">
                        <label>Departamento</label>
                        <ValidationProvider name="departamento" rules="required" v-slot="{ errors }">
                            <select v-model="form.departamento_sede" name="ciudad" class="form-control" :disabled="ver" >
                                <option v-for="departamento in colombia" :value="departamento.departamento" :key="departamento.id">{{departamento.departamento}}</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Codigo del departamento</label>
                        <ValidationProvider name="codigo del departamento" rules="required|alpha_spaces" v-slot="{ errors }">
                                <input v-model="form.codigo_departamento_sede"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
              </b-row>    


            <b-row>
              <b-col>
                    <div class="form-group">
                        <label>Municipio</label>
                        <ValidationProvider name="municipio" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.municipio_sede"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Codigo del municipio</label>
                        <ValidationProvider name="codigo del municipio" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.codigo_municipio_sede"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
            </b-row> 

            <b-row>
                <div class="col-sm-6">
                   <label class="links">Nombre de la sede</label>
                   <div class="form-group">
                       <ValidationProvider name="nombre de la sede" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.nombre_sede"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
                <div class="col-sm-6">
                   <label class="links">Codigo de la sede</label>
                   <div class="form-group">
                       <ValidationProvider name="codigo de la sede" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.codigo_sede"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
            </b-row>

              <b-row>
               <b-col>
                    <div class="form-group">
                        <label>Sede principal</label>
                        <ValidationProvider name="sede" rules="required" v-slot="{ errors }">
                            <select v-model="form.sede_principal" name="sede" class="form-control" :disabled="ver" >
                                <option  value="no">No</option>
                                <option  value="si">Si</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Numero de sede</label>
                        <ValidationProvider name="numero de sede" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.numero_sede"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
            </b-row>

            <b-row>
               <b-col>
                    <div class="form-group">
                        <label>Zona</label>
                        <ValidationProvider name="zona" rules="required" v-slot="{ errors }">
                            <select v-model="form.zona" name="zona" class="form-control" :disabled="ver" >
                                <option  value="no">Rural</option>
                                <option  value="si">Urbana</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Nombre del gerente</label>
                        <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
                            <input v-model="form.Nombre_gerente"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
            </b-row>

           


                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Dirección</label>
                            <ValidationProvider name="dirección" rules="required|alpha_spaces" v-slot="{ errors }">
                                    <input v-model="form.direccion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                        <label>Barrio</label>
                        <ValidationProvider name="barrio" rules="required|alpha_spaces" v-slot="{ errors }">
                                <input v-model="form.barrio"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>


                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Centro poblado</label>
                            <ValidationProvider name="centro poblado" rules="required|alpha_spaces" v-slot="{ errors }">
                                <input v-model="form.centro_poblado"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label>Fax</label>
                            <ValidationProvider name="fax" rules="required|alpha_spaces" v-slot="{ errors }">
                                <input v-model="form.fax"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>
        
                <b-row>
                    <div class="col-sm-6">
                        <label class="links">Correo electronico personal</label>
                        <div class="form-group">
                            <ValidationProvider name="correo electronico" rules="required|alpha_spaces" v-slot="{ errors }">
                                    <input v-model="form.email_contacto"  type="email" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Telefonos</label>
                        <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                          <input v-model="form.estado"  type="email" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>


                <b-row>
                    <div class="col-sm-6">
                        <label class="links">Nombre del contacto</label>
                        <div class="form-group">
                            <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
                                    <input v-model="form.nombre_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Cargo</label>
                        <ValidationProvider name="cargo" rules="required" v-slot="{ errors }">
                          <input v-model="form.cargo" type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <div class="col-sm-6">
                        <label class="links">Telefono</label>
                        <div class="form-group">
                            <ValidationProvider name="telefono" rules="required|alpha_spaces" v-slot="{ errors }">
                                    <input v-model="form.nombre_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Celular personal</label>
                        <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                            <input v-model="form.celular_personal"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>

                 <b-row>
                    <div class="col-sm-6">
                        <label class="links">Celular corporativo</label>
                        <div class="form-group">
                            <ValidationProvider name="cargo" rules="required|alpha_spaces" v-slot="{ errors }">
                                    <input v-model="form.celular_corporativo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Correo electronico personal</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                            <input v-model="form.email_personal"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="form-group">
                    <label>Estado</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                        <select v-model="form.estado"  name="tipo" class="form-control form-control-lg" >
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
        'tipo_cliente',
        'tipo_documento',
        'numero_documento',
        'nombre_prestador',        
        'codigo_prestador',
        'departamento',
        'codigo_departamento',
        'municipio',
        'codigo_municipio',
        'naturaleza_juridica',
        'clase_prestador',
        'caracter_territorial',
        'ese',
        'nivel_prestador',
        'departamento_sede',
        'codigo_departamento_sede',
        'municipio_cede',
        'nombre_sede',
        'codigo_sede',
        'sede_principal',
        'numero_sede',
        'zona',
        'nombre_gerente',
        'direccion',
        'barrio',
        'centro_poblado',
        'fax',
        'telefonos',
        'email',
        'nombre_contacto',
        'cargo',
        'telefono',
        'celular_personal',
        'celular_corporativo',
        'email_personal',
        'estado',
            ],
      cargos: [], 
      editMode:false,
      form:{
        'id':'', 
        'tipo_cliente':'',
        'tipo_documento':'',
        'numero_documento':'',
        'nombre_prestador':'',        
        'codigo_prestador':'',
        'departamento':'',
        'codigo_departamento':'',
        'municipio':'',
        'codigo_municipio':'',
        'naturaleza_juridica':'',
        'clase_prestador':'',
        'caracter_territorial':'',
        'ese':'',
        'nivel_prestador':'',

        'departamento_sede':'',
        'codigo_departamento_sede':'',
        'municipio_cede':'',
        'nombre_sede':'',
        'codigo_sede':'',
        'sede_principal':'',
        'numero_sede':'',
        'zona':'',
        'nombre_gerente':'',
        'direccion':'',
        'barrio':'',
        'centro_poblado':'',
        'fax':'',
        'telefonos':'',
        'email':'',
        'nombre_contacto':'',
        'cargo':'',
        'telefono':'',
        'celular_personal':'',
        'celular_corporativo':'',
        'email_personal':'',
        'estado':'',
        
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
        if (this.file) {
        data.append('filename',this.file);
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
