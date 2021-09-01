<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Planificar</b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Plan de auditorias</div>
            <h4 class="text-center">TITULO DEL EVENTO</h4>
            <b-alert show variant="light"> <b> Descripción:</b> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</b-alert>
            <div class="row">
              <div class="col-6">
                <b-alert show variant="success text-justify"> <b> Objetivos:</b> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</b-alert>
              </div>
              <div class="col-6">
                <b-alert show variant="info text-justify"> <b> Alcances:</b> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</b-alert>
              </div>
              <div class="col-12">
                <div class="row">
                  <div class="col-3">
                     <b-card no-body>
                       <b-row no-gutters class="align-items-center">
                         <b-col md="2">
                           <b-card-img src="https://picsum.photos/200/300" height="100px" width="100" class="rounded-0"></b-card-img>
                         </b-col>
                         <b-col md="10 py-0">
                           <h6 class="lead text-center my-0">LIDER DE CALIDAD</h6>

                           <b-card-body title="">
                             <b-card-text  class="m-0">Gerente</b-card-text>
                             <b-card-text  class="m-0">Leonardo Rios</b-card-text>
                           </b-card-body>
                         </b-col>
                       </b-row>
                     </b-card>
                  </div>
                  <div class="col-3">
                     <b-card no-body>
                       <b-row no-gutters class="align-items-center">
                         <b-col md="2">
                           <b-card-img src="https://picsum.photos/200/300" height="100px" width="100" class="rounded-0"></b-card-img>
                         </b-col>
                         <b-col md="10 py-0">
                           <h6 class="lead text-center my-0">RESPONSABLE DE SEGUIMIENTO</h6>
                           <b-card-body title="">
                             <b-card-text  class="m-0">Gerente</b-card-text>
                             <b-card-text  class="m-0">Leonardo Rios</b-card-text>
                           </b-card-body>
                         </b-col>
                       </b-row>
                     </b-card>
                  </div>
                  <div class="col-3">
                     <b-card no-body>
                       <b-row no-gutters class="align-items-center">
                         <b-col md="2">
                           <b-card-img src="https://picsum.photos/200/300" height="100px" width="100" class="rounded-0"></b-card-img>
                         </b-col>
                         <b-col md="10 py-0">
                           <h6 class="lead text-center my-0">AUDITOR</h6>
                           <b-card-body title="">
                             <b-card-text  class="m-0">Gerente</b-card-text>
                             <b-card-text  class="m-0">Leonardo Rios</b-card-text>
                           </b-card-body>
                         </b-col>
                       </b-row>
                     </b-card>
                  </div>
                  <div class="col-3">
                     <b-card no-body>
                       <b-row no-gutters class="align-items-center">
                         <b-col md="2">
                           <b-card-img src="https://picsum.photos/200/300" height="100px" width="100" class="rounded-0"></b-card-img>
                         </b-col>
                         <b-col md="10 py-0">
                           <h6 class="lead text-center my-0">AUDITADO</h6>
                           <b-card-body title="">
                             <b-card-text  class="m-0">Gerente</b-card-text>
                             <b-card-text  class="m-0">Leonardo Rios</b-card-text>
                           </b-card-body>
                         </b-col>
                       </b-row>
                     </b-card>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row">
                  <div class="col-12 my-2">
                    <b-card-text>
                      <button class="btn btn-block btn-primary" style="border-radius:0px">OTROS ASISTENTES</button>
                      <ul class="list-unstyled chat-list" style="overflow-y: scroll; height:500px">
                        <li v-for="mejora in filtrados"  :key="mejora.id">
                            <div class="media align-items-center pl-4 my-3">
                              <div class="avatar-xs mr-3">
                                <span
                                  class="avatar-title rounded-circle bg-light text-body">EC</span>
                              </div>
                              <div class="media-body p-0">
                                <h5 class="font-size-14 mb-0"> {{mejora.id}}</h5>
                                <p class="text-mouted m-0">Código {{mejora.codigo}}</p>
                                <b-button class="float-right btn-success btn-sm mr-2" left @click="$bvModal.show('modal_acciones');editMode=false;resete(mejora.id);ver=false;">Evaluar</b-button>
                              </div>
                            </div>
                          <hr class="m-0">
                        </li>
                      </ul>
                    </b-card-text>
                  </div>
                  <div class="col-12 my-2">
                    <b-card-text>
                      <button class="btn btn-block btn-info" style="border-radius:0px">INVITADOS EXTERNOS</button>
                      <ul class="list-unstyled chat-list" style="overflow-y: scroll; height:500px">
                        <li v-for="mejora in filtrados"  :key="mejora.id">
                            <div class="media align-items-center pl-4 my-3">
                              <div class="avatar-xs mr-3">
                                <span
                                  class="avatar-title rounded-circle bg-light text-body">EC</span>
                              </div>
                              <div class="media-body p-0">
                                <h5 class="font-size-14 mb-0"> {{mejora.id}}</h5>
                                <p class="text-mouted m-0">Código {{mejora.codigo}}</p>
                                <b-button class="float-right btn-success btn-sm mr-2" left @click="$bvModal.show('modal_acciones');editMode=false;resete(mejora.id);ver=false;">Evaluar</b-button>
                              </div>
                            </div>
                          <hr class="m-0">
                        </li>
                      </ul>
                    </b-card-text>
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="row">
                    <div class="col-6">
                      <b-alert show variant="light text-justify"> <b> Fundamentos de la auditoria:</b> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</b-alert>
                    </div>
                    <div class="col-6">
                      <b-alert show variant="light text-justify"> <b> Recursos del programa de auditoria:</b> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</b-alert>
                    </div>
                    <div class="col-12">
                      <h3 class="text-center  mb-5">PROCESOS RELACIONADOS</h3>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Proceso</th>
                            <th scope="col">Subproceso</th>
                            <th scope="col">action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modal" false size="lg"  title="Gestión de actividades" hide-footer>
          <ValidationObserver ref="form">
            <div class="row">
                <div class="col-lg-12">
                      <b-tabs content-class="p-3 text-muted">
                        <b-tab active class="border-0">
                          <template v-slot:title>
                            <span class="d-inline-block d-sm-none">
                              <i class="fas fa-home"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">INFORMACION GENERAL</span>
                          </template>
                            <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Nombre</label>
                                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row>
                              <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Descripción</label>
                                  <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                        <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row> 
                              <div class="row">
                                <div class="col-md-12">
                                    <h5 class="font-size-14 mb-4">Clasificacion de actividades</h5>
                                    <div class="row">
                                        <div class="col-3" v-for="(clasificacion, index) in clasificacion" :key="index">
                                            
                                            <div class="form-check mb-3">
                                                <input
                                                v-model="form.clasificacion_id"
                                                class="form-check-input"
                                                type="radio"
                                                name="exampleRadios"
                                                :id="'exampleRadios1'+index"
                                                :value="clasificacion.id"
                                                checked
                                                />
                                                <label class="form-check-label " for="exampleRadios1" :style="'color:'+clasificacion.color">{{clasificacion.nombre}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <b-row> 
                                <b-col>
                                  <div class="form-group">
                                    <label >Fecha de programacion </label>
                                    <ValidationProvider name="fecha llamada" rules="required" v-slot="{ errors }">
                                      <b-form-input id="date-time" v-model="form.fecha_programada"  type="datetime-local"></b-form-input>
                                      <span style="color:red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                </b-col>
                                <b-col>
                                <ValidationProvider name="lider" rules="required" v-slot="{ errors }">
                                  <label>Periodo</label>
                                    <select class="custom-select" id="date-time" v-model="form.periodo_id">
                                        <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{periodo.nombre}}</option>
                                      </select>
                                    <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                              </b-col>
                            </b-row>  
                            <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Lugar</label>
                                  <ValidationProvider name="lugar" rules="required" v-slot="{ errors }">
                                        <input v-model="form.lugar"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                            </b-row> 
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="far fa-user"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">RESPONSABLES</span>
                          </template>
                           <b-row>
                              <div class="col-10">
                                <div class="form-group">
                                  <label>Cargo</label>
                                      <v-select  v-model="cargo"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                               <div class="col-2">
                                  <button class="btn btn-success my-4" @click="vincularResponsable()" :disabled="!form.cargo_id">Vincular</button>
                               </div>
                            </b-row>
                            <div class="row" v-if="editMode">
                              <div class="col-lg-6" v-for="responsable in responsables" :key="responsable.id">
                                <b-card no-body>
                                  <b-row no-gutters class="align-items-center">
                                    <b-col md="4">
                                      <b-card-img :src="require('@/assets/images/small/img-2.jpg')" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="8">
                                      <b-card-body :title="responsable.cargo.nombre">
                                        <b-card-text>{{responsable.cargo.user.nombre}}</b-card-text>
                                         <button class="btn btn-danger" @click="desvincularResponsable(responsable.id)">Desvincular</button>
                                      </b-card-body>
                                    </b-col>
                                  </b-row>
                                </b-card>
                              </div>
                            </div>
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="far fa-user"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">COMPROMETIDOS</span>
                          </template>
                           <b-row>
                              <div class="col-10">
                                <div class="form-group">
                                  <label>Cargo</label>
                                      <v-select  v-model="cargo"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                               <div class="col-2">
                                  <button class="btn btn-success my-4" @click="vincularComprometido()" :disabled="!form.cargo_id">Vincular</button>
                               </div>
                            </b-row>
                            <div class="row" v-if="editMode">
                              <div class="col-lg-6" v-for="responsable in comprometidos" :key="responsable.id">
                                <b-card no-body>
                                  <b-row no-gutters class="align-items-center">
                                    <b-col md="4">
                                      <b-card-img :src="require('@/assets/images/small/img-2.jpg')" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="8">
                                      <b-card-body :title="responsable.cargo.nombre">
                                        <b-card-text>{{responsable.cargo.user.nombre}}</b-card-text>
                                         <button class="btn btn-danger" @click="desvincularComprometido(responsable.id)">Desvincular</button>
                                      </b-card-body>
                                    </b-col>
                                  </b-row>
                                </b-card>
                              </div>
                            </div>
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="fas fa-cog"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">INVITADOS EXTERNOS</span>
                          </template>
                           <h5>Invitados</h5>
                            <b-row v-if="editMode">
                                <div class="col-11">
                                    <div class=" row">
                                        <div class="form-group col-3">
                                            <label>Nombre </label>
                                                <input v-model="nombre"  type="text" class="form-control" placeholder=" ">
                                        </div>
                                        <div class="form-group col-3">
                                    <label>Cargo</label>
                                        <input v-model="cargo"  type="text" class="form-control" placeholder=" ">
                                    </div>
                                        <div class="form-group col-3">
                                            <label>Email </label>
                                                <input v-model="email"  type="text" class="form-control" placeholder=" ">
                                        </div>
                                        <div class="form-group col-3">
                                    <label>Telefono </label>
                                        <input v-model="telefono"  type="text" class="form-control" placeholder=" ">
                                    </div>
                                    </div>
                                </div >
                                <div class="col-1 my-2">
                                  <label></label>
                                  <button class="btn btn-success btn-block mb-2" @click="cargarInvitados()" >+</button>
                                </div >
                              </b-row>    
                              <table class="table" v-if="editMode">
                                <thead>
                                  <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Eliminar</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(invitado,index) in form.invitados_externos" :key="index">
                                    <th scope="row">{{invitado.nombre}}</th>
                                    <td>{{invitado.cargo}}</td>
                                    <td>{{invitado.telefono}}</td>
                                    <td>{{invitado.email}}</td>
                                    <td><button class="btn btn-danger" @click="eliminarInvitados(index)">Eliminar</button></td>
                                  </tr>
                                </tbody>
                              </table>
                        </b-tab>
                      </b-tabs>
                </div>
        
              </div>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>

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
import moment from 'moment';

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
          text: "Auditorias interanas"
        },
        {
          text: "Planeamiento",
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
      fields: ["nombre","lugar","fecha_programada","status","actions"],
      clasificacion: [], 
      eventos: [],
      cargos: [],
      cargo:'',
      editMode:false,
      form:{
        'id':'',
        'nombre':'',
        'descripcion':'',
        'observaciones':'',
        'lugar':'',
        'invitados_externos':[],
        'periodo_id':'',
        'status':'',
        'fecha_programada':'',
        'fecha_ejecucion':'',
        'cliente_id':'',
        'clasificacion_id':'',
      },
      buscador:{
        'clasificacion_id':'',
        'desde':'',
        'hasta':'',
        'status':'',
        'periodo':'',
      },
      comprometidos:[],
      responsables:[],
      periodos:[],
      nombre:'',
      cargo:'',
      telefono:'',
      email:'',
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
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarEvento();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarEvento();
          } else {
        }});
      }
    },
   buscarAgregados(){
     for (let index = 0; index < this.comprometidos.length; index++) {
      if (this.comprometidos[index].cargo.id===this.cargo) {
           this.$swal('Ya este cargo ha sido vinculado!','','warning');
           this.cargo="";
           return;
      } 
     }
     for (let index = 0; index < this.responsables.length; index++) {
      if (this.responsables[index].cargo.id===this.cargo) {
           this.$swal('Ya este cargo ha sido vinculado!','','warning');
           this.cargo="";
           return;
      } 
     }
   },
    async buscarEvento(){
        let data = new FormData();
        data.append('id',this.$route.params.id);
        await this.axios.post('api/eventos/find',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                    this.form.id=response.data.id;
                    this.form.nombre=response.data.nombre;
                    this.form.descripcion=response.data.descripcion;
                    this.form.observaciones=response.data.observaciones;
                    this.form.lugar=response.data.lugar;
                    this.form.invitados_externos=JSON.parse(response.data.invitados_externos);
                    this.form.periodo_id=response.data.periodo_id;
                    this.form.status=response.data.status;
                    this.form.fecha_programada=moment(response.data.fecha_programada).format("YYYY-MM-DDTHH:MM");
                    this.form.fecha_ejecucion=response.data.fecha_ejecucion;
                    this.form.cliente_id=response.data.cliente_id;
                    this.form.clasificacion_id=response.data.clasificacion_id;
                    this.responsables=response.data.responsables;
                    this.comprometidos=response.data.comprometidos;
                    this.$root.$emit("bv::show::modal", "modal", "#btnShow");
                    }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
          if (!this.form[key]==="invitados_externos") {
              this.form[key]="";
          }  
       }
       this.form.cliente_id=this.cliente.id;
      },

    async listarCargos(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/cargos/listar',data)
          .then((response) => {
            this.cargos = response.data;
            this.listarperfil();
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },


    cargarInvitados(){
      this.form.invitados_externos.push({
       nombre:this.nombre,
       telefono:this.telefono,
       cargo:this.cargo,
       email:this.email,
      });
    },
    eliminarInvitados(index){
       this.form.invitados_externos.splice(index, 1);  
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
        this.listarCargos();
        this.buscarEvento();
     
      },
   watch: {
      cliente: function () {
        this.listarCargos();
        this.buscarEvento();
       this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.cliente_id;
     
      },
      cargo:function(){
        this.buscarAgregados();
        this.form.cargo_id=this.cargo;
      }
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.eventos.length;
    },
  },
}
</script>
