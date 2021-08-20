<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Agregar avance</b-button>
    </div>
    <div class="card p-4 timeline-box card">
        <h4 class="text-danger"> <b>Fecha de cumplimiento </b>: {{accion.fecha_ejecucion | fecha}} 
        <h1><span class="badge badge-danger " v-if="accion.status==='NO INICIADA'">NO INICIADA</span></h1>
        <h1><span class="badge badge-info " v-if="accion.status==='EN DESARROLLLO'" >EN DESARROLLO</span></h1>
        <h4><span class="badge badge-success" v-if="accion.status==='REALIZADA'" >REALIZADA</span></h4>
        <span class="badge badge-dark " >Total avance: {{accion.total}}</span> </h4>
        <p class="lead"> <b> Descripción de la acción </b> : {{accion.descripcion_accion}}</p>
        <p class="lead"> <b>Evidencia solicitada </b>: {{accion.evidencia_solicitada}}</p>
    </div>
      <div class="row justify-content-center" style="height: 35rem;
           overflow: auto;" >
      <div class="col-xl-10 pr-0">
        <div class="timeline pr-0" dir="ltr"    >
          <div class="timeline-item timeline-left">
            <div class="timeline-block">
              <div class="time-show-btn mt-0">
                <a href="#" class="btn btn-danger btn-rounded w-lg">Historial de avances</a>
              </div>
            </div>
          </div>

          <div
            class="timeline-item"
            v-for="(historial, index) in avances"
            :key="index"
            :class="{'timeline-left': index % 2 === 1 && index != 0}"
            >
            <div class="timeline-block">
              <div class="timeline-box card">
                <div class="card-body">
                  <span class="timeline-icon"></span>
                  <div class="timeline-date">
                    <i class="mdi mdi-circle-medium circle-dot"></i>
                   Fecha de avance : {{historial.fecha_verificacion | fecha}}
                  </div>
                    <h1><span class="badge badge-danger " v-if="historial.status==='NO INICIADA'">NO INICIADA</span></h1>
                    <h1><span class="badge badge-info " v-if="historial.status==='EN DESARROLLLO'" >EN DESARROLLO</span></h1>
                    <h1><span class="badge badge-success" v-if="historial.status==='REALIZADA'" >REALIZADA</span></h1>
                    <h1>Puntaje: <span class="badge badge-dark " >{{historial.total}}</span> </h1>
                     <h5 class="mt-3 foont-size-15">{{historial.nombre}}</h5>
                  <div class="text-muted">
                    <p class="mb-0 text-justify">{{historial.observaciones_edicion}}</p>
                  </div>
                    <a href="javascript:void(0);" @click="setear(historial.id);ver=true;" class="text-success" v-b-tooltip.hover title="Ver">
                        <i class="mdi mdi-eye font-size-18"></i>
                    </a>
                    <a href="javascript:void(0);" @click="setear(historial.id);ver=false;editMode=true;" class="text-info" v-b-tooltip.hover title="Editar">
                        <i class="mdi mdi-pencil font-size-18"></i>
                    </a>
                    <a href="javascript:void(0);" @click="eliminarclasificacion(historial.id)" class="text-danger" v-b-tooltip.hover title="Eliminar">
                        <i class="mdi mdi-delete font-size-18"></i>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modal" false size="lg"  title="Gestión de avances" hide-footer>
        <div class="card p-3 text-justify ">
          <h6 class="text-center"> Descripción de la acción </h6>
          <p class="p-2">{{accion.descripcion_accion}}</p>
        </div>
        <div class="card p-3 text-justify ">
          <h6 class="text-center"> Evidencia solicitada </h6>
          <p class="p-2">{{accion.evidencia_solicitada}}</p>
        </div>

        <div class="row m-1">
            <div class="col-6 card">
                <h6 class="lead">Fecha de planeación</h6>
                <h6 class="text-center">{{accion.fecha_programada | fechaonly}}</h6>
            </div>
            <div class="col-6 card">
                <h6 class="lead">Fecha de cumplimiento</h6>
                <h6 class="text-center">{{accion.fecha_ejecucion | fecha}}</h6>
            </div>
        </div>
          <ValidationObserver ref="form">
            <b-row> 
              <b-col>
                <div class="form-group">
                  <label >Fecha de verificación </label>
                  <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                    <b-form-input id="date-time" v-model="form.fecha_verificacion"  type="datetime-local"></b-form-input>
                    <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
            </b-row> 
            <b-row>
                <b-col>
                    <label>Evidencias</label>
                    <b-form-file multiple
                        v-model="gallery_antes"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        ref="inputFile1"
                    ></b-form-file>
                </b-col>
            </b-row>    
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Descripción de la evidencia</label>
                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                        <textarea v-model="form.descripcion_evidencias"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Descripción de avances</label>
                  <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                        <textarea v-model="form.descripcion_avances"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row> 
              <b-row> 
                <b-col>
                    <div class="form-group">
                    <label>Total avance</label>
                    <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                          <select v-model="form.total" @click="setEstado()" name="modo" class="form-control" :disabled="ver" >
                              <option value="0">0</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="30">30</option>
                              <option value="40">40</option>
                              <option value="50">50</option>
                              <option value="60">60</option>
                              <option value="70">70</option>
                              <option value="80">80</option>
                              <option value="90">90</option>
                              <option value="100">100</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                    <h1><span class="badge badge-danger mb-4" style="margin-top:19px" v-if="form.total<1">NO INICIADA</span></h1>
                    <h1><span class="badge badge-info mb-4" style="margin-top:19px" v-if="form.total>0 && form.total<100">EN DESARROLLO</span></h1>
                    <h1><span class="badge badge-success mb-4" style="margin-top:19px" v-if="form.total>99">REALIZADA</span></h1>
                </b-col> 
                <b-col class="">

                </b-col>
              </b-row>   
            
        </ValidationObserver>
   
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>
  
  </Layout>
</template>


<script>
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import moment from 'moment';

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
          text: "Plan de acción"
        },
        {
          text: "avances",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      gallery_antes:null,
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
      accion: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["nombre","descripcion","actions"],
      avances: [], 
      editMode:false,
      form:{
        'id': '',
        'fecha_verificacion':'',
        'descripcion_avances':'',
        'descripcion_evidencias':'',
        'total':'',
        'status':'',
      }
    }
  },

  created(){
    this.listarUsers();
  },
  filters: {
      fecha: function (value) {
       moment.locale('es');
      let fechafina =moment(value).format('MMMM DD YYYY HH:MM')
         return fechafina
      },
      fechaonly: function (value) {
       moment.locale('es');
      let fechafina =moment(value).format('MMMM DD YYYY')
         return fechafina
      }
  },
  methods: {
    setEstado(){
        if (this.form.total<1) {
            this.form.status="NO INICIADA"
        }else if(this.form.total>0 && this.form.total<100){
            this.form.status="EN DESARROLLLO"
        }else{
            this.form.status="REALIZADA"
        }
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
              this.agregarclasificacion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarclasificacion();
          } else {
        }});
      }
    },
   async agregarclasificacion(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       if (this.gallery_antes) {
            for( var i = 0; i < this.gallery_antes.length; i++ ){         
            data.append('gallery',this.gallery_antes[i]);
            } 
        }
        data.append('accion_id',this.$route.params.id);
       await this.axios.post('api/avancesae', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarAvances();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
               this.listarAccion();
              }
            }).catch(e => {
               this.$swal(
                'No se pudo agregar!',
                '',
                'warning');
          });
      },
    async editarclasificacion(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       if (this.gallery_antes) {
            for( var i = 0; i < this.gallery_antes.length; i++ ){         
            data.append('gallery',this.gallery_antes[i]);
            } 
        }
        data.append('accion_id',this.$route.params.id);
        await this.axios.put('api/avancesae', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarAvances();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
               this.listarAccion();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarclasificacions(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/avancesae/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarAvances();
                }
              }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
          });
      }, 
      eliminarclasificacion(id){
        this.$swal({
          title: 'Desea borrar este avance?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarclasificacions(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.form.cliente_id=this.cliente.id;
       this.editMode=false;
       this.ver=false;
      },
      setear(id) {
        for (let index = 0; index < this.avances.length; index++) {
          if (this.avances[index].id===id) {
            this.form.id=this.avances[index].id;
            this.form.fecha_verificacion=moment(this.avances[index].fecha_verificacion).format("YYYY-MM-DDTHH:MM");
            this.form.descripcion_avances=this.avances[index].descripcion_avances;
            this.form.descripcion_evidencias=this.avances[index].descripcion_evidencias;
            this.form.total=this.avances[index].total;
            this.form.status=this.avances[index].status;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      async listarAccion(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/acciones/find', data)
          .then((response) => {
             if (response.status==200) {
               console.log(response.data);
              this.accion=response.data; 
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
    },
    async listarAvances(){
     let data = new FormData();
      data.append('id',this.$route.params.id);
       await this.axios.post('api/avancesae/listar',data)
        .then((response) => {
          this.avances = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
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
        this.listarAccion();
        this.listarAvances();
      },
   watch: {
      cliente: function () {
       this.listarAccion();
       this.listarAvances();
       this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.c
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.avances.length;
    },
  },
}
</script>
