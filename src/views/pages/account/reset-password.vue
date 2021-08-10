<script>
import axios from 'axios'
import decode from "jwt-decode"
import { authMethods } from "@/state/helpers";
import { required, email } from "vuelidate/lib/validators";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false,
      token:"",
      usuario:[],
      resta:"",
      form:{
       'password':'',
       'repass':'',
      }
    };
  },
  validations: {
    email: { required, email }
  },
  created() {
    document.body.classList.add("auth-body-bg");
    this.session();
  },
  methods: {
      switchLocPass(){
        this.$refs.formPass.validate().then(esValido => {
            if (esValido) {
              this.login();
            } else {
              this.$swal('Contraseñas no coinciden!','warning');
            }
          });         
   },   
  async  login(){
            var current_time = Date.now() / 1000;
            this.resta= this.usuario.exp-current_time;
            if (this.resta<0) {
                this.$swal('Link de recuperación de contraseña caducado!','','warning');
                return 
            }
            if (!this.form.password || !this.form.repass){
                this.$swal('Debes agregar tu nueva contraseña!','','warning');
                return
            }
            if (this.form.password===this.form.repass) {
                    let data = new FormData();
                    var formulario = this.form;
                        for (var key in formulario) {
                            data.append(key,formulario[key]);
                        }
                        await this.axios.put('api/auth/recover-password', data).then(response => {
                            if (response.status==200) {
                            this.$swal('Contraseña editada');
                            ///limpiar el formulario
                            this.$router.push({ name: '/' });
                                for (var key in formulario) {
                                    this.form[key]="";
                                }
                            }
                            }).catch(e => {
                            console.log(e.response.data.menssage);
                            this.$swal(e.response.data);
                        });
            }else{
                this.$swal('Contraseñas no coinciden!','','warning');
            }

        },
        leerToken(){
            this.token = this.$route.params.token;
            this.usuario=decode(this.token);
                var current_time = Date.now() / 1000;
                this.resta= this.usuario.exp-current_time;
                if (this.resta<0) {
                    this.$swal('Link de recuperación de contraseña caducado!','','warning');
                }else{
                    axios.defaults.headers.common['authorization'] = `Bearer ${this.token}`;
                }
        },
        session(){
        if (!localStorage.getItem('token')) {
            this.leerToken();
          }else{
            this.$router.push({ name: 'Home' });
          
          }
        }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <a href="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/" class="logo">
                            <img src="" height="70" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">{{usuario.nombre}} Bienvenido!</h4>
                        <p class="text-muted">Restablezca su contraseña.</p>
                      </div>

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

                      <div class="mt-5 text-center">
                        <p>
                          No tienes contraseña ?
                          <router-link
                            tag="a"
                            to="/"
                            class="font-weight-medium text-primary"
                          >Iniciar sesión</router-link>
                        </p>
                        <p>
                          © 2021 N.A.U.
                          <i class="mdi mdi-heart text-danger"></i> by Bioscenter
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>