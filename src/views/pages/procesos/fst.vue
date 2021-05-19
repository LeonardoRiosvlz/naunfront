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
                <template v-slot:cell(CONSECUTIVO)="data">
                  {{data.item.consecutivo}}
                </template>
                <template v-slot:cell(VALOR)="data">
                  {{data.item.valor | moneda}}
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
                   <button type="button" class="btn btn-success btn-sm rounded-pill" @click="abonarModal(data.item.id)"  :disabled="data.item.status==='Pendiente'||data.item.status==='Rechazado'"><i class="ri-hand-heart-fill"></i>  Abonar</button>
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
                    <b-dropdown-item-button @click="editMode=false;ver=false;setearCancelado(data.item.id,data.item.solicitante_id,data.item.consecutivo)"> Rechazar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=false;aprobFormato(data.item.id,data.item.solicitante_id,data.item.consecutivo)"> Aprobado </b-dropdown-item-button>
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

<pre>{{formatos}}</pre>


    <b-modal id="modal_abonar" false size="lg"  :title="'Abonar F.S.T'+' '+form.consecutivo" hide-footer>
       <b-card no-body v-if="tecnico.length>0">
        <b-row no-gutters class="align-items-center">
          <b-col md="4">
            <b-card-img :src="tecnico[0].imagen" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body :title="'Técnico:'+tecnico[0].nombre+''+ tecnico[0].apellido">
              <b-card-text style="margin:0">Tipo : {{tecnico[0].tipo_tecnico}}</b-card-text>
              <b-card-text style="margin:0">Codigo : {{tecnico[0].codigo}}</b-card-text>
              <b-card-text style="margin:0">Dirección : {{tecnico[0].direccion}}</b-card-text>
              <b-card-text style="margin:0">Teléfono : {{tecnico[0].telefono}}</b-card-text>
              <b-card-text style="margin:0">Email : {{tecnico[0].email}}</b-card-text>
              <p class="card-text">
              </p>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Pago</th>
              <th>Modo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="abonos in abonos" :key="abonos.id">
           
              <th>{{abonos.valor_abono}}</th>
              <th>{{abonos.tipo}}</th>
              <th></th>
            </tr>
            <tr>
              <th>Total: {{form.valor}} $</th>
              <th>Abonado:{{total_abonado}} $</th>
              <th colspan="2">Restante: {{form.valor-total_abonado}} $</th>
            </tr>
          </tbody>
        </table>


          <ValidationObserver ref="form">      
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Valor</label>
                    <ValidationProvider name="valor" rules="required" v-slot="{ errors }">
                          <input v-model="abono.valor_abono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Modo</label>
                    <ValidationProvider name="modo" rules="required" v-slot="{ errors }">
                          <select v-model="abono.tipo"  name="modo" class="form-control" :disabled="ver" >
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
                              v-model="abono.descripcion_abono"
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
        <button class="btn btn-block float-right btn-success" @click="abonar()" v-if="!ver && !editMode">Abonar</button>
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
                 <b-card no-body v-if="tecnico.length>0">
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4">
                      <b-card-img :src="tecnico[0].imagen" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body :title="'Técnico:'+tecnico[0].nombre+''+ tecnico[0].apellido">
                        <b-card-text style="margin:0">Tipo : {{tecnico[0].tipo_tecnico}}</b-card-text>
                        <b-card-text style="margin:0">Codigo : {{tecnico[0].codigo}}</b-card-text>
                        <b-card-text style="margin:0">Dirección : {{tecnico[0].direccion}}</b-card-text>
                        <b-card-text style="margin:0">Teléfono : {{tecnico[0].telefono}}</b-card-text>
                        <b-card-text style="margin:0">Email : {{tecnico[0].email}}</b-card-text>
                        <p class="card-text">
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
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
                    <label>Entidad</label>
                    <ValidationProvider name="Entidades" rules="required" v-slot="{ errors }">
                          <select v-model="form.entidad_id" @change="listarimputaciones()"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option></option>
                              <option :value="entidades.id" v-for="entidades in entidades" :key="entidades.id">{{entidades.empresa}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>

            </b-row> 
            <hr>  
            <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Codigos de imputacion </label>
                    <v-select @click="setImputacion()" v-model="imputacion_id" :options="imputaciones" :reduce="imputaciones => imputaciones.id" label="nombre" :disabled="ver"></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>  
              <b-col>
                <button style="float:right" v-b-tooltip.hover title="Agregar un item a la lista" class="btn btn-success my-4 btn-sm btn-block" type="button" @click="cargar()"  name="button" v-if="!ver && imputacion_id" >Agregar Item</button>
              </b-col>
            </b-row> 
              <b-row>    
                <table id="example2" class="table table-striped"  v-show="form.items.length>0">
                   <thead>
                     <tr>
                       <th>Codigo</th>
                       <th>Nombre</th>
                       <th>Descripción</th>
                        <th>Precio</th>
                       <th v-if="!ver"></th>
                     </tr>
                   </thead>
                    <tbody>
                     <tr v-for="(items , index) in form.items" :key="items.id">
                       <td>{{items.codigo}}</td>
                       <td>{{items.nombre}}</td>
                        <td><input :id="index+'descripcion'" type="text" v-model="items.descripcion"   class="form-control form-control-sm"   :disabled="ver"></td>
                        <td><input :id="index+'precio'" type="text" v-model="items.precio" @change="sumarItems()"  class="form-control form-control-sm"  :disabled="ver"></td>
                       <td v-if="!ver">
                        <a href="javascript:void(0);" @click="eliminarItem(index)" class="text-danger" v-b-tooltip.hover title="Borrar">
                            <i class="mdi mdi-trash-can font-size-18"></i>
                        </a>
                      </td>
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


        <button v-b-tooltip.hover title="Agregar la solicitud"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear FST</button>
        <button v-b-tooltip.hover title="Editar la solicitud"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar FST</button>
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
      total_abonado: 0,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      consecutivo:"",
      filterOn: [],
      terceros: [],
      entidades: [],
      abonos: [],
      imputaciones: [],
      imputacion_id: "",
      users: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["TECNICO","ENTIDAD","CONSECUTIVO","VALOR","ESTADO","LEGALIZACION/ABONOS","actions"],
      formatos: [], 
      cajero: [],
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
          'items':[],
          'id_entidad':'',
          'valor':'',
      },
      abono:{
          'id':'',
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  filters: {
        moneda: function (value) {
          const formatterPeso = new Intl.NumberFormat('es-CO', {
             style: 'currency',
             currency: 'COP',
             minimumFractionDigits: 0
           })
           let valueFinal = formatterPeso.format(value);
           return valueFinal
        }
  },
  methods: {

    cargar(){
         for (let index = 0; index < this.imputaciones.length; index++) {
            if( this.imputacion_id===this.imputaciones[index].id){
              console.log(this.imputacion_id);
              console.log(this.imputaciones[index].id);
              this.form.items.push({
               nombre:this.imputaciones[index].nombre,
               codigo:this.imputaciones[index].codigo,
               descripcion:"",
               precio:"",
             });
            }
        }
      },
    eliminarItem(index){
       this.form.items.splice(index, 1);  
    },
    sumarItems(){
      console.log("hey");
      this.form.valor=0;
      for (let index = 0; index < this.form.items.length; index++) {
        this.form.valor=this.form.valor+parseFloat(this.form.items[index].precio)
        console.log(this.form.valor);
      }
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
      abonar(id){
        this.$swal({
          title: 'Desea agregar este abono?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.subirAbono(id);
          }
        })
      },
    async subirAbono(){
     let data = new FormData();
      var formulario = this.abono;
        for ( var key in formulario) {
            data.append(key,formulario[key]);
        }
        if (this.file) {
          data.append('filename',this.file);
         }
       await this.axios.post('api/abonos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarAbonos(this.abono.formato_id);
               this.file=null;
               this.url="";
               this.abono.valor_abono="";
               this.abono.descripcion_abono="";
               this.abono.descripcion_abono="";
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
   async agregarFormato(){
     let data = new FormData();
      var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
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
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
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
       data.append("solicitante_id",this.form.solicitante_id);
       data.append("consecutivo",this.form.consecutivo);
       data.append("status","Rechazado");
       data.append("observacion",this.form.observacion);
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
    async aprobarFormato(id,solicitante,consecutivo){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",id);
       data.append("solicitante_id",solicitante);
       data.append("consecutivo",consecutivo);
       data.append("status","Aprobado");
       data.append("observacion","");
        await this.axios.post('api/formatos/status', data).then(response => {

            if (response.status==200) {
               this.$swal('Realizado con exito','','success');
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
                  this.form.tecnico_id=this.tecnico[0].id;
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
      aprobFormato(id,solicitante,consecutivo){
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
            this.aprobarFormato(id,solicitante,consecutivo);
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
            this.form.items=JSON.parse(this.formatos[index].items);
            this.form.items=JSON.parse(this.form.items);
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
      setearCancelado(id,solicitante,consecutivo){
        this.form.id=id;
        this.form.solicitante_id=solicitante;
        this.form.consecutivo=consecutivo;
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
            this.abono.formato_id=this.formatos[index].id;
            this.$root.$emit("bv::show::modal", "modal_abonar", "#btnShow");
            this.buscarTecnico();
            this.listarAbonos(this.form.id);
            return;
          }
        }        
      },
    async  listarAbonos(index){
      let data = new FormData();
      data.append('id',index);
      await  this.axios.post('api/abonos/formato',data)
        .then((response) => {
          this.abonos = response.data;
          this.total_abonado=0;
          for (let index = 0; index < this.abonos.length; index++) {
            this.total_abonado=parseFloat(this.abonos[index].valor_abono)+parseFloat(this.total_abonado);
          }
        })
        .catch((e)=>{
          console.log('error' + e);
        })
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
    async  listarimputaciones(){
      let data = new FormData();
      data.append('id',this.form.entidad_id);
      await  this.axios.post('api/imputaciones/find',data)
        .then((response) => {
          this.imputaciones = response.data;
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
        },

      loadConsectivo(){
        if (localStorage.getItem('consecutivo')) {
       // this.$bvModal.show('modal')
        this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
          console.log(this.consecutivo);
          this.form.consecutivo=this.consecutivo.consecutivo;
          this.form.tecnico_id=this.consecutivo.tecnico_id;
          this.form.entidad_id=1;
          this.form.codigo_tecnico=this.consecutivo.codigo_tecnico;
          this.listarimputaciones();
          this.buscarTecnico();
          localStorage.removeItem('consecutivo');
        }

      }
  },
  mounted(){
    this.loadConsectivo();
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

