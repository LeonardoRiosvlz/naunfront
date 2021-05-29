
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear Usuario</b-button>
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
                :items="users"
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
              
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                  <b-dropdown-item-button@click="editMode=true;setear(data.item.id)">Editar</b-dropdown-item-button>
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




        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de usuarios" ok-only>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Nombre </label>
                  <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label>Apellido</label>
                  <ValidationProvider name="apellido" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.apellido"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Email</label>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                          <input v-model="form.email" @keyup="setEmail()" type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
        
                <b-col>
                  <div class="form-group">
                    <label>Telefono</label>
                    <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                          <input v-model="form.telefono"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
             <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Tipo</label>
                    <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo" @change="setRoles()" name="tipo" class="form-control form-control-lg" >
                              <option value="Administrador">Administrador</option>
                              <option value="Coordinador">Coordinador</option>
                              <option value="Tecnico">T&eacute;cnico</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                          
                    </ValidationProvider>
                  </div>
                </b-col>
        
                <b-col>
                  <div class="form-group">
                    <label>Sexo</label>
                    <ValidationProvider name="sexo" rules="required" v-slot="{ errors }">
                          <select v-model="form.sexo"  name="tipo" class="form-control form-control-lg" >
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Dirección</label>
                    <ValidationProvider name="direccion" rules="required" v-slot="{ errors }">
                        <b-form-textarea
                            id="textarea"
                            v-model="form.direccion"
                            placeholder=""
                            rows="3"
                            max-rows="6">
                        </b-form-textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>  
            </b-row>
            <hr>
             <b-row v-if="form.tipo==='Tecnico'||form.tipo==='Coordinador'">
                <b-col>
                  <div class="form-group">
                    <label>Entidad</label>
                    <ValidationProvider name="entidad" rules="required" v-slot="{ errors }">
                          <select v-model="form.entidad"  name="tipo" class="form-control form-control-lg" >
                              <option value="Si">Si</option>
                              <option value="No">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                          
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col v-if="form.tipo==='Tecnico'||form.tipo==='Coordinador'">
                  <div class="form-group">
                    <label>Cargo</label>
                    <ValidationProvider name="cargo" rules="required" v-slot="{ errors }">
                          <select v-model="form.cargo"  name="tipo" class="form-control form-control-lg" >
                              <option value="Coordinador">Coordinador</option>
                              <option value="Tecnico">Tecnico</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
              <b-row >
                <b-col>
                  <div class="form-group">
                    <label>Estatus</label>
                    <ValidationProvider name="status" rules="required" v-slot="{ errors }">
                          <select v-model="form.status"  name="tipo" class="form-control form-control-lg" >
                              <option value="activo">Activo</option>
                              <option value="inactivo">Inactivo</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col v-if="form.tipo==='Tecnico'">
                  <div class="form-group">
                    <label>Tipo Tecnico</label>
                    <ValidationProvider name="tipo_tecnico" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_tecnico"  name="tipo" class="form-control form-control-lg" >
                              <option value="Nomina">Nomina</option>
                              <option value="Contratista">Contratista</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            <b-row v-if="form.tipo==='Tecnico'&& form.tipo_tecnico==='Contratista'">
                <b-col>
                  <div class="form-group">
                    <label>Nombre Cuenta</label>
                    <ValidationProvider name="nonmbre cuenta" rules="required" v-slot="{ errors }">
                          <input v-model="form.nombre_cuenta"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Tipo De Cuenta</label>
                    <ValidationProvider name="tipo de cuenta" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo_cuenta"  name="tipo de cuenta" class="form-control form-control-lg" >
                              <option value="Ahorro">Ahorro</option>
                              <option value="Corriente">Corriente</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>  
            <b-row v-if="form.tipo==='Tecnico'&& form.tipo_tecnico==='Contratista'">
                <b-col>
                  <div class="form-group">
                    <label>Cuenta</label>
                    <ValidationProvider name="cuenta" rules="required" v-slot="{ errors }">
                          <input v-model="form.cuenta"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>  
            <b-row v-if="form.tipo==='Tecnico'">
                <b-col>
                  <div class="form-group">
                    <label>Codigo</label>
                    <ValidationProvider name="codigo" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Regional</label>
                    <ValidationProvider name="regional" rules="required" v-slot="{ errors }">
                          <select v-model="form.regional"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option></option>
                              <option :value="regionales.id" v-for="regionales in regionales" :key="regionales.id">{{regionales.nombre}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>  
            <b-row v-if="!editMode">
                <b-col>
                  <div class="form-group">
                    <label>Contraseña</label>
                    <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                          <input v-model="form.password"  type="password" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                 <b-col>
                  <div class="form-group">
                    <label>Confirmar contraseña</label>
                    <ValidationProvider name="repass" rules="required|confirmed:password" v-slot="{ errors }">
                          <input v-model="form.repass"  type="password" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row> 
            <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Area dependiente {{form.dependencia}}</label>
                    <v-select v-model="form.dependencia" :options="users" :reduce="users => users.id"  :getOptionLabel="option => option.nombre+' '+option.apellido" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row class="mb-2">
               <b-col>
                   <label>Imagen</label>
                   <div id="preview mb-2">
                     <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
                   </div>
                    <b-form-file
                        v-model="file"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChange"
                    ></b-form-file>
               </b-col>
                <b-col>
                    <label>Firma</label>
                   <div id="preview mb-2">
                     <img v-if="firma" width="100%" style="float:center!importan" class="rounded"  :src="url_firma" />
                   </div>
                    <b-form-file
                        v-model="firma"
                        placeholder="Seleccione su firma..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangeFirma"
                    ></b-form-file>
               </b-col>
            </b-row>     
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
          text: "Gestión corporativa"
        },
        {
          text: "Usuarios",
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
      fields: ["nombre","apellido", "email", "cargo", "actions"],
      users: [], 
      areas: [],
      cargos: [],
      regionales: [],
      regional: [],
      editMode:false,
      form:{
          'id':'',
          'area_id':'',
          'nombre':'leowradosasdadas',
          'username':'era2718asasdasd',
          'apellido':'Rios',
          'email':'lonwer@isdaasda.com',
          'telefono':'787979',
          'tipo':'Administrador',
          'sexo':'Masculino',
          'entidad':'No',
          'cargo':'Coordinador',
          'codigo':'7894',
          'foto':'imge',
          'password':'Alfayomega',
          'repass':'Alfayomega',
          'roles':'3',
          'direccion':'',
          'regional':'',
          'status':'',
          
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarUsers();
  },
  methods: {
     ...mapActions(['guardarUsuario']),
    async submit() {
      console.log("email submitted!");
    },
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarUsuario();
            } else {
            }
          });        
      }else{
        this.$refs.form.validate().then(esValido => {
        if (esValido) {
          this.editarUsuario();
        } else {
          
        }
      });
      }
   },
       onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
   async agregarUsuario(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
        data.append('filename',this.file);
       }
      if (this.firma) {
        data.append('firma',this.firma);
       }
       await  this.axios.post('api/auth/signup', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal('Creado!!!','','success');
               this.listarUsers();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('Nose pudo crear!!!','','warning');
            });
      },
    async editarUsuario(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
       data.append('filename',this.file);
      }
      if (this.firma) {
        data.append('firma',this.firma);
       }
      await  this.axios.post('api/auth/update', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
              }}).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarUsers();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
             
              this.$swal('ocurrio un problema','','warning');
            });
     },
    setear(id) {
      for (let index = 0; index < this.users.length; index++) {
        if (this.users[index].id===id) {
          this.form.id=this.users[index].id;
          this.form.nombre=this.users[index].nombre;
          this.form.username=this.users[index].username;
          this.form.apellido=this.users[index].apellido;
          this.form.email=this.users[index].email;
          this.form.telefono=this.users[index].telefono;
          this.form.tipo=this.users[index].tipo;
          this.form.sexo=this.users[index].sexo;
          this.form.entidad=this.users[index].entidad;
          this.form.cargo=this.users[index].cargo;
          this.form.regional=this.users[index].regional;
          this.form.codigo=this.users[index].codigo;
          this.form.tipo_tecnico=this.users[index].tipo_tecnico;
          this.form.cuenta=this.users[index].cuenta;
          this.form.area_id=this.users[index].area_id;
          this.form.nombre_cuenta=this.users[index].nombre_cuenta;
          this.form.tipo_tecnico=this.users[index].tipo_tecnico;
          this.form.tipo_cuenta=this.users[index].tipo_cuenta;
          this.form.codigo=this.users[index].codigo;
          this.form.status=this.users[index].status;
          this.form.direccion=this.users[index].direccion;
          this.form.dependencia=this.users[index].dependencia;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
        }
      }
    },
  async  listarUsers(){
    await  this.axios.get('user/all')
      .then((response) => {
        this.users = response.data.rows;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    async  listarregional(){
      await  this.axios.get('api/regional')
        .then((response) => {
          this.regionales = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
    },
   async listarCargos(){
      await  this.axios.get('api/cargos')
        .then((response) => {
          this.cargos = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
     },
    setEmail(){
      this.form.username=this.form.email;
    },
    async  listarregional(){
      await  this.axios.get('api/regional')
        .then((response) => {
          this.regionales = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
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
    onFileChangeFirma(e) {
      const firma = e.target.files[0];
      this.url_firma = URL.createObjectURL(firma);
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
      this.listarUsers();
      this.listarCargos();
      this.listarregional();
    },
    computed: {
    rows() {
      return this.users.length;
    },
  },
}
</script>
