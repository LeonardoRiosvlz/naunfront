<template>
<Layout>
    <PageHeader :title="title" :items="items" />
   <b-row>
    <b-col>
      <a @click="file=documento.archivo"  class="btn btn-primary btn-block">Docuemento</a>
    </b-col>
    <b-col>
      <a  @click="file=documento.diagramas" class="btn btn-danger btn-block">Diagramas</a>
    </b-col>
  </b-row>
    <VueDocPreview :value="file" type="office" />
</Layout>

</template>
   
<script> 
import Layout from ".././views/layouts/main";
import PageHeader from "@/components/page-header";
import VueDocPreview from 'vue-doc-preview'
export default {
  components: {
    VueDocPreview,
    PageHeader,
    Layout
  },
  data(){
      return {
          title: "Administracion",
            items: [
                {
                text: "Sistema integral de gestión"
                },
                {
                text: "Gestion de documentos",
                active: true
                }
            ],
             file:'',
             documento:'',
      }
  },
  methods:{
       async  mostrardocumento(){
            let data = new FormData();
            data.append('id',this.$route.params.id);
            await this.axios.post('api/documentos/versiones/find',data)
            .then((response) => {
                console.log(response.data)
                this.documento = response.data;
                this.file=this.documento.archivo;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
        },
  },
    mounted(){
      this.mostrardocumento();
      },
}
</script>

