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
                          <select v-model="form.tipo"  name="tipo" class="form-control form-control-lg" :disabled="ver">
                              <option value="ATM">ATM</option>
                              <option value="OTRO">OTRO</option>
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
                  <label>Tipologia </label>
                  <ValidationProvider name="tipologia" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipologia"  name="tipologia" class="form-control form-control-lg" :disabled="ver">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
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
                  <label>Ciudad </label>
                  <ValidationProvider name="ciudad" rules="required" v-slot="{ errors }">
                        <input v-model="form.ciudad"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label>Regional </label>
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                        <input v-model="form.regional"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
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
                  <label>Site </label>
                  <ValidationProvider name="site" rules="required" v-slot="{ errors }">
                        <input v-model="form.site"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
              <b-col>
                <div class="form-group">
                  <label>Tipo Site </label>
                  <ValidationProvider name="tipo site" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_site"  name="tipo_site" class="form-control form-control-lg" :disabled="ver">
                              <option value="CABINA">CABINA</option>
                              <option value="SIN SITE">SIN SITE</option>
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
                          <select v-model="form.comparte_site"  name="comparte_site" class="form-control form-control-lg" :disabled="ver">
                              <option value="N/A">N/A</option>
                              <option value="SI">SI</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
               <b-col>
                <div class="form-group">
                  <label>Cumpleaños </label>
                  <ValidationProvider name="cumpleanos" rules="required" v-slot="{ errors }">
                        <input v-model="form.cumpleanos"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
             </b-row>
             <b-row>
              <b-col>
                <div class="form-group">
                  <label>Administrado </label>
                  <ValidationProvider name="administrado" rules="required" v-slot="{ errors }">
                        <input v-model="form.administrado"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label>Cierre Nocturno </label>
                  <ValidationProvider name="cierre nocturno" rules="required" v-slot="{ errors }">
                          <select v-model="form.cierre_nocturno"  name="cierre_nocturno" class="form-control form-control-lg" :disabled="ver">
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
                  <label>Apertura </label>
                  <ValidationProvider name="apertura" rules="required" v-slot="{ errors }">
                        <input v-model="form.apertura"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>   
              <b-col>
                <div class="form-group">
                  <label>Cierre </label>
                  <ValidationProvider name="cierre" rules="required" v-slot="{ errors }">
                        <input v-model="form.cierre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
             </b-row>  
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Aseo</label>
                  <ValidationProvider name="aseo" rules="required" v-slot="{ errors }">
                        <input v-model="form.aseo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>  
              <b-col>
                <div class="form-group">
                  <label>Dias de respuesta RF</label>
                  <ValidationProvider name="Dias de respuesta rf" rules="required" v-slot="{ errors }">
                        <input v-model="form.dias_respuesta"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
      fields: ["codigo","tipo","direccion","actions"],
      cajeros: [], 
      editMode:false,
      form:{
          'id':'',
          'nombre_tercero':'',
          'descripcion_tercero':'',
          'cierre_nocturno':'',
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
            this.form.terminal=this.cajeros[index].terminal;
            this.form.direccion=this.cajeros[index].direccion;
            this.form.ciudad=this.cajeros[index].ciudad;
            this.form.regional=this.cajeros[index].regional;
            this.form.site=this.cajeros[index].site;
            this.form.comparte_site=this.cajeros[index].comparte_site;
            this.form.cumpleanos=this.cajeros[index].cumpleanos;
            this.form.administrado=this.cajeros[index].administrado;
            this.form.tipo_site=this.cajeros[index].tipo_site;
            this.form.apertura=this.cajeros[index].apertura;
            this.form.cierre=this.cajeros[index].cierre;
            this.form.aseo=this.cajeros[index].aseo;
            this.form.id_entidad=this.cajeros[index].id_entidad;
            this.form.dias_respuesta=this.cajeros[index].dias_respuesta;

            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      listarCajeros(){
        this.axios.get('api/cajeros/ath')
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
      },
    computed: {
    rows() {
       return this.cajeros.length
    },
  },
}
</script>
