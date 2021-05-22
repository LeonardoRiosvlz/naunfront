
<template>
  <div  >
    <div class="card-body border-top text-center m-0">
        <div class="row align-items-center">
          <div class="col">
            <div class="card p-4">
              <div class="d-inline-flex">
                <h5 class="mr-2">FST</h5>
                <div class="text-success">
                  <i class="mdi mdi-menu-right font-size-14"></i>{{formatos.length}}
                </div>
              </div>
             <p class="text-muted text-truncate mb-0">Abonos {{form.abonos_total}}</p>
            </div>
          </div>
          <div class="col">
            <div class="card p-4">
              <div class="d-inline-flex">
                <h5 class="mr-2">Toltal</h5>
                <div class="text-success">
                  <i class="mdi mdi-menu-right font-size-14"></i>{{form.valor_total | moneda}}
                </div>
              </div>
             <p class="text-muted text-truncate mb-0">Total abonado: {{form.abonados | moneda}}</p>
            </div>
          </div>
          <div class="col">
            <div class="card p-4">

                <h5 class="mr-2 text-danger">{{form.valor_total-form.abonados | moneda}}</h5>

             <p class="text-muted text-truncate mb-0">Abonos pendientes</p>
            </div>
          </div>
        </div>
    <div class="clearfix m-0">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;resete();">Crear F.S.T  </b-button>
    </div>
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
            <div class="table-responsive mb-0"  style="min-height: 12em;">
              <b-table
                :items="formatos"
                :fields="fields"
                striped 
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(VALOR)="data">
                  {{data.item.valor | moneda}}
                </template>
                 <template v-slot:cell(Legalizacion)="data">
                  {{data.item.descripcion}}
                </template>
                <template v-slot:cell(ESTADO)="data">
                   
                  <b-badge variant="warning" v-if="data.item.status==='Pendiente'">{{data.item.status}}</b-badge>
                  <b-badge variant="success" v-if="data.item.status==='Aprobado'">{{data.item.status}}</b-badge>
                  <b-badge variant="danger" v-if="data.item.status==='Rechazado'">{{data.item.status}}</b-badge>
                </template>
                <template v-slot:cell()="data">
                   <button type="button" class="btn btn-success btn-sm rounded-pill" @click="abonarModal(data.item.id,data.item.tecnico_id)" :disabled="data.item.status==='Pendiente'||data.item.status==='Rechazado'" ><i class="ri-hand-heart-fill"></i>  Abonar</button>
                </template>
                <template v-slot:cell(actions)="data">
                  <button v-b-tooltip.hover title="Ver "  type="button" class="btn btn-success btn-sm rounded-pill mr-1" @click="editMode=false;ver=true;setear(data.item.id)"  ><i class="ri-eye-line"></i>  </button>
                  <button v-b-tooltip.hover title="Editar "  type="button" class="btn btn-info btn-sm rounded-pill mr-1" @click="editMode=true;ver=false;setear(data.item.id)"><i class="ri-edit-2-fill"></i>  </button>
                  <button v-b-tooltip.hover title="Eliminar "  type="button" class="btn btn-danger btn-sm rounded-pill mr-1" @click="eliminarFormato(data.item.id)"><i class="ri-delete-bin-line"></i>  </button>
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

<div v-if="consecutivo.legalizaciones_aths" style="width:100%">
     <button class="btn btn-block float-right btn-success" @click="legalizar()" v-if="legalizaciones_aths.length<1">Legalizar</button>

        <b-card style="width:100%" v-else>

            <h4 >Legalización</h4>
          <span v-if="legalizaciones_aths[0].status==='Pendiente'" class="badge badge-warning">Pendiente</span>
          <span v-if="legalizaciones_aths[0].status==='Aceptada'" class="badge badge-success">Aceptada</span>
          <span v-if="legalizaciones_aths[0].status==='Devuelta'" class="badge badge-danger">Devuelta</span>
          <b-card-text>
              Observaciones: {{legalizaciones_aths[0].observaciones}}
          </b-card-text>
          <b-card-text v-if="legalizaciones_aths[0].status==='Devuelta'">
              Observaciones del analista:  {{legalizaciones_aths[0].observaciones_analista}}
          </b-card-text>
          <h4>Excedente: {{legalizaciones_aths[0].excedente | moneda}}</h4>
           <div class="clearfix m-0 text-right">
                  <button v-b-tooltip.hover title="Editar "  type="button" class="btn btn-info btn-sm rounded-pill mr-1" @click="editMode=true;ver=false;setearLegalizacion()"><i class="ri-edit-2-fill"></i>  </button>
                  <button v-b-tooltip.hover title="Ver detalles "  type="button" class="btn btn-success btn-sm rounded-pill mr-1" @click="detallesLegalizacion()"><i class="ri-eye-line"></i>  </button>
          </div>
        </b-card>
  </div>
    </div>



    <b-modal id="modal_abonar" false size="lg"  :title="'Abonar F.S.T'+' '+form.consecutivo" hide-footer>
       <b-card no-body v-if="tecnico.length>0">
        <b-row no-gutters class="align-items-center">
          <b-col md="4">
            <b-card-img :src="tecnico[0].imagen" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body :title="'Técnico:'+tecnico[0].nombre+''+ tecnico[0].apellido">
              <b-card-text style="margin:0">Tipo : {{tecnico[0].tipo_tecnico}}</b-card-text>
              <b-card-text style="margin:0">Codigo : {{tecnico[0].codigo}}</b-card-text>
              <b-card-text style="margin:0">Dirección : {{tecnico[0].direccion}}</b-card-text>
              <b-card-text style="margin:0">Teléfono : {{tecnico[0].telefono}}</b-card-text>
              <b-card-text style="margin:0">Email : {{tecnico[0].email}}</b-card-text>
              <p class="card-text">
              </p>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Pago</th>
              <th>Modo</th>
              <th>Abono</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="abonos in abonos" :key="abonos.id">
           
              <th>{{abonos.valor_abono | moneda}}</th>
              <th>{{abonos.tipo}}</th>
              <th><a :href="abonos.archivo_abono" download target="_blank">Archivo</a></th>
              <th>           
                <a href="javascript:void(0);" @click="eliminarAbono(abonos.id,abonos.formato_id)"  class="text-danger" v-b-tooltip.hover title="Borrar abono">
                  <i class="mdi mdi-trash-can font-size-18"></i>
                </a>
            </th>
            </tr>
            <tr>
              <th>Total: {{form.valor | moneda}} </th>
              <th>Abonado:{{total_abonado | moneda}} </th>
              <th colspan="2">Restante: {{form.valor-total_abonado | moneda}} </th>
            </tr>
          </tbody>
        </table>

        <div v-if="form.valor<=total_abonado">
          <b-card bg-variant="success" class="text-white-50">
            <h5 class="mt-0  text-white">
              <i class="mdi mdi-check-all mr-3"></i> Abonos completados!
            </h5>
          </b-card>
        </div>
        <div v-else>
          <ValidationObserver ref="form">      
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Valor</label>
                    <ValidationProvider name="valor" rules="required" v-slot="{ errors }">
                          <input v-model="abono.valor_abono"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Modo</label>
                    <ValidationProvider name="modo" rules="required" v-slot="{ errors }">
                          <select v-model="abono.tipo"  name="modo" class="form-control" :disabled="ver" >
                              <option value="Transferencia">Transferencia</option>
                              <option value="Giro">Giro</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col> 
              </b-row>
              <hr>          
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Descripción</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="abono.descripcion_abono"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
               <b-col>
                   <label>Evidencias</label>
                   <div id="preview mb-2">
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
        <button class="btn btn-block float-right btn-success" @click="abonar()" v-if="!ver && !editMode">Abonar</button>
        </div>



     </b-modal>




    <b-modal id="modal_legalizacion" false size="lg"  title="Legalizar" hide-footer>
          <ValidationObserver ref="form">      
              
                  <table id="example2" class="table table-striped"  v-show="legalizacion.items.length>0">
                   <thead>
                     <tr>
                       <th>Codigo</th>
                       <th>Nombre</th>
                       <th>Descripción</th>
                        <th>Precio</th>
                        <th>Precio en factura</th>
                       <th v-if="!ver"></th>
                     </tr>
                   </thead>
                    <tbody>
                     <tr v-for="(items , index) in legalizacion.items" :key="items.id">
                       <td>{{items.codigo}}</td>
                       <td>{{items.nombre}}</td>
                        <td>{{items.descripcion}} </td>
                        <td>{{items.precio | moneda}} </td>
                        <td><input :id="index+'precio_factura'" type="text" v-model="items.precio_factura" @change="sumarItemsLegalizacion()"  class="form-control form-control-sm"  :disabled="ver"></td>
                     </tr>
                     <tr>
                       <td>{{legalizacion.valor}}</td>
                     </tr>
                    </tbody>
                  </table>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Valor</label>
                    <ValidationProvider name="valor" rules="required" v-slot="{ errors }">
                          <input v-model="legalizacion.excedente"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                    <label>Modo</label>
                    <ValidationProvider name="modo" rules="required" v-slot="{ errors }">
                          <select v-model="legalizacion.tipo"  name="modo" class="form-control" :disabled="ver" >
                              <option value="Transferencia">Transferencia</option>
                              <option value="Giro">Giro</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col> 
              </b-row>
                <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Observaciones</label>
                    <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="observaciones"
                              v-model="legalizacion.observaciones"
                              placeholder="observaciones"
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row class="mb-2">
               <b-col>
                   <label>Imagen del abono</label>
                   <div id="preview mb-2">
                     <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
                   </div>
                    <b-form-file
                        v-model="file"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChange"
                        ref="abonos"
                    ></b-form-file>
               </b-col>
            </b-row> 
            <b-row>
                <b-col>
                    <label>Facturas</label>   
                      <b-form-file multiple
                          v-model="evidencias"
                          placeholder="Seleccione su image..."
                          drop-placeholder="Drop file here..."
                          ref="facturas"
                      ></b-form-file>         
                </b-col>
              </b-row>
                

        </ValidationObserver>

        <button class="btn btn-block float-right btn-success my-2" @click="legalizarCuestion()" v-if="!ver && !editMode">Legalizar</button>
        <button class="btn btn-block float-right btn-success my-2" @click="legalizarCuestion()" v-if="!ver && editMode">Editar legalización</button>
     </b-modal>


   
    <b-modal id="modal_detalles_legalizacion" false size="lg"  title="Detalles de legalización" hide-footer>
      <div v-if="legalizaciones_aths.length>0">
             <h5>Abono: ({{legalizaciones_aths[0].tipo}} {{legalizaciones_aths[0].excedente | moneda}})</h5>
             <img :src="legalizaciones_aths[0].abono" alt width="94%" style="margin:10px"/>
      </div>      
        <table id="example2" class="table table-striped" >
           <thead>
             <tr>
               <th>Codigo</th>
               <th>Nombre</th>
               <th>Descripción</th>
                <th>Precio</th>
                <th>Precio en factura</th>
               <th v-if="!ver"></th>
             </tr>
           </thead>
            <tbody>
             <tr v-for="items in itemsLegalizacion" :key="items.id">
               <td>{{items.codigo}}</td>
               <td>{{items.nombre}}</td>
                <td>{{items.descripcion}} </td>
                <td>{{items.precio | moneda}} </td>
                <td>{{items.precio_factura | moneda}} </td>
             </tr>
             <tr>
             </tr>
            </tbody>
          </table>
          <h5>Facturas</h5>
           <div class="col-12">
             <div class="popup-gallery">
               <a
                 class="float-left"
                 v-for="(item, index) in evidenciasLegalizacion"
                 :key="index"
                 @click="() => showImg(index)"
               >
                 <div class="img-fluid">
                   <img :src="`${item}`" alt width="200" style="margin:10px"/>
                 </div>
               </a>
             </div>
             <vue-easy-lightbox
               :visible="visible"
               :index="index"
               :imgs="evidenciasLegalizacion"
               @hide="visible = false"
             ></vue-easy-lightbox>
           </div>

 
     </b-modal>



    <b-modal id="modal_cancelar" false size="lg"  title="Rechazar F.S.T" hide-footer>
          <ValidationObserver ref="form">      
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Motivo de rechazo</label>
                    <ValidationProvider name="observacion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.observacion"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
        <button class="btn btn-block float-right btn-danger" @click="cancelFormato()" v-if="!ver && !editMode">Rechazar</button>
     </b-modal>







    <b-modal id="modal" false size="lg"  title="F.S.T" hide-footer>
          <ValidationObserver ref="form">
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Código Tecnico</label>
                    <ValidationProvider name="codigo tecnico" rules="required" v-slot="{ errors }">
                          <input v-model="form.codigo_tecnico"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col class="p-2" >
                  <div class="form-group" style="margin-top:20px">
                    <button class="btn btn-info btn-block" @click="buscarTecnico()" :disabled="ver"> Buscar Tecnico</button>
                   </div>
                </b-col>
              </b-row>
                 <b-card no-body v-if="tecnico.length>0">
                  <b-row no-gutters class="align-items-center">
                    <b-col md="4">
                      <b-card-img :src="tecnico[0].imagen" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body :title="'Técnico:'+tecnico[0].nombre+''+ tecnico[0].apellido">
                        <b-card-text style="margin:0">Tipo : {{tecnico[0].tipo_tecnico}}</b-card-text>
                        <b-card-text style="margin:0">Codigo : {{tecnico[0].codigo}}</b-card-text>
                        <b-card-text style="margin:0">Dirección : {{tecnico[0].direccion}}</b-card-text>
                        <b-card-text style="margin:0">Teléfono : {{tecnico[0].telefono}}</b-card-text>
                        <b-card-text style="margin:0">Email : {{tecnico[0].email}}</b-card-text>
                        <p class="card-text">
                        </p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
            <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Consecutivo</label>
                    <ValidationProvider name="consecutivo" rules="required" v-slot="{ errors }">
                          <input v-model="form.consecutivo"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Entidad</label>
                    <ValidationProvider name="Entidades" rules="required" v-slot="{ errors }">
                          <select v-model="form.entidad_id" @change="listarimputaciones()"  name="entidad_id" class="form-control "  :disabled="ver">
                              <option></option>
                              <option :value="entidades.id" v-for="entidades in entidades" :key="entidades.id">{{entidades.empresa}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>

            </b-row> 
            <hr>  
            <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Codigos de imputacion </label>
                    <v-select @click="setImputacion()" v-model="imputacion_id" :options="imputaciones" :reduce="imputaciones => imputaciones.id" label="nombre" :disabled="ver"></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>  
              <b-col>
                <button style="float:right" v-b-tooltip.hover title="Agregar un item a la lista" class="btn btn-success my-4 btn-sm btn-block" type="button" @click="cargar()"  name="button" v-if="!ver && imputacion_id" >Agregar Item</button>
              </b-col>
            </b-row> 
              <b-row>    
                <table id="example2" class="table table-striped"  v-show="form.items.length>0">
                   <thead>
                     <tr>
                       <th>Codigo</th>
                       <th>Nombre</th>
                       <th>Descripción</th>
                        <th>Precio</th>
                       <th v-if="!ver"></th>
                     </tr>
                   </thead>
                    <tbody>
                     <tr v-for="(items , index) in form.items" :key="items.id">
                       <td>{{items.codigo}}</td>
                       <td>{{items.nombre}}</td>
                        <td><input :id="index+'descripcion'" type="text" v-model="items.descripcion"   class="form-control form-control-sm"   :disabled="ver"></td>
                        <td><input :id="index+'precio'" type="text" v-model="items.precio" @change="sumarItems()"  class="form-control form-control-sm"  :disabled="ver"></td>
                       <td v-if="!ver">
                        <a href="javascript:void(0);" @click="eliminarItem(index)" class="text-danger" v-b-tooltip.hover title="Borrar">
                            <i class="mdi mdi-trash-can font-size-18"></i>
                        </a>
                      </td>
                     </tr>
                    </tbody>
                  </table>
                </b-row>    
              <b-row>
                <b-col>
                    <div class="form-group">
                    <label>Descripción</label>
                    <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                              id="descripcion"
                              v-model="form.descripcion_formato"
                              placeholder="Enter something..."
                              rows="3"
                              max-rows="6"
                              :disabled="ver"
                            ></b-form-textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row> 
                <b-col>
                  <div class="form-group">
                    <label>Valor</label>
                    <ValidationProvider name="Valor" rules="required" v-slot="{ errors }">
                          <input v-model="form.valor"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Usuario Autorizador</label>
                    <v-select v-model="form.autorizador_id" :options="users" :reduce="users => users.id" :getOptionLabel="option => option.nombre+' '+option.apellido" :disabled="ver"></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>    
        </ValidationObserver>
        <button v-b-tooltip.hover title="Agregar la solicitud"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear FST</button>
        <button v-b-tooltip.hover title="Editar la solicitud"  class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar FST</button>
     </b-modal>
  </div>
</template>
<script>
import VueEasyLightbox from "vue-easy-lightbox";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
/**
 * Transactions component
 */
export default {
    components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
    VueEasyLightbox
  },
  data() {
    return {
      title: "Administracion",
      items: [
        {
          text: "Procesos"
        },
        {
          text: "Formato de solicitud de transferncia",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      imgs: "", // Img Url , string or Array of string
      visible: false,
      index: 0, // default: 0
      ver:false,
      url:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      codigo: "",
      nombre: "",
      precio: "",
      password: "",
      total_abonado: 0,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      consecutivo:"",
      filterOn: [],
      terceros: [],
      entidades: [],
      evidencias:null,
      abonos: [],
      imputaciones: [],
      legalizaciones_aths:[],
      itemsLegalizacion:[],
      evidenciasLegalizacion:[],
      imputacion_id: "",
      users: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["VALOR","ESTADO","LEGALIZACION/ABONOS","actions"],
      formatos: [], 
      cajero: [],
      tecnico: [],
      editMode:false,
      form:{
          'id':'',
          'items':[],
          'id_entidad':'',
          'valor':'',
      },
      legalizacion:{
        'consecutivo':'',
        'items':[],
        'valor':"",
        'valor_facturado':"",
        'excedente':"",
        'observaciones':"",
        'id_programacion':"",
        'tipo':"",
      },
      abono:{
          'id':'',
          'tecnico_id':'',
      }
    }
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
    this.form.id_cajero = 2;
    this.listar();
  },
  filters: {
        moneda: function (value) {
          const formatterPeso = new Intl.NumberFormat('es-CO', {
             style: 'currency',
             currency: 'COP',
             minimumFractionDigits: 0
           })
           let valueFinal = formatterPeso.format(value);
           return valueFinal
        }
  },
  methods: {
    showSingle() {
      this.imgs = require("@/assets/images/small/img-2.jpg");
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    legalizar(){
      this.legalizacion.items=[];this.legalizacion.valor=0;
      for (let index = 0; index < this.formatos.length; index++) {
        for (let index2 = 0; index2 < this.formatos[index].items.length; index2++) {
            this.legalizacion.items.push({
               nombre:          this.formatos[index].items[index2].nombre,
               codigo:          this.formatos[index].items[index2].codigo,
               descripcion:     this.formatos[index].items[index2].descripcion,
               precio:          this.formatos[index].items[index2].precio,
               precio_factura:  "",
             });
        }
      this.legalizacion.valor=this.legalizacion.valor+parseFloat(this.formatos[index].valor);
      }
        this.$root.$emit("bv::show::modal", "modal_legalizacion", "#btnShow");
    },
    cargar(){
         for (let index = 0; index < this.imputaciones.length; index++) {
            if( this.imputacion_id===this.imputaciones[index].id){
              this.form.items.push({
               nombre:this.imputaciones[index].nombre,
               codigo:this.imputaciones[index].codigo,
               descripcion:"",
               precio:"",
             });
            }
        }
      },
    eliminarItem(index){
       this.form.items.splice(index, 1);  
    },
    sumarItems(){
      this.form.valor=0;
      for (let index = 0; index < this.form.items.length; index++) {
        this.form.valor=this.form.valor+parseFloat(this.form.items[index].precio)
      }
    },
    sumarItemsLegalizacion(){
      this.legalizacion.valor_facturado=0;this.legalizacion.excedente=0
      for (let index = 0; index < this.legalizacion.items.length; index++) {
        this.legalizacion.valor_facturado=this.legalizacion.valor_facturado+parseFloat(this.legalizacion.items[index].precio_factura)
      }
      this.legalizacion.excedente=this.legalizacion.valor - this.legalizacion.valor_facturado;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
      async  listarUsers(){
    await  this.axios.get('api/user/adminstrador')
      .then((response) => {
        this.users = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
                this.$swal({
                  title: 'Desea enviar esta solicitud?',
                  icon: 'question',
                  iconHtml: '',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  showCloseButton: true
                }).then((result) => {
                  if (result.isConfirmed) {
                     this.agregarFormato();
                  }
                })
             
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarFormato();
          } else {
        }});
      }
    },
     legalizarCuestion(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
                this.$swal({
                  title: 'Desea enviar esta legalización?',
                  icon: 'question',
                  iconHtml: '',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  showCloseButton: true
                }).then((result) => {
                  if (result.isConfirmed) {
                     this.agregarLeglizacion();
              
                  }
                })
             
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
                this.$swal({
                  title: 'Desea editar esta legalización?',
                  icon: 'question',
                  iconHtml: '',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  showCloseButton: true
                }).then((result) => {
                  if (result.isConfirmed) {
                      this.editarLeglizacion();
                  }
                })
           
          } else {
        }});
      }
    },
    async agregarLeglizacion(){
     let data = new FormData();
       var formulario = this.legalizacion;
        if (this.evidencias) {
            for( var i = 0; i < this.evidencias.length; i++ ){         
              data.append('evidencias',this.evidencias[i]);
            } 
          }
        if (this.file) {
          data.append('filename',this.file);
        }
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.post('api/legalizaciones/ath', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.reloadConsecutivo();
               this.$root.$emit("bv::hide::modal", "modal_legalizacion", "#btnShow");
               ///limpiar el formulario
                 this.url="";
                 this.$refs.abonos.reset();
                 this.$refs.facturas.reset();
  
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
    async editarLeglizacion(){
     let data = new FormData();
       var formulario = this.legalizacion;
        if (this.evidencias) {
            for( var i = 0; i < this.evidencias.length; i++ ){         
              data.append('evidencias',this.evidencias[i]);
            } 
          }
        if (this.file) {
          data.append('filename',this.file);
        }
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.put('api/legalizaciones/ath', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Editado con exito!',
                    '',
                    'success');
               this.reloadConsecutivo();
               this.$root.$emit("bv::hide::modal", "modal_legalizacion", "#btnShow");
               ///limpiar el formulario
                 this.url="";
                 this.$refs.abonos.reset();
                 this.$refs.facturas.reset();
  
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
      abonar(id){
        this.$swal({
          title: 'Desea agregar este abono?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.subirAbono(id);
          }
        })
      },
      eliminarAbono(id,formato){
        this.$swal({
          title: 'Desea eliminar este abono?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteAbono(id,formato);
          }
        })
      },
    async deleteAbono(id,formato){
     let data = new FormData();
      data.append('id',id);
 
       await this.axios.post('api/abonos/delete', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarAbonos(formato);
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
    async subirAbono(){
     let data = new FormData();
      var formulario = this.abono;
        for ( var key in formulario) {
            data.append(key,formulario[key]);
        }
        if (this.file) {
          data.append('filename',this.file);
         }
       await this.axios.post('api/abonos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarAbonos(this.abono.formato_id);
               this.listarFormato();
               this.file=null;
               this.url="";
               this.abono.valor_abono="";
               this.abono.descripcion_abono="";
               this.abono.descripcion_abono="";
               ///limpiar el formulario
              }
            }).catch(e => {
              this.$swal(e.response.data);
          });
      },
   async agregarFormato(){
     let data = new FormData();
      var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
       await this.axios.post('api/formatos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listarFormato();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
             
              this.$swal(e.response.data);
          });
      },
    async editarFormato(){
     let data = new FormData();
       var formulario = this.form;
        for ( var key in formulario) {
            if (key=='items') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
        await this.axios.put('api/formatos', data).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarFormato();
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
    async cancelarFormato(){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",this.form.id);
       data.append("status","Rechazado");
       data.append("observacion",this.form.observacion);
        await this.axios.post('api/formatos/status', data).then(response => {

            if (response.status==200) {
               this.$swal('Rechazado con exito','','success');
               this.listarFormato();
               this.$root.$emit("bv::hide::modal", "modal_cancelar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
                this.$swal('ocurrio un problema','','warning');
         });
      },
    async aprobarFormato(id){
     let data = new FormData();
     var formulario = this.form;
       data.append("id",id);
       data.append("status","Aprobado");
       data.append("observacion","");
        await this.axios.post('api/formatos/status', data).then(response => {

            if (response.status==200) {
               this.$swal('Rechazado con exito','','success');
               this.listarFormato();
               this.$root.$emit("bv::hide::modal", "modal_cancelar", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
              console.log(e);
                this.$swal('ocurrio un problema','','warning');
         });
      },
     async buscarCajero(){
        let data = new FormData();
        data.append('codigo',this.form.codigo_cajero);
        await this.axios.post('/api/cajeros/ath/find',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {

                this.cajero=response.data;
                if (this.cajero.length>0) {
                  this.form.id_cajero=this.cajero[0].id;
                }else{
                  this.$swal('No existe este cajero','','warning');
                }
                }
              }).catch(e => {
              
                this.$swal(e.response.data);
          });
      }, 
      async buscarTecnico(){
        let data = new FormData();
        data.append('codigo',this.form.codigo_tecnico);
        await this.axios.post('/api/user/tecnico',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
              
                this.tecnico=response.data;
                if (this.tecnico.length>0) {
                  this.form.tecnico_id=this.tecnico[0].id;
                }else{
                  this.$swal('No existe tecnico con este codigo','','warning');
                }
                }
              }).catch(e => {
            
                this.$swal(e.response.data);
          });
      },
     async eliminarFormatos(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/formatos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarFormato();
                }
              }).catch(e => {
           
                this.$swal(e.response.data);
          });
      }, 
      eliminarFormato(id){
        this.$swal({
          title: 'Desea borrar esta solicitud?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarFormatos(id);
          }
        })
      },
      cancelFormato(id){
        this.$swal({
          title: 'Desea rechazar esta solicitud?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.cancelarFormato();
          }
        })
      },
      aprobFormato(id){
        this.$swal({
          title: 'Deseas aprobar esta solicitud?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.aprobarFormato(id);
          }
        })
      },
      resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.loadConsectivo();
       this.form.consecutivo="ATH-"+this.consecutivo.id;
       this.legalizacion.id_prorgramacion=this.consecutivo.id;
       this.form.codigo_tecnico=this.consecutivo.codigo_tecnico;
       this.form.entidad_id=this.consecutivo.cajero_ath.entidad.id;
       this.buscarTecnico();
       this.form.items=[];
      },
      setear(id) {
        for (let index = 0; index < this.formatos.length; index++) {
          if (this.formatos[index].id===id) {
            this.form.pago_terceros=this.formatos[index].pago_terceros;
            this.form.consecutivo=this.formatos[index].consecutivo;
            this.form.otros=this.formatos[index].otros;
            this.form.observacion=this.formatos[index].observacion;
            this.form.descripcion_formato=this.formatos[index].descripcion_formato;
            this.form.items=this.formatos[index].items;
            this.form.valor=this.formatos[index].valor;
            this.form.tecnico_id=this.formatos[index].tecnico_id;
            this.form.autorizador_id=this.formatos[index].autorizador_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.descripcion=this.formatos[index].descripcion;
            this.form.codigo_tecnico=this.formatos[index].Tecnico.codigo;
            this.form.tercero_id=this.formatos[index].tercero_id;
            this.form.id=this.formatos[index].id;
            this.$root.$emit("bv::show::modal", "modal", "#btnShow");
            this.buscarTecnico();
            return;
          }
        }
      },
      setearCancelado(id){
        this.evidencias=
        this.form.id=id;
        this.$root.$emit("bv::show::modal", "modal_cancelar", "#btnShow");
      },
      abonarModal(id){
        for (let index = 0; index < this.formatos.length; index++) {
          if (this.formatos[index].id===id) {
            this.form.pago_terceros=this.formatos[index].pago_terceros;
            this.form.consecutivo=this.formatos[index].consecutivo;
            this.form.otros=this.formatos[index].otros;
            this.form.observacion=this.formatos[index].observacion;
            this.form.descripcion_formato=this.formatos[index].descripcion_formato;
            this.form.codigo_imputacion=this.formatos[index].codigo_imputacion;
            this.form.descripcion_codigo=this.formatos[index].descripcion_codigo;
            this.form.valor=this.formatos[index].valor;
            this.form.tecnico_id=this.formatos[index].tecnico_id;
            this.form.autorizador_id=this.formatos[index].autorizador_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.entidad_id=this.formatos[index].entidad_id;
            this.form.descripcion=this.formatos[index].descripcion;
            this.form.codigo_tecnico=this.formatos[index].Tecnico.codigo;
            this.form.tercero_id=this.formatos[index].tercero_id;
            this.form.id=this.formatos[index].id;
            this.abono.formato_id=this.formatos[index].id;
            this.abono.tecnico_id=this.formatos[index].tecnico_id;
            this.$root.$emit("bv::show::modal", "modal_abonar", "#btnShow");
            this.buscarTecnico();
            this.listarAbonos(this.form.id);
            return;
          }
        }        
      },
    detallesLegalizacion(){
        this.evidenciasLegalizacion=JSON.parse(this.legalizaciones_aths[0].evidencias);
        this.itemsLegalizacion=JSON.parse(this.legalizaciones_aths[0].items);
        this.itemsLegalizacion=JSON.parse(this.itemsLegalizacion);
        this.$root.$emit("bv::show::modal", "modal_detalles_legalizacion", "#btnShow");
        return;
    },
    setearLegalizacion(){
      this.legalizacion.id=this.legalizaciones_aths[0].id;
      this.legalizacion.items=this.itemsLegalizacion;
      this.legalizacion.items=JSON.parse(this.legalizaciones_aths[0].items);
      this.legalizacion.items=JSON.parse(this.legalizacion.items);
      this.legalizacion.excedente=this.legalizaciones_aths[0].excedente;
      this.legalizacion.tipo=this.legalizaciones_aths[0].tipo;
      this.legalizacion.observaciones=this.legalizaciones_aths[0].observaciones;
      this.legalizacion.id_prorgramacion=this.legalizaciones_aths[0].id_prorgramacion;
      this.$root.$emit("bv::show::modal", "modal_legalizacion", "#btnShow");
    },
    async  listarAbonos(index){
      let data = new FormData();
      data.append('id',index);
      await  this.axios.post('api/abonos/formato',data)
        .then((response) => {
          this.abonos = response.data;
          this.total_abonado=0;
          for (let index = 0; index < this.abonos.length; index++) {
            this.total_abonado=parseFloat(this.abonos[index].valor_abono)+parseFloat(this.total_abonado);
          }
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async  listarFormato(){
      let data = new FormData();
      let id='ATH-'+this.consecutivo.id;
      data.append('consecutivo',id);
      await  this.axios.post('api/formatos/find',data)
        .then((response) => {
            this.formatos = response.data.rows;
            this.form.valor_total=0;this.form.abonos_total=0;this.form.abonados=0;
          for (let index = 0; index < this.formatos.length; index++) {
            this.formatos[index].items=JSON.parse(this.formatos[index].items);
            this.formatos[index].items=JSON.parse(this.formatos[index].items);
            this.form.valor_total= parseFloat(this.formatos[index].valor)+this.form.valor_total;
            for (let indice = 0; indice < this.formatos[index].abonos.length; indice++) {
              this.form.abonados= parseFloat(this.formatos[index].abonos[indice].valor_abono)+this.form.abonados;
              this.form.abonos_total=this.form.abonos_total+1;
            }
          }
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
    async  listarimputaciones(){
      let data = new FormData();
      data.append('id',this.form.entidad_id);
      await  this.axios.post('api/imputaciones/find',data)
        .then((response) => {
          this.imputaciones = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      setEmail(){
        this.form.username=this.form.email;
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
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
      session(){
        if (localStorage.getItem('token')) {
          const token=localStorage.getItem('token');
          this.guardarUsuario(token);
          }else{
          this.$router.push({ name: 'Home' });
          }
        },

      loadConsectivo(){
        if (localStorage.getItem('consecutivo')) {
        this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
          this.form.consecutivo=this.consecutivo.consecutivo;
          this.form.tecnico_id=this.consecutivo.tecnico_id;
          this.legalizaciones_aths=this.consecutivo.legalizaciones_aths; 
          this.form.entidad_id=1;
          this.legalizacion.id_programacion=this.consecutivo.id;
          this.legalizacion.coordinador_id=this.consecutivo.coordinador_id;
          this.form.codigo_tecnico=this.consecutivo.codigo_tecnico;
          this.listarimputaciones();
    
        }

      },
    async reloadConsecutivo(){
      this.consecutivo = JSON.parse(localStorage.getItem('consecutivo'));
      let data = new FormData();
       data.append('id',this.consecutivo.id);
       await this.axios.post('api/programacion/ath/find',data)
        .then((response) => {
          this.programacion = response.data;
          console.log(this.programacion);
          localStorage.setItem("consecutivo", JSON.stringify(this.programacion[0]));
         this.consecutivo=this.programacion;
         this.loadConsectivo();
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
  },
  mounted(){
    this.loadConsectivo();
    this.listarFormato();
  }, 
    created(){
        this.session();
        
        this.listarentidades();
        this.listarUsers();
     
        
      },
    computed: {
    rows() {
      return this.formatos.length;
    },
  },
};
</script>
