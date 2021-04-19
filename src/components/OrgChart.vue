<template>
    <div id="tree" ref="tree"></div>
    
</template>
<script>
import OrgChart from '@balkangraph/orgchart.js'
    export default {
    name: 'tree',
     data() {
         return {
             users: [],
             nodes: [
             ]
          }
     },
     methods: {
   async listarUsers(){
    await  this.axios.get('user/all')
      .then((response) => {
        this.users = response.data.rows;
        console.log(this.users);
        for (let index = 0; index < this.users.length; index++) {
            const element = this.users[index];
            if (this.users[index].id===1) {
                    this.nodes.push({
                    id:this.users[index].id, 
                    name:this.users[index].nombre, 
                    title:this.users[index].cargo, 
                    img:this.users[index].imagen, 
                   });

            }else{
                    this.nodes.push({
                    id:this.users[index].id, 
                    pid:this.users[index].dependencia, 
                    name:this.users[index].nombre, 
                    title:this.users[index].cargo, 
                    img:this.users[index].imagen,
                   });
            this.oc(this.$refs.tree, this.nodes)
            }
                
        }
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
     oc: function(domEl, x) {
            this.chart = new OrgChart(domEl, {
            nodes: x,
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                img_0: "img"
            }
          });

         }
    },
    mounted(){
      this.listarUsers();
      
    }
     }
</script>
<style scoped>
</style>