<template>
    <Layout>
    <PageHeader :title="title" :items="items" />
    <h1 class="mt-4">Vacunacion en el barrio tocumare</h1>
    <p class="ml-3" style="font-size:18px">Tipo de proceso de este proceso va aqui</p>
    <div class="">
      <div class="col-12">
        <b-card title="Información general" >
          <b-card-text>Versión: 0.2.1</b-card-text>
          <b-card-text>Codigo:102338213</b-card-text>
          <b-card-text>Objetivo: Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.</b-card-text>
        </b-card>
      </div> 
       </div>


       <div class="row m-0">

         <div class="col-6">
            <b-card title="Card title" sub-title="Card subtitle">
              <b-card-text>
                Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
                content.
              </b-card-text>

              <b-card-text>A second paragraph of text in the card.</b-card-text>

              <a href="#" class="card-link">Card link</a>
              <b-link href="#" class="card-link">Another link</b-link>
            </b-card>
          </div>


          <div class="col-6">
            <b-card title="Card title" sub-title="Card subtitle">
              <b-card-text>
                Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
                content.
              </b-card-text>

              <b-card-text>A second paragraph of text in the card.</b-card-text>

              <a href="#" class="card-link">Card link</a>
              <b-link href="#" class="card-link">Another link</b-link>
            </b-card>
          </div>
          <div class="col-6">
            <b-card title="Card title" sub-title="Card subtitle">
              <b-card-text>
                Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
                content.
              </b-card-text>

              <b-card-text>A second paragraph of text in the card.</b-card-text>

              <a href="#" class="card-link">Card link</a>
              <b-link href="#" class="card-link">Another link</b-link>
            </b-card>
          </div>


          <div class="col-6">
            <b-card title="Card title" sub-title="Card subtitle">
              <b-card-text>
                Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
                content.
              </b-card-text>

              <b-card-text>A second paragraph of text in the card.</b-card-text>

              <a href="#" class="card-link">Card link</a>
              <b-link href="#" class="card-link">Another link</b-link>
            </b-card>
          </div>
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
          text: "Procesos",
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
      fields: ["nombre","version", "codigo_prefijo","actions"],
      procesos: [], 
      editMode:false,
      usuarios:[],
      tipos:[],
      show:true,
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
    cargar(index){
      this.form.actividades.push({
        titulo:"",
        subtitulo:"",
        descripcion:"",
        show:true,
      });
      },
      eliminarItem(index){
        this.form.actividades.splice(index, 1);  
      },
      cargarRecursos(index){
        this.form.recursos.push({
          titulo:"",
          subtitulo:"",
          descripcion:"",
          show:true,
        });
      },
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
      async listartipos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/tipo_procesos/listar',data)
            .then((response) => {
              this.tipos = response.data.rows;
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
   async editarProceso(){
        let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/procesos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
              console.log(response)
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarProceso();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
  async agregarProceso(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.post('api/procesos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarProceso();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario   
               this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
     async eliminarProcesos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/procesos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarProceso();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarProceso(id){
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
            this.eliminarProcesos(id);
          }
        })
      },
      resete(){
        var formulario = this.form;

        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                 this.form[key]=[];
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
    async  listarProceso(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/procesos/listar',data)
          .then((response) => {
            this.procesos = response.data.rows;
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
    watch: {
      cliente: function () {
       this.listarperfil();
       this.listartipos();
        this.listarProceso();
        this.title=this.cliente.nombre_prestador;
      },
    },
    created(){
        this.session();
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
