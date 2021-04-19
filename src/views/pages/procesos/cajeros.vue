<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div class="row">
      <div v-for="entidades in entidades" class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card :img-src="entidades.imagen" img-alt="Card image" img-top>
          <b-card-title>
            <h2 class="card-title">{{entidades.empresa}}</h2>
          </b-card-title>
          <b-button class="btn-block" href="javascript:void(0);" variant="primary" :to="'cajeros_'+entidades.empresa">Ir</b-button>
        </b-card>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

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
          text: "Cajeros"
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
      entidades: [], 
      editMode:false,
        form:{
            
        }
    }
  },
  methods: {
  ...mapActions(['guardarUsuario']),
     ...mapActions(['cerrarSession']),
  async  listarentidades(){
    await    this.axios.get('api/entidades')
        .then((response) => {
          this.entidades = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
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
    },
    created(){
        this.session();
        this.listarentidades();
    },
    computed: {
        ...mapState(['usuarioDB']),
    rows() {
       return this.terceros.length
    },
  },
}
</script>
