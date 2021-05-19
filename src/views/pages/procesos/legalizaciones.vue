<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

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
                :items="legalizaciones"
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
              <template v-slot:cell(consecutivo)="data">
                  ATH-{{data.item.programacion_ath.id}}
              </template>
                <template v-slot:cell(excendete)="data">
                  {{data.item.excedente | moneda}}
              </template>
                <template v-slot:cell(status)="data">
                <span v-if="data.item.status==='Pendiente'" class="badge badge-warning">Pendiente</span>
                <span v-if="data.item.status==='Aceptada'" class="badge badge-success">Aceptada</span>
                <span v-if="data.item.status==='Devuelta'" class="badge badge-danger">Devuelta</span>
              </template>

                <template v-slot:cell(actions)="data">
                  <button v-b-tooltip.hover title="Ver "  type="button" class="btn btn-success btn-sm rounded-pill mr-1" @click="editMode=false;ver=true;setear(data.item.id)"  ><i class="ri-eye-line"></i>  </button>
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


    <b-modal id="modal_aprobar" false size="lg"  title="Respuesta a gestión" hide-footer>
          <ValidationObserver ref="form">      
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Observaciones</label>
                    <ValidationProvider name="observaciones analista" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.observaciones_analista"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" v-if="form.observaciones_analista" @click="devolverGestionCuestion()">Enviar</button>
     </b-modal>





    <b-modal id="modal" false size="lg"  title="Gestión de Legalizaciones" hide-footer>
        <div class="row">
             <h5>Abono: ({{form.tipo}} {{form.excedente | moneda}})</h5>
             <img :src="form.abono" alt width="94%" style="margin:10px"/>
       
        <table id="example2" class="table table-striped" >
           <thead>
             <tr>
               <th>Codigo</th>
               <th>Nombre</th>
               <th>Descripción</th>
                <th>Precio</th>
                <th>Precio en factura</th>
               <th v-if="!ver"></th>
             </tr>
           </thead>
            <tbody>
             <tr v-for="items in form.items" :key="items.id">
               <td>{{items.codigo}}</td>
               <td>{{items.nombre}}</td>
                <td>{{items.descripcion}} </td>
                <td>{{items.precio | moneda}} </td>
                <td>{{items.precio_factura | moneda}} </td>
             </tr>
             <tr>
             </tr>
            </tbody>
          </table>
          <h5>Facturas</h5>
           <div class="col-12">
             <div class="popup-gallery">
               <a
                 class="float-left"
                 v-for="(item, index) in form.evidencias"
                 :key="index"
                 @click="() => showImg(index)"
               >
                 <div class="img-fluid">
                   <img :src="`${item}`" alt width="200" style="margin:10px"/>
                 </div>
               </a>
             </div>
             <vue-easy-lightbox
               :visible="visible"
               :index="index"
               :imgs="form.evidencias"
               @hide="visible = false"
             ></vue-easy-lightbox>
           </div>
           </div>
           <div class="row">
               <div class="col-6">
                     <button class="btn btn-success btn-block" @click="devolver('Aceptada')"><i class="ri-check-line align-middle mr-2"></i> Aprobar</button>
               </div>
               <div class="col-6">
                     <button class="btn btn-danger btn-block" @click="devolver('Devuelta')"><i class="ri-error-warning-line align-middle mr-2"></i> Devolver</button>
               </div>
           </div>
    
     </b-modal>

  </Layout>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
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
    ValidationObserver,
    VueEasyLightbox
  },
  data() {
    return {
      title: "Procesos",
      items: [  
        {
          text: "Legalizaciones",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      imgs: "", // Img Url , string or Array of string
      visible: false,
      index: 0, // default: 0
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
      fields: ["consecutivo","excedente","status","actions"],
      legalizaciones: [], 
      editMode:false,
      form:{
          'id':'',
          'observaciones':'',
          'tipo':'',
          'abono':'',
          'items':[],
          'evidencias':[],
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
    showSingle() {
      this.imgs = require("@/assets/images/small/img-2.jpg");
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    devolver(index){
      if (index==="Devuelta") {
        this.form.status="Devuelta"
        this.$root.$emit("bv::show::modal", "modal_aprobar", "#btnShow");
      }else{
        this.form.status="Aceptada"
        this.devolverGestionCuestion();
        }
    },
    devolverGestionCuestion(){
        this.$swal({
          title: 'Desea notificar al técnico sobre el estado de legalizacion?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.responderGestion();
          }
        })
      },
         async responderGestion(){
     let data = new FormData();
      var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
 
       await this.axios.post('/api/legalizaciones/ath/respuesta', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'respondido con exito!',
                    '',
                    'success');
               this.listarLegalizaciones();
               this.$root.$emit("bv::hide::modal", "modal_aprobar", "#btnShow");
              this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
    onFiltered(filteredItems){
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarCargo();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarLegalizaciones();
          } else {
        }});
      }
    },
   async agregarCargo(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/Legalizaciones', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarLegalizaciones();
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
    async editarLegalizaciones(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/Legalizaciones', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarLegalizaciones();
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
     async eliminarLegalizaciones(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/Legalizaciones/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarLegalizaciones();
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
            this.eliminarLegalizaciones(id);
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
        for (let index = 0; index < this.legalizaciones.length; index++) {
          if (this.legalizaciones[index].id===id) {
            this.form.id=this.legalizaciones[index].id;
            this.form.tecnico_id=this.legalizaciones[index].programacion_ath.Tecnico_ath.id;
            this.form.items=JSON.parse(this.legalizaciones[index].items);
            this.form.evidencias=JSON.parse(this.legalizaciones[index].evidencias);
            this.form.items=JSON.parse(this.form.items);
            this.form.excedente=this.legalizaciones[index].excedente;
            this.form.tipo=this.legalizaciones[index].tipo;
            this.form.abono=this.legalizaciones[index].abono;
            this.form.observaciones=this.legalizaciones[index].observaciones;
            this.form.id_programacion=this.legalizaciones[index].programacion_ath.id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      listarLegalizaciones(){
        this.axios.get('api/Legalizaciones/Ath')
        .then((response) => {
          this.legalizaciones = response.data.rows;
          console.log(response.data);
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
        this.listarLegalizaciones();

      },
     mounted() {

    },
    computed: {
    rows() {
      return this.legalizaciones.length;
    },
  },
}
</script>
