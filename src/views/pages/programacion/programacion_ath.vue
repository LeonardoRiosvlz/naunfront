<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear Programaciónnpm   </b-button>
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
                  {{data.item.consecutivo}}
                </template>
                <template v-slot:cell(LLAMADA)="data">
                  {{data.item.llamada}}
                </template>
                <template v-slot:cell(CIUDAD)="data">
                 {{data.item.cajero_ath.ciudad}}
                </template>
                <template v-slot:cell(ATM)="data">
                  {{data.item.cajero_ath.codigo}}
                </template>
                <template v-slot:cell(VENCIMIENTO)="data">
                  {{data.item.fecha_vencimiento}}
                </template>
                 <template v-slot:cell(DESCRIPCION)="data">
                  {{data.item.descripcion}}
                </template>
                <template v-slot:cell(ESTADO)="data">
                  {{data.item.status}}
                </template>
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarProgramacion(data.item.id)"> Eliminar </b-dropdown-item-button>
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
                    <label>Consecutivo</label>
                    <ValidationProvider name="consecutivo" rules="required" v-slot="{ errors }">
                          <input v-model="form.consecutivo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
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
                    <button class="btn btn-info btn-block" @click="buscarTecnico()"> Buscar Tecnico</button>
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
                    <label>Llamada</label>
                    <ValidationProvider name="llamada" rules="required" v-slot="{ errors }">
                          <input v-model="form.llamada"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
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
            <b-row v-if="cajero.length>0">
              <div class="col-md-12">
                <b-card>
                  <h5 slot="header" class="mb-0">NOMBRE:{{cajero[0].tipo}}</h5>
                  <table class="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">CIUDAD</th>
                        <td scope="col">{{cajero[0].ciudad}}</td>
                        <th scope="col">TIPOLOGIA</th>
                        <td scope="col">{{cajero[0].tipologia}}</td>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th scope="col">DIRECCION</th>
                        <th scope="col" colspan="3">{{cajero[0].direccion}}</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th scope="col">APERTURA</th>
                        <td scope="col">{{cajero[0].apertura}}</td>
                        <th scope="col">CIERRE</th>
                        <td scope="col">{{cajero[0].cierre}}</td>
                      </tr>
                    </thead>
                  </table>
                </b-card>
              </div>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Cotización Visita</label>
                    <ValidationProvider name="cotizacion visita" rules="required" v-slot="{ errors }">
                          <select v-model="form.cotizacion_visita"  name="cotizacion_visita" class="form-control " >
                              <option value="Si">Si</option>
                              <option value="No">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col  v-if="form.cotizacion_visita==='Si'">
                  <div class="form-group">
                    <label>Fecha de visita</label>
                    <ValidationProvider name="fecha visita" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha_visita" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col v-if="form.cotizacion_visita==='No'">
                  <div class="form-group">
                    <label>Fecha de programación</label>
                    <ValidationProvider name="fecha programacion" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha_programacion" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row> 
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Fecha de llamada</label>
                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha_llamada" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Fecha de vencimiento</label>
                    <ValidationProvider name="fecha vencimiento" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha_vencimiento" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                 <b-col>
                    <div class="form-group">
                    <label>Requiere Productos</label>
                    <ValidationProvider name="requiere producto" rules="required" v-slot="{ errors }">
                          <select v-model="form.requiere_producto"  name="requiere_producto" class="form-control" >
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
              <hr>
              <b-row>
                <b-col  >
                  <div class="form-group">
                    <label>Fecha de ilumunación</label>
                    <ValidationProvider name="fecha iluminacion" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha_iluminacion" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Fecha de vencimiento</label>
                    <ValidationProvider name="fecha vencimiento" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha_vencimiento" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Servicio a cobro</label>
                    <ValidationProvider name="servicio cobro" rules="required" v-slot="{ errors }">
                          <select v-model="form.servicio_cobro"  name="servicio_cobro" class="form-control " >
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
                    <label>Codigo  parametro</label>
                    <ValidationProvider name="codigo parametro" rules="required" v-slot="{ errors }">
                          <select v-model="form.codigo_parametro"  name="codigo_parametro" class="form-control " >
                              <option value="1231">123</option>
                              <option value="1231">31231</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>  
                 <b-col>
                    <div class="form-group">
                    <label>Parametro labor</label>
                    <ValidationProvider name="parametro labor" rules="required" v-slot="{ errors }">
                          <select v-model="form.parametro_labor"  name="parametro_labor" class="form-control " >
                              <option value="1231231">312311</option>
                              <option value="123131">1231231</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>         
              </b-row> 
           
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear Programación</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar Programación</button>
     </b-modal>

  </Layout>
</template>

<script>

import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";


/**
 * Dashboard component
 */
export default {
  components: {
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
          text: "Procesos"
        },
        {
          text: "Programacion",
          active: true
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
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
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
       }
      },
      setear(id) {
        for (let index = 0; index < this.programas.length; index++) {
          if (this.programas[index].id===id) {
            this.form.consecutivo=this.programas[index].consecutivo;
            this.form.codigo_tecnico=this.programas[index].codigo_tecnico;
            this.form.codigo_cajero=this.programas[index].codigo_cajero;
            this.form.llamada=this.programas[index].llamada;
            this.form.fecha_llamada=this.programas[index].fecha_llamada;
            this.form.cotizacion_visita=this.programas[index].cotizacion_visita;
            this.form.requiere_producto=this.programas[index].requiere_producto;
            this.form.fecha_programacion=this.programas[index].fecha_programacion;
            this.form.fecha_vencimiento=this.programas[index].fecha_vencimiento;
            this.form.fecha_visita=this.programas[index].fecha_visita;
            this.form.fecha_iluminacion=this.programas[index].fecha_iluminacion;
            this.form.descripcion=this.programas[index].descripcion;
            this.form.servicio_cobro=this.programas[index].servicio_cobro;
            this.form.codigo_parametro=this.programas[index].codigo_parametro;
            this.form.parametro_labor=this.programas[index].parametro_labor;
            this.form.id=this.programas[index].id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            this.buscarCajero();
            this.buscarTecnico();
            return;
          }
        }
      },
      listarProgramacion(){
        this.axios.get('/api/programacion/ath')
        .then((response) => {
          this.programas = response.data.rows;
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
        this.listarProgramacion();
      },
    computed: {
    rows() {
      return this.programas.length;
    },
  },
}
</script>
