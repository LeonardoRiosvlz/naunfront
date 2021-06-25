<template>
<Layout>
    <PageHeader :title="title" :items="items" />
    <VueDocPreview :value="file.archivo" type="office" />
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
      }
  },
  methods:{
       async  mostrardocumento(){
            let data = new FormData();
            data.append('id',this.$route.params.id);
            await this.axios.post('api/documentos/find',data)
            .then((response) => {
                console.log(response.data)
                this.file = response.data
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

