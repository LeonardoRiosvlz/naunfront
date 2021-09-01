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
                <span class="mt-2 d-none d-sm-block">ESTANDARES DE CALIDAD</span>
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
                <ul class="list-unstyled chat-list" style="overflow-y: scroll; height:500px">
                  <li v-for="mejora in filtrados"  :key="mejora.id">
                      <div class="media align-items-center pl-4 my-3">
                        <div class="avatar-xs mr-3">
                          <span
                            class="avatar-title rounded-circle bg-light text-body">EC</span>
                        </div>

                        <div class="media-body p-0">
                          <h5 class="font-size-14 mb-0"> {{mejora.id}}</h5>
                          <p class="text-mouted m-0">Código {{mejora.codigo}}</p>
                          <b-button class="float-right btn-success btn-sm mr-2" left @click="$bvModal.show('modal_acciones');editMode=false;resete(mejora.id);ver=false;">Evaluar</b-button>
                        </div>
                      </div>
                     <hr class="m-0">
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
                            <b-button class="float-right btn-info" left @click="cerrarEvaluacionC">Cerrar evaluación</b-button>
                          </div>
                      <div class="row">
                        <div class="col-sm-3 text-center">
                            <p class="text-muted text-truncate mb-2">EVALUADOS</p>
                            <h5 class="mb-0 text-success">{{acciones.length}}/160</h5>
                        </div>
                        <div class="col-sm-3 text-center">
                            <p class="text-muted text-truncate mb-2">APLICAN</p>
                            <h5 class="mb-0 text-success">{{evaluadas.length}}/160</h5>
                        </div>
                        <div class="col-sm-3 text-center">
                            <p class="text-muted text-truncate mb-2">PUNTAJE</p>
                            <h5 class="mb-0">{{totales}}/ {{evaluadas.length*50}}</h5>
                        </div>
                        <div class="col-sm-3 text-center">
                            <p class="text-muted text-truncate mb-2">PROMEDIO</p>
                            <h5 class="mb-0">{{promedio}}</h5>
                        </div>
                      </div>
                      <hr class="">
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
                        <template v-slot:cell(numero_estandar)="data">
                          {{data.item.estandare.numero}}
                        </template>
                        <template v-slot:cell(codigo)="data">
                          {{data.item.estandare.codigo}}
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




      <b-modal id="modal_acciones" false size="xl"  title="Calificar estandar" hide-footer>
                <ValidationObserver  ref="form">
                  <b-row>
                    <b-col>
                        <div class="form-group">
                            <label>Numero del estandar</label>
                            <ValidationProvider name="numero" rules="required" v-slot="{ errors }" >
                                <input v-model="form.numero" @change="buscarGrupos()"  type="text" class="form-control" placeholder=" " disabled>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </b-col>
                    <b-col>
                    <div class="form-group">
                      <label> Codigo del estandar</label>
                      <ValidationProvider name="codigo" rules="required" v-slot="{ errors }" disabled>
                        <select v-model="form.numero"  @change="buscarGrupos()"  name="tipo" class="form-control " >
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
                      <ValidationProvider name="grupo" rules="required" v-slot="{ errors }" >
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
                      <ValidationProvider name="sub grupo" rules="required" v-slot="{ errors }" >
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
                                <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" "></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                     <b-col>
                        <div class="form-group">
                        <label>Criterios</label>
                        <ValidationProvider name="criterios" rules="required" v-slot="{ errors }">
                                <textarea v-model="form.criterios"  type="text" class="form-control" placeholder=" " ></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                    <div class="form-group">
                      <label> Aplicabilidad</label>
                      <ValidationProvider name="aplicabilidad" rules="required" v-slot="{ errors }" >
                        <select v-model="form.aplicabilidad" name="tipo" class="form-control " :disabled="ver">
                            <option value="APLICA">APLICA</option>
                            <option value="NO APLICA">NO APLICA</option>
                        </select>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                   </b-col>
                  </b-row>

                  <b-row v-if="form.aplicabilidad==='APLICA'">
                    <div class="col-10">
                      <div class="accordion" role="tablist">
                        <b-card no-body class="mb-1">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-1 variant="dark">ENFOQUE</b-button>
                          </b-card-header>
                          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                              <div class="row">
                                <div class="col-12">
                                  <label>Enfoque sistémico</label>
                                        <p class="small text-muted text-justify">
                                         <b> Descripción:</b> Ejercicio de aplicación disciplinado que 
                                          abarca todos los procesos y el contenido del 
                                          estándar; que hace una visión de conjunto de 
                                          la institución; que contempla un ciclo PHVA
                                        </p>
                                 <div class="form-group">
                                  <div class="row">
                                    <div class="col-2">
                                      <ValidationProvider name="enfoque sistematico" rules="required" v-slot="{ errors }">
                                        <select v-model="form.enfoque_sistematico" @change="calcularPromedio()" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                    </div>
                                    <div class="col-10 my-0">
                                      <h6 class=" my-0" v-if="form.enfoque_sistematico">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico=='1'">
                                          Ejercicio de aplicación disciplinado que 
                                          abarca todos los procesos y el contenido del 
                                          estándar; que hace una visión de conjunto de 
                                          la institución; que contempla un ciclo PHVA.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico=='2'">
                                          Comienzo de un enfoque sistémico 
                                          para los propósitos básicos del 
                                          estándar y empieza a estar presente 
                                          en algunos servicios o procesos. El 
                                          enfoque y los procesos a través de los 
                                          cuales se despliega está documentado.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico=='3'">
                                          El enfoque es sistémico, alcanzable 
                                          para lograr los propósitos del estándar 
                                          que se desea evaluar en procesos 
                                          clave.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico=='4'">
                                          El enfoque es sistémico tiene buen 
                                          grado de integración que responde a 
                                          todos los propósitos del estándar en la 
                                          mayoría de los procesos. Relacionado 
                                          con el direccionamiento estratégico.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_sistematico=='5'">
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
                              <hr class="m-0">
                              <div class="row">
                                <div class="col-12 py-1">
                                <label>Enfoque proactivo</label>
                                        <p class="small text-muted text-justify">
                                          <b> Descripción:</b>  Grado en que el enfoque es preventivo y se 
                                            adelanta a la
                                            ocurrencia del problema de calidad, a partir 
                                            de la gestión del riesgo
                                        </p>
                                 <div class="form-group">
                                <div class="row">
                                  <div class="col-2">
                                    <ValidationProvider name="enfoque proactivo" rules="required" v-slot="{ errors }">
                                          <select v-model="form.enfoque_proactivo" @change="calcularPromedio()" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                          </select>
                                          <span style="color:red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="col-10 my-0">
                                        <h6 class="my-0"  v-if="form.enfoque_proactivo">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo=='1'">
                                          Los enfoques son 
                                          mayoritariamente reactivos, la 
                                          información presentada es 
                                          anecdótica y desarticulada, sin 
                                          evidencia de la gestión del 
                                          riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo=='2'">
                                          Etapas iniciales de transición de la 
                                          reacción a la prevención de 
                                          problemas. Etapas iniciales de la 
                                          gestión del riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo=='3'">
                                          Enfoque mayoritariamente preventivo 
                                          hacia el manejo y control de los 
                                          procesos aun cuando existen algunos 
                                          en donde se actúa reactivamente. Se 
                                          identifican herramientas de la gestión 
                                          del riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo=='4'">
                                          El enfoque es mayoritariamente 
                                          proactivo y preventivo en todos los 
                                          procesos y se evidencian resultados 
                                          parciales de la gestión del riesgo.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_proactivo=='5'">
                                          El enfoque es proactivo y preventivo en 
                                          todos los procesos. Hay evidencia de la 
                                          gestión del riesgo.
                                        </p>
                                  </div>
                                </div>

                                  </div>
                                </div>
                              </div>
                               <hr class="m-0">
                              <div class="row">
                                <div class="col-12">
                                <label>Enfoque evaluado y mejorado</label>
                                  <p class="small text-muted text-justify">
                                    <b> Descripción:</b> Forma en que se evalúa y mejora el enfoque 
                                      y su asimilación.
                                  </p>
                                  <div class="row">
                                    <div class="col-2">
                                      <div class="form-group">
                                        <ValidationProvider name="enfoque evaluado y mejorado" rules="required" v-slot="{ errors }">
                                              <select v-model="form.enfoque_em" @change="calcularPromedio()" name="enfonque_sitematico" class="form-control" :disabled="ver" >
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
                                    <div class="col-10 ">
                                        <h6 class=" my-0 ext-center" v-if="form.enfoque_em">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em=='1'">
                                            La información presentada es 
                                            anecdótica y desarticulada, no 
                                            hay evidencias (hechos y datos).
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em=='2'">
                                            La evidencia de un proceso de 
                                            evaluación y mejoramiento del 
                                            enfoque es limitada. Esbozo de 
                                            algunos hechos y datos, 
                                            desarticulados.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em=='3'">
                                            El proceso de mejoramiento está 
                                            basado en hechos y datos (acciones 
                                            específicas realizadas y registradas) 
                                            sobre procesos claves que abarcan la 
                                            mayoría de productos y servicios.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em=='4'">
                                          Existe un proceso de mejoramiento 
                                          basado en hechos y datos como 
                                          herramienta básica de dirección.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.enfoque_em=='5'">
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
                          
                            </b-card-body>
                          </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-2 variant="primary">IMPLEMENTACION</b-button>
                          </b-card-header>
                          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                               <div class="row">
                                <div class="col-12">
                                  <label>Despliegue en la institución</label>
                                        <p class="small text-muted text-justify">
                                           <b> Descripción:</b>  Grado en que se ha implementado el enfoque 
                                            y es consistente en los distintos servicios o 
                                            procesos de la organización.
                                        </p>
                                  <div class="row">
                                    <div class="col-2">
                                      <div class="form-group">
                                        <ValidationProvider name="despliegue institucional" rules="required" v-slot="{ errors }">
                                              <select v-model="form.despliegue_institucional" @change="calcularPromedio()" name="enfonque_sitematico" class="form-control" :disabled="ver" >
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
                                    <div class="col-10">
                                        <h6 class=" m-0" v-if="form.despliegue_institucional">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional=='1'">
                                            El enfoque se ha implementado 
                                            en algunos servicios o procesos 
                                            pero se refleja su debilidad.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional=='2'">
                                            La implementación del enfoque se da 
                                            en algunos servicios o procesos 
                                            operativos principales y existen 
                                            brechas muy significativas en procesos 
                                            importantes.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional=='3'">
                                            La implementación está más avanzada 
                                            en servicios o procesos claves y no 
                                            existen grandes brechas con respec-to 
                                            a otros servicios o procesos.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional=='4'">
                                          Existe un enfoque bien desplegado en 
                                          todos los servicios o procesos, con 
                                          brechas no significativas en aquellos de 
                                          sop.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.despliegue_institucional=='5'">
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
                              <hr class="m-1">
                              <div class="row">
                                <div class="col-12">
                                 <div class="form-group">
                                  <label>Apropiación por el cliente interno y/o externo</label>
                                        <p class="small text-muted text-justify">
                                           <b> Descripción:</b>  Grado en que el cliente del despliegue 
                                            (cliente interno y/o externo) entiende y aplica 
                                            el enfoque, según la naturaleza y propósitos 
                                            del estándar.
                                        </p>
                                  <div class="row">
                                    <div class="col-2">
                                      <ValidationProvider name="apropiacion cliente i/e" rules="required" v-slot="{ errors }">
                                              <select v-model="form.apropiacion_cie" @change="calcularPromedio()" name="enfonque_sitematico" class="form-control" :disabled="ver" >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                              <span style="color:red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-10">
                                        <h6 class="my-0">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie=='1'">
                                            El enfoque no lo apropian los 
                                            clientes.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie=='2'">
                                            Hay evidencias de apropiación en unos 
                                            pocos clientes internos o externos, 
                                            pero este no es consistente.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie=='3'">
                                            Hay evidencias de apropiación parcial 
                                            del enfoque en los principales clientes 
                                            con un grado mínimo de consistencia.

                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie=='4'">
                                            El enfoque lo apropian la mayoría de 
                                            los usuarios y es medianamente 
                                            consistente.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.apropiacion_cie=='5'">
                                          El enfoque está apropiado en la 
                                          totalidad de los usuarios y es 
                                          totalmente consistente.
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
                            <b-button block v-b-toggle.accordion-3 variant="info">RESULTADOS</b-button>
                          </b-card-header>
                          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                              <div class="row">
                                <div class="col-12">
                                 <div class="form-group">
                                  <label>Pertinencia</label>
                                    <p class="small text-muted text-justify">
                                     <b> Descripción:</b>  Grado en que los resultados referidos 
                                      (hechos, datos e indicadores) se relacionan 
                                      los criterios y requisitos del estándar 
                                      evaluado.
                                    </p>
                                    <div class="row">
                                      <div class="col-2">
                                        <ValidationProvider name="pertenencia" rules="required" v-slot="{ errors }">
                                              <select v-model="form.pertinencia" @change="calcularPromedio()" name="pertinencia" class="form-control" :disabled="ver" >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                              <span style="color:red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-10">
                                         <h6 class="my-0">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia=='1'">
                                            Los datos presentados no 
                                            responden a los factores, 
                                            productos o servicios claves del 
                                            estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia=='2'">
                                            Los datos presentados son parciales y 
                                            se refieren a unos pocos factores, 
                                            productos o servicios claves solicitados 
                                            en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia=='3'">
                                            Los datos presentados se refieren al 
                                            desempeño de algunos servicios o 
                                            procesos claves, factores, productos 
                                            y/o servicios solicitados.

                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia=='4'">
                                            La mayoría de los resultados referidos 
                                            se relacionan con el servicio o proceso, 
                                            factores, productos y/o servicios 
                                            solicitados en el estándar, alcanzando 
                                            los objetivos y metas propuestas.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.pertinencia=='5'">
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
                            <hr class="m-0">
                            <div class="row">
                                <div class="col-12">
                                 <div class="form-group">
                                  <label>Consistencia</label>
                                    <p class="small text-muted text-justify">
                                      <b> Descripción:</b> Relación de los resultados como producto de 
                                      la implementación
                                      del enfoque.
                                    </p>
                                    <div class="row">
                                      <div class="col-2">
                                        <ValidationProvider name="consistencia" rules="required" v-slot="{ errors }">
                                              <select v-model="form.consistencia" @change="calcularPromedio()" name="pertinencia" class="form-control" :disabled="ver" >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                              <span style="color:red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-10">
                                        <h6 class="my-0">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.consistencia=='1'">
                                            Solo existen ejemplos 
                                            anecdóticos de aspectos poco 
                                            relevantes y no hay evidencia de 
                                            que sean resultado de la 
                                            implementación del enfoque.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencia=='2'">
                                            Se comienzan a obtener resultados 
                                            todavía incipientes de la aplicación del 
                                            enfoque.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencia=='3'">
                                            Existe evidencia que algunos logros 
                                            son causados por el enfoque 
                                            implementado y por las acciones de 
                                            mejoramiento.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencia=='4'">
                                            La mayoría de los resultados responden 
                                            a la implementación del enfoque y a las 
                                            acciones de mejoramiento.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.consistencia=='5'">
                                            Todos los resultados son causados por 
                                            la implementación de enfoques y las 
                                            acciones sistemáticas de mejoramiento.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                           <hr class="m-0">
                            <div class="row">
                                <div class="col-12">
                                 <div class="form-group">
                                  <label>Avance de la medición</label>
                                    <p class="small text-muted text-justify">
                                      <b> Descripción:</b> Grado en que la medición responde a una 
                                      práctica sistémica de la organización en un 
                                      período de tiempo que le permita su
                                      Consolidación y existen indicadores definidos 
                                      para la medición del estándar evaluado, 
                                      calidad y pertinencia de los mismos.
                                    </p>
                                    <div class="row">
                                      <div class="col-2">
                                        <ValidationProvider name="avance de la mediacion" rules="required" v-slot="{ errors }">
                                              <select v-model="form.avance_mediacion" @change="calcularPromedio()" name="pertinencia" class="form-control" :disabled="ver" >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                              <span style="color:red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-10">
                                        <h6 class="my-0">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion=='1'">
                                          No existen indicadores que 
                                          muestren tendencias en la 
                                          calidad y el desempeño de los 
                                          procesos. La organización se 
                                          encuentra en una etapa muy 
                                          temprana de medición.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion=='2'">
                                          Existen algunos indicadores que 
                                          muestran el desempeño de procesos. 
                                          La organización se encuentra en una 
                                          etapa media del desarrollo de la 
                                          medición.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion=='3'">
                                          Existen indicadores que monitorean los 
                                          procesos y muestran ya tendencias 
                                          positivas de mejoramiento en algunos 
                                          servicios o procesos claves, factores, 
                                          productos y/o servicios solicitados en el 
                                          estándar. Algunos servicios o procesos 
                                          reportados pueden estar en etapas 
                                          recientes de medición.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion=='4'">
                                          Existen procesos de medición 
                                          sistémicos para la mayoría de los 
                                          servicios o procesos y factores claves 
                                          de éxito solicitados en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.avance_mediacion=='5'">
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
                            <hr class="m-0">
                            <div class="row">
                                <div class="col-12">
                                 <div class="form-group">
                                  <label>Tendencia</label>
                                    <p class="small text-muted text-justify">
                                       <b> Descripción:</b> Desempeño de los indicadores en el tiempo. 
                                        Puede ser positiva
                                        cuando los datos muestran una mejoría 
                                        general a lo largo del tiempo.
                                    </p>
                                    <div class="row">
                                      <div class="col-2">
                                        <ValidationProvider name="tendencia" rules="required" v-slot="{ errors }">
                                              <select v-model="form.tendencia" @change="calcularPromedio()" name="pertinencia" class="form-control" :disabled="ver" >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                              <span style="color:red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-10">
                                        <h6 class="my-0">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.tendencia=='1'">
                                            El estadio de la medición y por lo 
                                            tanto de los resultados, no 
                                            garantizan tendencias confiables.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia=='2'">
                                            Se muestran resultados muy recientes 
                                            que aunque no permiten tener 
                                            suficientes bases para establecer 
                                            tendencias, el proceso es sistemático y 
                                            se empiezan a tomar decisiones 
                                            operativas con base en la información.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia=='3'">
                                            Se presentan tendencias de 
                                            mejoramiento de algunos factores 
                                            claves del estándar. Proceso 
                                            sistemático y estructurado.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia=='4'">
                                            La mayoría de los indicadores alcanzan 
                                            niveles satisfactorios y muestran firmes 
                                            tendencias de mejoramiento de los 
                                            servicios o procesos claves, factores, 
                                            productos y/o servicios, lo cual se 
                                            refleja en que van de bueno a 
                                            excelente.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.tendencia=='5'">
                                            Se observan tendencias positivas y 
                                            sostenidas de mejoramiento de todos 
                                            los datos a lo largo del tiempo.  
                                        </p>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                           <hr class="m-0">
                            <div class="row">
                                <div class="col-12">
                                 <div class="form-group">
                                  <label>Comparación</label>
                                    <p class="small text-muted text-justify">
                                      <b> Descripción:</b>  Grado en que los resultados son comparados 
                                        con referentes
                                        nacionales e internacionales y la calidad de 
                                        los mismos.
                                    </p>
                                    <div class="row">
                                      <div class="col-2">
                                        <ValidationProvider name="comparacion" rules="required" v-slot="{ errors }">
                                              <select v-model="form.comparacion" @change="calcularPromedio()" name="pertinencia" class="form-control" :disabled="ver" >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                              <span style="color:red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-10">
                                        <h6 class="my-0">Criterios</h6>
                                        <p class="small text-muted text-justify" v-if="form.comparacion=='1'">
                                            No existen políticas, ni prácticas 
                                            de comparación de los procesos 
                                            de la organización con los 
                                            mejores.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion=='2'">
                                            Se encuentran algunas prácticas 
                                            independientes de comparación, poco 
                                            estructuradas y no sistemáticas.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion=='3'">
                                            Existe una política de comparación con 
                                            las mejores prácticas y se encuentra en 
                                            etapa temprana de comparación de 
                                            algunos procesos, productos críticos y 
                                            servicios solicitados en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion=='4'">
                                            Se encuentra en etapa madura de 
                                            comparación con las mejores prácticas 
                                            a nivel nacional de servicios o 
                                            procesos, productos y/o factores claves 
                                            solicitados en el estándar.
                                        </p>
                                        <p class="small text-muted text-justify" v-if="form.comparacion=='5'">
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
                             <hr class="m-0">
                            </b-card-body>
                          </b-collapse>
                        </b-card>
                      </div>
                    </div>
                    <div class="col-2 text-center">
                      <div class="col-sm-12">
                          <p class="text-muted text-truncate mb-2">PUNTAJE</p>
                          <h5 class="mb-0">{{form.total}}</h5>
                      </div>
                      <div class="col-sm-12">
                          <p class="text-muted text-truncate mb-2">PROMEDIO</p>
                          <h5 class="mb-0">{{form.promedio}}</h5>
                      </div>
                      <hr>
                      <div class="col-sm-12 my-1">
                        <div>
                          <div class="mb-3">
                            <apexchart
                              class="apex-charts"
                              height="60"
                              wight="60"
                              dir="ltr"
                              :series="enfoque.series"
                              :options="enfoque.chartOptions"
                            ></apexchart>
                          </div>
                          <p class="text-muted text-truncate mb-2">ENFOQUE</p>
                          <h5 class="mb-0">{{form.total_enfoque | decimales}} %</h5>
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div class="mt-5 mt-sm-0">
                          <div class="mb-3">
                            <apexchart
                              class="apex-charts"
                              height="60"
                              wight="60"
                              dir="ltr"
                              :series="implementacion.series"
                              :options="implementacion.chartOptions"
                            ></apexchart>
                          </div>

                          <p class="text-muted text-truncate mb-2">IMPLEMENTACION</p>
                          <h5 class="mb-0">{{form.total_implementacion}} %</h5>
                        </div>
                      </div>

                    <div class="col-sm-12">
                        <div class="mt-5 mt-sm-0">
                          <div class="mb-3">
                            <apexchart
                              class="apex-charts"
                              height="60"
                              wight="60"
                              dir="ltr"
                              :series="resultados.series"
                              :options="resultados.chartOptions"
                            ></apexchart>
                          </div>

                          <p class="text-muted text-truncate mb-2">RESULTADOS</p>
                          <h5 class="mb-0">{{form.total_resultados}} %</h5>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="mt-5 mt-sm-0">
                          <div class="mb-3">
                            <apexchart
                              class="apex-charts"
                              height="60"
                              wight="60"
                              dir="ltr"
                              :series="resultados.series"
                              :options="total.chartOptions"
                            ></apexchart>
                          </div>

                          <p class="text-muted text-truncate mb-2">TOTAL</p>
                          <h5 class="mb-0">{{form.total_total}} %</h5>
                        </div>
                      </div>
                    </div>
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
      evaluadas: [],
      cargos: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["codigo","numero_estandar","total","promedio","actions"],
      bases: [], 
      libres: [], 
      todas: [],
      procesos: [],  
      subprocesos:[],
      subproceso:[],
      mejoras: [], 
      acciones: [], 
      estandares:[], 
      estandares_ae:[],
      autoevaluaciones:[],
      clasificacion:[],
      grupos:[], 
      subgrupos:[], 
      editMode:false,
      editModeMejora:false,
      priorizada:0,
      sinpriorizar:0,
      programadas:0,
      totales:0,
      promedio:0,
      form:{
            'id': '',
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
            'descripcion':'',
            'criterios':'',
          },
      enfoque: {
        series: [0],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#343a40"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },
              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      implementacion: {
        series: [0],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#5664d2"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },

              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      resultados: {
        series: [0],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#4aa3ff"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },

              dataLabels: {
                show: false
              }
            }
          }
        }
      }, 
      total: {
        series: [0],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#1cbb8c"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },

              dataLabels: {
                show: false
              }
            }
          }
        }
      },     
      mejora:[],
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
  filters: {
        decimales: function (value) {
           let valueFinal = parseInt(value);
           return valueFinal
        }
  },
  methods: {
    resete(id){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
       this.form.numero=id;
       this.buscarGrupos();
    },
    calcularPromedio(){
      this.form.total=0;
      this.form.total_enfoque= ((parseInt(this.form.enfoque_sistematico)+parseInt(this.form.enfoque_proactivo)+parseInt(this.form.enfoque_em))*100)/15;
      this.enfoque.series=[this.form.total_enfoque];
      this.form.total_implementacion= ((parseInt(this.form.despliegue_institucional)+parseInt(this.form.apropiacion_cie))*100)/10;
      this.implementacion.series=[this.form.total_implementacion];
      this.form.total_resultados= ((parseInt(this.form.pertinencia)+parseInt(this.form.consistencia)+parseInt(this.form.avance_mediacion)+parseInt(this.form.tendencia)+parseInt(this.form.comparacion))*100)/25;
      this.resultados.series=[this.form.total_resultados];
      this.form.total_total= ((parseInt(this.form.enfoque_sistematico)+parseInt(this.form.enfoque_proactivo)+parseInt(this.form.enfoque_em)+parseInt(this.form.despliegue_institucional)+parseInt(this.form.apropiacion_cie)+parseInt(this.form.pertinencia)+parseInt(this.form.consistencia)+parseInt(this.form.avance_mediacion)+parseInt(this.form.tendencia)+parseInt(this.form.comparacion))*100)/50;
      this.total.series=[this.form.total_total];
      this.form.total= parseInt(this.form.enfoque_sistematico)+parseInt(this.form.enfoque_proactivo)+parseInt(this.form.enfoque_em)+parseInt(this.form.despliegue_institucional)+parseInt(this.form.apropiacion_cie)+parseInt(this.form.pertinencia)+parseInt(this.form.consistencia)+parseInt(this.form.avance_mediacion)+parseInt(this.form.tendencia)+parseInt(this.form.comparacion); 
      this.form.promedio=parseInt(this.form.total)/10;
    },
    buscarGrupos(){
    if (this.form.numero<75) {
        this.form.grupo_id=1;
          for (let index = 0; index < this.subgrupos.length; index++) {
            if ( parseInt(this.subgrupos[index].desde)<=parseInt(this.form.numero)) {
                this.form.subgrupo_id= this.subgrupos[index].id;
                this.setearCriterios();
            }
        }
     }else{
        for (let index = 0; index < this.grupos.length; index++) {
            if ( parseInt(this.grupos[index].desde)<=parseInt(this.form.numero)) {
                this.form.grupo_id= this.grupos[index].id;
                this.form.subgrupo_id="";
                this.setearCriterios();
            }
        }
     }
    },
    setearCriterios(){
        for (let index = 0; index < this.estandares.length; index++) {
            if (this.estandares[index].numero==this.form.numero) {
               this.form.criterios=this.estandares[index].criterios; 
               this.form.descripcion=this.estandares[index].descripcion; 
               this.form.estandar_id=this.estandares[index].id; 
               console.log("setear criterios");
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
          title: 'Desea calificar este estandar ?',
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
    cerrarEvaluacionC(id){
        this.$swal({
          title: 'Desea cerrar esta evaluación?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.cerrarEvaluacion();
          }
        })
    },
    async  cerrarEvaluacion(){
     let data = new FormData();
      data.append('id',this.$route.params.id);
      data.append('promedio',this.promedio);
       await this.axios.post('api/autoevaluacion/cuantitativa/cerrar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Cerrado con exito!',
                    '',
                    'success');
              this.listarAcciones();
              this.listarPlan();
              }
            }).catch(e => {
               this.$swal('No se pudo cerrar!','','warning');
          });
      },
    async  programarAcccion(){
     let data = new FormData();
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
      data.append('autoevaluacionc_id',this.$route.params.id);
       await this.axios.post('api/autoevaluacion/cuantitativa/items', data, {
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
       var formulario = this.form;
        for (var key in formulario) {
          data.append(key,formulario[key]);
        }
       await this.axios.put('api/autoevaluacion/cuantitativa/items', data, {
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
          title: 'Desea borrar esta evaluacion?',
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
        await this.axios.post('api/autoevaluacion/cuantitativa/items/delete',data, {
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
            this.form.id=this.acciones[index].id;
            this.form.numero=this.acciones[index].numero;
            this.form.grupo_id=this.acciones[index].grupo_id;
            this.form.subgrupo_id=this.acciones[index].subgrupo_id;
            this.form.numero=this.acciones[index].estandar_id;
            this.form.aplicabilidad=this.acciones[index].aplicabilidad;
            this.form.enfoque_sistematico=this.acciones[index].enfoque_sistematico;
            this.form.enfoque_proactivo=this.acciones[index].enfoque_proactivo;
            this.form.enfoque_em=this.acciones[index].enfoque_em;
            this.form.despliegue_institucional=this.acciones[index].despliegue_institucional;
            this.form.apropiacion_cie=this.acciones[index].apropiacion_cie;
            this.form.pertinencia=this.acciones[index].pertinencia;
            this.form.consistencia=this.acciones[index].consistencia;
            this.form.avance_mediacion=this.acciones[index].avance_mediacion;
            this.form.tendencia=this.acciones[index].tendencia;
            this.form.comparacion=this.acciones[index].comparacion;
            this.form.promedio=this.acciones[index].promedio;
            this.form.cliente_id=this.acciones[index].cliente_id;
            this.form.nombre=this.acciones[index].nombre;
            this.form.periodo=this.acciones[index].periodo;
            this.form.total=this.acciones[index].total;
            this.editMode=true;
            this.buscarGrupos();
            this.calcularPromedio();
            this.$root.$emit("bv::show::modal", "modal_acciones", "#btnShow");
          }
        }
          
      },
   capSubproceso(){
      for (let index = 0; index < this.procesos.length; index++) {
       if(this.procesos[index].id == this.accion.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
       }
      if(this.procesos[index].id == this.buscador.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
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
        await this.axios.post('api/autoevaluacion/cuantitativa/items/listar', data)
          .then((response) => {
             if (response.status==200) {
              this.acciones=response.data; 
              this.listarestandaresae();
              this.listarAccionesEvaluadas();
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async listarAccionesEvaluadas(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/autoevaluacion/cuantitativa/items/evaluadas', data)
          .then((response) => {
             if (response.status==200) {
              this.evaluadas=response.data;
              this.totales=0;
              for (let index = 0; index < this.evaluadas.length; index++) {
               this.totales=this.totales+parseInt(this.evaluadas[index].total);
               console.log(this.totales);
              } 
             this.promedio = this.totales/(this.evaluadas.length*10);
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async setear_mejoras(id){
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/autoevaluacion/find',data)
          .then((response) => {
             if (response.status==200) {
              this.mejoras=response.data.mejoras;   
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
      async setear_mejora(id){
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/mejoras/find',data)
          .then((response) => {
             if (response.status==200) {
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
      async  listarestandaresae(){
            await this.axios.get('api/estandares/listar')
            .then((response) => {
                this.estandares_ae = response.data;
            for (let index = 0; index < this.acciones.length; index++) {
                 for (let llave = 0; llave < this.estandares_ae.length; llave++) {
                   if (this.acciones[index].estandar_id===this.estandares_ae[llave].id) {
                      this.estandares_ae.splice(llave, 1);
                   }               
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
        async  listargruposestandares(){
            await this.axios.get('api/estandares/grupos/listar')
            .then((response) => {
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
        this.listarCargos();
        this.listarProceso();
        this.listarSubproceso();
        this.listarclasificacion();
        this.listarAcciones();
        this.listarestandares();
      },
   watch: {
      cliente: function () {
       this.listarCargos();
       this.listarPlan();
       this.form.cliente_id=this.cliente.id;
       this.title=this.cliente.nombre_prestador;
       this.form.cliente_id=this.usuarioDB.id;
       this.listargruposestandares();
       this.listarProceso();
       this.listarSubproceso();
       this.listarclasificacion();
       this.listarAcciones();
       this.listarestandares();
      },
    },
    computed: {
      ...mapState(['usuarioDB','cliente']),
    rows() {
      return this.acciones.length;
    },
    filtrados() {
      return this.estandares_ae.filter(item => {
         return item.numero.indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
}
</script>
<style scoped>

</style>
