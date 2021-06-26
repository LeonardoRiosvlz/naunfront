<template>
    <Layout>
    <PageHeader :title="title" :items="items" />
    <h1 class="mt-4">{{detalles.nombre}}</h1>
    <p class="ml-3" style="font-size:18px">{{detalles.tipo_proceso.nombre}}</p>
    <div class="">
      <div class="col-12">
        <b-card title="Información general" class="p-4" style="font-size:17px">
          <b-card-text>Versión: {{detalles.version}}</b-card-text>
          <b-card-text>Codigo:{{detalles.codigo_prefijo}}</b-card-text>
          <b-card-text>Objetivo: {{detalles.objetivos}}</b-card-text>
        </b-card>
      </div> 
    </div>
  


         <div class="col-12">
            <b-card title="Actividades" >
              <div class="row m-0 d-flex">
                  <div class="col-6" v-for="(act, index) in actividades" :key="index">
                    <b-card :title="act.titulo" :sub-title="act.subtitulo">
                      <b-card-text>
                       {{act.descripcion}}
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
            </b-card>
          </div>

        <div class="col-12">
            <b-card title="Recursos" >
              <div class="row m-0 d-flex">
                  <div class="col-6" v-for="(rec, index) in recursos" :key="index">
                    <b-card :title="rec.titulo" >
                      <b-card-text>
                       {{rec.descripcion}}
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
            </b-card>
          </div> 

            <div class="col-12">
            <b-card title="Subprocesos" >
              <div class="row m-0 d-flex">
                  <div class="col-6" v-for="(sub, index) in subprocesos" :key="index">
                    <b-card>
                    <a :href="'/detalles-subprocesos/'+sub.id">{{sub.nombre}}</a>
                      <b-card-text>
                       {{sub.objetivos}}
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
            </b-card>
          </div>
       
    </Layout>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
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
    vSelect
  },
  data() {
    return {
      title: "Administracion",
      items: [
        {
          text: "Sistema integral de gestión"
        },
        {
          text: "Procesos"
        },
         {
          text: "Procesos",
          active: true
        },
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
      fields: ["nombre","version", "codigo_prefijo","actions"],
      procesos: [], 
      editMode:false,
      usuarios:[],
      tipos:[],
      detalles:[],
      show:true,
      actividades:[],
      recursos:[],
      subprocesos:[],
  form:{
      'id': 6,
      'tipo_id': '',
      'version': '',
      'nombre': null,
      'objetivos': '',
      'lider_id': '',
      'tiene_sp': '',
      'actividades':[],
      'recursos':[]
      }
    }
  },

  methods: {

   async listarperfil(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/perfil/lista',data)
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
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
              this.agregarProceso();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarProceso();
          } else {
        }});
      }
    },

    
   async buscarprocesos(){
        let data = new FormData();
         data.append('id',this.$route.params.id);
          await this.axios.post('api/procesos/find',data)
            .then((response) => {
              for (let i = 0; i < response.data.rows.length; i++) {
                this.detalles = response.data.rows[i];
                this.items[2].text = this.detalles.nombre
                this.actividades = JSON.parse( this.detalles.actividades)
                this.recursos = JSON.parse( this.detalles.recursos)
                this.subprocesos = this.detalles.subprocesos
                console.log(  this.subprocesos )
              }
            })
            .catch((e)=>{
              console.log('error' + e);
            })
      },



      resete(){
        var formulario = this.form;

        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                 this.form[key]
                 =[];
            }else{
                this.form[key]="";
            }
        }
       this.form.actividades = [],
       
       this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.procesos.length; index++) {
          if (this.procesos[index].id===id) {
              this.form.id = this.procesos[index].id;
              this.form.tipo_id = this.procesos[index].tipo_id;
              this.form.version = this.procesos[index].version;
              this.form.nombre = this.procesos[index].nombre;
              this.form.objetivos = this.procesos[index].objetivos;
              this.form.lider_id = this.procesos[index].lider_id;
              this.form.tiene_sp = this.procesos[index].tiene_sp;
              this.form.actividades = JSON.parse( this.procesos[index].actividades);
              this.form.recursos = JSON.parse( this.procesos[index].recursos);
              this.form.codigo_prefijo = this.procesos[index].codigo_prefijo;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
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
    watch: {
      cliente: function () {
       this.listarperfil();
        this.title=this.cliente.nombre_prestador;
      },
    },
    created(){
    
        this.session();
         this.buscarprocesos()
           
       console.log(this.form)
      },
     mounted() {

    },
    computed: {
     ...mapState(['usuarioDB','cliente']),

    rows() {
      return this.procesos.length;
    },
  },
}
</script>

<style>
  .card-title{
    font-size: 19px;
  }
</style>