<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-3">
        <div class="card p-4">
          <div class=" px-3 row justify-content-center">
            <img src="@/assets/images/perfil.png" width="200px" height="200px" style="border-radius:100%" alt="">
          </div>
                    <b-card
            no-body
            style="max-width: 20rem;"
            :img-src="usuarioDB.imagen"
            img-alt="Image"
            img-top
            class="rounded"
        >
            <b-card-body>
              <b-card-sub-title class="mb-2">{{usuarioDB.nombre}} {{usuarioDB.apellido}}</b-card-sub-title>
            </b-card-body>
            <b-list-group flush>
            <b-list-group-item @click="editar()">Editar Perfil</b-list-group-item>
            <b-list-group-item @click="setPass()">Editar Pass</b-list-group-item>
            </b-list-group>

            <b-card-footer>This is a footer</b-card-footer>
        </b-card>
        </div>
      </div>
      
    <div class="col-md-8">
      <div class="card">
        <div class="p-4 row justify-content-between">
          <div class=" px-3">
            <h3 class="mb-2 nombre">Daniela Rodriguez</h3>
            <p>Gerente de Biocenter</p>
          </div>
          <h5 class="mb-0">{{usuarioDB.rol}}</h5>
        </div>
      </div>
      </div>
    </div>
      
      
    









    <b-modal id="modal" false size="lg"  title="Gestión de usuarios"  hide-footer>
          <ValidationObserver ref="form">
            <b-row>
               <b-col>
                   <div id="preview">
                     <img v-if="url" width="20%" style="float:center!importan" class="rounded"  :src="url" />
                   </div>
                   <b-form-file v-model="file" @change="onFileChange"  class="mt-3" plain></b-form-file>
               </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Nombre {{editMode}}</label>
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
        </ValidationObserver>

      <button class="btn btn-block btn-success" @click="switchLoc()">Editar Perfil</button>

     </b-modal>



    <b-modal id="modalPass" false size="md"  title="Gestión de contraseña"  hide-footer>
          <ValidationObserver ref="formPass">
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Contraseña</label>
                    <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                          <input v-model="form.password"  type="password" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row> 
            <b-row>    
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
        </ValidationObserver>

        <button class="btn btn-block btn-success" @click="switchLocPass()">Editar Contraseña</button>
     </b-modal>
      {{user}}
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
          text: "Perfil"
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
      fields: ["nombre_tercero","descripcion_tercero","actions"],
      user:[],
      terceros: [], 
      editMode:false,
        form:{
            'id':'',
            'nombre':'',
            'username':'',
            'apellido':'',
            'email':'',
            'telefono':'',
            'tipo':'',
            'sexo':'',
            'entidad':'',
            'cargo':'',
            'codigo':'',
            'foto':'',
            'password':'',
            'repass':'',
            'roles':'',
            
        }
    }
  },
  methods: {
  ...mapActions(['guardarUsuario']),
     ...mapActions(['cerrarSession']),
     salir(){
      localStorage.removeItem('token');
      this.$router.push({ name: 'Home' });
      this.cerrarSession();
     },
     session(){
        if (localStorage.getItem('token')) {
          const token=localStorage.getItem('token');
          this.guardarUsuario(token);
          }else{
          this.$router.push({ name: 'Home' });
          }
        },
    async listarUsers(){
     await this.axios.get('user/pefil')
      .then((response) => {
        this.user = response.data;
        console.log(response.data,)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    editar(){
          this.form.nombre=this.user.nombre;
          this.form.apellido=this.user.apellido;
          this.form.email=this.user.email;
          this.form.telefono=this.user.telefono;
          this.form.tipo=this.user.tipo;
          this.form.sexo=this.user.sexo;
          this.form.entidad=this.user.entidad;
          this.form.cargo=this.user.cargo;
          this.form.codigo=this.user.codigo;
          this.form.imagen=this.user.imagen;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
    },
    setPass(){
          this.$root.$emit("bv::show::modal", "modalPass", "#btnShow");
          return;
    },
    login(){

    },
    switchLoc(){
        this.$refs.form.validate().then(esValido => {
        if (esValido) {
          this.editarUsuario();
        } else {
          
        }
      });
    
   },
   switchLocPass(){
        this.$refs.formPass.validate().then(esValido => {
            if (esValido) {
              this.editarPassword();
            } else {
              this.$swal('Contraseñas no coinciden!','warning');
            }
          });         
   },
   async editarUsuario(){
      let data = new FormData();
      if (this.file) {
       data.append('filename',this.file);
      }
      var formulario = this.form;
          for (var key in formulario) {
               data.append(key,formulario[key]);
           }
           await this.axios.put('user/pefil', data).then(response => {
                  if (response.status==200) {
                     this.$swal('Usuario Editardo','','success');
                     this.guardarUsuario(response.data.accessToken);  
                     this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
                          for (var key in formulario) {
                            this.form[key]="";
                          }}
                            }).catch(e => {
                            console.log(e.response.data.menssage);
                            this.$swal('No se pudo editar','','warning');
           });
   },
   async editarPassword(){
      let data = new FormData();
      var formulario = this.form;
          for (var key in formulario) {
               data.append(key,formulario[key]);
           }
           await this.axios.put('auth/recover-password', data).then(response => {
                  if (response.status==200) {
                     this.$swal('Contraseña Editada','','success');
                     this.$root.$emit("bv::hide::modal", "modalPass", "#btnShow");
                          for (var key in formulario) {
                            this.form[key]="";
                          }}
                            }).catch(e => {
                            console.log(e.response.data.menssage);
                            this.$swal('No se pudo editar','','warning');
           });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    toggleModal () {
       this.modal = !this.modal
     },
    },
    created(){
        this.session();
        this.listarUsers();
    },
    computed: {
        ...mapState(['usuarioDB']),
    rows() {
       return this.user.length
    },
  },
}
</script>
<style>
  .nombre{
    font-size:2rem;
  }
</style>