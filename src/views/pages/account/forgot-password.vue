<script>
import { authMethods } from "@/state/helpers";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false
    };
  },
  validations: {
    email: { required, email }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
   async tryToReset() {
        let data = new FormData();
        data.append('email',this.email);
       await  this.axios.post('api/auth/forgot-password', data).then(response => {
            if (response.status==200) {
               this.$swal('Email enviado!',
                          'hemos enviado un email con un link para recuperacion de contraseña',
                          'success');
              return;                
              }
            }).catch(e => {
              console.log(e);
              this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        html: 'Algo ha salido mal, usuario no pertenece a nuestra plataforma'
                      });
           });   
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

                        </div>

                        <h4 class="font-size-18 mt-4">Restaurar contraseña</h4>
                        <p class="text-muted">Restablezca su contraseña a Naun.</p>
                      </div>

                      <div class="p-2 mt-5">
                        <b-alert
                          v-model="isResetError"
                          class="mb-4"
                          variant="danger"
                          dismissible
                        >{{error}}</b-alert>

                        <form class="form-horizontal" @submit.prevent="tryToReset">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="useremail">Email</label>
                            <input
                              v-model="email"
                              type="email"
                              class="form-control"
                              id="useremail"
                              placeholder="Enter email"
                              :class="{ 'is-invalid': submitted && $v.email.$error }"
                            />
                            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                              <span v-if="!$v.email.required">Email is required.</span>
                              <span v-if="!$v.email.email">Please enter valid email.</span>
                            </div>
                          </div>

                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >Restaurar</button>
                          </div>
                        </form>
                      </div>

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