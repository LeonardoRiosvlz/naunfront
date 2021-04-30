
<template>
  <div class="card" style="min-height:552px">
    <div class="card-body">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item>Sales Report</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Export Report</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Profit</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Action</b-dropdown-item>
      </b-dropdown>

      <h4 class="card-title mb-4">Reportes</h4>
          <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear reporte</b-button>
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

        <b-modal id="modal" false size="lg"  title="Gestión de cargos" hide-footer>
          <ValidationObserver ref="form">
            <b-row>
               <b-col>
                <div class="form-group">
                  <label>Tipo de reporte </label>
                  <ValidationProvider name="Tipo de reporte" rules="required" v-slot="{ errors }">
                          <select v-model="form.tipo"  name="cumpleanos" class="form-control " :disabled="ver">
                              <option value="Tipo 1">Tipo 1</option>
                              <option value="Tipo 6">Tipo 6</option>
                              <option value="Tipo 4">Tipo 4</option>
                              <option value="Tipo 2">Tipo 2</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
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
                <b-col>
                <div class="form-group">
                  <label>Mes de reporte </label>
                  <ValidationProvider name="cumpleaños" rules="required" v-slot="{ errors }">
                          <select v-model="form.mes"  name="cumpleanos" class="form-control " :disabled="ver">
                              <option value="Enero">Enero</option>
                              <option value="Febrero">Febrero</option>
                              <option value="Marzo">Marzo</option>
                              <option value="Abril">Abril</option>
                              <option value="Mayo">Mayo</option>
                              <option value="Junio">Junio</option>
                              <option value="Julio">Julio</option>
                              <option value="Agosto">Agosto</option>
                              <option value="Septiembre">Septiembre</option>
                              <option value="Octubre">Octubre</option>
                              <option value="Noviembre">Noviembre</option>
                              <option value="Diciembre">Diciembre</option>
                          </select>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col> 
              </b-row>
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Descripción</label>
                  <ValidationProvider name="descripcion" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.descripcion"  type="text" class="form-control" placeholder=" " :disabled="ver">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>  
              <b-row>
                <b-col>
                <div class="form-group">
                  <label>Cambio de estado </label>
                  <ValidationProvider name="cumpleaños" rules="required" v-slot="{ errors }">
                          <select v-model="form.estado"  name="cumpleanos" class="form-control " :disabled="ver">
                              <option value="Estado 1">Estado 1</option>
                             <option value="Estado 4">Estado 4</option>
                             <option value="Estado 3">Estado 3</option>
                          </select>
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
        titulo:"hoal",
      transactionData: [

      ],
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
        { key: "mes", sortable: true, label: "mes" },
        { key: "tipo", sortable: true, label: "Tipo" },
        { key: "estado", sortable: true, label: "Estado" },
        { key: "descripcion", sortable: true, label: "Descripcion" },
        { key: "action" }
      ],
      form:{
          id:"",
          fecha:"",
          tipo:"",
          estado:"",
          descripcion:"",
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
    this.form.id_cajero = this.$route.params.id;
    this.listar();
  },
  methods: {
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
       await this.axios.post('api/trazabilidad_ath', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listar();
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
    async editar(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
        await this.axios.put('api/trazabilidad_ath', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listar();
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
      setear(id) {
        for (let index = 0; index < this.transactionData.length; index++) {
          if (this.transactionData[index].id===id) {
            this.form.id=this.transactionData[index].id;
            this.form.tipo=this.transactionData[index].tipo;
            this.form.mes=this.transactionData[index].mes;
            this.form.fecha=this.transactionData[index].fecha;
            this.form.descripcion=this.transactionData[index].descripcion;
            this.form.estado=this.transactionData[index].estado;
            this.form.id_cajero=this.$route.params.id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            return;
          }
        }
      },
      async  listar(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
      await  this.axios.post('api/trazabilidad_ath/find',data)
        .then((response) => {
          this.transactionData = response.data;
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
