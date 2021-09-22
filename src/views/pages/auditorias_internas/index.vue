<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=true;">Planificar</b-button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Plan de auditorias</div>
            <h4 class="text-center">{{plan.nombre}}</h4>
            <b-alert show variant="light"> <b> Descripción:</b> {{plan.descripcion}}</b-alert>
            <div class="row">
              <div class="col-6">
                <b-alert show variant="success text-justify"> <b> Objetivos:</b> {{form.obejtivos}}</b-alert>
              </div>
              <div class="col-6">
                <b-alert show variant="info text-justify"> <b> Alcances:</b> {{form.alcances}}</b-alert>
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
                        <li v-for="ivitado in asistentes"  :key="ivitado.id">
                            <div class="media align-items-center pl-4 my-3">
                              <div class="avatar-xs mr-3">
                                <span
                                  class="avatar-title rounded-circle bg-light text-body"><b-img src="https://picsum.photos/200" width="50%" rounded="circle" alt="Circle image"></b-img></span>
                              </div>
                              <div class="media-body p-0">
                                <h5 class="font-size-14 mb-0"> {{ivitado.cargo.user.nombre}}</h5>
                                <p class="text-mouted m-0">{{ivitado.cargo.nombre}}</p>
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
                        <li v-for="mejora in form.invitados_externos"  :key="mejora.id">
                            <div class="media align-items-center pl-4 my-3">
                              <div class="avatar-xs mr-3">
                                <span
                                  class="avatar-title rounded-circle bg-light text-body">EC</span>
                              </div>
                              <div class="media-body p-0">
                                <h5 class="font-size-14 mb-0"> {{mejora.nombre}}</h5>
                                <p class="text-mouted m-0">Email: {{mejora.email}}</p>
                                <p class="sm-small m-0">Telefono: {{mejora.telefono}}</p>
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
                      <b-alert show variant="light text-justify"> <b> Fundamentos de la auditoria:</b> {{form.fundamentos}}</b-alert>
                    </div>
                    <div class="col-6">
                      <b-alert show variant="light text-justify"> <b> Recursos del programa de auditoria:</b> {{form.recursos}}</b-alert>
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

    <b-modal id="modal" false size="xl"  title="Gestión de actividades" hide-footer>

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
                            <span class="d-none d-sm-inline-block">INFORMARCION ADICIONAL</span>
                          </template>
                              <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Objetivos</label>
                                  <ValidationProvider name="objetivos" rules="required" v-slot="{ errors }">
                                        <textarea v-model="form.objetivos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row> 
                             <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Alcances</label>
                                  <ValidationProvider name="alcances" rules="required" v-slot="{ errors }">
                                        <textarea v-model="form.alcances"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row> 
                              <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Fundamentos de la auditoria</label>
                                  <ValidationProvider name="fundamentos" rules="required" v-slot="{ errors }">
                                        <textarea v-model="form.fundamentos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                              </b-col>
                              </b-row> 
                              <b-row>
                              <b-col>
                                <div class="form-group">
                                  <label>Recursos del programa de auditoria</label>
                                  <ValidationProvider name="recursos" rules="required" v-slot="{ errors }">
                                        <textarea v-model="form.recursos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
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
                              <div class="col-12">
                                <div class="form-group">
                                  <label>LIDER DE CALIDAD</label>
                                      <v-select  v-model="form.calidad_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                            </b-row>
                            <b-row>
                              <div class="col-12">
                                <div class="form-group">
                                  <label>RESPONSABLE DE SEGUIMIENTO</label>
                                      <v-select  v-model="form.seguimiento_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                            </b-row>
                            <b-row>
                              <div class="col-12">
                                <div class="form-group">
                                  <label>AUDITOR</label>
                                      <v-select  v-model="form.auditor_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                            </b-row>
                            <b-row>
                              <div class="col-12">
                                <div class="form-group">
                                  <label>AUDITADO</label>
                                      <v-select  v-model="form.auditado_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                            </b-row>
                          <pre>{{}}</pre>
                        </b-tab>
                        <b-tab>
                          <template v-slot:title  v-if="editMode">
                            <span class="d-inline-block d-sm-none">
                              <i class="far fa-user"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">ASISTENTES</span>
                          </template>
                           <b-row>
                              <div class="col-10">
                                <div class="form-group">
                                  <label>Cargo</label>
                                      <v-select  v-model="cargo_id"  :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                </div>
                              </div>
                               <div class="col-2">
                                  <button class="btn btn-success my-4" @click="vincularComprometido()" :disabled="!cargo_id">Vincular</button>
                               </div>
                            </b-row>
                            <div class="row" v-if="editMode">
                              <div class="col-lg-4" v-for="responsable in asistentes" :key="responsable.id">
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
      asistentes: [],
      filtrados: [],
      cargo_id:'',
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
        'objetivos':'',
        'fundamentos':'',
        'recursos':'',
        'alcances':'',
        'fecha_programada':'',
        'fecha_ejecucion':'',
        'calidad_id':'',
        'seguimiento_id':'',
        'auditor_id':'',
        'auditado_id':'',
        'cliente_id':'',
        'cargo_id':'',
        'clasificacion_id':'',
      },
      comprometidos:[],
      responsables:[],
      periodos:[],
      plan:[],
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
    async editarEvento(){
     let data = new FormData();
     var formulario = this.form;
        for (var key in formulario) {
          if (key=='invitados_externos') {
              data.append(key,JSON.stringify(formulario[key]));
          } else {
              data.append(key,formulario[key]);
          }
      }
        await this.axios.put('api/planes/auditorias', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.buscarEvento();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              this.resete();
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
    async buscarEvento(){
        let data = new FormData();
        data.append('id',this.$route.params.id);
        await this.axios.post('api/planes/auditorias/find',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                    this.plan=response.data;
                    this.form.id=response.data.id;
                    this.form.nombre=response.data.evento.nombre;
                    this.form.descripcion=response.data.evento.descripcion;
                    this.form.observaciones=response.data.evento.observaciones;
                    this.form.lugar=response.data.evento.lugar;
                    if (!response.data.invitados_externos) {
                      this.form.invitados_externos=[];
                    }else{
                      this.form.invitados_externos=JSON.parse(response.data.invitados_externos);
                    }                   
                    this.form.periodo_id=response.data.evento.periodo_id;
                    this.form.status=response.data.evento.status;
                    this.form.fecha_programada=moment(response.data.evento.fecha_programada).format("YYYY-MM-DDTHH:MM");
                    this.form.fecha_ejecucion=response.data.evento.fecha_ejecucion;
                    this.form.cliente_id=response.data.evento.cliente_id;
                    this.form.clasificacion_id=response.data.evento.clasificacion_id;
                    this.asistentes=response.data.otrosasistenes;
                    this.$root.$emit("bv::show::modal", "modal", "#btnShow");
                    this.editMode=true;
                    }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },

      async listarperiodos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/periodo/listar',data)
            .then((response) => {
            this.periodos = response.data;
            })
            .catch((e)=>{
            console.log('error' + e);
            })
        },
    async listarCargos(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/cargos/listar',data)
          .then((response) => {
            this.cargos = response.data;
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },

      vincularComprometido(){
        this.$swal({
          title: 'Desea vincularlo a esta activida?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.vincularComprometidos();
          }
        })
      },
      async vincularComprometidos(){
        let data = new FormData();
        data.append('cargo_id',this.cargo_id);
        data.append('evento_id',this.form.id);

        await this.axios.post('api/planes/auditorias/asistentes',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Vinculado con exito!',
                      '',
                      'success'
                );
                this.buscarEvento(this.form.id);
                }
              }).catch(e => {
                this.$swal(
                      'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
      },  
      async desvincularComprometido(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/planes/auditorias/asistentes/eliminar',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Desvinculado con exito!',
                      '',
                      'success'
                );
                this.buscarEvento(this.form.id);
                }
              }).catch(e => {
                this.$swal(
                      'Ocurrio un problema!',
                      '',
                      'danger'
                );
          });
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
        this.listarperiodos();
      },
   watch: {
      cliente: function () {
        this.listarCargos();
        this.buscarEvento();
         this.buscarEvento();
        this.listarperiodos();
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
