<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;ver=false;resete();url_perfil=null">Crear lider</b-button>
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
                :items="perfil"
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

                <template v-slot:cell(cargo)="data">
                  {{data.item.user.cargo.nombre}}
               </template>

                <template v-slot:cell(actions)="data">
                
                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarperfil(data.item.id,data.item.user_id)"> Eliminar </b-dropdown-item-button>
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


<pre>{{perfil}}</pre>


    <b-modal id="modal" false size="lg"  title="Gestion de lideres de proceso" hide-footer>
          <ValidationObserver ref="form">
            <b-row class="justify-content-center mb-3">
                  <div class="col-sm-6">
                   <div id="preview mb-2" class="row justify-content-center mb-3">
                     <img  width="200px" height="200px" style="float:center!importan; border-radius:100%" class=""  :src="url_perfil" />
                   </div>
                    <b-form-file
                        v-model="foto"
                        placeholder="Seleccione su foto..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangePerfil"
                    ></b-form-file>
               </div>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Nombre y Apellido {{form.nombre_apellido}}</label>
                    <ValidationProvider name="nombre y apellido" rules="required" v-slot="{ errors }">
                            <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Numero de cedula</label>
                    <ValidationProvider name="numero de cedula" rules="required" v-slot="{ errors }">
                        <input v-model="form.cedula"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row> 
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Telefono</label>
                    <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                        <input v-model="form.telefono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Celular personal</label>
                    <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                            <input v-model="form.celular_personal"  type="text" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Celular corporativo</label>
                    <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                        <input v-model="form.celular_corporativo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>     
             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Correo electronico</label>
                    <ValidationProvider name="correo" rules="required" v-slot="{ errors }">
                            <input v-model="form.email"  type="email" class="form-control" placeholder=" " :disabled="ver">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
            </b-row>
             <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Estado</label>
                    <ValidationProvider name="estado" rules="required" v-slot="{ errors }">
                          <select v-model="form.status"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option value="activo">Activo</option>
                              <option value="inactivo">Inactivo</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col v-if="!editMode&& !ver">
                    <div class="form-group">
                    <label>Contraseña</label>
                    <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                          <input v-model="form.password"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col v-if="editMode">
                    <div class="form-group">
                    <label>Contraseña</label>
                          <input v-model="form.password"  type="text" class="form-control" placeholder=" " :disabled="ver">
                    </div>
                </b-col>
            </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>

  </Layout>
</template>

<script>
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
          text: "Lider",
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
      url_perfil:"",
      modal: true,
      foto:null,
      perfil:null,
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
      fields: [
          "nombre",
          "cedula",
          "cargo",
          "telefono",
          "actions"],
      perfil: [], 
      editMode:false,
      form:{
          'id':'',
          'nombre':'',
          'cedula':'',
          'telefono':'',
          'celular_personal':'',
          'celular_corporativo':'',
          'email':'',
          'nombre_usuario':'',
          'status':'',
          
      }
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
              this.agregarperfil();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarperfil();
          } else {
        }});
      }
    },
   async agregarperfil(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       if (this.foto) {
        data.append('filename',this.foto);
       }
       await this.axios.post('api/perfil', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarperfil();
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
    async editarperfil(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
      if (this.foto) {
        data.append('filename',this.foto);
       }
        await this.axios.put('api/perfil', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarperfil();
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
     async eliminarperfils(id,uid){
        let data = new FormData();
        data.append('id',id);
        data.append('user_id',uid);
        await this.axios.post('api/perfil/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarperfil();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarperfil(id,uid){
        this.$swal({
          title: 'Desea borrar este lider?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarperfils(id,uid);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.form.cliente_id=this.cliente.id;
       this.form.tipo="Lider";
      },
      setear(id) {
        for (let index = 0; index < this.perfil.length; index++) {
          if (this.perfil[index].id===id) {
            this.form.id=this.perfil[index].id;
            this.form.nombre=this.perfil[index].nombre;
            this.form.cedula=this.perfil[index].cedula;
            this.form.telefono=this.perfil[index].telefono;
            this.form.celular_personal=this.perfil[index].celular_personal;
            this.form.celular_corporativo=this.perfil[index].celular_corporativo;
            this.form.email=this.perfil[index].email;
            this.form.nombre_usuario=this.perfil[index].nombre_usuario;
            this.form.status=this.perfil[index].user.status;
            this.form.user_id=this.perfil[index].user_id;
            this.url_perfil=this.perfil[index].user.imagen;
            console.log(this.url_perfil);
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
    async listarperfil(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
     data.append('tipo',"Lider");
       await this.axios.post('api/perfil/listar',data)
        .then((response) => {
          this.perfil = response.data.rows;
        })
        .catch((e)=>{
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
      onFileChangePerfil(e) {
      const foto = e.target.files[0];
      this.url_perfil = URL.createObjectURL(foto);
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
    watch: {
      cliente: function () {
       this.listarperfil();
        this.title=this.cliente.nombre_prestador;
      },
    },
    created(){
         this.form.cliente_id=this.cliente.id;
         this.form.tipo="Lider";
        this.listarperfil();
        this.session();
      },
    computed: {
       ...mapState(['usuarioDB','cliente']),
      
    rows() {
      return this.perfil.length;
    },
  },
}
</script>
