<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear Cajero ATH</b-button>
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
                :items="cajeros"
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
                    <b-dropdown-item-button @click="eliminarCajero(data.item.id)"> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"> Ver </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;detalles(data.item)"> Detalles </b-dropdown-item-button>
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


    <b-modal id="modal" false size="lg"  title="Gestión De Cajeros ATH" hide-footer>  
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Tipo </label>
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo"  name="tipo" class="form-control " :disabled="ver">
                              <option value="ATM">ATM</option>
                              <option value="KIOSKO">KIOSKO</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
               <b-col>
                <div class="form-group">
                  <label>Codigo </label>
                  <ValidationProvider name="codigo" rules="required" v-slot="{ errors }">
                        <input v-model="form.codigo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>   
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Entidad Bancaria</label>
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="form.entidad_bancaria"  name="tipo" class="form-control " :disabled="ver">
                              <option value="Banco de Bogotá">Banco de Bogotá</option>
                              <option value="Banco AV Villas">Banco AV Villas</option>
                              <option value="Banco de Occidente">Banco de Occidente</option>
                              <option value="Banco Popular">Banco Popular</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Tipología </label>
                  <ValidationProvider name="tipologia" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipologia"  name="tipologia" class="form-control " :disabled="ver">
                              <option v-for="tipologia in tipologia" :key="tipologia.tipo" :value="tipologia.tipo">{{tipologia.tipo}}</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
              <b-col>
                <div class="form-group">
                  <label>Terminal </label>
                  <ValidationProvider name="terminal" rules="required" v-slot="{ errors }">
                        <input v-model="form.terminal"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col> 
            </b-row>
             <b-row>
                <b-col>
                <div class="form-group">
                  <label>Regional </label>
                  <ValidationProvider name="regional" rules="required" v-slot="{ errors }">
                          <select v-model="form.regional_id" @change="listarCiudades()"  name="regional_id" class="form-control " :disabled="ver">
                              <option></option>
                              <option v-for="regional in regional" :key="regional.id" :value="regional.id">{{regional.nombre}}</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>     
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Ciudad</label>
                    <v-select v-model="form.ciudades_id" :options="ciudades" :reduce="ciudades => ciudades.id" label="ciudad" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>        
              </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Direccion </label>
                  <ValidationProvider name="direccion" rules="required" v-slot="{ errors }">
                        <input v-model="form.direccion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>  
              <hr>
              <b-row>

               <b-col>
                <div class="form-group">
                  <label>Numero Site </label>
                  <ValidationProvider name="numero de site" rules="required" v-slot="{ errors }">
                        <input v-model="form.numero_site"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
              <b-col>
                <div class="form-group">
                  <label>Tipo Site </label>
                  <ValidationProvider name="tipo site" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_site"  name="tipo_site" class="form-control " :disabled="ver">
                              <option value="Cabina">Cabina</option>
                              <option value="Cubículo independiente">Cubículo independiente</option>
                              <option value="Sin site">Sin site</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>                        
              </b-row> 
             <b-row> 
              <b-col>
                <div class="form-group">
                  <label>Comparte Site </label>
                  <ValidationProvider name="comparte site" rules="required" v-slot="{ errors }">
                          <select v-model="form.comparte_site"  name="comparte_site" class="form-control " :disabled="ver">
                              <option value="N/A">N/A</option>
                              <option value="SI">SI</option>
                              <option value="NO">NO</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
               <b-col>
                <div class="form-group">
                  <label>Cumpleaños </label>
                  <ValidationProvider name="cumpleaños" rules="required" v-slot="{ errors }">
                          <select v-model="form.cumpleanos"  name="cumpleanos" class="form-control " :disabled="ver">
                              <option value="Enero">Enero</option>
                              <option value="Febrero">Febrero</option>
                              <option value="Marzo">Marzo</option>
                              <option value="Abril">Abril</option>
                              <option value="Mayo">Mayo</option>
                              <option value="Junio">Junio</option>
                              <option value="Julio">Julio</option>
                              <option value="Agosto">Agosto</option>
                              <option value="Septiembre">Septiembre</option>
                              <option value="Octubre">Octubre</option>
                              <option value="Noviembre">Noviembre</option>
                              <option value="Diciembre">Diciembre</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
             </b-row>
             <b-row>
              <b-col>
                <div class="form-group">
                  <label>Administrado </label>
                  <ValidationProvider name="Administrador de seguridad" rules="required" v-slot="{ errors }">
                          <select v-model="form.administrado"  name="administrado" class="form-control " :disabled="ver">
                              <option v-for="seguridad in seguridad" :key="seguridad.nombre" :value="seguridad.nombre">{{seguridad.nombre}}</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label>Cierre Nocturno </label>
                  <ValidationProvider name="cierre nocturno" rules="required" v-slot="{ errors }">
                          <select v-model="form.cierre_nocturno"  name="cierre_nocturno" class="form-control " :disabled="ver">
                              <option value="DIARIO">DIARIO</option>
                              <option value="FIN DE SEMANA">FIN DE SEMANA</option>
                              <option value="NO">NO</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col v-if="form.cierre_nocturno==='DIARIO'||form.cierre_nocturno==='FIN DE SEMANA'">
                <div class="form-group">
                  <label>Hora de cierre</label>
                  <ValidationProvider name="cierre" rules="required" v-slot="{ errors }">
                        <input v-model="form.hora_cierre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>  
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Apertura </label>
                  <ValidationProvider name="cierre nocturno" rules="required" v-slot="{ errors }">
                          <select v-model="form.apertura"  name="cierre_nocturno" class="form-control " :disabled="ver">
                              <option value="DIARIO">DIARIO</option>
                              <option value="FIN DE SEMANA">FIN DE SEMANA</option>
                              <option value="N/A">N/A</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col> 
              <b-col v-if="form.apertura==='DIARIO'||form.apertura==='FIN DE SEMANA'">
                <div class="form-group">
                  <label>Hora de apertura</label>
                  <ValidationProvider name="Hora de apertura" rules="required" v-slot="{ errors }">
                        <input v-model="form.hora_apertura"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
             </b-row>  
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Mantenimiento</label>
                  <ValidationProvider name="Mantenimiento" rules="required" v-slot="{ errors }">
                          <select v-model="form.mantenimiento"  name="cierre_nocturno" class="form-control " :disabled="ver">
                              <option value="Aplica">Aplica</option>
                              <option value="N/A">N/A</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
              <b-col>
                <div class="form-group">
                  <label>Aseo</label>
                  <ValidationProvider name="aseo" rules="required" v-slot="{ errors }">
                          <select v-model="form.aseo"  name="cierre_nocturno" class="form-control " :disabled="ver">
                              <option value="DIARIO">DIARIO</option>
                              <option value="DE LUNES A VIERNES">DE LUNES A VIERNES</option>
                              <option value="DE LUNES A SABADO">DE LUNES A SABADO</option>
                              <option value="NO">NO</option>
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
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import Multiselect from "vue-multiselect";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { tipologia } from "./tipologia";

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    Multiselect
  },
  data() {
    return {
      tipologia:tipologia,
      title: "Administracion",
      items: [
        {
          text: "Procesos"
        },
        {
          text: "Cajeros",
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
      entidades: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["codigo","tipo","entidad_bancaria","direccion","actions"],
      cajeros: [], 
      ciudades: [], 
      regional: [], 
      seguridad: [], 
      editMode:false,
      form:{
          'id':'',
          'nombre_tercero':'',
          'descripcion_tercero':'',
          'ciudades_id':'',
          'cierre_nocturno':'',
          'mantenimiento':'',
          'compartido_con':null,
      }
    }
  },
  computed:{
        ...mapState(['counter'])
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
              this.agregarCajero();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarCajeros();
          } else {
        }});
      }
    },
    detalles(data){
      console.log(data);
      this.$router.push({ name: 'cajero_details', params: { id: data.id,entidad: data.id_entidad }})
    },
   async agregarCajero(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/cajeros/ath', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarCajeros();
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
    async editarCajeros(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/cajeros/ath', data).then(response => {
            if (response.status===200) {
               this.$swal('Editado con exito','','success');
               this.listarCajeros();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
              this.$swal('No se pudo editar','','warning');
            });
     },
     async eliminarCajeros(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/cajeros/ath/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarCajeros();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarCajero(id){
        this.$swal({
          title: 'Desea borrar este cajero?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarCajeros(id);
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
        for (let index = 0; index < this.cajeros.length; index++) {
          if (this.cajeros[index].id===id) {
            this.form.cierre_nocturno=this.cajeros[index].cierre_nocturno;
            this.form.id=this.cajeros[index].id;
            this.form.tipo=this.cajeros[index].tipo;
            this.form.codigo=this.cajeros[index].codigo;
            this.form.tipologia=this.cajeros[index].tipologia;
            this.form.entidad_bancaria=this.cajeros[index].entidad_bancaria;
            this.form.terminal=this.cajeros[index].terminal;
            this.form.direccion=this.cajeros[index].direccion;
            this.form.ciudad=this.cajeros[index].ciudad;
            this.form.regional_id=this.cajeros[index].regional_id;
            this.listarCiudades();
            this.form.ciudades_id=this.cajeros[index].cuidades_id;
            this.form.numero_site=this.cajeros[index].numero_site;
            this.form.site=this.cajeros[index].site;
            this.form.comparte_site=this.cajeros[index].comparte_site;
            this.form.cumpleanos=this.cajeros[index].cumpleanos;
            this.form.administrado=this.cajeros[index].administrado;
            this.form.tipo_site=this.cajeros[index].tipo_site;
            this.form.apertura=this.cajeros[index].apertura;
            this.form.hora_apertura=this.cajeros[index].hora_apertura;
            this.form.cierre=this.cajeros[index].cierre;
            this.form.hora_cierre=this.cajeros[index].hora_cierre;
            this.form.aseo=this.cajeros[index].aseo;
            this.form.id_entidad=this.cajeros[index].id_entidad;
            this.form.dias_respuesta=this.cajeros[index].dias_respuesta;
            this.form.mantenimiento=this.cajeros[index].mantenimiento;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
     async listarCajeros(){
       await this.axios.get('api/cajeros/ath')
        .then((response) => {
          this.cajeros = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },

    async  listarEntidades(){
      await  this.axios.get('api/entidades')
        .then((response) => {
          this.entidades = response.data.rows;
          for (let index = 0; index < this.entidades.length; index++) {
            if (this.entidades[index].empresa=="ATH") {
              this.form.id_entidad=this.entidades[index].id;
            }
          }
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
     async  listarregional(){
      await  this.axios.get('api/regional')
        .then((response) => {
          this.regional = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async  listarCiudades(){
      let data = new FormData();
      data.append('id',this.form.regional_id);
      await  this.axios.post('api/ciudad/find',data)
        .then((response) => {
          this.ciudades = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async  listarseguridad(){
      await  this.axios.get('api/seguridad')
        .then((response) => {
          this.seguridad = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      setEmail(){
        this.form.username=this.form.email;
        console.log("holas");
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
        this.listarCajeros();
        this.listarEntidades();
        this.listarregional();
        this.listarseguridad();
      },
    computed: {
    rows() {
       return this.cajeros.length
    },
  },
}
</script>
