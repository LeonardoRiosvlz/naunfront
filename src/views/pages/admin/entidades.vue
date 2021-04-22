<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear Entidad</b-button>
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
                :items="entidades"
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
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"><b-icon icon="pencil" class=""></b-icon> Editar </b-dropdown-item-button>
                        <b-dropdown-item-button @click="eliminarEntidad(data.item.id)"><b-icon icon="trash" class=""></b-icon> Eliminar </b-dropdown-item-button>
                        <b-dropdown-item-button @click="setPermisos(data.item.id)"><b-icon icon="arrow-left-right" class=""></b-icon> Permisos </b-dropdown-item-button>
                        <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"><b-icon icon="eye" class=""></b-icon> Ver </b-dropdown-item-button>
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
    <b-modal id="permisos" false size="lg"   title="Permisos a Coordinadores" hide-footer>
        <b-row class="mb-3">
          <b-col md="3">
            <b-form-input v-model="filter_user" type="search" id="filterInput" placeholder="Buscar"></b-form-input>
          </b-col>
        </b-row>
      <h4>Coodinadores</h4>
      <b-table 
        id="my-table"
        :items="users"
        :per-page="porPagina"
        :current-page="pagina"
        small
        :filter="filter_user"
        :fields="fields_user"
      class="table" >
        <template v-slot:cell(actions)="data">
          <button class="btn btn-success" @click="asignarPermiso(data.item.id)"> Asignar</button>
        </template>
      </b-table>
      <hr>
      <h4>Permisos Otorgados</h4>
      <b-table striped hover :items="permisos" :fields="fields_permisos">
          <template v-slot:cell(nombre)="data">
            {{data.item.user.nombre}} {{data.item.user.apellido}}
          </template>
          <template v-slot:cell(Email)="data">
            {{data.item.user.email}}
          </template>
          <template v-slot:cell(Entidad)="data">
            {{data.item.entidad.empresa}}
          </template>
          <template v-slot:cell(actions)="data">
            <button class="btn btn-danger" @click="eliminarPermiso(data.item.id)"> Eliminar</button>
          </template>
      </b-table>
    </b-modal>

    <b-modal id="modal" false size="lg"  title="Gestión de entidades" hide-footer>
          <ValidationObserver ref="form">

            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Nombre  </label>
                  <ValidationProvider name="cargo" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
                <b-col>
                <div class="form-group">
                  <label>Apellido  </label>
                  <ValidationProvider name="cargo" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.apellido"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Email</label>
                    <ValidationProvider name="descripcion" rules="required|email" v-slot="{ errors }">
                            <input v-model="form.email"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Teléfono</label>
                    <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                            <input v-model="form.telefono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row> 
              <hr>
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Empresa </label>
                    <ValidationProvider name="empresa" rules="required" v-slot="{ errors }">
                            <input v-model="form.empresa"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Página Web</label>
                    <ValidationProvider name="pagina" rules="required" v-slot="{ errors }">
                            <input v-model="form.pagina"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>   
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Nit </label>
                    <ValidationProvider name="nit" rules="required" v-slot="{ errors }">
                            <input v-model="form.nit"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Teléfono empresa </label>
                    <ValidationProvider name="telefono_empresa" rules="required" v-slot="{ errors }">
                            <input v-model="form.telefono_empresa"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>   
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Dirección </label>
                    <ValidationProvider name="direccion" rules="required" v-slot="{ errors }">
                            <input v-model="form.direccion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>  
              <b-row>
                <b-col>
                 <div class="form-group">
                    <label>Categorias </label>
                        <b-form-checkbox-group
                        v-model="form.categorias"
                        :options="categorias"
                        class="mb-3"
                        value-field="categoria"
                        text-field="categoria"
                        disabled-field="notEnabled"
                        ></b-form-checkbox-group>
                 </div>
                </b-col>
              </b-row> 
              <hr>
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Valor de contrato </label>
                    <ValidationProvider name="valor_Contrato" rules="required" v-slot="{ errors }">
                            <input v-model="form.valor_contrato"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Require presupuesto</label>
                    <ValidationProvider name="requiere_presupuesto" rules="required" v-slot="{ errors }">
                          <select v-model="form.requiere_presupuesto"  name="requiere_presupuesto" class="form-control form-control-lg" >
                              <option value="Si">Si</option>
                              <option value="No">No</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Presupuesto </label>
                    <ValidationProvider name="presupuesto" rules="required" v-slot="{ errors }">
                            <input v-model="form.presupuesto"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Aviso</label>
                    <ValidationProvider name="aviso" rules="required" v-slot="{ errors }">
                            <input v-model="form.aviso"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row> 
               <b-row>
                <b-col>
                  <label>Logo</label>
                    <div id="preview">
                      <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
                    </div>
                        <b-form-file
                          v-model="file"
                          placeholder="Seleccione su image..."
                          drop-placeholder="Drop file here..."
                          @change="onFileChange"
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
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";


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
          text: "Gestión corporativa"
        },
        {
          text: "Entidades",
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
      categorias: [],
      selected: [
          "Categoria"
      ],
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
      fields: ["nombre","apellido","telefono","email","empresa","actions"],
      entidades: [], 
      users: [],
      fields_user: ["nombre","apellido","email","actions"],
      permisos: [],
      fields_permisos: ["Nombre","Email","Entidad","actions"],
      editMode:false,
      form:{
          'id':'',
          'nombre':'Jose',
          'apellido':'Rios',
          'email':'leo@gmail.com',
          'telefono':'456465',
          'empresa':'COLPATRIA',
          'pagina':' www.colpatria.com',
          'nit':'7897998',
          'categorias':[],
          'telefono_empresa':'12456465',
          'direccion':'direccion calle troncal',
          'valor_contrato':'123456464',
          'requiere_presupuesto':'Si',
          'presupuesto':'1845426',
          'aviso':'aviso'
      }
    }
  },
  computed:{
        ...mapState(['counter'])
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
              this.agregarEntidad();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarentidades();
          } else {
        }});
      }
    },
   async agregarEntidad(){
     let data = new FormData();
      var formulario = this.form;
        for ( var key in formulario) {
            if (key=='categorias') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       if (this.file) {
        data.append('filename',this.file);
       }
       await this.axios.post('api/entidades', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarentidades();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
              this.$swal(e.response.data);
          });
      },
    async editarentidades(){
     let data = new FormData();
       var formulario = this.form;
        for ( var key in formulario) {
            if (key=='categorias') {
                 data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        if (this.file) {
            data.append('filename',this.file);
         }
        await this.axios.put('api/entidades', data).then(response => {
            if (response.status==200) {
                this.$swal(
                    'Editado con exito!',
                    '',
                    'success'
                );
               this.listarentidades();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e.response.data.menssage);
                this.$swal(
                    'Error de peticion!',
                    '',
                    'warning'
                );
            });
     },
     async eliminarentidades(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/entidades/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarentidades();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      async eliminarPermisos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/permisos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarPermisos(this.form.id);
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      async asignarPermisos(id){
        let data = new FormData();
        data.append('eid',this.form.id);
        data.append('uid',id);

        await this.axios.post('api/permisos/',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                      'Asignado con exito!',
                      '',
                      'success'
                );
                this.listarPermisos(this.form.id);
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarEntidad(id){
        this.$swal({
          title: 'Desea borrar esta categoria?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarentidades(id);
          }
        })
      },
      eliminarPermiso(id){
        this.$swal({
          title: 'Desea borrar este permiso?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarPermisos(id);
          }
        })
      },
      asignarPermiso(id){
        for (let index = 0; index < this.permisos.length; index++) {
          if (this.permisos[index].uid===id) {
              this.$swal(
                  'Usuario ya tiene permiso para esta entidad!',
                  '',
                  'success');
                  return;
          }
        }
        this.$swal({
          title: 'Desea asignar el  permiso?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.asignarPermisos(id);
          }
        })
      },
      resete(){
       // var formulario = this.form;
       // for (var key in formulario) {
       //      this.form[key]="";
       //}
      },
      setear(id) {
        for (let index = 0; index < this.entidades.length; index++) {
          if (this.entidades[index].id===id) {
            this.form.id=this.entidades[index].id;
            this.form.nombre=this.entidades[index].nombre;
            this.form.apellido=this.entidades[index].apellido;
            this.form.email=this.entidades[index].email;
            this.form.telefono=this.entidades[index].telefono;
            this.form.empresa=this.entidades[index].empresa;
            this.form.pagina=this.entidades[index].pagina;
            this.form.nit=this.entidades[index].nit;
            this.form.telefono_empresa=this.entidades[index].telefono_empresa;
            this.form.direccion=this.entidades[index].direccion;
            this.form.valor_contrato=this.entidades[index].valor_contrato;
            this.form.requiere_presupuesto=this.entidades[index].requiere_presupuesto;
            this.form.presupuesto=this.entidades[index].presupuesto;
            this.form.aviso=this.entidades[index].aviso;
            this.form.categorias=JSON.parse(this.entidades[index].categorias);
            this.form.categorias=JSON.parse(this.form.categorias);
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      setPermisos(id) {
        for (let index = 0; index < this.entidades.length; index++) {
          if (this.entidades[index].id===id) {
            this.form.id=this.entidades[index].id;
            this.listarPermisos(this.form.id);
            this.$root.$emit("bv::show::modal", "permisos", "#btnShow");
            return;
          }
        }
      },
     async listarPermisos(id){
        let data = new FormData();
        data.append('id',this.form.id);  
         await this.axios.post('api/permisos/get',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.permisos = response.data;
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
            });
     },    
     async listarCategorias(){
      await  this.axios.get('api/categorias')
        .then((response) => {
          this.categorias = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
   async  listarentidades(){
      await  this.axios.get('api/entidades')
        .then((response) => {
          this.entidades = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
   async  listarUsers(){
     await  this.axios.get('user/coordinadores')
        .then((response) => {
          this.users = response.data;
        }).catch((e)=>{
            console.log('error' + e);
        })
      },
      setEmail(){
        this.form.username=this.form.email;
        console.log("holas");
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
        this.listarentidades();
        this.listarCategorias();
        this.listarUsers();
      },
    computed: {
    rows() {
       return this.entidades.length
    },
    rows_user() {
       return this.users.length
    },
  },
}
</script>
