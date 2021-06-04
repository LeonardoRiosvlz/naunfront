<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;resete();">Crear subprocesos</b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="subprocesos"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >

                  <template v-slot:cell(proceso)="data">
                     {{data.item.proceso.nombre}}
                  </template>

                <template v-slot:cell(actions)="data">
                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarProceso(data.item.id)"> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"> Ver </b-dropdown-item-button>
                </b-dropdown>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <b-modal id="modal" false size="lg"  title="Gestión de subprocesos" hide-footer>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Proceso</label>
                  <ValidationProvider name="proceso" rules="required" v-slot="{ errors }">
                    <select v-model="form.proceso_id"  name="proceso_id" class="form-control form-control-lg" :disabled="ver">
                        <option :value="proceso.id" v-for="(proceso,index) in procesos" :key="index">{{proceso.nombre}}</option>
                    </select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
                </div>
              </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Nombre subproceso</label>
                    <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                          <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row >
                 <b-col>
                  <div class="form-group">
                    <label>Objetivo del subproceso</label>
                    <ValidationProvider name="objeto" rules="required" v-slot="{ errors }">
                        <textarea v-model="form.objetivos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-col>
                  <div class="form-group">
                    <label>Alcance</label>
                    <ValidationProvider name="alcance" rules="required" v-slot="{ errors }">
                          <input v-model="form.alcance"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              <b-col>
                <ValidationProvider name="lider" rules="required" v-slot="{ errors }">
                  <label>Lider de proceso</label>
                    <v-select v-model="form.lider_id" :options="usuarios" :disabled="ver" :reduce="usuarios => usuarios.user.id"  :getOptionLabel="option => option.nombre+' '+option.user.status" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
              </b-row>    
              <b-row>
            </b-row> 
            <b-row>
           <b-col>
              <div class="form-group">
              <label>Versión</label>
                <ValidationProvider name="version" rules="required" v-slot="{ errors }">
                  <input v-model="form.version"  type="text" class="form-control" placeholder=" " :disabled="ver">
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </b-col>
              <b-col>
                <div class="form-group">
                  <label>Codigo</label>
                  <ValidationProvider name="codigo" rules="required" v-slot="{ errors }">
                        <input v-model="form.codigo_prefijo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
            </b-row> 

              <b-row>
                <div class="col-12">
                  <b-button class="btn btn-info btn-block" id="show-btn" @click="$bvModal.show('actividades')">Actividades del subproceso</b-button>
                </div>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <ul class="pl-4">
                    <li class="mt-2" v-for="(acvidades, index) in form.actividades" :key="index" style="list-style:none">{{acvidades.titulo}}</li>
                  </ul>
                </b-col>
              </b-row>
              <b-row>
                 <div class="col-12">
                      <b-button class="btn btn-primary btn-block" id="show-btn" @click="$bvModal.show('recursos')">Recursos del subproceso</b-button>
                  </div>
              </b-row>
                <b-row class="mt-3">
                <b-col>
                  <ul class="pl-4">
                      <li class="mt-2" v-for="(recursos, index) in form.recursos" :key="index" style="list-style:none">{{recursos.titulo}}</li>
                    </ul>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>
      <b-modal id="actividades" centered  false size="lg"  title="Actividades del proceso" hide-footer>
            <b-card class="shadow-lg">
                <div v-for="(acvidades, index) in form.actividades" :key="index" class="card p-3">
                  <div class="row m-0 justify-content-end">
                    <button class="btn" @click="acvidades.show = false"   v-if="acvidades.show"><b-card-sub-title >Ocultar</b-card-sub-title></button>
                    <button class="btn" @click="acvidades.show = true"  v-else><b-card-sub-title >Ver</b-card-sub-title></button>
                    <button class="btn"><b-card-sub-title >Eliminar</b-card-sub-title></button>
                  </div>
                  <b-form-checkbox v-model="acvidades.show"  switch class="mb-1 col-12" v-if="acvidades.show">
                      <div class="col-12">
                    <b-row class="pt-3">
                      <b-col>
                          <div class="form-group">
                          <label>Titulo</label>
                            <div class="row m-0">
                                <input :id="index+'titulo'"  v-model="acvidades.titulo"  type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"/>
                            </div>
                          </div>
                        </b-col>
                        <b-col>
                          <div class="form-group">
                          <label>Subtitulo</label>
                            <div class="row m-0">
                                <input :id="index+'subtitulo'"  v-model="acvidades.subtitulo"   type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"/>
                            </div>
                          </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                          <div class="form-group">
                          <label>Descripción</label>
                            <div class="row m-0">
                                <textarea :id="index+'descripcion'"  v-model="acvidades.descripcion"  type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"></textarea>
                            </div>
                          </div>
                        </b-col>
                    </b-row>
                  </div>
                  </b-form-checkbox>
                  <b-form-checkbox v-model="acvidades.show"  switch class="mb-1" v-else>
                    <h4 >{{acvidades.titulo}}</h4>
                  </b-form-checkbox>
                </div>
                 <b-row class="justify-content-end mr-3">
                  <b-col>
                    <button style="float:right" v-b-tooltip.hover title="Agregar un item a la lista" class="btn btn-success my-4 btn-sm btn-block" type="button" @click="cargar()"  name="button" v-if="!ver" >Agregar Item</button>
                  </b-col>
                </b-row>
              </b-card> 
          </b-modal>
          <b-modal id="recursos" centered  false size="lg"  title="Recursos del proceso" hide-footer>
            <b-card class="shadow-lg">
                <div v-for="(recursos, index) in form.recursos" :key="index" class="card p-3">
                  <div class="row m-0 justify-content-end">
                    <button class="btn" @click="recursos.show = false"   v-if="recursos.show"><b-card-sub-title >Ocultar</b-card-sub-title></button>
                    <button class="btn" @click="recursos.show = true"  v-else><b-card-sub-title >Ver</b-card-sub-title></button>
                    <button class="btn"><b-card-sub-title >Eliminar</b-card-sub-title></button>
                  </div>
                  <b-form-checkbox v-model="recursos.show"  switch class="mb-1 col-12" v-if="recursos.show">
                      <div class="col-12">
                    <b-row class="pt-3">
                      <b-col>
                        <div class="form-group">
                        <label>Titulo</label>
                          <div class="row m-0">
                              <input :id="index+'titulo'"  v-model="recursos.titulo"  type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"/>
                          </div>
                        </div>
                      </b-col>
                      <b-col>
                          <div class="form-group">
                          <label>Subtitulo</label>
                            <div class="row m-0">
                                <input :id="index+'subtitulo'"  v-model="recursos.subtitulo"   type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"/>
                            </div>
                          </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                          <div class="form-group">
                          <label>Descripción</label>
                            <div class="row m-0">
                                <textarea :id="index+'descripcion'"  v-model="recursos.descripcion"  type="text" class="form-control  mr-3" placeholder=" " :disabled="ver"></textarea>
                            </div>
                          </div>
                        </b-col>
                    </b-row>
                  </div>
                  </b-form-checkbox>
                  <b-form-checkbox v-model="recursos.show"  switch class="mb-1" v-else>
                    <h4 >{{recursos.titulo}}</h4>
                  </b-form-checkbox>
                </div>
                 <b-row class="justify-content-end mr-3">
                  <b-col>
                    <button style="float:right" v-b-tooltip.hover title="Agregar un item a la lista" class="btn btn-success my-4 btn-sm btn-block" type="button" @click="cargarRecursos()"  name="button" v-if="!ver" >Agregar Item</button>
                  </b-col>
                </b-row>
              </b-card> 
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
          text: "Gestión de clientes"
        },
        {
          text: "subprocesos",
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
      fields: ["nombre","proceso","objetivos","actions"],
      procesos: [], 
      subprocesos:[],
      editMode:false,
      usuarios:[],
      tipos:[],
      show:true,
    form:{
      'id': 6,
      'proceso_id':'',
      'version': '',
      'nombre': null,
      'objetivos': '',
      'lider_id': '',
      'tiene_sp': '',
      'alcance':'',
      'actividades':[],
      'recursos':[]
      }
  }
},
  methods: {
    cargar(index){
      this.form.actividades.push({
        titulo:"",
        subtitulo:"",
        descripcion:"",
        show:true,
      });
      },
      eliminarItem(index){
        this.form.actividades.splice(index, 1);  
      },
      cargarRecursos(index){
        this.form.recursos.push({
          titulo:"",
          subtitulo:"",
          descripcion:"",
          show:true,
        });
      },
   async listarperfil(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/perfil/lista',data)
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async listartipos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/tipo_procesos/listar',data)
            .then((response) => {
              this.tipos = response.data.rows;
            })
            .catch((e)=>{
              console.log('error' + e);
            })
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
              this.agregarSubproceso();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarSubproceso();
          } else {
        }});
      }
    },
   async editarSubproceso(){
        let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/subprocesos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
              console.log(response)
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarSubproceso();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
  async agregarSubproceso(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.post('api/subprocesos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
             console.log(response)
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarSubproceso();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario   
               this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
     async eliminarProcesos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/subprocesos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarSubproceso();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarProceso(id){
        this.$swal({
          title: 'Desea borrar este cargo?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarProcesos(id);
          }
        })
      },
        resete(){
        var formulario = this.form;

        for (var key in formulario) {
            if (key=='actividades'||key=='recursos') {
                 this.form[key]=[];
            }else{
                this.form[key]="";
            }
        }
       this.form.actividades = [],
       
       this.form.cliente_id=this.cliente.id;
      },
      setear(id) {
        for (let index = 0; index < this.subprocesos.length; index++) {
          if (this.subprocesos[index].id===id) {
              this.form.id = this.subprocesos[index].id;
              this.form.tipo_id = this.subprocesos[index].tipo_id;
              this.form.version = this.subprocesos[index].version;
              this.form.nombre = this.subprocesos[index].nombre;
              this.form.objetivos = this.subprocesos[index].objetivos;
              this.form.lider_id = this.subprocesos[index].lider_id;
              this.form.proceso_id = this.subprocesos[index].proceso_id;
              this.form.alcance = this.subprocesos[index].alcance;
              this.form.actividades = JSON.parse( this.subprocesos[index].actividades);
              this.form.recursos = JSON.parse( this.subprocesos[index].recursos);
              this.form.codigo_prefijo = this.subprocesos[index].codigo_prefijo;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async  listarSubproceso(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/subprocesos/listar',data)
          .then((response) => {
            this.subprocesos = response.data.rows;
            console.log(response.data)
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      setEmail(){
        this.form.username=this.form.email;
        console.log("holas");
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
      session(){
        if (localStorage.getItem('token')) {
          const token=localStorage.getItem('token');
          this.guardarUsuario(token);
          }else{
          this.$router.push({ name: 'Home' });
          }
        },
      async  listarProceso(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/procesos/listar',data)
          .then((response) => {
            this.procesos = response.data.rows;
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
  },
    watch: {
      cliente: function () {
       this.listarperfil();
       this.listartipos();
        this.listarProceso();
        this.listarSubproceso()
        this.title=this.cliente.nombre_prestador;
      },
    },
    created(){
        this.session();
      },
     mounted() {

    },
    computed: {
     ...mapState(['usuarioDB','cliente']),

    rows() {
      return this.subprocesos.length;
    },
  },
}
</script>
