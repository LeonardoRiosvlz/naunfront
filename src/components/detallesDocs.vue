<template>
<Layout>
    <PageHeader :title="title" :items="items" />
   <b-row class="mb-2">
    <b-col>
      <a @click="file=documento.archivo"  class="btn btn-primary btn-block">Docuemento</a>
    </b-col>
    <b-col>
      <a  @click="file=documento.diagramas" class="btn btn-danger btn-block">Diagramas</a>
    </b-col>
    <b-col>
      <a  @click="cargarObservaciones()" class="btn btn-success btn-block">Generar observaciones</a>
    </b-col>
  </b-row>


        <b-modal id="modal_carga" false size="lg"  title="Gestión de normatividad" hide-footer>
         
            <div class="row">
                <div class="col-lg-12">
                    <b-card no-body>
                    <b-card-body>
                        <b-card-title>
                                    
                          <h4 class="card-title">Tipo de proceso: <strong> {{documento.documento.proceso.tipo_proceso.nombre}}</strong></h4>
                          <h4 class="card-title">Proceso: <strong>{{documento.documento.proceso.nombre}}</strong></h4>
                          <h4 class="card-title">Sub proceso:  <strong>{{documento.documento.subproceso.nombre}}</strong></h4>
                          <h4 class="card-title">Documento:  <strong>{{documento.documento.nombre}}</strong></h4>
                          <h4 class="card-title">Version: <strong>v-{{documento.documento.version}}</strong></h4>
                          <h4 class="card-title">Creado:  <strong>{{documento.created_at | fecha}}</strong></h4>
                          <h4 class="card-title">Estado <strong>{{documento.version}} ({{documento.status}}) </strong></h4>
                        </b-card-title>
                    </b-card-body>
                    </b-card>
                </div>
            </div>
        <ValidationObserver ref="form">
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Tipo de cliente</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="documento.status" name="tipo" class="form-control form-control-lg" >
                              <option value="Pendiente">Pendiente</option>
                              <option value="Aprobado">Aprobado</option>
                              <option value="Rechazado">Rechazado</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Observaciones al documento</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <textarea v-model="documento.observaciones_documentos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Observaciones a los diagramas</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                          <textarea v-model="documento.observaciones_diagramas"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>        
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
     </b-modal>



    <VueDocPreview :value="file" type="office" />
</Layout>

</template>
   
<script> 
import Layout from ".././views/layouts/main";
import PageHeader from "@/components/page-header";
import VueDocPreview from 'vue-doc-preview'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import moment from 'moment'
export default {
  components: {
    VueDocPreview,
    PageHeader,
    Layout,
    ValidationProvider,
    ValidationObserver,
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
    filters: {
        fecha: function (value) {
         moment.locale('es');
        let fechafina =moment(value).format('MMMM DD YYYY HH:MM')
           return fechafina
        }
    },
  methods:{
    switchLoc(){

            this.$refs.form.validate().then(esValido => {
            if (esValido) {
                this.$swal({
                    title: 'Desea enviar este reporte?',
                    icon: 'question',
                    iconHtml: '',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    showCloseButton: true
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.editarReporte();
                    }
                })
            } else {
            }});
        
    },
    async  editarReporte(){
            let data = new FormData();
            data.append('id',this.$route.params.id);
            data.append('observaciones_documentos',this.documento.observaciones_documentos);
            data.append('observaciones_diagramas',this.documento.observaciones_diagramas);
            data.append('status',this.documento.status);
            await this.axios.put('api/documentos/version/editar',data)
            .then((response) => {
            if (response.status==200) {
                this.$swal(
                    'Enviado con exito!',
                     '',
                     'success'
                );
                 this.mostrardocumento();
                }
               
            })
            .catch((e)=>{
                this.$swal(
                    'no se pudo enviar!',
                     '',
                     'warning'
                );
            })
        },
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
        cargarObservaciones(){
            this.$root.$emit("bv::show::modal", "modal_carga", "#btnShow");
        }
  },
    mounted(){
      this.mostrardocumento();
      },
}
</script>

