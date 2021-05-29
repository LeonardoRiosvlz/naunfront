<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear ciudad</b-button>
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
                :items="ciudad"
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
                <template v-slot:cell(region)="data">
                   {{data.item.regional.nombre}}
                </template>
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarciudad(data.item.id)"> Eliminar </b-dropdown-item-button>
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





    <b-modal id="modal" false size="lg"  title="Gestión de ciudad" hide-footer>
          <ValidationObserver ref="form">
             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Regional</label>
                    <ValidationProvider name="regional" rules="required" v-slot="{ errors }">
                          <select v-model="form.regional_id"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option></option>
                              <option :value="regionales.id" v-for="regionales in regionales" :key="regionales.id">{{regionales.nombre}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>

              <b-row>
                 <div class="col-sm-6">
                     
                   <label class="links">Departamento</label>
                   <div class="form-group">
                       <ValidationProvider name="dep" rules="required" v-slot="{ errors }">
                     <select v-model="form.dep" @change="depp()" class="form-control" :disabled="ver" >
                       <option value=""></option>
                       <option v-for="colombia in colombia" :value="colombia.id" :key="colombia.id">{{colombia.departamento}}</option>
                     </select>
                     <span style="color:red">{{ errors[0] }}</span>
                     </ValidationProvider>
                   </div>
                </div>
                <div class="col-sm-6">
                   <div class="form-group links">
                     <label>Ciudad </label>
                     <ValidationProvider name="ciudad" rules="required" v-slot="{ errors }">
                    <select v-model="form.ciudad" name="ciudad" class="form-control" :disabled="ver" >
                        <option v-for="ciudad in colombia[form.dep].ciudades" :value="ciudad" :key="ciudad">{{ciudad}}</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
               </div>
              </b-row>

              <b-row>
                <div class="col-sm-6">
                   <div class="form-group links">
                     <label>Métrica Prioridad Crítico</label>
                     <ValidationProvider name="metrica" rules="required" v-slot="{ errors }">
                    <select v-model="form.metrica_critico" name="metrica" class="form-control" :disabled="ver" >
                        <option value="horas">horas</option>
                       <option value="dias">dias</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
               </div>
               </div>
                <div class="col-sm-6">
                    <div class="form-group">
                    <label>Valor Prioridad Crítico</label>
                        <ValidationProvider name="valor_critico" rules="required" v-slot="{ errors }">
                                <input type="number" v-model="form.valor_critico"   class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                                
                        </ValidationProvider>
                    </div>
                    
                </div>
              </b-row> 
              <b-row>
                <div class="col-sm-6">
                   <div class="form-group links">
                     <label>Métrica Prioridad Alto</label>
                     <ValidationProvider name="metrica" rules="required" v-slot="{ errors }">
                    <select v-model="form.metrica_alto" name="metrica" class="form-control" :disabled="ver" >
                        <option value="horas">horas</option>
                       <option value="dias">dias</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
               </div>
               </div>
                <div class="col-sm-6">
                    <div class="form-group">
                    <label>Valor Prioridad Alto</label>
                        <ValidationProvider name="valor_alto" rules="required" v-slot="{ errors }">
                                <input type="number" v-model="form.valor_alto"   class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                                
                        </ValidationProvider>
                    </div>
                    
                </div>
              </b-row> 
                  <b-row>
                <div class="col-sm-6">
                   <div class="form-group links">
                     <label>Métrica Prioridad Mediano</label>
                     <ValidationProvider name="metrica" rules="required" v-slot="{ errors }">
                    <select v-model="form.metrica_mediano" name="metrica" class="form-control" :disabled="ver" >
                        <option value="horas">horas</option>
                       <option value="dias">dias</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
               </div>
               </div>
                <div class="col-sm-6">
                    <div class="form-group">
                    <label>Valor Prioridad Alto</label>
                        <ValidationProvider name="valor" rules="required" v-slot="{ errors }">
                                <input type="number" v-model="form.valor_mediano"   class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                                
                        </ValidationProvider>
                    </div>
                    
                </div>
              </b-row> 
                <b-row>
                <div class="col-sm-6">
                   <div class="form-group links">
                     <label>Métrica Prioridad Bajo</label>
                     <ValidationProvider name="metrica" rules="required" v-slot="{ errors }">
                    <select v-model="form.metrica_bajo" name="metrica" class="form-control" :disabled="ver" >
                        <option value="horas">horas</option>
                       <option value="dias">dias</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
               </div>
               </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Valor Prioridad Alto</label>
                        <ValidationProvider name="valor" rules="required" v-slot="{ errors }">
                            <input type="number" v-model="form.valor_bajo"   class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </div>
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
          text: "Gestión corporativa"
        },
        {
          text: "ciudad",
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
      fields: ["ciudad","departamento","region","actions"],
      ciudad: [], 
      entidades: [], 
      regionales: [], 
      editMode:false,
      form:{
          'id':'',
          'ciudad':'',
          'descripcion':'',
          'dep':0,
          'departamento':'',
          'ciudad':'',
      },
      departamento:0
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarUsers();
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
              this.agregarciudad();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarciudad();
          } else {
        }});
      }
    },
   async agregarciudad(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/ciudad', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarciudad();
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
    async editarciudad(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/ciudad', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarciudad();
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
     async eliminarciudad(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/ciudad/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarciudad();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarciudad(id){
        this.$swal({
          title: 'Desea borrar este ciudad?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarciudad(id);
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
        for (let index = 0; index < this.ciudad.length; index++) {
          if (this.ciudad[index].id===id) {
            this.form.id=this.ciudad[index].id;
            this.form.ciudad=this.ciudad[index].ciudad;
            this.form.metrica_critico=this.ciudad[index].metrica_critico;
            this.form.valor_critico=this.ciudad[index].valor_critico;
            this.form.metrica_alto=this.ciudad[index].metrica_alto;
            this.form.valor_alto=this.ciudad[index].valor_alto;
            this.form.metrica_mediano=this.ciudad[index].metrica_mediano;
            this.form.valor_mediano=this.ciudad[index].valor_mediano;
            this.form.metrica_bajo=this.ciudad[index].metrica_bajo;
            this.form.valor_bajo=this.ciudad[index].valor_bajo;
            this.form.departamento=this.ciudad[index].departamento;
            this.form.regional_id=this.ciudad[index].regional.id;
            this.form.dep=this.ciudad[index].dep;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async  listarciudad(){
      await  this.axios.get('api/ciudad')
        .then((response) => {
          this.ciudad = response.data.rows;
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
            this.form.ciudad=""
            this.form.roles="3"
        } else if(this.form.tipo==="Coordinador") {
            this.form.entidad="No";
            this.form.ciudad="";
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
        },
    async  listarregional(){
      await  this.axios.get('api/regional')
        .then((response) => {
          this.regionales = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
  },
    created(){
        this.session();
        this.listarciudad();
        this.listarregional();

      },
     mounted() {

    },
    computed: {
    rows() {
      return this.ciudad.length;
    },
  },
}
</script>
