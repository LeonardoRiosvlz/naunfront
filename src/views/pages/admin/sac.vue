<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;">Crear sac</b-button>
    </div>
    <div class="clearfix mb-3">
      <b-button class="float-right btn-success" left @click="$bvModal.show('modal_csv');editMode=false;ver=false;">Cargar CSV</b-button>
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
                :items="sacs"
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
                {{data.item.precio | moneda}}
              </template>

                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarsac(data.item.id)"> Eliminar </b-dropdown-item-button>
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




    <b-modal id="modal" false size="lg"  title="Gestión de servicios a cobro " hide-footer>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Item  </label>
                  <ValidationProvider name="item" rules="required" v-slot="{ errors }">
                        <input v-model="form.item"  type="text" class="form-control" placeholder=" " :disabled="ver">
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
                        <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row> 
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Precio  </label>
                  <ValidationProvider name="precio" rules="required" v-slot="{ errors }">
                        <input v-model="form.precio"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label>Medida  </label>
                  <ValidationProvider name="unidad" rules="required" v-slot="{ errors }">
                        <input v-model="form.medida"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>        
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>


    <b-modal id="modal_csv" false size="sm"  title="Cargar csv sac" hide-footer>
          <ValidationObserver ref="form">
              <b-row>
                <b-col>
                    <label>CSV</label>
                    <b-form-file
                        id="file"
                        ref="file"
                        v-model="file"
                        name="file"
                        placeholder="Agregue Csv..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
               </b-col>
              </b-row>        
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success my-2" @click="cuestionCargarCSV">Cargar</button>

     </b-modal>

  </Layout>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";


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
      title: "Administracion",
      items: [
        {
          text: "Gestión corporativa"
        },
        {
          text: "sacs",
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
      fields: ["item","descripcion","precio","actions"],
      sacs: [],
      editMode:false,
      form:{
          'id':'',
          'item':'',
          'descripcion':'',
          'precio':'',
          'medidad':'',
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarUsers();
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
              this.agregarsac();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarsacs();
          } else {
        }});
      }
    },
   async agregarsac(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/sac', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado con exito!',
                    '',
                    'success');
               this.listarsacs();
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
    async editarsacs(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/sac', data).then(response => {
            if (response.status==200) {
                this.$swal(
                    'Editado con exito!',
                    '',
                    'success'
                );
               this.listarsacs();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
                this.$swal(
                    'Error de peticion!',
                    '',
                    'warning'
                );
            });
     },
     async eliminarsacs(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/sac/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarsacs();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      cuestionCargarCSV(){
        this.$swal({
          title: 'Desea cargar este csv?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.cargarCsv();
          }
        })
      },
  async cargarCsv(){
     let data = new FormData();

       data.append("file",this.file);
       await this.axios.post('api/sac/csv', data, {
           headers: {
            'Content-Type': 'multipart/form-data',
            'mimetype': 'text/csv'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado con exito!',
                    '',
                    'success');
               this.listarsacs();
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
      eliminarsac(id){
        this.$swal({
          title: 'Desea borrar esta sac?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarsacs(id);
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
        for (let index = 0; index < this.sacs.length; index++) {
          if (this.sacs[index].id===id) {
            this.form.id=this.sacs[index].id;
            this.form.item=this.sacs[index].item;
            this.form.descripcion=this.sacs[index].descripcion;
            this.form.precio=this.sacs[index].descripcion;
            this.form.medida=this.sacs[index].medida;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async  listarsacs(){
     await   this.axios.get('api/sac')
        .then((response) => {
          this.sacs = response.data.rows;
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
        this.listarsacs();
      },
    computed: {
    rows() {
       return this.sacs.length
    },
  },
}
</script>
