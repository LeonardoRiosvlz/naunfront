<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Crear sedes</b-button>
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
                :items="sedes"
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
              <template v-slot:cell(status)="data">
                  <b-badge v-if="data.item.status === 'Activo'" variant="success">ACTIVO </b-badge>
                  <b-badge v-else variant="danger">NO ACTIVO</b-badge>
               </template>



                <template v-slot:cell(actions)="data">
                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarSede(data.item.id)"> Eliminar </b-dropdown-item-button>
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
        <b-card>  
          <h5>Datos generales del prestador</h5>
          <b-row>
              <div class="col-3 mb-2">
                  <p class="m-0">Tipo de cliente</p>
                  <strong style="font-size:14px;">{{cliente.tipo_cliente}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Tipo de documento</p>
                  <strong style="font-size:14px;">{{cliente.tipo_documento}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Nombre del prestador</p>
                  <strong style="font-size:14px;">{{cliente.nombre_prestador}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Codigo de prestador</p>
                  <strong style="font-size:14px;">{{cliente.codigo_prestador}}</strong>
              </div>
          </b-row>

          <b-row>
              <div class="col-3 mb-2">
                  <p class="m-0">Departamento</p>
                  <strong style="font-size:14px;">{{cliente.departamento}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Codigo de departamento</p>
                  <strong style="font-size:14px;">{{cliente.codigo_departamento}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Municipio</p>
                  <strong style="font-size:14px;">{{cliente.municipio}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Codigo de municipio</p>
                  <strong style="font-size:14px;">{{cliente.codigo_municipio}}</strong>
              </div>
          </b-row>


          <b-row>
              <div class="col-3 mb-2">
                  <p class="m-0">Naturaleza jurídica</p>
                  <strong style="font-size:14px;">{{cliente.naturaleza_juridica}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Clase de prestador</p>
                  <strong style="font-size:14px;">{{cliente.clase_prestador}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">ESE </p>
                  <strong style="font-size:14px;">{{cliente.ese}}</strong>
              </div>
              <div class="col-3 mb-2">
                  <p class="m-0">Caracter territorial</p>
                  <strong style="font-size:14px;">{{cliente.caracter_territorial}}</strong>
              </div>
          </b-row>
        </b-card>

        

          <ValidationObserver ref="form">

            <h5>Datos de la sede</h5>
             <b-row>
                <b-col>
                    <div class="form-group">
                        <label>Departamento</label>
                        <ValidationProvider name="departamento" rules="required" v-slot="{ errors }">
                            <select v-model="form.departamento" @change="depp()" name="ciudad" class="form-control" :disabled="ver" >
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
                            <input v-model="form.municipio"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Codigo del municipio</label>
                        <ValidationProvider name="codigo del municipio" rules="required" v-slot="{ errors }">
                            <input v-model="form.codigo_municipio"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
            </b-row> 
            <b-row>
                <div class="col-sm-6">
                   <label class="links">Nombre de la sede</label>
                   <div class="form-group">
                       <ValidationProvider name="nombre de la sede" rules="required" v-slot="{ errors }">
                            <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                   </div>
                </div>
                <div class="col-sm-6">
                   <label class="links">Codigo de la sede</label>
                   <div class="form-group">
                       <ValidationProvider name="codigo de la sede" rules="required" v-slot="{ errors }">
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
                                <option  value="No">No</option>
                                <option  value="Si">Si</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label>Numero de sede</label>
                        <ValidationProvider name="numero de sede" rules="required" v-slot="{ errors }">
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
                                <option  value="Rural">Rural</option>
                                <option  value="Urbana">Urbana</option>
                            </select>
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </b-col>
                  <b-col>
                      <div class="form-group">
                          <label>Nombre del gerente</label>
                          <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                              <input v-model="form.nombre_gerente"  type="text" class="form-control" placeholder=" " :disabled="ver">
                              <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                      </div>
                  </b-col>
              </b-row>
                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Dirección</label>
                            <ValidationProvider name="dirección" rules="required" v-slot="{ errors }">
                                    <input v-model="form.direccion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                        <label>Barrio</label>
                        <ValidationProvider name="barrio" rules="required" v-slot="{ errors }">
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
                            <ValidationProvider name="centro poblado" rules="required" v-slot="{ errors }">
                                <input v-model="form.centro_poblado"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
                </b-row>
                <b-row>
                    <div class="col-sm-6">
                        <label class="links">Correo electronico</label>
                        <div class="form-group">
                            <ValidationProvider name="correo electronico" rules="required" v-slot="{ errors }">
                                    <input v-model="form.email"  type="email" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Telefonos</label>
                        <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                          <input v-model="form.telefono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <div class="col-sm-6">
                        <label class="links">Nombre del contacto</label>
                        <div class="form-group">
                            <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
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
                            <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                                    <input v-model="form.telefono_contacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Celular personal</label>
                        <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                            <input v-model="form.celular_persona"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>
                 <b-row>
                    <div class="col-sm-6">
                        <label class="links">Celular corporativo</label>
                        <div class="form-group">
                            <ValidationProvider name="cargo" rules="required" v-slot="{ errors }">
                                    <input v-model="form.celular_corporativo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                        </div>
                    </div>
                    <b-col>
                        <div class="form-group">
                        <label>Correo electronico</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                            <input v-model="form.email_cotacto"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
        'nombre',
        'codigo_sede',
        'numero_sede',
        'direccion',
        'status',
        'actions'
            ],
      sedes:[],
      cargos: [], 
      editMode:false,
      form:{
        'id':'',  
        'nombre':'',
        'departamento':'',
        'codigo_departamento':'',
        'municipio': '',
        'codigo_municipio':'',
        'codigo_sede':'',
        'sede_principal':'',
        'numero_sede':'',
        'zona':'',
        'nombre_gerente':'',
        'direccion':'',
        'barrio':'',
        'centro_poblado':'' ,        
        'fax':'',
        'telefono':'',
        'email':'',
        'nombre_contacto':'',
        'cargo':'',
        'telefono_contacto':'',
        'celular_persona':'',
        'celular_corporativo':'',
        'email_contacto':'',
        'status':'',
        'cliente_id':''
      }
    }
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
              this.agregarSedes();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarSedes();
          } else {
        }});
      }
    },

   async agregarSedes(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/sedes', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarSedes();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
    async editarSedes(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/sedes',data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarSedes();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
         });
     },
     async eliminarSedes(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/sedes/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarSedes();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarSede(id){
        this.$swal({
          title: 'Desea borrar esta sede?',
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
         this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.sedes.length; index++) {
          if (this.sedes[index].id===id) {

            this.form.id =this.sedes[index].id
            this.form.nombre =this.sedes[index].nombre
            this.form.departamento =this.sedes[index].departamento
            this.form.codigo_departamento =this.sedes[index].codigo_departamento
            this.form.municipio =this.sedes[index].municipio
            this.form.codigo_municipio =this.sedes[index].codigo_municipio
            this.form.codigo_sede =this.sedes[index].codigo_sede
            this.form.sede_principal =this.sedes[index].sede_principal
            this.form.numero_sede =this.sedes[index].numero_sede
            this.form.zona =this.sedes[index].zona
            this.form.nombre_gerente =this.sedes[index].nombre_gerente
            this.form.direccion =this.sedes[index].direccion
            this.form.barrio =this.sedes[index].barrio
            this.form.centro_poblado  =this.sedes[index].centro_poblado     
            this.form.fax =this.sedes[index].fax
            this.form.telefono =this.sedes[index].telefono
            this.form.email =this.sedes[index].email
            this.form.nombre_contacto =this.sedes[index].nombre_contacto
            this.form.cargo =this.sedes[index].cargo
            this.form.telefono_contacto =this.sedes[index].telefono_contacto
            this.form.celular_persona =this.sedes[index].celular_persona
            this.form.celular_corporativo =this.sedes[index].celular_corporativo
            this.form.email_cotacto =this.sedes[index].email_cotacto
            this.form.status=this.sedes[index].status
            this.form.cliente_id=this.sedes[index].cliente_id
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
        this.listarSedes();

    },
    watch: {
      cliente: function () {
       this.listarSedes();
        this.title=this.cliente.nombre_prestador;
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.sedes.length;
    },
  },
}
</script>
