<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Agregar Estandar Para Evaluacion</b-button>
    </div>
      <div class="row">
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                <div class="media">
                    <div class="media-body overflow-hidden">
                    <p class="text-truncate font-size-14 mb-2"></p>
                    <h4 class="mb-0 text-center">SIN PRIORIZAR <span class="badge badge-danger" style="font-size">{{sinpriorizar}}/{{todas.length}}</span></h4>
                    </div>
                    <div class="text-primary">
                    <i class="ri-align-bottom font-size-24"></i>
                    </div>
                </div>
                </div>
            </div>
        </div>
         <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                <div class="media">
                    <div class="media-body overflow-hidden">
                    <p class="text-truncate font-size-14 mb-2"></p>
                    <h4 class="mb-0 text-center">PRIORIZADAS <span class="badge badge-success" style="font-size">{{priorizada}}/{{todas.length}}</span></h4>
                    </div>
                    <div class="text-primary">
                    <i class="ri-align-top font-size-24"></i>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                <div class="media">
                    <div class="media-body overflow-hidden">
                    <p class="text-truncate font-size-14 mb-2"></p>
                    <h4 class="mb-0 text-center">PROGRAMADAS <span class="badge badge-dark" style="font-size">{{programadas}}/{{todas.length}}</span></h4>
                    </div>
                    <div class="text-primary">
                    <i class="ri-time-line font-size-24"></i>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                <div class="media">
                    <div class="media-body overflow-hidden">
                    <p class="text-truncate font-size-14 mb-2"></p>
                    <h4 class="mb-0 text-center">TOTAL <span class="badge badge-info" style="font-size">{{todas.length}}</span></h4>
                    </div>
                    <div class="text-primary">
                    <i class="ri-clipboard-line font-size-24"></i>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                   
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                                <select  v-model="grupoid"  name="tipo" class="form-control" >
                                    <option :value="grupo.id" v-for="(grupo,index) in grupos" :key="index">{{grupo.nombre}}</option>
                                </select>
                        </div>
                      </div>
                    <div class="col-md-2">
                          <button class="btn btn-success btn-block" @click="filtrar()"> BUSCAR </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
            <h4 class="text-center my-4 text-info"></h4>
          <div class="card-body">
            <h2 class="card-title text-center" style="font-size:30!important"></h2>
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
                :items="todas"
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
              
                <template v-slot:cell(grupo_de_estandares)="data">
                    {{data.item.oportunidad_mejoras}}
                </template>
                 <template v-slot:cell(numero_de_estandar)="data">
                    {{data.item.autoevaluacion.estandare.numero}}
                </template> 
                <template v-slot:cell(codigo_de_estandar)="data">
                    {{data.item.autoevaluacion.estandare.codigo}}
                </template> 
                <template v-slot:cell(status)="data">
                    <span v-if="data.item.status==='SIN PRIORIZAR'" class="badge badge-danger">SIN PRIORIZAR</span>
                    <span v-if="data.item.status==='PRIORIZADA'" class="badge badge-success">PRIORIZADA</span>
                    <span v-if="data.item.status==='PROGRAMADA'" class="badge badge-info">PROGRAMADA</span>
                </template>              
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="eliminarbases(data.item.id)"> Eliminar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="setear_mejora(data.item.id);editMode=true;ver=false;">Priorizar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear_mejora(data.item.id)"> Ver </b-dropdown-item-button>
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









    <b-modal id="modal_mejora" false size="xl"  title="Opciones de mejora" hide-footer>
      <ValidationObserver ref="form">
        <b-row class="ml-1">
          <b-col>
              <div class="form-group">
              <label>Oportunidad de mejora</label>
              <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                  <input v-model="mejora.oportunidad_mejoras"  type="text" class="form-control" placeholder=" " disabled>
                  <span style="color:red">{{ errors[0] }}</span>
              </ValidationProvider>
              </div>
          </b-col>
        </b-row>
        <b-row class="ml-1">
          <b-col>
              <div class="form-group">
              <label>Estado</label>
              <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                  <select v-model="mejora.status"  name="tipo" class="form-control " :disabled="ver">
                      <option value="SIN PRIORIZAR">SIN PRIORIZAR</option>
                      <option value="PRIORIZADA">PRIORIZADA</option>
                  </select>
                  <span style="color:red">{{ errors[0] }}</span>
              </ValidationProvider>
              </div>
          </b-col>
        </b-row>
        <hr v-if="mejora.status==='PRIORIZADA'">
        <b-row class="ml-1" v-if="mejora.status==='PRIORIZADA'">
          <div class="col-2">
            <h3>RIESGO</h3>
          </div>
          <div class="col-2">
            <b-row class="ml-1">
              <b-col>
                  <div class="form-group">
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                      <select v-model="mejora.puntaje_riesgo"  @change="calculo()" name="tipo" class="form-control " :disabled="ver">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                      </select>
                      <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
              </b-col>
            </b-row>
          </div>
          <div class="col-8">
            <div>
              <b-button v-b-toggle.collapse-r-1 variant="info btn-block">Criterios al riesgo</b-button>
              <b-collapse id="collapse-r-1" class="mt-2">
                    <b-card>
                      <ul class="list-group">
                        <li class="list-group-item disabled">
                          Califique como 1 o 2 cuando la institución, 
                          el usuario y/o los clientes internos no 
                          corren ningún riesgo o existe un riesgo 
                          leve si no se efectúa la acción de 
                          mejoramiento.
                        </li>
                        <li class="list-group-item disabled">
                          Califique como 3 cuando la institución, el 
                          usuario y/o los clientes internos corren un 
                          riesgo medio si no se efectúa la acción de 
                          mejoramiento.
                        </li>
                        <li class="list-group-item">
                          Califique como 4 o 5 cuando la institución, 
                          el usuario y/o los clientes internos corren 
                          un riesgo alto o se puede presentar un 
                          evento adverso o incidente si no se 
                          efectúa la acción de mejoramiento.
                        </li>
                      </ul>
                    </b-card>       
              </b-collapse>
            </div>
          </div>
        </b-row>
        <hr v-if="mejora.status==='PRIORIZADA'">
        <b-row class="ml-1" v-if="mejora.status==='PRIORIZADA'">
          <div class="col-2">
            <h3>COSTO</h3>
          </div>
          <div class="col-2">
            <b-row class="ml-1">
              <b-col>
                  <div class="form-group">
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                      <select v-model="mejora.puntaje_costo" @change="calculo()"  name="tipo" class="form-control " :disabled="ver">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                      </select>
                      <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
              </b-col>
            </b-row>
          </div>
          <div class="col-8">
            <div>
              <b-button v-b-toggle.collapse-r-2 variant="primary btn-block">Criterios al costo</b-button>
              <b-collapse id="collapse-r-2" class="mt-2">
                    <b-card>
                      <ul class="list-group">
                        <li class="list-group-item disabled">
                          Califique como 1 o 2 si al no realizarse el 
                          mejoramiento no se afectan o se afectan 
                          levemente las finanzas y la imagen de la 
                          institución.
                        </li>
                        <li class="list-group-item disabled">
                          Califique como 3 si al no realizarse el 
                          mejoramiento se afectan moderadamente 
                          las finanzas y la imagen de la institución.
                        </li>
                        <li class="list-group-item">
                          Califique como 4 o 5 si al no realizarse el 
                          mejoramiento se afectan notablemente 
                          las finanzas y la imagen de la institución.
                        </li>
                      </ul>
                    </b-card>
          
              </b-collapse>
            </div>
          </div>
        </b-row>
        <hr v-if="mejora.status==='PRIORIZADA'">
        <b-row class="ml-1" v-if="mejora.status==='PRIORIZADA'">
          <div class="col-2">
            <h3>VOLUMEN</h3>
          </div>
          <div class="col-2">
            <b-row class="ml-1">
              <b-col>
                  <div class="form-group">
                  <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                      <select v-model="mejora.puntaje_volumen" @change="calculo()" name="tipo" class="form-control " :disabled="ver">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                      </select>
                      <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
              </b-col>
            </b-row>
          </div>
          <div class="col-8">
            <div>
              <b-button v-b-toggle.collapse-r-3 variant="dark btn-block">Criterios al volumen</b-button>
              <b-collapse id="collapse-r-3" class="mt-2">
                    <b-card>
                      <ul class="list-group">
                        <li class="list-group-item disabled">
                             Califique como 1 o 2 cuando la institución, 
                            el usuario y/o los clientes internos no 
                            corren ningún riesgo o existe un riesgo 
                            leve si no se efectúa la acción de 
                            mejoramiento.
                        </li>
                        <li class="list-group-item disabled">
                          Califique como 3 cuando la institución, el 
                          usuario y/o los clientes internos corren un 
                          riesgo medio si no se efectúa la acción de 
                          mejoramiento.
                        </li>
                        <li class="list-group-item">
                          Califique como 4 o 5 cuando la institución, 
                          el usuario y/o los clientes internos corren 
                          un riesgo alto o se puede presentar un 
                          evento adverso o incidente si no se 
                          efectúa la acción de mejoramiento.
                        </li>
                      </ul>
                    </b-card>
                    <b-card>

                    </b-card>
                     <b-card>

                    </b-card>          
              </b-collapse>
            </div>
          </div>
        </b-row>
        <b-row v-if="mejora.status==='PRIORIZADA'">
          <b-col>
            <h2 class="text-center">TOTAL</h2>
          </b-col>
           <b-col>
            <h2>{{mejora.puntaje_costo*mejora.puntaje_riesgo*mejora.puntaje_volumen}}</h2>
          </b-col>
        </b-row>
      </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLocMejora" v-if="!ver && !editModeMejora">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLocMejora" v-if="!ver && editModeMejora">Editar</button>
    </b-modal>






        <b-modal id="modal" false size="lg"  title="AUTOEVALUACION CUALITATIVA" hide-footer>
            <ValidationObserver ref="form">
                <b-row class="ml-1">
                    <b-col-4>
                        <div class="form-group">
                        <label> Base de auto evaluación</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                            <select v-model="form.base_id"  name="tipo" class="form-control " :disabled="ver">
                                <option :value="base.id" v-for="(base,index) in bases" :key="index">{{base.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col-4>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Numero del estandar</label>
                            <ValidationProvider name="numero" rules="required" v-slot="{ errors }" >
                                <input v-model="form.numero" @change="buscarGrupos()"  type="text" class="form-control" placeholder=" " :disabled="ver">
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                    <div class="form-group">
                      <label> Codigo del estandar</label>
                      <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                        <select v-model="form.numero"  @change="buscarGrupos()"  name="tipo" class="form-control " :disabled="ver">
                            <option :value="estandar.numero" v-for="(estandar,index) in estandares" :key="index">{{estandar.codigo}}</option>
                        </select>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                   </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                    <div class="form-group">
                      <label> Grupo de estandares</label>
                      <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                        <select v-model="form.grupo_id"  name="tipo" class="form-control " disabled>
                            <option :value="grupo.id" v-for="(grupo,index) in grupos" :key="index">{{grupo.nombre}}</option>
                        </select>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                   </b-col>
                   <b-col v-if="form.subgrupo_id">
                    <div class="form-group">
                      <label> Sub grupo</label>
                      <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                        <select v-model="form.subgrupo_id"  name="tipo" class="form-control " disabled>
                            <option :value="grupo.id" v-for="(grupo,index) in subgrupos" :key="index">{{grupo.nombre}} {{grupo.desde}}-{{grupo.hasta}}</option>
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
                        <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" " disabled></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                     <b-col>
                        <div class="form-group">
                        <label>Criterios</label>
                        <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" " disabled></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="ml-1">
                    <b-col-4>
                        <div class="form-group">
                        <label>Periodo</label>
                        <ValidationProvider name="periodo" rules="required" v-slot="{ errors }" >
                            <select v-model="form.periodo_id"  name="periodo" class="form-control " :disabled="ver">
                                <option :value="periodo.id" v-for="(periodo,index) in periodos" :key="index">{{periodo.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col-4>
                </b-row> 
                 <b-row>
                    <div class="col-11">
                        <label class="mr-3">Agregar Fortaleza:&nbsp;</label>
                        <input v-model="form.fortaleza"  type="text" class="form-control mr-2" placeholder=" ">
                    </div>
                     <div class="col-1 my-4 py-1">
                        <button class="btn btn-success btn-block" @click="cargarPromotor()" :disabled="form.fortaleza===''">+</button>
                      </div >
                 </b-row> 
                
                 <b-row>
                     <b-col>
                         <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fortalezas</th>
                                <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(promotor, index) in form.fortalezas" :key="index">
                                <th scope="row">{{index+1}}</th>
                                <td>{{promotor.nombre}}</td>
                                <td>
                                    <a href="javascript:void(0);" @click="eliminarpromotor(index)" class="text-danger" v-b-tooltip.hover title="eliminar">
                                        <i class="mdi mdi-delete font-size-18"></i>
                                    </a>
                                </td>    
                                </tr>
                            </tbody>
                          </table>
                     </b-col>
                </b-row>
                  <b-row>
                    <b-col>
                        <label>Evidencias</label>
                        <b-form-file multiple
                            v-model="gallery_antes"
                            placeholder="Seleccione su image..."
                            drop-placeholder="Drop file here..."
                            ref="inputFile1"
                        ></b-form-file>
                    </b-col>
                </b-row>    
                <b-row>
                    <b-col>
                        <div class="form-group">
                        <label>Descripción de evidencias</label>
                        <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                <textarea v-model="form.descripcion_evidencias"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>  
                 <hr>
                <b-row v-if="editMode">
                     <b-col>
                       <h4>Oportinidades de mejoras</h4>
                          <div class="clearfix mb-3">
                            <b-button class="float-right btn-info" left @click="$bvModal.show('modal_mejora');editModeMejora=false" >Agregar</b-button>
                         </div>
                         <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Mejora</th>
                                <th scope="col">Eliminar</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(mejora, index) in mejoras" :key="index">
                                <th scope="row">{{index+1}}</th>
                                <td>{{mejora.oportunidad_mejoras}}</td>
                                <td>
                                  <span v-if="mejora.status==='SIN PRIORIZAR'" class="badge badge-danger">SIN PRIORIZAR</span>
                                  <span v-if="mejora.status==='PRIORIZADA'" class="badge badge-success">PRIORIZADA</span>
                                  <span v-if="mejora.status==='PROGRAMADA'" class="badge badge-info">PROGRAMADA</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" @click="eliminarOportunidadC(mejora.id)" class="text-danger" v-b-tooltip.hover title="eliminar">
                                        <i class="mdi mdi-delete font-size-18"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" @click="setear_mejora(mejora.id)" class="text-success" v-b-tooltip.hover title="eliminar">
                                        <i class="mdi mdi-pencil font-size-18"></i>
                                    </a>
                                </td>      
                                </tr>
                            </tbody>
                          </table>
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
          text: "Gestión de clientes"
        },
        {
          text: "AUTOEVALUACION CUALITATIVA",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      gallery_antes:null,
      ver:false,
      url:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      email: "",
      grupoid: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      periodos: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["id","grupo_de_estandares","numero_de_estandar","codigo_de_estandar","total","status","actions"],
      bases: [], 
      base: [], 
      todas: [],
      mejoras: [], 
      estandares:[], 
      autoevaluaciones:[],
      grupos:[], 
      subgrupos:[], 
      editMode:false,
      editModeMejora:false,
      priorizada:0,
      sinpriorizar:0,
      programadas:0,
      form:{
            'id': '',
            'periodo':'',
            'evidencias':'',
            'periodo_id':'',
            'evidencias':'',
            'descripcion_evidencias':'',
            'fortalezas':[],
            'mejoras':[],
            'oportunidad_mejoras':'',
            'puntaje_riesgo':'',
            'puntaje_costo':'',
            'puntaje_volumen':'',
            'base_id':'',
            'grupo_id':'',
            'subgrupo_id':'',
            'cliente_id':'',
            'estandar_id':'',
            'fortaleza':'',
          },
          mejora:{
            'id': '',
            'status': 'SIN PRIORIZAR',
            'oportunidad_mejoras': '',
            'puntaje_volumen': 1,
            'puntaje_costo': 1,
            'puntaje_riesgo':1,
            'total':1,
          }
    }
  },

  methods: {
    calculo(){
      this.mejora.total=this.mejora.puntaje_riesgo*this.mejora.puntaje_costo*this.mejora.puntaje_volumen;
    },
    cargarPromotor(){
      this.form.fortalezas.push({
       nombre:this.form.fortaleza,
      });
    },
    eliminarpromotor(index){
       this.form.fortalezas.splice(index, 1);  
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
    buscarEstandar(){
        for (let index = 0; index < this.estandares.length; index++) {
            this.estandares[index];
            if (condition) {
                
            }
            
        }
    },
    buscarGrupos(){
        if (this.form.numero<75) {
            this.form.grupo_id=1;
              for (let index = 0; index < this.subgrupos.length; index++) {
                if ( parseInt(this.subgrupos[index].desde)<=parseInt(this.form.numero)) {
                      console.log(this.subgrupos[index].desde);
                      console.log(this.subgrupos[index].hasta);
                    this.form.subgrupo_id= this.subgrupos[index].id;
                    this.setearCriterios();
                }
            }
         }else{
            for (let index = 0; index < this.grupos.length; index++) {
                if ( parseInt(this.grupos[index].desde)<=parseInt(this.form.numero)) {
                      console.log(this.grupos[index].desde);
                      console.log(this.grupos[index].hasta);
                    this.form.grupo_id= this.grupos[index].id;
                    this.form.subgrupo_id="";
                    this.setearCriterios();
                }
            }
         }
    },
    setearCriterios(){
        for (let index = 0; index < this.estandares.length; index++) {
            if (this.estandares[index].numero===this.form.numero) {
               this.form.criterios=this.estandares[index].criterios; 
               this.form.descripcion=this.estandares[index].descripcion; 
               this.form.estandar_id=this.estandares[index].id; 

            }   
        }
    },
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarAutoevaluacion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarAutoevaluacion();
          } else {
        }});
      }
    },
    switchLocMejora(){
      if (!this.editModeMejora) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.AgregarMejoraC();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarMejoraC();
          } else {
        }});
      }
    },
   async agregarAutoevaluacion(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
            if (key=='fortalezas') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        if (this.gallery_antes) {
            for( var i = 0; i < this.gallery_antes.length; i++ ){         
            data.append('gallery',this.gallery_antes[i]);
            } 
        }
         data.append('autoevaluacion_if',this.$route.params.id);
       await this.axios.post('api/autoevaluacion', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.AgregarMejoraC();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
              this.setear(response.data.id);
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
    async editarAutoevaluacion(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
            if (key=='fortalezas') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        if (this.gallery_antes) {
            for( var i = 0; i < this.gallery_antes.length; i++ ){         
            data.append('gallery',this.gallery_antes[i]);
            } 
        }
        await this.axios.put('api/autoevaluacion', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarAutoevaluacion();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
     async eliminarbasess(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/autoevaluacion/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarbases();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
           async eliminarbasess(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/autoevaluacion/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarbases();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },
//////mejora///////
      AgregarMejoraC(){
        this.$swal({
          title: 'Desea agregar una nueva  oportnidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.agregarMejora();
          }
        })
      },
      async agregarMejora(){
     let data = new FormData();
      var formulario = this.mejora;
        for (var key in formulario) {
            if (key=='fortalezas') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       data.append("autoevaluacion_id",this.form.id);
       await this.axios.post('api/mejoras', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.setear_mejoras(this.form.id);
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
      editarMejoraC(id){
        this.$swal({
          title: 'Desea editar esta oportunidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.editarMejora(id);
          }
        })
      },  
    async editarMejora(){
     let data = new FormData();
       var formulario = this.mejora;
        for (var key in formulario) {
            if (key=='fortalezas') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/mejoras', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarAutoevaluacion();
               this.listarMejoras();
               this.$root.$emit("bv::hide::modal", "modal_mejora", "#btnShow");
               ///limpiar el formulario
              }
            }).catch(e => {
                this.$swal('ocurrio un problema','','warning');
            });
     },
    eliminarOportunidadC(id){
        this.$swal({
          title: 'Desea borrar esta oportunidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarOportnidaM(id);
          }
        })
      },
      async eliminarOportnidaM(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/mejoras/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.setear_mejoras(this.form.id);
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },
//////mejora///////      
      eliminarbases(id){
        this.$swal({
          title: 'Desea borrar este registro?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarbasess(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
         if (key=='fortalezas') {
                this.form.fortalezas=[];
            }else{
                this.form[key]="";
            }
       }
       this.form.cliente_id=this.cliente.id;
       this.form.periodo_id=this.base.periodo.id;
       this.form.base_id=this.base.id;
      },
    async setear(id){
        console.log(id);
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/autoevaluacion/find',data)
          .then((response) => {
            console.log(response);
             if (response.status==200) {
               console.log(response.data.id);
              this.form.id=response.data.id; 
              this.form.periodo=response.data.periodo; 
              this.form.evidencias=response.data.evidencias; 
              this.form.periodo=response.data.periodo; 
              this.form.evidencias=response.data.evidencias; 
              this.form.descripcion_evidencias=response.data.descripcion_evidencias; 
              this.form.fortalezas=JSON.parse(response.data.fortalezas); 
              this.form.puntaje_riesgo=response.data.puntaje_riesgo; 
              this.form.puntaje_costo=response.data.puntaje_costo; 
              this.form.base_id=response.data.base_id; 
              this.form.grupo_id=response.data.grupo_id; 
              this.form.subgrupo_id=response.data.subgrupo_id; 
               this.mejoras=response.data.mejoras; 
               this.editMode=true;
              for (let index = 0; index < this.estandares.length; index++) {
                if (this.estandares[index].id===response.data.estandar_id) {
                  this.form.numero=this.estandares[index].numero;
                  this.buscarGrupos(); 
                  this.$root.$emit("bv::show::modal", "modal", "#btnShow");
                  return
                }
              }
              
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async setear_mejoras(id){
        console.log(id);
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/autoevaluacion/find',data)
          .then((response) => {
            console.log(response);
             if (response.status==200) {
              this.mejoras=response.data.mejoras;   
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async setear_mejora(id){
        console.log(id);
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/mejoras/find',data)
          .then((response) => {
            console.log(response);
             if (response.status==200) {
               console.log(response.data.id);
              this.mejora.id=response.data.id; 
              this.mejora.oportunidad_mejoras=response.data.oportunidad_mejoras; 
              this.mejora.puntaje_costo=response.data.puntaje_costo; 
              this.mejora.puntaje_riesgo=response.data.puntaje_riesgo; 
              this.mejora.puntaje_volumen=response.data.puntaje_volumen; 
              this.mejora.status=response.data.status; 
              this.mejora.total=response.data.total; 
               this.editModeMejora=true;
               this.$root.$emit("bv::show::modal", "modal_mejora", "#btnShow");
               this.calculo(); 
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
    async listarbases(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/basesau/listar',data)
        .then((response) => {
          this.bases = response.data;

        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
   async listarAutoevaluacion(){
       console.log("hey");
     let data = new FormData();
     data.append('id',this.$route.params.id);
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/autoevaluacion/listar',data)
        .then((response) => {
          this.autoevaluaciones = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async  listarestandares(){
          await this.axios.get('api/estandares/listar')
          .then((response) => {
              this.estandares = response.data;
          })
          .catch((e)=>{
              console.log('error' + e);
          })
      },

        async  listarestandares(){
            await this.axios.get('api/estandares/listar')
            .then((response) => {
                this.estandares = response.data;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
        },
        async  listargruposestandares(){
            await this.axios.get('api/estandares/grupos/listar')
            .then((response) => {
                console.log(response.data)
                this.grupos = response.data;
                for (let index = 0; index < this.grupos.length; index++) {
                  if (this.grupos[index].id==1) {
                     this.subgrupos=this.grupos[index].subgrupo_estandares;
                  } 
                }
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
      async listarMejoras(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/mejoras/todas',data)
          .then((response) => {
             if (response.status==200) {
                 this.todas=response.data;
                 this.form.periodo_id=this.base.periodo.id;
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
      async filtrar(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
      data.append('grupo_id',this.grupoid);
        await this.axios.post('api/mejoras/filtrar',data)
          .then((response) => {
             if (response.status==200) {
                 this.todas=response.data;
                 console.log(this.todas.length);
                 if (this.todas.length<1) {
                  this.$swal(
                    'No existen oprutnidades de mejoras para este grupo!',
                      '',
                      'warning'
                    );
                 }
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
      async listarperiodos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/periodo/listar',data)
            .then((response) => {
            this.periodos = response.data;
            })
            .catch((e)=>{
            console.log('error' + e);
            })
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
        this.listarperiodos();
         this.listarAutoevaluacion();
        this.session();
        this.listarbases();
        this.listarMejoras();
        this.listargruposestandares();
        this.listarestandares();
       
      },
   watch: {
      cliente: function () {
       this.listarbases();
       this.listarperiodos();
      this.listarMejoras();
       this.listargruposestandares();
        this.listarestandares();
        this.listarAutoevaluacion();
       this.form.cliente_id=this.cliente.id;
        this.title=this.cliente.nombre_prestador;
        this.form.cliente_id=this.usuarioDB.c
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.todas.length;
    },
  },
}
</script>
