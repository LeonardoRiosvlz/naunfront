<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
  
     <div class="row">
      <div class="col-12">
        <div class="card"  style="min-heigth:1000px">
          <div class="card-body">
            <h4 class="card-title"></h4>
                <div class="row m-0 justify-content-between align-items-center">
                    <div class="row m-0 col-6 pl-0">
                        <div class="col-4 pl-0">
                            <div class="form-group">
                            <label>Proceso</label>
                                <select  @change="capIdProceso()" v-model="id_proc" name="tipo" class="form-control " >
                                    <option v-for="(pros, index) in procesos" :key="index" :value="pros.id">{{pros.nombre}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                            <label>Subproceso</label>
                                <select name="tipo" class="form-control " >
                                    <option v-for="(subpros, index) in subprocesos" :key="index" :value="subpros.id">{{subpros.nombre}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                            <label>Tipo de documento</label>
                                <select name="tipo" class="form-control " >
                                    <option v-for="(docs, index) in tiposdocumentos" :key="index" :value="docs.id">{{docs.nombre}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <b-button  class="col-2 btn-warning" left>
                          <h5 class="mt-0 mb-0 text-white">
                            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M28 22v8H4v-8M16 4v20M8 12l8-8l8 8"/></g></svg> EXPORTAR
                          </h5>
                    </b-button>
                </div>
  
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="documentos"
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
                    <b-dropdown-item-button v-if="data.item.creado==='No creado'" @click="editMode=false;ver=false;setearCarga(data.item.id)"> Cargar documentos </b-dropdown-item-button>
                    <b-dropdown-item-button v-if="data.item.creado==='Creado'"><a :href="'documentos/'+data.item.id" style="color:#000"> Vista al Documento </a></b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar </b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarDoc(data.item.id)"> Eliminar </b-dropdown-item-button>
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
import summernote from '@/components/summer'
import moment from 'moment'

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
           text: "Sistema integral de gestión"
        },
        {
          text: "Gestion de documentos",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      tabIndex: 0,
      id_proc:4,
      url_logo:null,
      logo:null,
      archivo:null,
      diagrama:null,
      logo:null,
      ver:false,
      url:"",
      url_perfil:"",
      modal: true,
      foto:null,
      file:null,
      perfil:null,
      email: "",
      password: "",
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["nombre", "version", "fecha_emicion", "fecha_alerta", "actions"],
      procesos: [],
      versiones: [],  
      subprocesos:[],
      subproceso:[],
      tiposdocumentos:[],
      cargos:[],
      tipos:[],
      editMode:false,
      usuarios:[],
      normativa:[],
      show:true,
      normativas:[],
      titulo:'',
      documentos:[],
      articulo:"",
      sedes:"",
      rango:0,
      form:{
            'id': 6,
            'tipo_id': '',
            'subproceso_id':'',
            'proceso_id':'',
            'creado':'',
            'nombre': null,
            'archivo': '',
            'normativas':[],
            'consecutivo':'',
            'version':'',
            'elaboracion':'',
            'revision':'',
            'aprobacion':'',
            'fecha_alerta':'',
            'fecha_emicion':'',
            'intervalo':'',
            'status':'',
            'sedes_id':'',
            'elabora_id':'',
            'aprueba_id':'',
            'revisa_id':''
          }
        }
  },


}
</script>
