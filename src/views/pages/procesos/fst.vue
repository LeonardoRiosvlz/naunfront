<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false">Crear F.S.T  </b-button>
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
            <div class="table-responsive mb-0" style="min-height:500px">
              <b-table
                :items="formatos"
                :fields="fields"
                striped 
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(TECNICO)="data">
                  {{data.item.Tecnico.nombre}} {{data.item.Tecnico.apellido}}
                </template>
                <template v-slot:cell(ENTIDAD)="data">
                  {{data.item.entidad.empresa}}
                </template>
                <template v-slot:cell(CODIGO)="data">
                 {{data.item.codigo_imputacion}}
                </template>
                <template v-slot:cell(CONSECUTIVO)="data">
                  {{data.item.consecutivo}}
                </template>
                <template v-slot:cell(VALOR)="data">
                  {{data.item.valor}}
                </template>
                 <template v-slot:cell(Legalizacion)="data">
                  {{data.item.descripcion}}
                </template>
                <template v-slot:cell(ESTADO)="data">
                   
                  <b-badge variant="warning" v-if="data.item.status==='Pendiente'">{{data.item.status}}</b-badge>
                  <b-badge variant="success" v-if="data.item.status==='Aprobado'">{{data.item.status}}</b-badge>
                  <b-badge variant="danger" v-if="data.item.status==='Rechazado'">{{data.item.status}}</b-badge>
                </template>
                <template v-slot:cell()="data">
                   <button type="button" class="btn btn-success btn-sm rounded-pill" @click="abonarModal(data.item.id)"><i class="ri-hand-heart-fill"></i>  Abonar</button>
                </template>
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarFormato(data.item.id)"> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"> Ver </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=false;setearCancelado(data.item.id)"> Rechazar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=false;aprobFormato(data.item.id)"> Aprobado </b-dropdown-item-button>
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



    <b-modal id="modal_abonar" false size="lg"  :title="'Abonar F.S.T'+' '+form.consecutivo" hide-footer>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Pago</th>
              <th>Modo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>Total: {{form.valor}} $</td>
              <td>Abonado: 0</td>
              <td colspan="2">Restante: {{form.valor}} $</td>
            </tr>
          </tbody>
        </table>


          <ValidationObserver ref="form">      
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Valor</label>
                    <ValidationProvider name="valor" rules="required" v-slot="{ errors }">
                          <input v-model="abono.valor"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Modo</label>
                    <ValidationProvider name="modo" rules="required" v-slot="{ errors }">
                          <select v-model="abono.modo"  name="modo" class="form-control" :disabled="ver" >
                              <option value="Efectivo">Efectivo</option>
                              <option value="Transferencia">Transferencia</option>
                              <option value="Giro">Giro</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col> 
              </b-row>
              <hr>          
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Descripción</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.descripcion_formato"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
               <b-col>
                   <label>Evidencias</label>
                   <div id="preview mb-2">
                     <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
                   </div>
                    <b-form-file
                        v-model="file"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChange"
                    ></b-form-file>
               </b-col>
            </b-row>  
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="cancelFormato()" v-if="!ver && !editMode">Abonar</button>
     </b-modal>




    <b-modal id="modal_cancelar" false size="lg"  title="Rechazar F.S.T" hide-footer>
          <ValidationObserver ref="form">      
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Motivo de rechazo</label>
                    <ValidationProvider name="observacion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.observacion"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" @click="cancelFormato()" v-if="!ver && !editMode">Rechazar</button>
     </b-modal>







    <b-modal id="modal" false size="lg"  title="F.S.T" hide-footer>
          <ValidationObserver ref="form">
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Pago a terceros</label>
                    <ValidationProvider name="Pago a terceros" rules="required" v-slot="{ errors }">
                          <select v-model="form.pago_terceros"  name="pago_terceros" class="form-control" :disabled="ver" >
                              <option value="Si">Si</option>
                              <option value="No">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col> 
                <b-col v-if="form.pago_terceros=='Si'">
                    <div class="form-group">
                    <label>Tercero</label>
                    <ValidationProvider name="terceros" rules="required" v-slot="{ errors }">
                          <select v-model="form.tercero_id"  name="id_terceros" class="form-control " :disabled="ver">
                              <option v-for="terceros in terceros" :key="terceros.id" :value="terceros.id">{{terceros.nombre_tercero}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col> 
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Código Tecnico</label>
                    <ValidationProvider name="codigo tecnico" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo_tecnico"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col class="p-2" >
                  <div class="form-group" style="margin-top:20px">
                    <button class="btn btn-info btn-block" @click="buscarTecnico()" :disabled="ver"> Buscar Tecnico</button>
                   </div>
                </b-col>
              </b-row>
             <b-row v-if="tecnico.length>0">
              <div class="col-md-12">
                <b-card>
                  <h5 slot="header" class="mb-0">Tecnico: {{tecnico[0].nombre}} {{tecnico[0].apellido}}</h5>
                  <table class="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Tipo tecnico</th>
                        <td scope="col">{{tecnico[0].tipo_tecnico}}</td>
                        <th scope="col">Codigo</th>
                        <td scope="col">{{tecnico[0].codigo}}</td>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th scope="col">DIRECCION</th>
                        <th scope="col" colspan="3">{{tecnico[0].direccion}}</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th scope="col">TELEFONO</th>
                        <td scope="col">{{tecnico[0].telefono}}</td>
                        <th scope="col">EMAIL</th>
                        <td scope="col">{{tecnico[0].email}}</td>
                      </tr>
                    </thead>
                  </table>
                </b-card>
              </div>
            </b-row>
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Consecutivo</label>
                    <ValidationProvider name="consecutivo" rules="required" v-slot="{ errors }">
                          <input v-model="form.consecutivo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Otro</label>
                    <ValidationProvider name="Otro" rules="required" v-slot="{ errors }">
                          <input v-model="form.otros" name="otro"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Entidad</label>
                    <ValidationProvider name="Entidades" rules="required" v-slot="{ errors }">
                          <select v-model="form.entidad_id"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option :value="form.entidad_id" v-for="entidades in entidades" :key="entidades.id">{{entidades.empresa}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row> 
            <hr>   
              <b-row>
                
                        <button style="float:right" class="btn btn-success m-3" type="button" @click="cargar()"  name="button" :disabled="ver" v-if="!ver">Agregar Contacto</button>
                              <table id="example2" class="table table-striped"  v-show="form.items.length>0">
                                 <thead>
                                   <tr>
                                     <th>Nombre Contacto</th>
                                     <th>Email</th>
                                     <th>Teléfono</th>
                                     <th>Estado</th>
                                     <th v-if="!ver"></th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                   <tr v-for="(items , index) in form.items" :key="items.id">
                                     <td><input type="text" v-model="codigo"  name="nombre" class="form-control form-control-sm" id="nombre"  :disabled="ver"></td>
                                     <td><input type="text" v-model="nombre"  name="telefono" class="form-control form-control-sm" id="telefono"  :disabled="ver"></td>
                                     <td><input type="text" v-model="precio"  name="email" class="form-control form-control-sm" id="email"  :disabled="ver"></td>
                                     <td v-if="!ver"><button class="btn btn-danger" @click="eliminarContacto(index)" style="border-radius:0px;" type="button"><span class="mbri-trash"></span></button></td>
                                   </tr>
                                 </tbody>
                               </table>
                </b-row>    
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Descripción</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.descripcion_formato"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row> 
                <b-col>
                  <div class="form-group">
                    <label>Código imputación </label>
                    <ValidationProvider name="Código imputación" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo_imputacion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Descripción del código</label>
                    <ValidationProvider name="descripcion del codigo" rules="required" v-slot="{ errors }">
                          <input v-model="form.descripcion_codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>  
              <b-row> 
                <b-col>
                  <div class="form-group">
                    <label>Valor</label>
                    <ValidationProvider name="Valor" rules="required" v-slot="{ errors }">
                          <input v-model="form.valor"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Usuario Autorizador</label>
                    <v-select v-model="form.autorizador_id" :options="users" :reduce="users => users.id" label="email" :disabled="ver"></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>    
          
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear Programación</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar Programación</button>
     </b-modal>

  </Layout>
</template>

<script>
import "vue-select/dist/vue-select.css";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import vSelect from "vue-select";

/**
 * Dashboard component
 */
export default {
  components: {
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
          text: "Procesos"
        },
        {
          text: "Formato de solicitud de transferncia",
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
      codigo: "",
      nombre: "",
      precio: "",
      password: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      terceros: [],
      entidades: [],
      users: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["TECNICO","ENTIDAD","CODIGO","CONSECUTIVO","VALOR","ESTADO","LEGALIZACION/ABONOS","actions"],
      formatos: [], 
      cajero: [],
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
          'items':[],
      },
      abono:{
          'id':'',
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  methods: {
             cargar(){
             this.form.items.push({
               nombre:"",
               telefono: "",
               email:"",
               estado: "Activo",
             });
           },
           eliminarContacto(index){
            Swal({
              title: '¿Estás seguro?',
              text: "¡ será eliminado para siempre!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: '¡Si! ¡eliminar!',
              cancelButtonText: '¡No! ¡cancelar!',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                this.form.items.splice(index, 1);
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                Swal(
                  'Cancelado',
                  'No fue eliminado.',
                  'success'
                )
              }
            })
          },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
      async  listarUsers(){
    await  this.axios.get('api/user/adminstrador')
      .then((response) => {
        this.users = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarFormato();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarFormato();
          } else {
        }});
      }
    },
   async agregarFormato(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/formatos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarFormato();
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
    async listarterceros(){
      await  this.axios.get('api/terceros')
        .then((response) => {
          this.terceros = response.data.rows;
          console.log("hola");
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    async editarFormato(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/formatos', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarFormato();
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
    async cancelarFormato(){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",this.form.id);
       data.append("status","Rechazar");
       data.append("observacion",this.form.observacion);
        await this.axios.post('api/formatos/cancelar', data).then(response => {

            if (response.status==200) {
               this.$swal('Rechazado con exito','','success');
               this.listarFormato();
               this.$root.$emit("bv::hide::modal", "modal_cancelar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
                this.$swal('ocurrio un problema','','warning');
         });
      },
    async aprobarFormato(id){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",id);
       data.append("status","Aprobado");
       data.append("observacion","");
        await this.axios.post('api/formatos/status', data).then(response => {

            if (response.status==200) {
               this.$swal('Rechazado con exito','','success');
               this.listarFormato();
               this.$root.$emit("bv::hide::modal", "modal_cancelar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
                this.$swal('ocurrio un problema','','warning');
         });
      },
     async buscarCajero(){
        let data = new FormData();
        data.append('codigo',this.form.codigo_cajero);
        await this.axios.post('/api/cajeros/ath/find',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {

                this.cajero=response.data;
                if (this.cajero.length>0) {
                  this.form.id_cajero=this.cajero[0].id;
                }else{
                  this.$swal('No existe este cajero','','warning');
                }
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      async buscarTecnico(){
        let data = new FormData();
        data.append('codigo',this.form.codigo_tecnico);
        await this.axios.post('/api/user/tecnico',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                console.log(response);
                this.tecnico=response.data;
                if (this.tecnico.length>0) {
                  this.form.id_tecnico=this.tecnico[0].id;
                }else{
                  this.$swal('No existe tecnico con este codigo','','warning');
                }
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },
     async eliminarFormatos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/formatos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarFormato();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarFormato(id){
        this.$swal({
          title: 'Desea borrar esta solicitud?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarFormatos(id);
          }
        })
      },
      cancelFormato(id){
        this.$swal({
          title: 'Desea rechazar esta solicitud?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.cancelarFormato();
          }
        })
      },
      aprobFormato(id){
        this.$swal({
          title: 'Deseas aprobar esta solicitud?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.aprobarFormato(id);
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
        for (let index = 0; index < this.formatos.length; index++) {
          if (this.formatos[index].id===id) {
            this.form.pago_terceros=this.formatos[index].pago_terceros;
            this.form.consecutivo=this.formatos[index].consecutivo;
            this.form.otros=this.formatos[index].otros;
            this.form.observacion=this.formatos[index].observacion;
            this.form.descripcion_formato=this.formatos[index].descripcion_formato;
            this.form.codigo_imputacion=this.formatos[index].codigo_imputacion;
            this.form.descripcion_codigo=this.formatos[index].descripcion_codigo;
            this.form.valor=this.formatos[index].valor;
            this.form.tecnico_id=this.formatos[index].tecnico_id;
            this.form.autorizador_id=this.formatos[index].autorizador_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.descripcion=this.formatos[index].descripcion;
            this.form.codigo_tecnico=this.formatos[index].Tecnico.codigo;
            this.form.tercero_id=this.formatos[index].tercero_id;
            this.form.id=this.formatos[index].id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            this.buscarTecnico();
            return;
          }
        }
      },
      setearCancelado(id){
        this.form.id=id;
        this.$root.$emit("bv::show::modal", "modal_cancelar", "#btnShow");
      },
      abonarModal(id){
                for (let index = 0; index < this.formatos.length; index++) {
          if (this.formatos[index].id===id) {
            this.form.pago_terceros=this.formatos[index].pago_terceros;
            this.form.consecutivo=this.formatos[index].consecutivo;
            this.form.otros=this.formatos[index].otros;
            this.form.observacion=this.formatos[index].observacion;
            this.form.descripcion_formato=this.formatos[index].descripcion_formato;
            this.form.codigo_imputacion=this.formatos[index].codigo_imputacion;
            this.form.descripcion_codigo=this.formatos[index].descripcion_codigo;
            this.form.valor=this.formatos[index].valor;
            this.form.tecnico_id=this.formatos[index].tecnico_id;
            this.form.autorizador_id=this.formatos[index].autorizador_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.descripcion=this.formatos[index].descripcion;
            this.form.codigo_tecnico=this.formatos[index].Tecnico.codigo;
            this.form.tercero_id=this.formatos[index].tercero_id;
            this.form.id=this.formatos[index].id;
            this.$root.$emit("bv::show::modal", "modal_abonar", "#btnShow");
            this.buscarTecnico();
            return;
          }
        }        
      },
    async  listarentidades(){
      await  this.axios.get('api/entidades')
        .then((response) => {
          this.entidades = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
   async listarFormato(){
      await  this.axios.get('/api/formatos')
        .then((response) => {
          this.formatos = response.data.rows;
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
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
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
        this.listarFormato();
        this.listarterceros();
        this.listarentidades();
        this.listarUsers();
      },
    computed: {
    rows() {
      return this.formatos.length;
    },
  },
}
</script>

