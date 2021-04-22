<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
        <OrgChart />
  </Layout>
</template>

<script>

import 'vue-organization-chart/dist/orgchart.css';
import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import OrgChart from '@/components/OrgChart.vue'
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
    OrgChart
  },
  data() {
    return {
      title: "Organigrama",
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
      fields: ["nombre_tercero","descripcion_tercero","actions"],
      terceros: [], 
      editMode:false,
      form:{
          'id':'',
          'nombre_tercero':'',
          'descripcion_tercero':'',
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
    oc: function(domEl, x) {
       this.chart = new OrgChart(domEl, {
         nodes: x,
         nodeBinding: {
             field_0: "name",
             field_1: "title",
             img_0: "img"
         }
       });
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

      },
    computed: {

  },
}
</script>
                    <style>
                        #app {
                            font-family: 'Avenir', Helvetica, Arial, sans-serif;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            text-align: center;
                            color: #2c3e50;
                            margin-top: 60px;
                        }

                        html, body {
                            width: 100%;
                            height: 100%;
                            padding: 0;
                            margin: 0;
                            overflow: hidden;
                            font-family: Helvetica;
                        }

                        #tree {
                            width: 100%;
                            height: 100%;
                        }
                    </style>



