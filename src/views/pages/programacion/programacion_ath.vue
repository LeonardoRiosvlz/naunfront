<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;">Regirstar llamada  </b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card" >
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
            <div class="table-responsive mb-0" style="min-height:552px">
              <b-table
                :items="programas"
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
                <template v-slot:cell(CONSECUTIVO)="data">
                  ATH-{{data.item.id}}
                </template>
                <template v-slot:cell(LLAMADA)="data">
                  {{data.item.llamada}}
                </template>
                <template v-slot:cell(CIUDAD)="data">
                 {{data.item.cajero_ath.ciudad.ciudad}}
                </template>
                <template v-slot:cell(ATM)="data">
                  {{data.item.cajero_ath.codigo}}
                </template>
                <template v-slot:cell(VENCIMIENTO)="data">
                  <div v-if="data.item.status==='Pendiete'||data.item.status==='Creada'||data.item.status==='En proceso'||data.item.status==='Reprogramada'||data.item.status==='Programada'">
                      {{ data.item.fecha_vencimiento | capitalize }}
                  </div>
                  
                </template>
                 <template v-slot:cell(DESCRIPCION)="data">
                  {{data.item.descripcion}}
                </template>
                <template v-slot:cell(ESTADO)="data">
                  <b-badge variant="success" v-if="data.item.status==='En proceso'">En proceso</b-badge>
                  <b-badge variant="warning" v-if="data.item.status==='Pendiente'">Pendiente</b-badge>
                  <b-badge variant="info" v-if="data.item.status==='Programada'">Programada</b-badge>
                  <b-badge variant="info" v-if="data.item.status==='Reprogramada'">Reprogramada</b-badge>
                  <b-badge variant="success" v-if="data.item.status==='Escalada'">Escalada</b-badge>
                  <b-badge variant="danger" v-if="data.item.status==='Rechazada'">Rechazada</b-badge>
                  <b-badge variant="primary" v-if="data.item.status==='Archivada'">Archivada</b-badge>
                  <b-badge variant="success" v-if="data.item.status==='Cerrada'">Cerrada</b-badge>
                  <b-badge variant="primary" v-if="data.item.status==='Creada'">Creada</b-badge>
                  <b-badge variant="success" v-if="data.item.status==='Aceptada'">Aceptada por analista</b-badge>
                   <b-badge variant="warning" v-if="data.item.status==='Devuelta'">Devuelta</b-badge>
                </template>
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarProgramacion(data.item.id)"> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="solicitud(data.item)">Gestionar</b-dropdown-item-button>
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




    <b-modal id="modal" false size="lg"  title="Programación de ATH" hide-footer>
          <ValidationObserver ref="form">
                <b-row>
                 <b-col>
                    <div class="form-group">
                    <label>Tipo de llamada</label>
                    <ValidationProvider name="requiere producto" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_llamada"  name="requiere_producto" class="form-control" >
                              <option value="RF">RF</option>
                              <option value="RFT">RFT</option>
                              <option value="OTP">OTP</option>
                              
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>  
                 <b-col>
                      <div class="form-group">
                        <label> Codigo de Llamada</label>
                        <ValidationProvider name="llamada" rules="required" v-slot="{ errors }">
                              <input v-model="form.llamada"  type="text" class="form-control" placeholder=" " :disabled="ver">
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                  </b-col> 
                </b-row>  
                <b-row> 
                  <b-col>
                    <div class="form-group">
                      <label>Titulo</label>
                      <ValidationProvider name="titulo" rules="required" v-slot="{ errors }">
                            <input v-model="form.titulo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </b-col>                         
               </b-row>  
               <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Descripción</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.descripcion"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row> 
               <b-row>
                    <b-col>
                      <div class="form-group">
                        <label>Código Cajero</label>
                        <ValidationProvider name="codigo cajero" rules="required" v-slot="{ errors }">
                              <input v-model="form.codigo_cajero"  type="text" class="form-control" placeholder=" " :disabled="ver">
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>
                    <b-col class="p-2" >
                      <div class="form-group" style="margin-top:20px">
                        <button class="btn btn-info btn-block" @click="buscarCajero()"> Buscar</button>
                      </div>
                    </b-col>
                </b-row>
    
                <b-card no-body v-if="cajero.length>0">
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4">
                      <b-card-img :src="cajero[0].entidad.imagen" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body :title="cajero[0].tipo+'-'+cajero[0].codigo">
                        <b-card-text style="margin:0">Tipologia : {{cajero[0].tipologia}}</b-card-text>
                        <b-card-text style="margin:0">Ciudad : {{cajero[0].ciudad.ciudad}}</b-card-text>
                        <b-card-text style="margin:0">Administra : {{cajero[0].ciudad.Administra}}</b-card-text>
                        <b-card-text style="margin:0">Direccion : {{cajero[0].direccion}}</b-card-text>
                        <b-card-text style="margin:0">Apertura : {{cajero[0].apertura}} {{cajero[0].hora_apertura}}</b-card-text>
                        <b-card-text style="margin:0">Cierre : {{cajero[0].cierre}}</b-card-text>
                        <p class="card-text">
                          <small class="text-muted">Cumpleaños: {{cajero[0].cumpleanos}}</small>
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
    
            <b-row v-show="cajero.length>0">
                <b-col>
                    <div class="form-group">
                    <label>Tipo de servicio</label>
                    <ValidationProvider name="servicio" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_servicio"  name="cotizacion_visita" @change="setPrioridad()"  class="form-control " >
                              <option :value="servicios.servicio" v-for="servicios in servicios" :key="servicios.servicio">{{servicios.servicio}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row> 
             <b-row v-show="cajero.length>0">
                <b-col>
                    <div class="form-group">
                    <label>Prioridad</label>
                    <ValidationProvider name="servicio" rules="required" v-slot="{ errors }">
                          <select v-model="form.prioridad"  name="cotizacion_visita" @change="setPrioridad()"  class="form-control " >
                              <option value="Inmediata">Inmediata</option>
                              <option value="Critico">Critico</option>
                              <option value="Alto">Alto</option>
                              <option value="Medio">Medio</option>
                              <option value="Bajo">Bajo</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                    <b-col>
                      <div class="form-group">
                        <label>Margen</label>
                        <ValidationProvider name="margen" rules="required" v-slot="{ errors }">
                              <input v-model="form.margen"  type="text" class="form-control" placeholder=" " :disabled="ver">
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Vencimiento </label>
                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                      <b-form-input id="date-time" v-model="form.fecha_vencimiento"  type="datetime-local"></b-form-input>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            <b-row>
                 <b-col>
                    <div class="form-group">
                    <label>Requiere Cita</label>
                    <ValidationProvider name="requiere cita" rules="required" v-slot="{ errors }">
                          <select v-model="form.requiere_cita"  name="requiere_producto" class="form-control" >
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
                   <div class="form-group links">
                     <label>Categorias </label>
                     <ValidationProvider name="categoria" rules="required" v-slot="{ errors }">
                    <select v-model="form.categoria" name="categoria" @change="loadSubcategorias()" class="form-control" :disabled="ver" >
                        <option v-for="categorias in categorias" :value="categorias.categoria" :key="categorias.categoria">{{categorias.categoria}}</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
               </b-col>
                <b-col>
                   <div class="form-group links">
                     <label>Subcategorias </label>
                     <ValidationProvider name="subcategorias" rules="required" v-slot="{ errors }">
                    <select v-model="form.subcategoria" name="subcategorias" @change="loadSubcategorias()" class="form-control" :disabled="ver" >
                        <option v-for="subcategorias in subcategorias" :value="subcategorias.subcategoria" :key="subcategorias.subcategorias">{{subcategorias.subcategoria}}</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
               </b-col>
              </b-row>          
        </ValidationObserver>

        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Registrar llamada</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar llamada</button>
     </b-modal>

  </Layout>
</template>

<script>

import { FormWizard, TabContent } from "vue-form-wizard";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { servicios } from "./servicios";
import moment from 'moment';

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent
  },
  data() {
    return {
      servicios:servicios,
      title: "Procesos",
      items: [
        {
          text: "LLamadas"
        },

        {
          text: "ATH",
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
      fields: ["CONSECUTIVO","LLAMADA","CIUDAD","ATM","VENCIMIENTO","DESCRIPCION","ESTADO","actions"],
      programas: [], 
      cajero: [],
      subcategorias: [],
      categorias: [],
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
           'margen':'',
           'fecha_vencimiento':'',
           'prioridad':'',
           'categoria':'',
      }
    }
  },
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          let fecha = moment();
          value = fecha.diff(value, 'hours')+ " horas para caducar."; 
          
          return value
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
              this.agregarProgramacion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarProgramacion();
          } else {
        }});
      }
    },
   async agregarProgramacion(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/programacion/ath', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarProgramacion();
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
    solicitud(data){
      localStorage.setItem("consecutivo", JSON.stringify(data));
      this.$router.push({ path: 'llamada_ath_tablero' })
    },
    setPrioridad(){
      for (let index = 0; index < this.servicios.length; index++) {

        if (this.form.tipo_servicio===this.servicios[index].servicio) {
          if (this.servicios[index].prioridad==="inmediata") {
              this.form.margen="0 horas";
              this.form.prioridad="Inmediata"
              this.form.fecha_vencimiento= moment().format("YYYY-MM-DDTHH:MM");
          }
           if(this.servicios[index].prioridad==="critico"){
              this.form.margen=this.cajero[0].ciudad.valor_critico+" "+this.cajero[0].ciudad.metrica_critico;
              this.form.prioridad="Critico";
              if (this.cajero[0].ciudad.metrica_critico==="horas") {
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_critico, 'hours').format("YYYY-MM-DDTHH:MM");
              }else{
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_critico, 'days').format("YYYY-MM-DDTHH:MM");
              }
          }
           if(this.servicios[index].prioridad==="alto"){
              this.form.margen=this.cajero[0].ciudad.valor_alto+" "+this.cajero[0].ciudad.metrica_alto;
              this.form.prioridad="Alto";
              if (this.cajero[0].ciudad.metrica_alto==="horas") {
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_alto, 'hours').format("YYYY-MM-DDTHH:MM");
              }else{
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_alto, 'days').format("YYYY-MM-DDTHH:MM");
              }
            

          }
           if(this.servicios[index].prioridad==="medio"){
              this.form.margen=this.cajero[0].ciudad.valor_mediano+" "+this.cajero[0].ciudad.metrica_mediano;
              this.form.prioridad="Medio";
              if (this.cajero[0].ciudad.metrica_mediano==="horas") {
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_mediano, 'hours').format("YYYY-MM-DDTHH:MM");
              }else{
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_mediano, 'days').format("YYYY-MM-DDTHH:MM");
              }

          }
           if(this.servicios[index].prioridad==="bajo"){
              this.form.margen=this.cajero[0].ciudad.valor_bajo+" "+this.cajero[0].ciudad.metrica_bajo;
              this.form.prioridad="Bajo";
              if (this.cajero[0].ciudad.metrica_bajo==="horas") {
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_bajo, 'hours').format("YYYY-MM-DDTHH:MM");
              }else{
                this.form.fecha_vencimiento= moment().add(this.cajero[0].ciudad.valor_bajo, 'days').format("YYYY-MM-DDTHH:MM");
              }
              
          }
        }        
      }
    },
    async editarProgramacion(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/programacion/ath', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarProgramacion();
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
     async eliminarProgramacions(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/programacion/ath/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarProgramacion();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarProgramacion(id){
        this.$swal({
          title: 'Desea borrar esta programación?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarProgramacions(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
                  this.$refs.wizard.maxStep = 0
      this.$refs.wizard.tabs.forEach((tab)=>{
     	 tab.checked = false
      })
      this.$refs.wizard.navigateToTab(0)
       }
      },
      setear(id) {
        for (let index = 0; index < this.programas.length; index++) {
          if (this.programas[index].id===id) {
            this.form.consecutivo=this.programas[index].consecutivo;
            this.form.codigo_tecnico=this.programas[index].codigo_tecnico;
            this.form.codigo_cajero=this.programas[index].codigo_cajero;
            this.form.llamada=this.programas[index].llamada;
            this.form.tipo_llamada=this.programas[index].tipo_llamada;
            this.form.tipo_servicio=this.programas[index].tipo_servicio;
            this.form.fecha_vencimiento=moment(this.programas[index].fecha_vencimiento).format("YYYY-MM-DDTHH:MM");
            this.form.fecha_creacion=moment(this.programas[index].fecha_creacion).format("YYYY-MM-DDTHH:MM");
            this.form.requiere_cita=this.programas[index].requiere_cita;
            this.form.descripcion=this.programas[index].descripcion;
            this.form.titulo=this.programas[index].titulo;
            this.form.categoria=this.programas[index].categoria;
            this.loadSubcategorias();
            this.form.subcategoria=this.programas[index].subcategoria;
            this.form.prioridad=this.programas[index].prioridad;
            this.form.margen=this.programas[index].margen;
            this.form.id=this.programas[index].id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            this.buscarCajero();

            return;
          }
        }
      },
    async  listarProgramacion(){
      await  this.axios.get('/api/programacion/ath')
        .then((response) => {
          this.programas = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
     async  listarcategorias(){
     await   this.axios.get('api/categorias')
        .then((response) => {
          this.categorias = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
        async loadSubcategorias(){
        let data = new FormData();
        data.append('categoria',this.form.categoria);
        await this.axios.post('api/subcategorias/find',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                   this.subcategorias = response.data.rows;
                }
              }).catch(e => {
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
        this.listarProgramacion();
        this.listarcategorias();
        this.form.fecha_vencimiento=moment().format("YYYY-MM-DDTHH:MM");
        moment.locale("es") 
      },
    computed: {
    rows() {
      return this.programas.length;
    },
  },
}
</script>
