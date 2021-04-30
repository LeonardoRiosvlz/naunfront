<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-5">
          <div class="card">
            <div class="card-body">
              <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-vertical"></i>
                </template>
                <!-- item-->
                <b-dropdown-item v-if="!programacion[0].id_tecnico">PROGRAMAR</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item>Export Report</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item>Profit</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item>Action</b-dropdown-item>
              </b-dropdown>

              <h4 class="card-title mb-3"> CONSECUTIVO ATH-{{programacion[0].id}}</h4>
                <b-card no-body >
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4">
                      <b-card-img :src="programacion[0].cajero_ath.entidad.imagen" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body title="ATH">
                        <b-card-text style="margin:0">{{programacion[0].titulo}}</b-card-text>

                        <p class="card-text">
                          <small class="text-muted">{{programacion[0].titulo}}</small>
                        </p>
                        <p class="card-text">
                          <small class="text-danger"> {{programacion[0].fecha_vencimiento | capitalize }}</small>
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              <div>
                <div class="text-center">
                 <h4 class="text-danger">Llamada no programada</h4> 
                </div>
                <PRE> {{programacion}}</PRE>
                 

                <div class="text-center mt-4">
                  <a href="#" class="btn btn-primary btn-sm">View more</a>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-lg-7">
      </div>
      <div class="col-lg-12">
  
      </div>
    </div>
  </Layout>
</template>

<script>

import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import moment from 'moment';

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
      title: "PROCESOS",
      items: [
        {
          text: "Servicios ATH"
        },
        {
          text: "Detalles",
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
      fields: ["cargo","descripcion","actions"],
      cajero: [], 
      consecutivo: [], 
      programacion: [], 
      editMode:false,
      form:{
          'id':'',
          'cargo':'',
          'descripcion':'',
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
        capitalize: function (value) {
          if (!value) return ''
          let fecha = moment();
          value = fecha.diff(value, 'hours')+ " horas para caducar."; 
          
          return value
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
              this.agregarCargo();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarCargos();
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
       await this.axios.post('api/cargos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarCargos();
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
    async editarCargos(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/cargos', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarCargos();
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
     async eliminarCargos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/cargos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarCargos();
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
            this.eliminarCargos(id);
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
        for (let index = 0; index < this.cargos.length; index++) {
          if (this.cargos[index].id===id) {
            this.form.id=this.cargos[index].id;
            this.form.cargo=this.cargos[index].cargo;
            this.form.descripcion=this.cargos[index].descripcion;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async  loadConsecutivo(){
      let data = new FormData();
       data.append('id',this.consecutivo.id);
       await this.axios.post('api/programacion/ath/find',data)
        .then((response) => {
          this.programacion = response.data;
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
        this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
        this.loadConsecutivo();
      },
     mounted() {

    },
    computed: {
    rows() {
      return this.cargos.length;
    },
  },
}
</script>
