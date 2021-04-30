<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-5">

        <b-card class="p-3 text-left" no-body  style="max-height:552;min-height:552px">
            <b-row>
              <b-col>
                  <img
                    class="rounded-circle"
                    width="100%"
                    :src="cajero.entidad.imagen"
                    data-holder-rendered="true"
                  />
              </b-col>
            </b-row>
            <blockquote class="blockquote mb-0">
              <h2>{{cajero.tipo}}-{{cajero.codigo}}({{cajero.tipologia}})</h2>
              <h5>{{cajero.entidad_bancaria}}</h5>
              <p style="margin:0">Terminal: {{cajero.terminal}}</p>
              <p style="margin:0">Administrador de seguridad: {{cajero.administrado}}</p>
              <p style="margin:0">Ciudad: {{cajero.ciudad.ciudad}}</p>
              <p style="margin:0">Direccion: {{cajero.direccion}}</p>
              <footer class="blockquote-footer">
                <small class="text-muted">
                  Cumpleaños
                  <cite title="Source Title">{{cajero.cumpleanos  }}</cite>
                </small>
              </footer>
            </blockquote>
          </b-card>
      </div>
      <div class="col-lg-7">
        <Trazabilidad />
      </div>
      <div class="col-lg-12">
        <Album />
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
import Trazabilidad from './trazabilidad';
import Album from './album';

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
    Trazabilidad,
    Album
  },
  data() {
   
     return {
      title: "Procesos",
      items: [
        {
          text: "Cajeros ATH"
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
    async  listarCajero(){
      let data = new FormData();
       data.append('id',this.$route.params.id);
       await this.axios.post('api/cajeros/ath/byid',data)
        .then((response) => {
          this.cajero = response.data;
          this.cajero=this.cajero[0];
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
        this.listarCajero();

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
