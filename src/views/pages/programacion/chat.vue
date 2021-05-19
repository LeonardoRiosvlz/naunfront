
<template>
  <div  >
    <div class="card-body border-top text-center m-0">
      <div class="clearfix m-0">
        <b-button class="float-right btn-info" left @click="$bvModal.show('modal_notas');editMode=false;resete();">Crear nota </b-button>
      </div>
    </div>


          <b-card class="p-3 text-right" no-body v-for="notas in notas" :key="notas.id">
          <div class="clearfix m-0">
                  <button v-b-tooltip.hover title="Editar "  type="button" class="btn btn-info btn-sm rounded-pill mr-1" @click="editMode=true;ver=false;setear(notas.id)"><i class="ri-edit-2-fill"></i>  </button>
                  <button v-b-tooltip.hover title="Eliminar "  type="button" class="btn btn-danger btn-sm rounded-pill mr-1" @click="eliminarNota(notas.id)"><i class="ri-delete-bin-line"></i>  </button>
          </div>
            <blockquote class="blockquote mb-0">
              <p>{{notas.texto}}</p>
              <footer class="blockquote-footer">
                <small class="text-muted">
                  {{notas.user.nombre}} {{notas.user.apellido}}
                  <cite title="Source Title">({{notas.user.cargo}})</cite>
                </small>
              </footer>
            </blockquote>
          </b-card>


    <b-modal id="modal_notas" false size="lg"  title="Notas" hide-footer>
          <ValidationObserver ref="form">
            <b-row> 
                <b-col>
                    <div class="form-group">
                    <label>Texto</label>
                    <ValidationProvider name="texto" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.texto"
                              placeholder=""
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>   
        </ValidationObserver>
        <button v-b-tooltip.hover title="Agregar"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear </button>
        <button v-b-tooltip.hover title="Editar"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>
  </div>
</template>
<script>
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
/**
 * Transactions component
 */
export default {
    components: {
    ValidationProvider,
    ValidationObserver,
    vSelect
  },
  data() {
    return {
      title: "Administracion",
      items: [
        {
          text: "Procesos"
        },
        {
          text: "Formato de solicitud de transferncia",
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
      codigo: "",
      nombre: "",
      precio: "",
      password: "",
      total_abonado: 0,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      consecutivo:"",
      filterOn: [],
      terceros: [],
      entidades: [],
      notas:[],
      imputaciones: [],
      imputacion_id: "",
      users: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["VALOR","ESTADO","LEGALIZACION/ABONOS","actions"],
      formatos: [], 
      cajero: [],
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
          'items':[],
          'id_entidad':'',
          'texto':'',
      },
      abono:{
          'id':'',
          'tecnico_id':'',
      }
    }
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.transactionData.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.transactionData.length;
    this.form.id_cajero = 2;
    this.listar();
  },
  filters: {
        moneda: function (value) {
          const formatterPeso = new Intl.NumberFormat('es-CO', {
             style: 'currency',
             currency: 'COP',
             minimumFractionDigits: 0
           })
           let valueFinal = formatterPeso.format(value);
           return valueFinal
        }
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
                this.$swal({
                  title: 'Desea agregar esta nota?',
                  icon: 'question',
                  iconHtml: '',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  showCloseButton: true
                }).then((result) => {
                  if (result.isConfirmed) {
                     this.agregarNota();
                  }
                })
             
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarFormato();
          } else {
        }});
      }
    },
   async agregarNota(){
     let data = new FormData();
      var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.post('api/notas', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarNotas();
               this.$root.$emit("bv::hide::modal", "modal_notas", "#btnShow");
                this.form.texto="";
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
    async editarFormato(){
     let data = new FormData();
       var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/notas', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarNotas();
               this.$root.$emit("bv::hide::modal", "modal_notas", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
         });
      },
     async eliminarNotas(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/notas/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarNotas();
                }
              }).catch(e => {
  
                this.$swal(e.response.data);
          });
      }, 
      eliminarNota(id){
        this.$swal({
          title: 'Desea borrar esta nota?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarNotas(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
        this.form.consecutivo="ATH-"+this.consecutivo.id;

        this.form.tecnico_id=this.consecutivo.tecnico_id;
        this.form.entidad_id=this.consecutivo.cajero_ath.entidad.id;   
        this.form.coordinador_id=this.consecutivo.coordinador_id;   
      },
      setear(id) {
        for (let index = 0; index < this.notas.length; index++) {
          if (this.notas[index].id===id) {
            this.form.texto=this.notas[index].texto;
            this.form.id=this.notas[index].id;
            this.$root.$emit("bv::show::modal", "modal_notas", "#btnShow");
            return;
          }
        }
      },
    async  listarNotas( ){
      let data = new FormData();
      data.append('entidad_id',this.form.entidad_id);
      data.append('consecutivo',"ATH-"+this.consecutivo.id);
      await  this.axios.post('api/notas/find',data)
        .then((response) => {
          this.notas = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      setEmail(){
        this.form.username=this.form.email;

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
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
      session(){
        if (localStorage.getItem('token')) {
          const token=localStorage.getItem('token');
          this.guardarUsuario(token);
          }else{
          this.$router.push({ name: 'Home' });
          }
        },

      loadConsectivo(){
        if (localStorage.getItem('consecutivo')) {
        this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
          this.form.consecutivo=this.consecutivo.id;
          this.form.tecnico_id=this.consecutivo.tecnico_id;
          this.form.entidad_id=this.consecutivo.cajero_ath.entidad.id;      
          this.listarNotas();
        }

      }
  },
  mounted(){
    this.loadConsectivo();
  }, 
    created(){

        
      },
    computed: {
    rows() {
      return this.notas.length;
    },
  },
};
</script>
