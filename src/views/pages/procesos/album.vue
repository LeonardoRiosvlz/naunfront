<template>
  <div class="card">


        <div class="card" v-show="!modoTable" >
          <div class="card-body">
                <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-vertical"></i>
                </template>
                <!-- item-->
                <b-dropdown-item @click="modoTable=true">Gestionar Album</b-dropdown-item>
                <!-- item-->
                <b-dropdown-item v-for="data in transactionData" :key="data.id" @click="loadAlbum(data.id)">Album - {{data.fecha}}</b-dropdown-item>
              </b-dropdown>
            <h4 class="card-title">Álbum</h4>
            <b-carousel 
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <!-- Text slides with image -->
              <b-carousel-slide :img-src="ur_fachada">
                <div class="text-muted">
                  <h5 class="text-white">Fachada</h5>
                </div>
              </b-carousel-slide>

              <!-- Text slides with image -->
              <b-carousel-slide :img-src="ur_site">
                <div class="text-muted">
                  <h5 class="text-white">Site</h5>
                </div>
              </b-carousel-slide>

              <!-- Text slides with image -->
              <b-carousel-slide :img-src="ur_frente">
                <div class="text-muted">
                  <h5 class="text-white">Frente</h5>
                </div>
              </b-carousel-slide>

              <!-- Text slides with image -->
              <b-carousel-slide :img-src="ur_perimetro">
                <div class="text-muted">
                  <h5 class="text-white">Perimetro</h5>
                </div>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </div>




    <div class="card-body" v-show="modoTable">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item @click="modoTable=false">Ver álbum</b-dropdown-item>
        <!-- item-->
      </b-dropdown>

      <h4 class="card-title mb-4">Gestión de álbum</h4>
          <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal_album');editMode=false;">Crear</b-button>
    </div>
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
                class="form-control form-control-sm ml-2"
              ></b-form-input>
            </label>
          </div>
        </div>
        <!-- End search -->
      </div>
      <div class="table-responsive">
        <b-table
          :items="transactionData"
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


          <template v-slot:cell(action)="data">
                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminar(data.item.id)"> Eliminar </b-dropdown-item-button>
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

        <b-modal id="modal_album" false size="lg"  title="Gestión de trazabilidad" hide-footer>
          <ValidationObserver ref="form">
            <b-row class="mb-2">
               <b-col>
                   <label>Perímetro</label>
                   <div id="preview mb-2">
                     <img v-if="url_perimetro" width="100%" style="float:center!importan" class="rounded"  :src="url_perimetro" />
                   </div>
                    <b-form-file
                        v-model="perimetro"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangePerimetro"
                    ></b-form-file>
               </b-col>
                <b-col>
                    <label>Site</label>
                   <div id="preview mb-2">
                     <img v-if="url_site" width="100%" style="float:center!importan" class="rounded"  :src="url_site" />
                   </div>
                    <b-form-file
                        v-model="site"
                        placeholder="Seleccione su firma..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangeSite"
                    ></b-form-file>
               </b-col>
            </b-row>  
            <b-row class="mb-2">
               <b-col>
                   <label>Frente</label>
                   <div id="preview mb-2">
                     <img v-if="url_frente" width="100%" style="float:center!importan" class="rounded"  :src="url_frente" />
                   </div>
                    <b-form-file
                        v-model="frente"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangeFrente"
                    ></b-form-file>
               </b-col>
                <b-col>
                    <label>Fachada</label>
                   <div id="preview mb-2">
                     <img v-if="url_fachada" width="100%" style="float:center!importan" class="rounded"  :src="url_fachada" />
                   </div>
                    <b-form-file
                        v-model="fachada"
                        placeholder="Seleccione su firma..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChangeFachada"
                    ></b-form-file>
               </b-col>
            </b-row>  
                        
              <b-row>
                <b-col  >
                  <div class="form-group">
                    <label>Fecha </label>
                    <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="form.fecha" id="date" value="2019-08-19" type="date" :disabled="ver"></b-form-input>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Observaciones</label>
                  <ValidationProvider name="descripcion" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.observaciones"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>   
   
        </ValidationObserver>
  
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>

  </div>
</template>
<script>
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
/**
 * Transactions component
 */
export default {
    components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      transactionData: [

      ],
      modoTable:false,
      ver:false,
      editMode:false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50],
      filter: null,
      filterOn: [],
      sortBy: "orderid",
      sortDesc: false,
      fields: [
        { key: "fecha", sortable: true, label: "Fecha" },
        { key: "observaciones", sortable: true, label: "Oservaciones" },
        { key: "action" }
      ],
      url_frente:null,
      url_fachada:null,     
      url_site:null,
      url_perimetro:null,
      ur_frente:null,
      ur_fachada:null,     
      ur_site:null,
      ur_perimetro:null,
      form:{
          id:"",
          codigo:"",
          descripcion:"",
          fecha:"",
      }
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.transactionData.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.transactionData.length;
    this.form.codigo = this.$route.params.id;
    this.form.entidad_id = this.$route.params.entidad;
    this.listar();
  },
  methods: {
    onFileChangePerimetro(e) {
      const perimetro = e.target.files[0];
      this.url_perimetro = URL.createObjectURL(perimetro);
    },
    onFileChangeFachada(e) {
      const fachada = e.target.files[0];
      this.url_fachada = URL.createObjectURL(fachada);
    },
    onFileChangeFrente(e) {
      const frente = e.target.files[0];
      this.url_frente = URL.createObjectURL(frente);
    },
    onFileChangeSite(e) {
      const site = e.target.files[0];
      this.url_site = URL.createObjectURL(site);
    },
     switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarCargo();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editar();
          } else {
        }});
      }
    },
   async agregarCargo(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
         if (this.perimetro) {
            data.append('perimetro',this.perimetro);
        }
        if (this.site) {
            data.append('site',this.site);
        }
        if (this.frente) {
            data.append('frente',this.frente);
        }
        if (this.fachada) {
            data.append('fachada',this.fachada);
        }
       await this.axios.post('api/album', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listar();
               this.$root.$emit("bv::hide::modal", "modal_album", "#btnShow");
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
    async editar(){
        
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        if (this.perimetro) {
            data.append('perimetro',this.perimetro);
        }
        if (this.site) {
            data.append('site',this.site);
        }
        if (this.frente) {
            data.append('frente',this.frente);
        }
        if (this.fachada) {
            data.append('fachada',this.fachada);
        }
        await this.axios.put('api/album', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listar();
               this.$root.$emit("bv::hide::modal", "modal_album", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminars(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/trazabilidad_ath/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listar();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminar(id){
        this.$swal({
          title: 'Desea borrar este reporte?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminars(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.form.id_cajero=this.$route.params.id;
      },
    loadAlbum(id) {
        for (let index = 0; index < this.transactionData.length; index++) {
          if (this.transactionData[index].id===id) {
            this.ur_fachada=this.transactionData[index].fachada;
            this.ur_site=this.transactionData[index].site;
            this.ur_perimetro=this.transactionData[index].perimetro;
            this.ur_frente=this.transactionData[index].frente;
            return;
          }
        }
      },
      setear(id) {
        for (let index = 0; index < this.transactionData.length; index++) {
          if (this.transactionData[index].id===id) {
            this.form.id=this.transactionData[index].id;
            this.form.tipo=this.transactionData[index].tipo;
            this.form.mes=this.transactionData[index].mes;
            this.form.fecha=this.transactionData[index].fecha;
            this.form.observaciones=this.transactionData[index].observaciones;
            this.form.estado=this.transactionData[index].estado;
            this.form.id_cajero=this.$route.params.id;
            this.$root.$emit("bv::show::modal", "modal_album", "#btnShow");
            return;
          }
        }
      },
      async  listar(){
      let data = new FormData();
      data.append('codigo',this.$route.params.id);
      data.append('entidad_id',this.$route.params.entidad);
      await  this.axios.post('api/album/find',data)
        .then((response) => {
          this.transactionData = response.data;
            this.ur_fachada=this.transactionData[0].fachada;
            this.ur_site=this.transactionData[0].site;
            this.ur_perimetro=this.transactionData[0].perimetro;
            this.ur_frente=this.transactionData[0].frente;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
