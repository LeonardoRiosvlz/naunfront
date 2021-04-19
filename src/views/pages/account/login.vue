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
                            <img src="@/assets/images/logo-dark.png" height="20" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">Bienvenido !</h4>
                        <p class="text-muted">Logueate para continuar al sistema.</p>
                      </div>

                      <b-alert
                        variant="danger"
                        class="mt-3"
                        v-if="notification.message"
                        show
                        dismissible
                      >{{notification.message}}</b-alert>

                      <div class="p-2 mt-5">
                        <ValidationObserver ref="form">
                          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input
                              type="email"
                              v-model="form.email"
                              class="form-control"
                              id="email"
                              placeholder="Enter email"
                            />
                            <span style="color:red">{{ errors[0] }}</span>
                          </div>
                           </ValidationProvider>
                          <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input
                              v-model="form.password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                            />
                            <span style="color:red">{{ errors[0] }}</span>
                          </div>
                          </ValidationProvider>

                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customControlInline"
                            />
                            <label
                              class="custom-control-label"
                              for="customControlInline"
                            >Recordarme</label>
                          </div>
                          </ValidationObserver>
                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary btn-block w-md waves-effect waves-light"
                             @click="switchLoc"
                            >Entrar</button>
                          </div>

                          <div class="mt-4 text-center">
                            <router-link tag="a" to="/forgot-password" class="text-muted">
                              <i class="mdi mdi-lock mr-1"></i> Olvidaste tu contraseña?
                            </router-link>
                          </div>
                     
                        
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          © 2021 Pristel
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

<script>
import {mapState,mapMutations, mapActions} from 'vuex';
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "vuelidate/lib/validators";

export default {
      metaInfo: {
      title: 'Login',
      titleTemplate: 'Login',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
   },
    components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      editMode:false,
      submitted: false,
      form:{
          'email':'leonardo2718@hotmail.es',
          'password':'Anakena',
      }
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    ...mapState(['counter'])
  },
  created() {
    document.body.classList.add("auth-body-bg");
    this.session();
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    switchLoc(){
      this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.login();
            } else {
            }
      });
    },
    ...mapActions(['guardarUsuario']),
      async  login(){
        let data = new FormData();
        data.append('email',this.form.email);
        data.append('password',this.form.password);
       await  this.axios.post('api/auth/signin', data).then(response => {
            if (response.status==200) {
               this.$swal('Bien!!!');
               ///limpiar el formulario 
              this.guardarUsuario(response.data.accessToken);  
			        this.session();
              return;                
              }
            }).catch(e => {
              console.log(e);
              this.$swal(e);
           });     
    },
    session(){
      if (localStorage.getItem('token')) {
        const token=localStorage.getItem('token');
        this.guardarUsuario(token);
        this.$router.push({ name: 'home' });

      }else{
        console.log("No estas logueado");
      }
    }
  }
};
</script>