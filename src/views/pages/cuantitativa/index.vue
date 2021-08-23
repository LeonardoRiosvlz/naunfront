<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
      <div class="d-lg-flex mb-4">
      <div class="chat-leftsidebar">
        <div class="p-3 border-bottom">
          <div class="media">

            <div class="media-body">
              <h5 class="font-size-15 mt-0 mb-1">{{form.nombre}}</h5>
              <h6 class="font-size-15 mt-0 mb-1">Periodo: {{form.periodo}}</h6>
            </div>
            <div>
              <b-dropdown class="chat-noti-dropdown" right variant="white">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-horizontal font-size-20"></i>
                </template>
                <b-dropdown-item @click="listarLibres()">Adjuntar Oprotunidades de mejora</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>



        <div class="chat-leftsidebar-nav">
          <b-tabs pills fill content-class="py-4" justified>
             <b-tab active>
              <template v-slot:title>
                <i class="ri-attachment-line font-size-20"></i>
                <span class="mt-2 d-none d-sm-block">O.M. VINCULADAS</span>
              </template>
              <div class="card-body border-bottom py-2">
                <div class="search-box chat-search-box">
                  <div class="position-relative">
                    <input type="text" v-model="search" class="form-control" placeholder="Buscar..." />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
              <b-card-text>
                <ul class="list-unstyled chat-list">
                  <li v-for="mejora in filteredItems"  :key="mejora.di" v-if="mejora.acciones.length==0">
                      <div class="media align-items-center pl-4">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body">OM</span
                          >
                        </div>

                        <div class="media-body p-0">
                          <h5 class="font-size-14 mb-0">{{mejora.oportunidad_mejoras}}</h5>
                          <p class="text-mouted m-0">Acciones programadas: {{mejora.acciones.length}}</p>
                          <button class="btn btn-danger btn-sm  mr-2" v-if="mejora.acciones.length<1" @click="desvincularCuestion(mejora.id)">Desvincular <i class="ri-close-line"></i></button>
                          <button class="btn btn-success btn-sm  ml-1" @click="setear_mejora(mejora.id,mejora.oportunidad_mejoras)">Programar <i class="ri-time-line"></i></button>
                        </div>
                      </div>
                      <hr>
                  </li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="ri-time-line font-size-20"></i>
                <span class="mt-2 d-none d-sm-block">O.M. PROGRAMADAS</span>
              </template>
              <div class="card-body border-bottom py-2">
                <div class="search-box chat-search-box">
                  <div class="position-relative">
                    <input type="text" v-model="search" class="form-control" placeholder="Buscar..." />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
              <b-card-text>
                <ul class="list-unstyled chat-list">
                  <li v-for="mejora in filteredItems"  :key="mejora.di" v-if="!mejora.acciones.length==0">
                      <div class="media align-items-center pl-4">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body">OM</span
                          >
                        </div>

                        <div class="media-body p-0">
                          <h5 class="font-size-14 mb-0">{{mejora.oportunidad_mejoras}}</h5>
                          <p class="text-mouted m-0">Acciones programadas: {{mejora.acciones.length}}</p>
                          <button class="btn btn-danger btn-sm  mr-2" v-if="mejora.acciones.length<1" @click="desvincularCuestion(mejora.id)">Desvincular <i class="ri-close-line"></i></button>
                          <button class="btn btn-success btn-sm  ml-1" @click="setear_mejora(mejora.id,mejora.oportunidad_mejoras)">Programar <i class="ri-time-line"></i></button>
                        </div>
                      </div>
                      <hr>
                  </li>
                </ul>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <div class="w-100 user-chat mt-4 mt-sm-0">
        <div class="p-3 px-lg-4 user-chat-border">
          <div class="row">
            <div class="col-md-4 col-6">
              <h5 class="font-size-15 mb-1 text-truncate">AUTO EVALUACION CUANTITATIVA</h5>
              <p class="text-muted text-truncate mb-0">
                Periodo: {{form.periodo}}
              </p>
            </div>
          </div>
        </div>

        <div class="px-lg-2 chat-users">
          <div class="chat-conversation p-3">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"></h4>
                    <div class="clearfix mb-3">
                      <b-button class="float-right btn-info" left @click="$bvModal.show('modal_acciones');editMode=false;resete();ver=false;">Crear Evaluacion Cuantitativa</b-button>
                    </div>
                    <div class="row mt-4" style="min-heigth:500px">
                      <div class="col-sm-12 col-md-6">
                        <div id="tickets-table_length" class="dataTables_length">
                          <label class="d-inline-flex align-items-center">
                            Mirar
                            <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entradas
                          </label>
                        </div>
                      </div>
                      <!-- Search -->
                      <div class="col-sm-12 col-md-6">
                        <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                          <label class="d-inline-flex align-items-center">
                            Buscar:
                            <b-form-input
                              v-model="filter"
                              type="search"
                              placeholder=""
                              class="form-control form-control-sm ml-2"
                            ></b-form-input>
                          </label>
                        </div>
                      </div>
                      <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0" style="min-heigth:500px">
                      <b-table
                        :items="acciones"
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
                        <template v-slot:cell(periodo)="data">
                          {{data.item.mejora.plan_accion.bases_autoevaluacion.periodo.nombre}}
                        </template>
                        <template v-slot:cell(grupo_de_estandares)="data">
                          {{data.item.mejora.autoevaluacion.grupo_estandare.nombre}}
                        </template>
                        <template v-slot:cell(numero_de_estandar)="data">
                          {{data.item.mejora.autoevaluacion.estandare.numero}}
                        </template>
                        <template v-slot:cell(status)="data">
                            <span v-if="data.item.status==='NO INICIADA'" class="badge badge-danger">NO INICIADA</span>
                            <span v-if="data.item.statu==='EN DESARROLLLO'" class="badge badge-info">EN DESARROLLLO</span>
                            <span v-if="data.item.status==='REALIZADA'" class="badge badge-success">REALIZADA</span>
                        </template>

                        <template v-slot:cell(actions)="data">

                        <b-dropdown size="sm" class="">
                          <template v-slot:button-content>
                            Action
                            <i class="mdi mdi-chevron-down"></i>
                          </template>
                            <b-dropdown-item-button @click="editMode=true;ver=false;setearAccion(data.item.id)"> Editar </b-dropdown-item-button>
                            <b-dropdown-item-button @click="eliminarAccionC(data.item.id)">Eliminar </b-dropdown-item-button>
                            <b-dropdown-item-button ><a :href="'/avances-planes-accion/'+data.item.id" style="color:#000">Registrar avances</a></b-dropdown-item-button>
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
          </div>
          <div class="px-lg-3">
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal_libres" false size="xl"  title="Oportunidades de mejora no vinculadas al plan de acción" hide-footer>
      <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body m-0 py-0 pb-0">
                   
                    <div class="row">
                      <div class="col-md-12">
                         <h5 class="text-LEFT">Vinculación Masiva</h5>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <input type="number" min="1" v-model="desde" max="124" class="form-control" id="formGroupExampleInput" placeholder="entre">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <input type="number" min="2" v-model="hasta" max="125" class="form-control" id="formGroupExampleInput" placeholder="hasta">
                        </div>
                      </div>
                      <div class="col-md-2">
                          <button class="btn btn-success btn-block" :disabled="!desde||!hasta" @click="adjuntarMasivamenteCuestion()"> Vincular </button>
                      </div>
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
    <b-row>
      <div class="card col-6" v-for="libre in libres" :key="libre.id">
        <div class="card-body">
          <h5 class="card-title">{{libre.oportunidad_mejoras}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Número de estandar: {{libre.autoevaluacion.estandare.numero}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Código de estandar: {{libre.autoevaluacion.estandare.codigo}}</h6>
          <h4 class="card-subtitle mb-2 text-center text-success">Total: <span class="badge badge-primary">{{libre.total}}</span></h4>
          <a href="#" @click="ajuntarLibreCuestion(libre.id)" class="card-link"><i class="ri-attachment-2"></i> Programar</a>
        </div>
      </div>
    </b-row>
</b-modal>




      <b-modal id="modal_acciones" false size="lg"  title="Programar acciones" hide-footer>
                <ValidationObserver  ref="form">
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
                <b-row>
                    <b-col>
                    <div class="form-group">
                      <label> Aplicabilidad</label>
                      <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                        <select v-model="form.aplicabilidad" name="tipo" class="form-control " :disabled="ver">
                            <option value="APLICA">APLICA</option>
                            <option value="NO APLICA">NO APLICA</option>
                        </select>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                   </b-col>
                  </b-row>
                  <pre>
                    {{form}}
                  </pre>
                  <b-row>
                    <b-col>
                      <div class="accordion" role="tablist">
                        <b-card no-body class="mb-1">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-1 variant="dark">ENFOQUE</b-button>
                          </b-card-header>
                          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                              <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Enfoque sistémico</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.enfoque_sistematico" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                          Ejercicio de aplicación disciplinado que 
                                          abarca todos los procesos y el contenido del 
                                          estándar; que hace una visión de conjunto de 
                                          la institución; que contempla un ciclo PHVA
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico==='1'">
                                          Ejercicio de aplicación disciplinado que 
                                          abarca todos los procesos y el contenido del 
                                          estándar; que hace una visión de conjunto de 
                                          la institución; que contempla un ciclo PHVA.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico==='2'">
                                          Comienzo de un enfoque sistémico 
                                          para los propósitos básicos del 
                                          estándar y empieza a estar presente 
                                          en algunos servicios o procesos. El 
                                          enfoque y los procesos a través de los 
                                          cuales se despliega está documentado.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico==='3'">
                                          El enfoque es sistémico, alcanzable 
                                          para lograr los propósitos del estándar 
                                          que se desea evaluar en procesos 
                                          clave.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico==='4'">
                                          El enfoque es sistémico tiene buen 
                                          grado de integración que responde a 
                                          todos los propósitos del estándar en la 
                                          mayoría de los procesos. Relacionado 
                                          con el direccionamiento estratégico.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico==='5'">
                                          El enfoque es explícito y se aplica de 
                                          manera organizada en todos los 
                                          procesos, responde a los distintos 
                                          criterios del estándar y está relacionado 
                                          con el direccionamiento estratégico.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr>
                              <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Enfoque proactivo</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.enfoque_proactivo" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                            Grado en que el enfoque es preventivo y se 
                                            adelanta a la
                                            ocurrencia del problema de calidad, a partir 
                                            de la gestión del riesgo
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo==='1'">
                                          Los enfoques son 
                                          mayoritariamente reactivos, la 
                                          información presentada es 
                                          anecdótica y desarticulada, sin 
                                          evidencia de la gestión del 
                                          riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo==='2'">
                                          Etapas iniciales de transición de la 
                                          reacción a la prevención de 
                                          problemas. Etapas iniciales de la 
                                          gestión del riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo==='3'">
                                          Enfoque mayoritariamente preventivo 
                                          hacia el manejo y control de los 
                                          procesos aun cuando existen algunos 
                                          en donde se actúa reactivamente. Se 
                                          identifican herramientas de la gestión 
                                          del riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo==='4'">
                                          El enfoque es mayoritariamente 
                                          proactivo y preventivo en todos los 
                                          procesos y se evidencian resultados 
                                          parciales de la gestión del riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo==='5'">
                                          El enfoque es proactivo y preventivo en 
                                          todos los procesos. Hay evidencia de la 
                                          gestión del riesgo.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr>
                              <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Enfoque evaluado y mejorado</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.enfoque_em" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                            Forma en que se evalúa y mejora el enfoque 
                                            y su asimilación.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em==='1'">
                                            La información presentada es 
                                            anecdótica y desarticulada, no 
                                            hay evidencias (hechos y datos).
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em==='2'">
                                            La evidencia de un proceso de 
                                            evaluación y mejoramiento del 
                                            enfoque es limitada. Esbozo de 
                                            algunos hechos y datos, 
                                            desarticulados.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em==='3'">
                                            El proceso de mejoramiento está 
                                            basado en hechos y datos (acciones 
                                            específicas realizadas y registradas) 
                                            sobre procesos claves que abarcan la 
                                            mayoría de productos y servicios.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em==='4'">
                                          Existe un proceso de mejoramiento 
                                          basado en hechos y datos como 
                                          herramienta básica de dirección.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em==='5'">
                                          Existen ciclos sistemáticos de 
                                          evaluación, la información recogida es 
                                          consistente y válida, oportuna y se 
                                          emplea para la evaluación y definir 
                                          acciones de mejoramiento.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                          
                            </b-card-body>
                          </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-2 variant="dark">IMPLEMENTACION</b-button>
                          </b-card-header>
                          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                               <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Despliegue en la institución</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.despliegue_institucional" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                            Grado en que se ha implementado el enfoque 
                                            y es consistente en los distintos servicios o 
                                            procesos de la organización.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional==='1'">
                                            El enfoque se ha implementado 
                                            en algunos servicios o procesos 
                                            pero se refleja su debilidad.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional==='2'">
                                            La implementación del enfoque se da 
                                            en algunos servicios o procesos 
                                            operativos principales y existen 
                                            brechas muy significativas en procesos 
                                            importantes.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional==='3'">
                                            La implementación está más avanzada 
                                            en servicios o procesos claves y no 
                                            existen grandes brechas con respec-to 
                                            a otros servicios o procesos.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional==='4'">
                                          Existe un enfoque bien desplegado en 
                                          todos los servicios o procesos, con 
                                          brechas no significativas en aquellos de 
                                          sop.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional==='5'">
                                          La implementación del enfoque se 
                                          amplía continuamente para cubrir 
                                          nuevos servicios o procesos en forma 
                                          integral y responde al enfoque definido 
                                          en todos los servicios o procesos 
                                          claves.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr>
                              <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Apropiación por el cliente interno y/o externo</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.apropiacion_cie" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                            Grado en que el cliente del despliegue 
                                            (cliente interno y/o externo) entiende y aplica 
                                            el enfoque, según la naturaleza y propósitos 
                                            del estándar.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie==='1'">
                                            El enfoque no lo apropian los 
                                            clientes.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie==='2'">
                                            Hay evidencias de apropiación en unos 
                                            pocos clientes internos o externos, 
                                            pero este no es consistente.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie==='3'">
                                            Hay evidencias de apropiación parcial 
                                            del enfoque en los principales clientes 
                                            con un grado mínimo de consistencia.

                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie==='4'">
                                            El enfoque lo apropian la mayoría de 
                                            los usuarios y es medianamente 
                                            consistente.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie==='5'">
                                          El enfoque está apropiado en la 
                                          totalidad de los usuarios y es 
                                          totalmente consistente.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr>
                            </b-card-body>
                          </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-3 variant="dark">RESULTADOS</b-button>
                          </b-card-header>
                          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                              <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Pertinencia</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.pertinencia" name="pertinencia" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                          Grado en que los resultados referidos 
                                          (hechos, datos e indicadores) se relacionan 
                                          los criterios y requisitos del estándar 
                                          evaluado.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia==='1'">
                                            Los datos presentados no 
                                            responden a los factores, 
                                            productos o servicios claves del 
                                            estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia==='2'">
                                            Los datos presentados son parciales y 
                                            se refieren a unos pocos factores, 
                                            productos o servicios claves solicitados 
                                            en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia==='3'">
                                            Los datos presentados se refieren al 
                                            desempeño de algunos servicios o 
                                            procesos claves, factores, productos 
                                            y/o servicios solicitados.

                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia==='4'">
                                            La mayoría de los resultados referidos 
                                            se relacionan con el servicio o proceso, 
                                            factores, productos y/o servicios 
                                            solicitados en el estándar, alcanzando 
                                            los objetivos y metas propuestas.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia==='5'">
                                            Todos los resultados se relacionan con 
                                            el servicio o proceso o el punto del 
                                            estándar a evaluar y alcanzan los 
                                            objetivos y metas propuestas.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            <hr>
                            <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Consistencia</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.consistencias" name="pertinencia" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                          Relación de los resultados como producto de 
                                          la implementación
                                          del enfoque.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.consistencias==='1'">
                                            Solo existen ejemplos 
                                            anecdóticos de aspectos poco 
                                            relevantes y no hay evidencia de 
                                            que sean resultado de la 
                                            implementación del enfoque.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencias==='2'">
                                            Se comienzan a obtener resultados 
                                            todavía incipientes de la aplicación del 
                                            enfoque.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencias==='3'">
                                            Existe evidencia que algunos logros 
                                            son causados por el enfoque 
                                            implementado y por las acciones de 
                                            mejoramiento.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencias==='4'">
                                            La mayoría de los resultados responden 
                                            a la implementación del enfoque y a las 
                                            acciones de mejoramiento.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencias==='5'">
                                            Todos los resultados son causados por 
                                            la implementación de enfoques y las 
                                            acciones sistemáticas de mejoramiento.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            <hr>
                            <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Avance de la medición</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.avance_mediacion" name="pertinencia" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                          Grado en que la medición responde a una 
                                          práctica sistémica de la organización en un 
                                          período de tiempo que le permita su
                                          Consolidación y existen indicadores definidos 
                                          para la medición del estándar evaluado, 
                                          calidad y pertinencia de los mismos.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion==='1'">
                                          No existen indicadores que 
                                          muestren tendencias en la 
                                          calidad y el desempeño de los 
                                          procesos. La organización se 
                                          encuentra en una etapa muy 
                                          temprana de medición.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion==='2'">
                                          Existen algunos indicadores que 
                                          muestran el desempeño de procesos. 
                                          La organización se encuentra en una 
                                          etapa media del desarrollo de la 
                                          medición.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion==='3'">
                                          Existen indicadores que monitorean los 
                                          procesos y muestran ya tendencias 
                                          positivas de mejoramiento en algunos 
                                          servicios o procesos claves, factores, 
                                          productos y/o servicios solicitados en el 
                                          estándar. Algunos servicios o procesos 
                                          reportados pueden estar en etapas 
                                          recientes de medición.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion==='4'">
                                          Existen procesos de medición 
                                          sistémicos para la mayoría de los 
                                          servicios o procesos y factores claves 
                                          de éxito solicitados en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion==='5'">
                                          Los resultados son monitoreados 
                                          directamente por los líderes de todos 
                                          los niveles de la organización y la 
                                          información se utiliza para la toma de 
                                          decisiones y el mejoramiento de los 
                                          procesos.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            <hr>
                            <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Tendencia</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.tendencia" name="pertinencia" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                            Desempeño de los indicadores en el tiempo. 
                                            Puede ser positiva
                                            cuando los datos muestran una mejoría 
                                            general a lo largo del tiempo.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.tendencia==='1'">
                                            El estadio de la medición y por lo 
                                            tanto de los resultados, no 
                                            garantizan tendencias confiables.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia==='2'">
                                            Se muestran resultados muy recientes 
                                            que aunque no permiten tener 
                                            suficientes bases para establecer 
                                            tendencias, el proceso es sistemático y 
                                            se empiezan a tomar decisiones 
                                            operativas con base en la información.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia==='3'">
                                            Se presentan tendencias de 
                                            mejoramiento de algunos factores 
                                            claves del estándar. Proceso 
                                            sistemático y estructurado.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia==='4'">
                                            La mayoría de los indicadores alcanzan 
                                            niveles satisfactorios y muestran firmes 
                                            tendencias de mejoramiento de los 
                                            servicios o procesos claves, factores, 
                                            productos y/o servicios, lo cual se 
                                            refleja en que van de bueno a 
                                            excelente.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia==='5'">
                                            Se observan tendencias positivas y 
                                            sostenidas de mejoramiento de todos 
                                            los datos a lo largo del tiempo.  
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            <hr>
                            <div class="row">
                                <div class="col-4">
                                 <div class="form-group">
                                  <label>Comparación</label>
                                  <ValidationProvider name="total" rules="required" v-slot="{ errors }">
                                        <select v-model="form.comparacion" name="pertinencia" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Descripcion</h5>
                                        <p class="small text-muted text-justify">
                                            Grado en que los resultados son comparados 
                                            con referentes
                                            nacionales e internacionales y la calidad de 
                                            los mismos.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="card p-3">
                                        <h5 class="lead text-center">Criterios</h5>
                                        <p class="small text-muted text-justify" v-if="form.comparacion==='1'">
                                            No existen políticas, ni prácticas 
                                            de comparación de los procesos 
                                            de la organización con los 
                                            mejores.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion==='2'">
                                            Se encuentran algunas prácticas 
                                            independientes de comparación, poco 
                                            estructuradas y no sistemáticas.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion==='3'">
                                            Existe una política de comparación con 
                                            las mejores prácticas y se encuentra en 
                                            etapa temprana de comparación de 
                                            algunos procesos, productos críticos y 
                                            servicios solicitados en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion==='4'">
                                            Se encuentra en etapa madura de 
                                            comparación con las mejores prácticas 
                                            a nivel nacional de servicios o 
                                            procesos, productos y/o factores claves 
                                            solicitados en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion==='5'">
                                            Los resultados son comparados con 
                                            referentes nacionales e internacionales 
                                            y se ubican en niveles cercanos a las 
                                            tendencias de clase mundial. Cuenta 
                                            con un sistema de evaluación y mejora 
                                            de los sistemas de comparación.
                                        </p>
                                      </div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </b-card-body>
                          </b-collapse>
                        </b-card>
                      </div>
                    </b-col>
                  </b-row>
                </ValidationObserver>
                <div class="row mx-0 justify-content-between">
                      <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
                      <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
                </div>
        </b-modal>


  </Layout>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import moment from 'moment';

/**
 * Dashboard component
 */
export default {
  components: {
    vSelect,
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
      cargo:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      desde: "",
      hasta: "",
      grupoid: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      periodos: [],
      cargos: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["periodo","grupo_de_estandares","numero_de_estandar","total","status","actions"],
      bases: [], 
      libres: [], 
      todas: [],
      procesos: [],  
      subprocesos:[],
      subproceso:[],
      mejoras: [], 
      acciones: [], 
      estandares:[], 
      autoevaluaciones:[],
      clasificacion:[],
      grupos:[], 
      subgrupos:[], 
      editMode:false,
      editModeMejora:false,
      priorizada:0,
      sinpriorizar:0,
      programadas:0,
      form:{
            'id': '',
            'autoevaluacionc_id': '',
            'numero':'',
            'grupo_id':'',
            'subgrupo_id':'',
            'estandar_id':'',
            'aplicabilidad':'',
            'enfoque_sistematico':'',
            'enfoque_proactivo':'',
            'enfoque_em':'',
            'despliegue_institucional':'',
            'apropiacion_cie':'',            
            'pertinencia':'',
            'consistencia':'',
            'avance_mediacion':'',
            'tendencia':'',
            'comparacion':'',
            'promedio':'',
          },
      mejora:[],
      accion:{
            'id': '',
            'mejora_id': '',
            'clasificacion_id': '',
            'proceso_id': '',
            'subproceso_id': '',
            'responsable_id': '',
            'total':1,
            'fecha_ejecucion':'',
            'fecha_programada':'',
            'evidencia_solicita':'',
            'descripcion_accion':'',
            'responsable_id':'',
            'subproceso_id':'',
            'proceso_id':'',
          },
          buscador:{
              'tipo_id': '',
              'subproceso_id':'',
              'proceso_id':'',
            },
          dato:'',
          filtro:[],
          search:'',
    }
  },

  methods: {
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
    ...mapActions(['guardarUsuario']),
    datear(){
      if (this.dato) {
              this.filtro=this.mejoras.find(post => post.id == this.dato);
      }else{
        this.filtro = this.mejoras;
      }
    },
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarAcccionCuestion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarAccionCuestion();
          } else {
        }});
      }
    },
    async listarclasificacion(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/eventos/calisficacion/listar',data)
        .then((response) => {
          this.clasificacion = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
    agregarAcccionCuestion(id){
        this.$swal({
          title: 'Desea progrmar una acción para esta mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.programarAcccion();
          }
        })
    },
    async  programarAcccion(){
     let data = new FormData();
       var formulario = this.accion;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.post('api/acciones', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_acciones", "#btnShow");
              this.listarAcciones();
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
      editarAccionCuestion(id){
        this.$swal({
          title: 'Desea editar esta acción?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.editarAcccion();
          }
        })
    },
    async  editarAcccion(){
     let data = new FormData();
       var formulario = this.accion;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.put('api/acciones', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Editado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_acciones", "#btnShow");
              this.listarAcciones();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
          eliminarAccionC(id){
        this.$swal({
          title: 'Desea borrar esta acción?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarAccion(id);
          }
        })
      },
      async eliminarAccion(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/acciones/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarPlan();
                this.listarAcciones();
                }
              }).catch(e => {
                  this.$swal(
                    'No se pudo eliminar!',
                      '',
                      'danger'
                );
          });
      },
      setearAccion(id) {
        for (let index = 0; index < this.acciones.length; index++) {
          this.acciones[index];
          if (this.acciones[index].id===id) {
            console.log(this.acciones[index]);
            this.accion.id=this.acciones[index].id;
            this.accion.mejora_id=this.acciones[index].mejora_id;
            this.accion.clasificacion_id=this.acciones[index].clasificacion_id;
            this.accion.proceso_id=this.acciones[index].proceso_id;
            this.accion.subproceso_id=this.acciones[index].subproceso_id;
            this.accion.responsable_id=this.acciones[index].responsable_id;
            this.accion.total=this.acciones[index].total;
            this.mejora=this.acciones[index].mejora;
            this.accion.fecha_ejecucion=moment(this.acciones[index].fecha_ejecucion).format("YYYY-MM-DDTHH:MM");
            this.accion.fecha_programada=moment(this.acciones[index].fecha_programada).format("YYYY-MM-DDTHH:MM");
            this.accion.evidencia_solicitada=this.acciones[index].evidencia_solicitada;
            this.accion.descripcion_accion=this.acciones[index].descripcion_accion;
            this.accion.responsable_id=this.acciones[index].responsable_id;
            if (!this.acciones[index].subproceso_id) {
              this.accion.subproceso_id="NA"
            }else{
              this.accion.subproceso_id=this.acciones[index].subproceso_id;
            }
            this.accion.proceso_id=this.acciones[index].proceso_id;
            this.editMode=true;
            this.$root.$emit("bv::show::modal", "modal_acciones", "#btnShow");
           
          }
        }
          
      },
   capSubproceso(){
      for (let index = 0; index < this.procesos.length; index++) {
       if(this.procesos[index].id == this.accion.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
         console.log(this.subproceso)
       }
      if(this.procesos[index].id == this.buscador.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
         console.log(this.subproceso)
       }
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
//////mejora///////
      ajuntarLibreCuestion(id){
        this.$swal({
          title: 'Desea adjuntar esta oportnidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.adjuntarMejora(id);
          }
        })
      },
      async adjuntarMejora(id){
     let data = new FormData();
      data.append('id',id);
      data.append('plan_id',this.$route.params.id);
       await this.axios.post('api/mejoras/adjuntar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.listarLibres();
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },
      desvincularCuestion(id){
        this.$swal({
          title: 'Desea devincular esta oportnidad de mejora?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.desvincularMejora(id);
          }
        })
      },
      async desvincularMejora(id){
     let data = new FormData();
      data.append('id',id);
      data.append('plan_id',this.$route.params.id);
       await this.axios.post('api/mejoras/desvincular', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Desvinculado con exito!',
                    '',
                    'success');
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo agregar!','','warning');
          });
      },  
      adjuntarMasivamenteCuestion(id){
        this.$swal({
          title: 'Desea vincular las oportunidades de mejora en este rango de puntuación?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.adjuntarMasivamente(id);
          }
        })
      },
      async adjuntarMasivamente(id){
      let data = new FormData();
        data.append('desde',this.desde);
        data.append('hasta',this.hasta);
        data.append('cliente_id',this.usuarioDB.id);
        data.append('plan_id',this.$route.params.id);
        await this.axios.post('api/mejoras/adjuntarrango', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Vinculadas con exito!',
                      '',
                      'success');
                this.listarLibres();
                this.listarPlan();
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
    async listarPlan(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/autoevaluacion/cuantitativa/find', data)
          .then((response) => {
             if (response.status==200) {
               console.log(response.data);
              this.form.id=response.data.id; 
              this.form.nombre=response.data.nombre; 
              this.form.periodo=response.data.periodo.nombre; 
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async listarAcciones(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/acciones/listar', data)
          .then((response) => {
             if (response.status==200) {
               console.log(response);
              this.acciones=response.data; 
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
               this.mejora=response.data; 
               this.accion.mejora_id=response.data.id;
               this.editModeMejora=true;
               this.$root.$emit("bv::show::modal", "modal_acciones", "#btnShow");
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
        async  listarestandares(){
            await this.axios.get('api/estandares/listar')
            .then((response) => {
                this.estandares = response.data;
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
      async  listarProceso(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/procesos/listar',data)
            .then((response) => {
                this.procesos = response.data.rows;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
         },
        async  listarSubproceso(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/subprocesos/listar',data)
            .then((response) => {
                this.subprocesos = response.data.rows;
                console.log(response.data)
            })
            .catch((e)=>{
                console.log('error' + e);
            })
      },
    async listarLibres(){
      let data = new FormData();
      data.append('base_id',this.form.base_id);
      data.append('cliente_id',this.usuarioDB.id);
        await this.axios.post('api/mejoras/libres',data)
          .then((response) => {
             if (response.status==200) {
               this.libres=response.data
               this.$root.$emit("bv::show::modal", "modal_libres", "#btnShow");
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
      async filtrar(){
      let data = new FormData();
      data.append('periodo_id',this.form.periodo_id);
      data.append('grupo_id',this.grupoid);
        await this.axios.post('api/mejoras/filtrarPeriodo',data)
          .then((response) => {
             if (response.status==200) {
                 this.libres=response.data;
                 if (this.libres.length<1) {
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
      async listarMejoras(){
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
    async listarCargos(){
      let data = new FormData();
      data.append('cliente_id',this.cliente.id);
        await this.axios.post('api/cargos/listar',data)
          .then((response) => {
            this.cargos = response.data;
            this.listarperfil();
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
        this.session();
        this.listarPlan();
        this.listargruposestandares();
        this.listarestandares();
        this.listarCargos();
        this.listarProceso();
        this.listarSubproceso();
        this.listarclasificacion();
        this.listarAcciones();
      },
   watch: {
      cliente: function () {
       this.listarCargos();
       this.listarPlan();
       this.form.cliente_id=this.cliente.id;
       this.title=this.cliente.nombre_prestador;
       this.form.cliente_id=this.usuarioDB.id;
       this.listargruposestandares();
       this.listarestandares();
       this.listarProceso();
       this.listarSubproceso();
       this.listarclasificacion();
       this.listarAcciones();
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.acciones.length;
    },
    filteredItems() {
      return this.mejoras.filter(item => {
         return item.oportunidad_mejoras.indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
}
</script>
<style scoped>

</style>
