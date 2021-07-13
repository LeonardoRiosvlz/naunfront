<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">

      <div class="col-12">
        <div class="card ex1" >
          <div class="card-body">
              <button class="btn btn-success " @click="editarPlantilla()">Guardar</button>
              <Editor/>
          </div>
        </div>
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
import Editor from "@/components/editor";


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
    Editor
  },
  data() {
    return {
      title: "E",
      items: [
        {
          text: "Sistema integral de gestión"
        },
        {
          text: "Plantillas ",
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
      fields: ["nombre","descripcion","actions"],
      areas: [], 
      plantillas: [],
      editMode:false,
      form:{
            'id': 6,
            'nombre':'',
            'descripcion':'',
            'status':'',
            'documento':[],      
     }
    }
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
    ...mapActions(['guardarUsuario','cargarDocumento']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarArea();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarAreas();
          } else {
        }});
      }
    },

      eliminarArea(id){
        this.$swal({
          title: 'Desea borrar esta area?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarAreas(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.form.cliente_id=this.cliente.id;
      },

        async  listarPlantilla(){
            let data = new FormData();
            data.append('id',this.$route.params.id);
            await this.axios.post('api/documentos/tipo/find',data)
            .then((response) => {
                console.log(response.data)
                this.plantillas = response.data;
                let payload=JSON.parse(this.plantillas.documento);  
                this.cargarDocumento(payload);
            })
            .catch((e)=>{
                console.log('error' + e);
            })
        },
        async  editarPlantilla(){
            let data = new FormData();
            data.append('id',this.$route.params.id);
            data.append('documento',JSON.stringify(this.doc));
        await this.axios.put('api/documentos/tipo/editar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
              console.log(response)
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarplantilla();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
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
        this.listarPlantilla();
      },
   watch: {
      cliente: function () {

        this.title=this.cliente.nombre_prestador;
      },
      doc:function(){
        this.form.documento=this.doc;
      }
    },
    computed: {
      ...mapState(['usuarioDB','cliente','doc']),
    rows() {
      return this.areas.length;
    },
  },
}
</script>
<style scoped>
.ex1 {
  background-color: lightblue;
  height: 1500px;
  overflow-y: scroll;
}

</style>