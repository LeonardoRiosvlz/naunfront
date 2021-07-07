<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="d-lg-flex mb-4">
        <div class="chat-leftsidebar">
            <div class="p-3 border-bottom">
            <div class="media">

                <div class="media-body">
                <h5 class="font-size-15 mt-0 mb-1">{{doc.nombre}}</h5>
                <p class="text-muted mb-0">
                    <i class="mdi mdi-circle text-success align-middle mr-1"></i>
                    Version actual: {{doc.version}}
                    Estado: {{doc.status}}
                </p>
                </div>
                <div>
                  <b-dropdown class="chat-noti-dropdown" right variant="white">
                      <template v-slot:button-content>
                      <i class="mdi mdi-dots-horizontal font-size-20"></i>
                      </template>
                      
                      <b-dropdown-item>Actualizar version (solo para estado habilitado)</b-dropdown-item>
                      <b-dropdown-item @click="setearD();editMode=false;ver=false;">Programar nueva versión</b-dropdown-item>
                  </b-dropdown>
                </div>
            </div>
            </div>

            <div class="card-body border-bottom py-2">
            <div class="search-box chat-search-box">
                <div class="position-relative">
                <input type="text" class="form-control" placeholder="Search..." />
                <i class="ri-search-line search-icon"></i>
                </div>
            </div>
            </div>

            <div class="chat-leftsidebar-nav">
              <b-tabs pills fill content-class="py-4" justified>
                <b-tab title="Tab 1" active>
                  <template v-slot:title>
                    <div @click="estado = 1" class="row align-items-center justify-content-center ">
                      <i class="ri-calendar-line font-size-20"></i>
                      <span class="mt-2 d-none d-sm-block mx-2 mb-2">Habilitados</span>
                    </div>
                  </template>
                  <b-card-text>
                          <div>
                  
                          <h5 class="font-size-14 px-3 my-3 ">Versiones</h5>
                          <simplebar style="max-height: 345px" id="scrollElement">
                              <ul class="list-unstyled chat-list">
                              <li
                                  class
                                  v-for="data in docs_Habilitados"
                                  :key="data.id"
                                  @click="chatUsername(data)"
                                  
                              >
                                  <a href="javascript: void(0);">
                                  <div class="media">
                                      <div
                                      class="user-img align-self-center mr-3"
                                      v-if="data.image"
                                      :class="{
                                          online: `${data.status}` === 'online',
                                          away: `${data.status}` === 'away',
                                      }"
                                      >
                                      
                                      </div>
                                      <div
                                      class="user-img mr-3"
                                      v-if="!data.image"
                                      :class="{
                                          online: `${data.status}` === 'online',
                                          away: `${data.status}` === 'away',
                                      }"
                                      >
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="3em" height="3em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M7 12.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm.75 2.25a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5zM7 18.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3.75-6.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zM10 15.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm8.664-9.086l-5.829-5.828a.493.493 0 0 0-.049-.04a.626.626 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414zM18.5 20a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621z" fill="#626262"/></g></svg>
                                      <span class="user-status"></span>
                                      </div>
                                      <div class="media-body overflow-hidden">
                                      <h5 class="text-truncate font-size-14 mb-1">
                                          {{ data.nombre }}
                                      </h5>
                                      <p class="text-truncate mb-0">
                                          {{ data.created_at }}
                                      </p>
                                      </div>
                                      <div class="font-size-11">{{ data.time }}</div>
                                  </div>
                                  </a>
                              </li>
                              </ul>
                          </simplebar>
                          </div>
                  </b-card-text>
                </b-tab>
              <!-- fecha_nueva_version -->
                <b-tab title="Tab 2">
                  <template v-slot:title>
                    <div @click="estado = 2" class="row align-items-center justify-content-center ">
                      <i class="ri-time-line font-size-20"></i>
                      <span class="mt-2 d-none d-sm-block mx-2 mb-2">En revisión</span>
                    </div>
                  </template>
                  <b-card-text>
                        <div>
                          <h5 class="font-size-14 px-3 my-3 ">Versiones</h5>
                          <simplebar style="max-height: 345px" id="scrollElement">
                              <ul class="list-unstyled chat-list">
                              <li
                                  class
                                  v-for="data of versiones"
                                  :key="data.id"
                                  @click="editMode=false;setear(data.id)"
                                  
                              >
                                  <a href="javascript: void(0);">
                                  <div class="media">
                                      <div
                                      class="user-img align-self-center mr-3"
                                      v-if="data.image"
                                      :class="{
                                          online: `${data.status}` === 'online',
                                          away: `${data.status}` === 'away',
                                      }"
                                      >
                                      
                                      </div>
                                      <div
                                      class="user-img mr-3"
                                      v-if="!data.image"
                                      :class="{
                                          online: `${data.status}` === 'online',
                                          away: `${data.status}` === 'away',
                                      }"
                                      >
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="3em" height="3em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M7 12.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm.75 2.25a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5zM7 18.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3.75-6.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zM10 15.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm8.664-9.086l-5.829-5.828a.493.493 0 0 0-.049-.04a.626.626 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414zM18.5 20a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621z" fill="#626262"/></g></svg>
                                      <span class="user-status"></span>
                                      </div>
                                      <div class="media-body overflow-hidden">
                                      <h5 class="text-truncate font-size-14 mb-1">
                                          {{ data.nombre }} <p class="text-truncate mb-0"></p>
                                      </h5>
                                      <p class="text-truncate mb-0">
                                         Version: v-{{ data.version }}
                                      </p>
                                      </div>
                                      
                                      <div>
                                        <div class="font-size-11 mr-1">{{ data.status }}</div>
                                        <div class="row justify-content-end  mx-0 mt-2 mr-1 align-items-end">
                                          <div>
                                            <svg class="mx-2" v-if="edit.status_elaboracion == 'En elaboración'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z" fill="blue"/><path d="M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z" fill="blue"/></svg>
                                            <svg class="mx-2" v-if="edit.status_elaboracion == 'Pendiente'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z" fill="orange"/><path d="M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z" fill="orange"/></svg>
                                            <svg class="mx-2" v-if="edit.status_elaboracion == 'Elaborado'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z" fill="green"/><path d="M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z" fill="green"/></svg>
                                          </div>
                                          <div>
                                            <svg v-if="data.status_revision == 'Rechazado'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="red"/></svg>
                                            <svg v-else-if="data.status_revision == 'Pendiente'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="orange"/></svg>
                                            <svg v-else class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="green"/></svg>
                                          </div>
                                          <div>
                                            <svg v-if="data.status_aprobacion == 'Rechazado'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M6 16h6v2H6z" fill="red"/><path d="M6 12h10v2H6z" fill="red"/><path d="M6 8h10v2H6z" fill="red"/><path d="M14 26H4V6h24v10h2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" fill="red"/><path d="M22 25.59L19.41 23L18 24.41l4 4l8-8L28.59 19L22 25.59z" fill="red"/></svg>
                                            <svg v-else-if="data.status_aprobacion == 'Pendiente'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M6 16h6v2H6z" fill="orange"/><path d="M6 12h10v2H6z" fill="orange"/><path d="M6 8h10v2H6z" fill="orange"/><path d="M14 26H4V6h24v10h2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" fill="orange"/><path d="M22 25.59L19.41 23L18 24.41l4 4l8-8L28.59 19L22 25.59z" fill="orange"/></svg>
                                            <svg v-else class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M6 16h6v2H6z" fill="green"/><path d="M6 12h10v2H6z" fill="green"/><path d="M6 8h10v2H6z" fill="green"/><path d="M14 26H4V6h24v10h2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" fill="green"/><path d="M22 25.59L19.41 23L18 24.41l4 4l8-8L28.59 19L22 25.59z" fill="green"/></svg>
                                          </div>
                                        </div>
                                      </div>
                                      
                                  </div>
                                  </a>
                              </li>
                              </ul>
                          </simplebar>
                          </div>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </div>
        </div>
        <div class="w-100 user-chat mt-4 mt-sm-0">
            <div class="p-3 px-lg-4 user-chat-border">
              
            <div class="row justify-content-between">
                <div v-if="edit.nombre != null" class="col-md-4 col-6 row">
                  <div>
                    <h5 class="font-size-15 mb-1 text-truncate">{{ edit.nombre }}</h5>
                    <p class="text-muted text-truncate mb-0">
                        <i class="mdi mdi-circle text-success align-middle mr-1"></i>
                      Version: v-{{edit.version}} 
                    </p>
                  
                    <span v-if="estado == 1" class="text-success">Habilitado</span>
                    <div v-else class="text-warning row align-items-center mx-0">
                      <span>En revisión</span>
                      <div class="row justify-content-end  mx-0 mr-1 align-items-end">
                        <div>
                          <svg class="mx-2" v-if="edit.status_elaboracion == 'En elaboración'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z" fill="blue"/><path d="M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z" fill="blue"/></svg>
                          <svg class="mx-2" v-if="edit.status_elaboracion == 'Pendiente'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z" fill="orange"/><path d="M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z" fill="orange"/></svg>
                          <svg class="mx-2" v-if="edit.status_elaboracion == 'Elaborado'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z" fill="green"/><path d="M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z" fill="green"/></svg>
                        </div>
                        <div>
                          <svg v-if="edit.status_revision == 'Rechazado'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="red"/></svg>
                          <svg v-if="edit.status_revision == 'Pendiente'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="orange"/></svg>
                          <svg v-if="edit.status_revision == 'Aprobado'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="green"/></svg>
                        </div>
                        <div>
                          <svg v-if="edit.status_aprobacion == 'Rechazado'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M6 16h6v2H6z" fill="red"/><path d="M6 12h10v2H6z" fill="red"/><path d="M6 8h10v2H6z" fill="red"/><path d="M14 26H4V6h24v10h2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" fill="red"/><path d="M22 25.59L19.41 23L18 24.41l4 4l8-8L28.59 19L22 25.59z" fill="red"/></svg>
                          <svg v-if="edit.status_aprobacion == 'Pendiente'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M6 16h6v2H6z" fill="orange"/><path d="M6 12h10v2H6z" fill="orange"/><path d="M6 8h10v2H6z" fill="orange"/><path d="M14 26H4V6h24v10h2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" fill="orange"/><path d="M22 25.59L19.41 23L18 24.41l4 4l8-8L28.59 19L22 25.59z" fill="orange"/></svg>
                          <svg v-if="edit.status_aprobacion == 'Aprobado'" class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.2em" height="1.2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M6 16h6v2H6z" fill="green"/><path d="M6 12h10v2H6z" fill="green"/><path d="M6 8h10v2H6z" fill="green"/><path d="M14 26H4V6h24v10h2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" fill="green"/><path d="M22 25.59L19.41 23L18 24.41l4 4l8-8L28.59 19L22 25.59z" fill="green"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <b-dropdown v-if="edit.diagramas != null && edit.archivo != null" class="chat-noti-dropdown ml-4" right variant="white">
                    <template v-slot:button-content>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="2em" height="2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M16 28l-7-7l1.4-1.4l5.6 5.6l5.6-5.6L23 21z" fill="#626262"/></svg>
                      </div>
                    </template>
                    <b-dropdown-item v-if="edit.diagramas != null" @click="obtener(edit.diagramas)">Ver diagrama</b-dropdown-item>
                    <b-dropdown-item v-if="edit.archivo != null" @click="obtener(edit.archivo)">Ver archivo </b-dropdown-item>
                    <b-dropdown-item v-if="edit.firma_elabora != null" @click="obtener(edit.firma_elabora)">Archivo firmado por elaboracion </b-dropdown-item>
                    <b-dropdown-item v-if="edit.firma_revisa != null" @click="obtener(edit.firma_revisa)">Archivo firmado por revision </b-dropdown-item>
                    <b-dropdown-item v-if="edit.firma_aprueba != null" @click="obtener(edit.firma_aprueba)">Archivo firmado por aprobacion </b-dropdown-item>
                </b-dropdown>
                </div>
                <div v-else class="col-md-4 col-6">
                  <h5 class="font-size-15 mb-1 text-truncate">Versiones</h5>
                </div>
                <div v-if="estado == 2" class="col-md-1 col-3">
                  <div>
                    <b-dropdown class="chat-noti-dropdown" right variant="white">
                        <template v-slot:button-content>
                        <i class="mdi mdi-dots-horizontal font-size-20"></i>
                        </template>
                        <b-dropdown-item @click="editMode=true;ver=false;$bvModal.show('modal')">Editar</b-dropdown-item>
                        <b-dropdown-item @click="editMode=true;ver=false;$bvModal.show('modal_elaborar')">Elaborar </b-dropdown-item>
                        <b-dropdown-item @click="editMode=true;ver=false;$bvModal.show('modal_revisar')">Revisar documento pendiente</b-dropdown-item>
                        <b-dropdown-item @click="editMode=true;ver=false;$bvModal.show('modal_aprobacion')">Aprobar documento pendiente</b-dropdown-item>
                        <b-dropdown-item @click="setHabilitar();editMode=true;ver=false;$bvModal.show('modal_hab')">Habilitar documento pendiente</b-dropdown-item>
                    </b-dropdown>
                  </div> 
                </div>
                
            </div>
            </div>
            <div class="px-lg-2 chat-users">
            <div class="chat-conversation p-3">
                <VueDocPreview :value="valorDoc" type="office" />
            </div>
            </div>
        </div>
        </div>

        <!-- end row -->


        <!-- EDITAR VERSIOENS -->
        <b-modal id="modal" false size="lg"  title="Gestion de documentos" hide-footer>
          <ValidationObserver  ref="form">

                <b-tabs v-model="tabIndex" content-class="p-3 text-muted">
                  <b-tab  class="border-0">
                    <template v-slot:title>
                      <span class="d-inline-block d-sm-none">
                        <i class="fas fa-home"></i>
                      </span>
                      <span class="d-none d-sm-inline-block">INFORMACION GENERAL</span>
                    </template>
                    <b-row class="mt-3">
                    <b-col>
                      <div class="form-group ">
                        <label>Nombre del documento</label>
                        <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                          <input v-model="edit.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="form-group">
                        <label>Tipo de docemento</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                          <select v-model="edit.tipo_id"  name="tipo" class="form-control " :disabled="ver">
                              <option :value="tipo.id" v-for="(tipo,index) in tiposdocumentos" :key="index">{{tipo.nombre}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Consecutivo</label>
                          <ValidationProvider name="prefijo" rules="required" v-slot="{ errors }">
                                <input v-model="edit.consecutivo"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label>Versión</label>
                          <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                <input v-model="edit.version"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Proceso</label>
                          <ValidationProvider name="proceso" rules="required" v-slot="{ errors }" >
                            <select v-model="edit.proceso_id"  name="tipo" class="form-control " :disabled="ver"  @change="capSubproceso()">
                              <option :value="proceso.id" v-for="(proceso,index) in procesos" :key="index" >{{proceso.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div v-if="subproceso.length!= 0 " class="form-group">
                          <label>Subproceso</label>
                          <ValidationProvider name="subproceso" rules="required" v-slot="{ errors }">
                            <select v-model="edit.subproceso_id"  name="tipo" class="form-control " :disabled="ver" >
                              <option :value="subprocesos.id" v-for="(subprocesos,index) in subproceso" :key="index" >{{subprocesos.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Sede</label>
                            <ValidationProvider name="sede" rules="required" v-slot="{ errors }" >
                                <v-select  v-model="edit.sedes_id"  :options="sedes" :disabled="ver" :reduce="sedes => sedes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                      </b-col>
                      <div v-if="edit.creado==='Creado'" class="col-sm-6 mt-4">
                      <b-form-file
                          v-model="logo"
                          placeholder="Seleccione una imagen..."
                          drop-placeholder="Drop file here..."
                          @change="onFileChangeLogo"
                      ></b-form-file>
                    </div>
                    </b-row>
                      
                  </b-tab>

                  <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-user"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">RESPONSABLES</span>
                      </template>
                        <h5 class="mt-3">Responsabilidades</h5>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label >Elabora</label>
                                <ValidationProvider name="elaboró" rules="required" v-slot="{ errors }" >
                                  <v-select :id="'ela'+responsabilidadesSelect[0]" v-model="edit.elabora_v_id" @input="validacionRespon(responsabilidadesSelect[0])" :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                  <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col >  
                            <div class="form-group">
                              <label>Fecha de elaboración</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.elaboracion" type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label >Revisa</label>      
                              <ValidationProvider name="revisó" rules="required" v-slot="{ errors }" >
                                <v-select :id="'rev'+responsabilidadesSelect[1]" v-model="edit.revisa_v_id" @input="validacionRespon(responsabilidadesSelect[1])" :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col>
                            <div class="form-group">
                              <label>Fecha de revisión</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.revision"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>  
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label>Aprueba</label>
                              <ValidationProvider name="aprobó" rules="required" v-slot="{ errors }" >
                                  <v-select :id="'apr'+responsabilidadesSelect[2]" v-model="edit.aprueba_v_id" @input="validacionRespon(responsabilidadesSelect[2])" :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                  <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col>
                            <div class="form-group">
                              <label>Fecha de aprobación</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.aprobacion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                  </b-tab>

                  <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">NORMATIVIDAD</span>
                        </template>
                      <h5 class="mt-3">Normatividad asociada</h5> 
                      <b-row class="align-items-center mb-3">
                        <b-col>
                          <div class="form-group m-0">
                              <v-select  v-model="titulo"  :options="normativas" :disabled="ver" :reduce="normativas => normativas"  :getOptionLabel="option => option.nombre" ></v-select>
                          </div>
                        </b-col>
                        <b-button  @click="cargarNorma" class="float-right btn-success py-1"> agregar</b-button>
                      </b-row>
                      <div class="card mt-3">
                        <div class="row m-0 justify-content-end">
                          <button class="btn" @click="show = false"   v-if="show"><b-card-sub-title >Ocultar</b-card-sub-title></button>
                          <button class="btn" @click="show = true"  v-else><b-card-sub-title >Ver</b-card-sub-title></button>
                        </div>
                        <div v-if="show" class="mb-3">
                          <b-row v-for="(norma, index) in edit.normativas" :key="index" class="px-3 ">
                            <b-col class="form-group w-100">
                              <div class="row m-0 justify-content-between">
                                  <label>{{norma.nombre}}</label>
                                  <button class="btn" @click=" eliminarNormativa(norma)"   >Eliminar</button>
                              </div>
                             
                              <ValidationProvider name="contenido" rules="required" v-slot="{ errors }">
                                <input v-model="norma.texto" type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </b-col>
                          </b-row>
                        </div>
                      </div> 
                  </b-tab>


                    <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">EMISIÓN</span>
                        </template>
                        <b-row class="mt-3">
                            <b-col>
                              <div class="form-group">
                                <label>Fecha de emisión</label>
                                <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                      <input v-model="edit.fecha_emicion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                      <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                              </div>
                            </b-col>
                            <b-col>
                              <div class="form-group">
                                <label>Tiempos de alerta para emisión</label>
                                  <ValidationProvider name="tiempos de alerta" rules="required" v-slot="{ errors }">
                                      <select @change="suma" v-model="edit.intervalo" name="tipo" class="form-control " :disabled="ver">
                                        <option value="1 mes">1 mes</option>
                                        <option value="2 meses">2 mes</option>
                                        <option value="4 meses">4 mes</option>
                                        <option value="6 meses">6 mes</option>
                                        <option value="12 meses">12 mes</option>
                                      </select>
                                      <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                              </div>
                            </b-col>
                          </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label>Estado</label>
                              <ValidationProvider name="estado" rules="required" v-slot="{ errors }">
                                  <select  v-model="edit.status" name="tipo" class="form-control " :disabled="ver">
                                    <option value="Inahabilitado">Inahabilitado</option>
                                    <option value="En elaboración">En elaboración</option>
                                    <option value="Elaborado">Elaborado</option>
                                  </select>
                                  <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                    </b-tab>
              </b-tabs>

          </ValidationObserver>
          <div class="row mx-0 mb-5 justify-content-between">
            <div class=" col-2">
               <button @click="tabIndex--" class="btn btn-block float-right btn-success">Atras</button>
            </div>
            <div class="col-2">
              <button @click="tabIndex++" class="btn btn-block float-right btn-success" v-if="tabIndex !=3">Siguiente</button>
              <div v-else>
                <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode && tabIndex == 3">Guardar</button>
                <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
              </div>
            </div>
          </div>
     </b-modal>
        <!-- CREAR VERSIONES -->
      <b-modal id="modal-crea" false size="lg"  title="Gestion de documentos" hide-footer>
          <ValidationObserver  ref="form">

                <b-tabs v-model="tabIndex" content-class="p-3 text-muted">
                  <b-tab  class="border-0">
                    <template v-slot:title>
                      <span class="d-inline-block d-sm-none">
                        <i class="fas fa-home"></i>
                      </span>
                      <span class="d-none d-sm-inline-block">INFORMACION GENERAL</span>
                    </template>
                    <b-row class="mt-3">
                    <b-col>
                      <div class="form-group ">
                        <label>Nombre del documento</label>
                        <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                          <input v-model="form.nombre"  type="text" class="form-control" placeholder=" " disabled>
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="form-group">
                        <label>Tipo de docemento</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                          <select v-model="form.tipo_id"  name="tipo" class="form-control " disabled>
                              <option :value="tipo.id" v-for="(tipo,index) in tiposdocumentos" :key="index">{{tipo.nombre}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Consecutivo</label>
                          <ValidationProvider name="prefijo" rules="required" v-slot="{ errors }">
                                <input v-model="form.consecutivo"  type="text" class="form-control" placeholder=" " disabled/>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label>Versión</label>
                          <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                <input v-model="form.version"  type="text" class="form-control" placeholder=" " disabled/>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Proceso</label>
                          <ValidationProvider name="proceso" rules="required" v-slot="{ errors }" >
                            <select v-model="form.proceso_id"  name="tipo" class="form-control " disabled  @change="capSubproceso()">
                              <option :value="proceso.id" v-for="(proceso,index) in procesos" :key="index" >{{proceso.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div v-if="subproceso.length!= 0 " class="form-group">
                          <label>Subproceso</label>
                          <ValidationProvider name="subproceso" rules="required" v-slot="{ errors }">
                            <select v-model="form.subproceso_id"  name="tipo" class="form-control " disabled>
                              <option :value="subprocesos.id" v-for="(subprocesos,index) in subproceso" :key="index" >{{subprocesos.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Sede</label>
                            <ValidationProvider name="sede" rules="required" v-slot="{ errors }" >
                                <v-select  v-model="form.sedes_id"  :options="sedes" disabled :reduce="sedes => sedes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                      </b-col>
                      <div v-if="form.creado==='Creado'" class="col-sm-6 mt-4">
                      <b-form-file
                          v-model="logo"
                          placeholder="Seleccione una imagen..."
                          drop-placeholder="Drop file here..."
                          @change="onFileChangeLogo"
                      ></b-form-file>
                    </div>
                    </b-row>
                      
                  </b-tab>

                  <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-user"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">RESPONSABLES</span>
                      </template>
                        <h5 class="mt-3">Responsabilidades</h5>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label v-if="form.creado==='No creado'">Elabora</label>
                              <label v-else>Elaboró</label>
                                <ValidationProvider name="elaboró" rules="required" v-slot="{ errors }" >
                                  <v-select :id="'ela'+responsabilidadesSelect[0]" v-model="form.elabora_v_id" @input="validacionRespon(responsabilidadesSelect[0])" :options="cargos" disabled :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                  <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col v-if="form.creado==='No creado'">  
                            <div class="form-group">
                              <label>Fecha de elaboración</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="form.elaboracion" type="date" class="form-control" placeholder=" " disabled/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label v-if="form.creado==='No creado'">Revisa</label>
                              <label v-else>Revisó</label>
                              <ValidationProvider name="revisó" rules="required" v-slot="{ errors }" >
                                <v-select :id="'rev'+responsabilidadesSelect[1]" v-model="form.revisa_v_id" @input="validacionRespon(responsabilidadesSelect[1])" :options="cargos" disabled :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col v-if="form.creado==='No creado'">
                            <div class="form-group">
                              <label>Fecha de revisión</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="form.revision"  type="date" class="form-control" placeholder=" " disabled/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>  
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label v-if="form.creado==='No creado'">Aprueba</label>
                              <label v-else>Aprobó</label>
                              <ValidationProvider name="aprobó" rules="required" v-slot="{ errors }" >
                                  <v-select :id="'apr'+responsabilidadesSelect[2]" v-model="form.aprueba_v_id" @input="validacionRespon(responsabilidadesSelect[1])" :options="cargos" disabled :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                  <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col v-if="form.creado==='No creado'">
                            <div class="form-group">
                              <label>Fecha de aprobación</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="form.aprobacion"  type="date" class="form-control" placeholder=" " disabled/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                  </b-tab>

                  <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">NORMATIVIDAD</span>
                        </template>
                      <h5 class="mt-3">Normatividad asociada</h5> 
                      <b-row class="align-items-center mb-3">
                        <b-col>
                          <div class="form-group m-0">
                            <ValidationProvider name="normatividad" rules="required" v-slot="{ errors }" >
                              <v-select  v-model="titulo"  :options="normativas" disabled :reduce="normativas => normativas"  :getOptionLabel="option => option.nombre" ></v-select>
                              <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                          </div>
                        </b-col>
                        <b-button  @click="cargarNorma" class="float-right btn-success py-1"> agregar</b-button>
                      </b-row>
                      <div class="card mt-3">
                        <div class="row m-0 justify-content-end">
                          <button class="btn" @click="show = false"   v-if="show"><b-card-sub-title >Ocultar</b-card-sub-title></button>
                          <button class="btn" @click="show = true"  v-else><b-card-sub-title >Ver</b-card-sub-title></button>
                        </div>
                        <div v-if="show" class="mb-3">
                          <b-row v-for="(norma, index) in form.normativas" :key="index" class="px-3 ">
                            <b-col class="form-group w-100">
                              <div class="row m-0 justify-content-between">
                                  <label>{{norma.nombre}}</label>
                                  <button class="btn" @click=" eliminarNormativa(norma)"   >Eliminar</button>
                              </div>
                             
                              <ValidationProvider name="contenido" rules="required" v-slot="{ errors }">
                                <input v-model="norma.texto" type="text" class="form-control" placeholder=" " disabled/>
                                <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </b-col>
                          </b-row>
                        </div>
                      </div> 
                  </b-tab>


                    <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">EMISIÓN</span>
                        </template>
                        <b-row class="mt-3">
                            <b-col>
                              <div class="form-group">
                                <label>Fecha de emisión</label>
                                <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                      <input v-model="form.fecha_emicion"  type="date" class="form-control" placeholder=" " disabled/>
                                      <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                              </div>
                            </b-col>
                            <b-col>
                              <div class="form-group">
                                <label>Tiempos de alerta para emisión</label>
                                  <ValidationProvider name="tiempos de alerta" rules="required" v-slot="{ errors }">
                                      <select @change="suma" v-model="form.intervalo" name="tipo" class="form-control " disabled>
                                        <option value="1 mes">1 mes</option>
                                        <option value="2 meses">2 mes</option>
                                        <option value="4 meses">4 mes</option>
                                        <option value="6 meses">6 mes</option>
                                        <option value="12 meses">12 mes</option>
                                      </select>
                                      <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                              </div>
                            </b-col>
                          </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label>Estado</label>
                              <ValidationProvider name="estado" rules="required" v-slot="{ errors }">
                                  <select  v-model="form.status" name="tipo" class="form-control " disabled>
                                    <option value="Inahabilitado">Inahabilitado</option>
                                    <option value="En elaboración">En elaboración</option>
                                    <option value="Elaborado">Elaborado</option>
                                  </select>
                                  <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                    </b-tab>
              </b-tabs>

          </ValidationObserver>
          <div class="row mx-0 mb-5 justify-content-between">
            <div class=" col-2">
               <button @click="tabIndex--" class="btn btn-block float-right btn-success">Atras</button>
            </div>
            <div class="col-2">
              <button @click="tabIndex++" class="btn btn-block float-right btn-success" v-if="tabIndex !=3">Siguiente</button>
              <div v-else>
                <button @click="switchLocD" v-if="!ver && !editMode">Guatdar</button>
                <!-- <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode && tabIndex == 3">Guardar</button> -->
                <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
              </div>
            </div>
          </div>
     </b-modal>





      <b-modal id="modal_elaborar" false size="lg"  title="ELABORACIÓN DE DOCUMENTOS" hide-footer>
          <ValidationObserver ref="form">
            
            <div class="alert alert-warning mb-3" role="alert" v-if="edit.status_revision == 'Rechazado' && edit.observaciones_revision != ''">
              <h6 class="text-info">Observaciones de la revisón</h6>
              {{edit.observaciones_revision}}
            </div>
            <b-row class="mb-3">
                  <div class="col-sm-12">
                    <ValidationProvider name="documento" rules="required" v-slot="{ errors }">
                    <span class="d-none d-sm-inline-block">DOCUMENTO WORD</span>
                    <b-form-file
                        v-model="archivo"
                        :disabled="ver"
                        placeholder="Seleccione su archivos..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="alert alert-warning mb-3 mt-2" role="alert" v-if="edit.status_revision == 'Rechazado' && edit.observaciones_documentos != ''">
                      <h6 class="text-info">Observaciones del documentos</h6>
                      {{edit.observaciones_documentos}}
                    </div>
                   </div>
                   <div class="col-sm-12">
                   <ValidationProvider name="diagramas" rules="required" v-slot="{ errors }">
                     <span class="d-none d-sm-inline-block">DIAGRAMAS</span>
                        <b-form-file
                            v-model="diagrama"
                            :disabled="ver"
                            placeholder="Seleccione su archivos..."
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="alert alert-warning mb-3 mt-2" role="alert" v-if="edit.status_revision == 'Rechazado' &&  edit.observaciones_diagramas != ''">
                      <h6 class="text-info">Observaciones del diagrama</h6>
                      {{edit.observaciones_diagramas}}
                    </div>
               </div>
                <div class="col-sm-12">
                      <div class="form-group ">
                        <label>Observaciones</label>
                        <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }" >
                          <textarea v-model="edit.observaciones_elaboracion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                  </div>
            </b-row>
             
        </ValidationObserver>
            <button class="btn btn-block float-right btn-success mb-5 mt-3" @click="elaborar()">Guardar</button>

     </b-modal>

     <b-modal id="modal_revisar" false size="lg"  title="REVISIÓN DE DOCUMENTOS" hide-footer>
          <ValidationObserver ref="form">
            <div class="alert alert-warning mb-3" role="alert">
              <h6 class="text-info">Observaciones Del Editor</h6>
              {{edit.observaciones_elaboracion}}
            </div>
            <div class="row align-items-center mx-0 mb-3" style=" margin-top: 1rem;">
                <ValidationProvider name="documento" rules="required" v-slot="{ errors }">
                  <select name="Estatus" v-model="edit.status_revision" class="form-control">
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <b-row class="mb-3" v-if="edit.status_revision==='Aprobado'">
                  <b-col class="col-sm-12">
                    <ValidationProvider name="documento" rules="required" v-slot="{ errors }">
                    <span class="d-none d-sm-inline-block">DOCUMENTO CON SU FIRMA</span>
                    <b-form-file
                        v-model="archivo"
                        :disabled="ver"
                        placeholder="Seleccione su archivos..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                   </b-col>
               </b-row>
               <b-row>
                  <b-col class="col-sm-12">
                    <div class="form-group ">
                      <label>Observaciones de revisón</label>
                      <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }" >
                        <textarea v-model="edit.observaciones_revision"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </b-col>
                  <b-col class="col-sm-12">
                    <div class="form-group ">
                      <label>Observaciones del diagrama</label>
                      <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }" >
                        <textarea v-model="edit.observaciones_diagramas"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </b-col>
                  <b-col class="col-sm-12">
                    <div class="form-group ">
                      <label>Observaciones del documentos</label>
                      <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }" >
                        <textarea v-model="edit.observaciones_documentos"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </b-col>
               </b-row>
        </ValidationObserver>
            <button class="btn btn-block float-right btn-success mb-5 mt-3" @click="revisar()">Guardar</button>
     </b-modal>

     <b-modal id="modal_aprobacion" false size="lg"  title="APROBACIÓN DE DOCUMENTOS" hide-footer>
          <ValidationObserver ref="form">
            <div class="alert alert-warning mb-3" role="alert">
              <h6 class="text-info">Observaciones de revisión</h6>
              {{edit.observaciones_revision}}
            </div>
            <div class="row align-items-center mx-0 mb-3" style=" margin-top: 1rem;">
                <ValidationProvider name="documento" rules="required" v-slot="{ errors }">
                  <select name="Estatus" v-model="edit.status_aprobacion" class="form-control">
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <b-row class="mb-3" v-if="edit.status_aprobacion==='Aprobado'">
                  <b-col class="col-sm-12">
                    <ValidationProvider name="documento" rules="required" v-slot="{ errors }">
                    <span class="d-none d-sm-inline-block">DOCUMENTO CON SU FIRMA</span>
                    <b-form-file
                        v-model="archivo"
                        :disabled="ver"
                        placeholder="Seleccione su archivos..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                       <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                   </b-col>
               </b-row>
               <b-row>
                  <b-col class="col-sm-12">
                    <div class="form-group">
                      <label>Observaciones de aprobación</label>
                      <ValidationProvider name="observaciones" rules="required" v-slot="{ errors }" >
                        <textarea v-model="edit.observaciones_aprobacion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  </b-col>
               </b-row>
        </ValidationObserver>
            <button class="btn btn-block float-right btn-success mb-5 mt-3" @click="aprueba()">Guardar</button>

     </b-modal>

       <b-modal id="modal_hab" false size="lg"  title="Gestion de documentos" hide-footer>
         <pre>{{edit}}</pre>
          <ValidationObserver  ref="form">
                <b-tabs v-model="tabIndex" content-class="p-3 text-muted">
                  <b-tab  class="border-0">
                    <template v-slot:title>
                      <span class="d-inline-block d-sm-none">
                        <i class="fas fa-home"></i>
                      </span>
                      <span class="d-none d-sm-inline-block">INFORMACION GENERAL</span>
                    </template>
                    <b-row class="mt-3">
                    <b-col>
                      <div class="form-group ">
                        <label>Nombre del documento</label>
                        <ValidationProvider name="nombre" rules="required" v-slot="{ errors }" >
                          <input v-model="edit.nombre"  type="text" class="form-control" placeholder=" " :disabled="ver">
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="form-group">
                        <label>Tipo de docemento</label>
                        <ValidationProvider name="tipo" rules="required" v-slot="{ errors }" >
                          <select v-model="edit.tipo_id"  name="tipo" class="form-control " :disabled="ver">
                              <option :value="tipo.id" v-for="(tipo,index) in tiposdocumentos" :key="index">{{tipo.nombre}}</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Consecutivo</label>
                          <ValidationProvider name="prefijo" rules="required" v-slot="{ errors }">
                                <input v-model="edit.consecutivo"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label>Versión</label>
                          <ValidationProvider name="descripcion" rules="required" v-slot="{ errors }">
                                <input v-model="edit.version"  type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Proceso</label>
                          <ValidationProvider name="proceso" rules="required" v-slot="{ errors }" >
                            <select v-model="edit.proceso_id"  name="tipo" class="form-control " :disabled="ver"  @change="capSubproceso()">
                              <option :value="proceso.id" v-for="(proceso,index) in procesos" :key="index" >{{proceso.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div v-if="subproceso.length!= 0 " class="form-group">
                          <label>Subproceso</label>
                          <ValidationProvider name="subproceso" rules="required" v-slot="{ errors }">
                            <select v-model="edit.subproceso_id"  name="tipo" class="form-control " :disabled="ver" >
                              <option :value="subprocesos.id" v-for="(subprocesos,index) in subproceso" :key="index" >{{subprocesos.nombre}}</option>
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Sede</label>
                            <ValidationProvider name="sede" rules="required" v-slot="{ errors }" >
                                <v-select  v-model="edit.sedes_id"  :options="sedes" :disabled="ver" :reduce="sedes => sedes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                      </b-col>
                      <div v-if="edit.creado==='Creado'" class="col-sm-6 mt-4">
                      <b-form-file
                          v-model="logo"
                          placeholder="Seleccione una imagen..."
                          drop-placeholder="Drop file here..."
                          @change="onFileChangeLogo"
                      ></b-form-file>
                    </div>
                    </b-row>
                      
                  </b-tab>

                  <b-tab>
                      <template v-slot:title>
                        <span class="d-inline-block d-sm-none">
                          <i class="far fa-user"></i>
                        </span>
                        <span class="d-none d-sm-inline-block">RESPONSABLES</span>
                      </template>
                        <h5 class="mt-3">Responsabilidades</h5>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label >Elabora</label>
                                <ValidationProvider name="elaboró" rules="required" v-slot="{ errors }" >
                                  <v-select :id="'ela'+responsabilidadesSelect[0]" v-model="edit.elabora_v_id" @input="validacionRespon(responsabilidadesSelect[0])" :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                  <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col >  
                            <div class="form-group">
                              <label>Fecha de elaboración</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.elaboracion" type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label >Revisa</label>      
                              <ValidationProvider name="revisó" rules="required" v-slot="{ errors }" >
                                <v-select :id="'rev'+responsabilidadesSelect[1]" v-model="edit.revisa_v_id" @input="validacionRespon(responsabilidadesSelect[1])" :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col>
                            <div class="form-group">
                              <label>Fecha de revisión</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.revision"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>  
                        <b-row>
                          <b-col>
                            <div class="form-group">
                              <label>Aprueba</label>
                              <ValidationProvider name="aprobó" rules="required" v-slot="{ errors }" >
                                  <v-select :id="'apr'+responsabilidadesSelect[2]" v-model="edit.aprueba_v_id" @input="validacionRespon(responsabilidadesSelect[2])" :options="cargos" :disabled="ver" :reduce="cargos => cargos.id"  :getOptionLabel="option => option.nombre+' '+option.user.nombre" ></v-select>
                                  <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col>
                            <div class="form-group">
                              <label>Fecha de aprobación</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.aprobacion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                        </b-row>
                  </b-tab>

                  <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">NORMATIVIDAD</span>
                        </template>
                      <h5 class="mt-3">Normatividad asociada</h5> 
                      <b-row class="align-items-center mb-3">
                        <b-col>
                          <div class="form-group m-0">
                              <v-select  v-model="titulo"  :options="normativas" :disabled="ver" :reduce="normativas => normativas"  :getOptionLabel="option => option.nombre" ></v-select>
                          </div>
                        </b-col>
                        <b-button  @click="cargarNorma" class="float-right btn-success py-1"> agregar</b-button>
                      </b-row>
                      <div class="card mt-3">
                        <div class="row m-0 justify-content-end">
                          <button class="btn" @click="show = false"   v-if="show"><b-card-sub-title >Ocultar</b-card-sub-title></button>
                          <button class="btn" @click="show = true"  v-else><b-card-sub-title >Ver</b-card-sub-title></button>
                        </div>
                        <div v-if="show" class="mb-3">
                          <b-row v-for="(norma, index) in edit.normativas" :key="index" class="px-3 ">
                            <b-col class="form-group w-100">
                              <div class="row m-0 justify-content-between">
                                  <label>{{norma.nombre}}</label>
                                  <button class="btn" @click=" eliminarNormativa(norma)"   >Eliminar</button>
                              </div>
                             
                              <ValidationProvider name="contenido" rules="required" v-slot="{ errors }">
                                <input v-model="norma.texto" type="text" class="form-control" placeholder=" " :disabled="ver"/>
                                <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </b-col>
                          </b-row>
                        </div>
                      </div> 
                  </b-tab>


                    <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">EMISIÓN</span>
                        </template>
                        <b-row class="mt-3">
                            <b-col>
                              <div class="form-group">
                                <label>Fecha de emisión</label>
                                <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                      <input v-model="edit.fecha_emicion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                      <span style="color:red">{{ errors[0] }}</span>
                                </ValidationProvider>
                              </div>
                            </b-col>
                            <b-col>
                              <div class="form-group">
                                <label>Tiempos de alerta para emisión</label>
                                  <ValidationProvider name="tiempos de alerta" rules="required" v-slot="{ errors }">
                                      <select @change="setFechaSuma" v-model="edit.intervalo" name="tipo" class="form-control " :disabled="ver">
                                        <option value="1 mes">1 mes</option>
                                        <option value="2 meses">2 mes</option>
                                        <option value="4 meses">4 mes</option>
                                        <option value="6 meses">6 mes</option>
                                        <option value="12 meses">12 mes</option>
                                      </select>
                                      <span style="color:red">{{ errors[0] }}</span>
                                  </ValidationProvider>
                              </div>
                            </b-col>
                          </b-row>
                        <b-col>
                            <div class="form-group">
                              <label>Fecha de alerta</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.fecha_alerta"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col>
                            <div class="form-group">
                              <label>Fecha de edición</label>
                              <ValidationProvider name="fecha" rules="required" v-slot="{ errors }">
                                    <input v-model="edit.fecha_edicion"  type="date" class="form-control" placeholder=" " :disabled="ver"/>
                                    <span style="color:red">{{ errors[0] }}</span>
                              </ValidationProvider>
                            </div>
                          </b-col>
                          <b-col class="col-sm-12">
                            <div class="form-group ">
                              <label>Control del cambios</label>
                              <ValidationProvider name="control de cambio" rules="required" v-slot="{ errors }" >
                                <textarea v-model="edit.observaciones_edicion"  type="text" class="form-control" placeholder=" " :disabled="ver"></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                            </div>
                          </b-col>
                    </b-tab>

                    <b-tab>
                        <template v-slot:title>
                          <span class="d-inline-block d-sm-none">
                            <i class="far fa-user"></i>
                          </span>
                          <span class="d-none d-sm-inline-block">ARCHIVO</span>
                        </template>
                          <b-row class="mt-3 w-100">
                            <b-col>
                              <VueDocPreview class="w-100" :value="edit.firma_aprueba" type="office" />
                            </b-col>
                          </b-row>
                    </b-tab>
              </b-tabs>

          </ValidationObserver>
          <div class="row mx-0 mb-5 justify-content-between">
            <div class=" col-2">
               <button @click="tabIndex--" class="btn btn-block float-right btn-success">Atras</button>
            </div>
            <div class="col-2">
              <button @click="tabIndex++" class="btn btn-block float-right btn-success" v-if="tabIndex !=3">Siguiente</button>
              <div v-else>
                <button class="btn btn-block float-right btn-success" @click="habilitar()">Habilitar</button>
              </div>
            </div>
          </div>
     </b-modal>
  </Layout>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import simplebar from "simplebar-vue";
import PageHeader from "@/components/page-header";
import Chat from '@/components/chat'
import moment from 'moment'
import VueDocPreview from 'vue-doc-preview'
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
    vSelect,
    Chat,
    simplebar,
    VueDocPreview
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
      fecha_actual:'',
      archivoapr:'',
      revisado:'',
      valorDoc:'',
      responsabilidadesSelect:[1,2,3],
      estado:1,
      tabIndex: 0,
      id_proc:4,
      url_logo:null,
      logo:null,
      archivo:null,
      diagrama:null,
      archivorev:null,
      diagramarev:null,
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
      versionobj:null,
      docs_Habilitados:[],
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
            'elabora_v_id':'',
            'aprueba_v_id':'',
            'revisa_v_id':'',
          },
          edit:{
            'id': 6,
            'tipo_id': '',
            'subproceso_id':'',
            'proceso_id':'',
            'creado':'',
            'nombre': null,
            'nombre_elabora': null,
            'nombre_revisa': null,
            'nombre_aprueba': null,
            'archivo': '',
            'firma_elabora':'',
            'firma_revisa':'',
            'firma_aprueba':'',
            'normativas':[],
            'consecutivo':'',
            'version':'',
            'elaboracion':'',
            'revision':'',
            'aprobacion':'',
            'fecha_emicion':'',
            'fecha_alerta':'',
            'observaciones_aprobacion':'',
            'observaciones_elaboracion':'',
            'observaciones_revision':'',
            'observaciones_documentos':'',
            'observaciones_diagramas':'',
            'status_revision':'',
            'status_aprobacion':'',
            'status_elaboracion':'',
            'intervalo':'',
            'status':'',
            'sedes_id':'',
            'elabora_v_id':'',
            'aprueba_v_id':'',
            'revisa_v_id':'',
            'documento_actual':'',
          },
        doc:{
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
            'revisa_id':'',
          }
        }
  },
   filters: {
        fecha: function (value) {
         moment.locale('es');
        let fechafina =moment(value).format('MMMM DD YYYY HH:MM')
           return fechafina
        }
    },
  methods: {
    setHabilitar(){
      this.fecha_actual = new Date()
      this.documentoActual();
      console.log(this.fecha_actual)
    },
    setFechaSuma(){
        var regex = /(\d+)/g;
       for (let index = 0; index <  this.edit.intervalo.match(regex).length; index++) {
           var valor = this.edit.intervalo.match(regex)
           this.rango = valor[index]
       }
       let fecha = moment(this.edit.fecha_emicion).format("YYYY-MM-DD");
       this.edit.fecha_alerta = moment(fecha).add(this.rango, 'month').format("YYYY-MM-DD");
       console.log(this.edit.fecha_alerta )
    },

   async documentoActual(){
        let data = new FormData();
        data.append('id',this.$route.params.id);
         await this.axios.post('api/documentos/find',data)
           .then((response) => {
             
              if (response.status==200) {
                this.edit.documento_actual = response.data
                console.log(this.edit)
                this.edit.documento_actual.vdocumentos = null
              }
           })
           .catch((e)=>{
             console.log('error' + e);
           })
    },
   async listarDocumentosHabilitados(){
      let data = new FormData();
        data.append('id',this.$route.params.id);
         await this.axios.post('api/documentos/find',data)
           .then((response) => {
             
              if (response.status==200) {
                this.edit.documento_actual = response.data
                console.log(this.edit)
                this.docs_Habilitados = this.edit.documento_actual.hdocumentos 
              }
           })
           .catch((e)=>{
             console.log('error' + e);
           })
    },
    obtener(doc){
      this.valorDoc = doc
      console.log(this.valorDoc)
    },
    validacionRespon(index){
       console.log(index)
        if (index === 1) {
              if (this.edit.elabora_v_id != '' && this.edit.elabora_v_id == this.edit.aprueba_v_id || this.edit.elabora_v_id != '' && this.edit.elabora_v_id == this.edit.revisa_v_id) {
                this.$swal('Cargo en uso');
                this.edit.elabora_v_id = ''
          }
        }  else if (index === 2) {
              if (this.edit.revisa_v_id != '' && this.edit.revisa_v_id == this.edit.elabora_v_id || this.edit.revisa_v_id != '' && this.edit.revisa_v_id == this.edit.aprueba_v_id){
                this.$swal('Cargo en uso')
                this.edit.revisa_v_id = ''
          }
        } else if (index === 3 ) {
              if (this.edit.aprueba_v_id != '' && this.edit.aprueba_v_id == this.edit.elabora_v_id || this.edit.aprueba_v_id != '' && this.edit.aprueba_v_id == this.edit.revisa_v_id) {
                  this.$swal('Cargo en uso');
                  this.edit.aprueba_v_id = ''
          }
        }
    },
    validacionResponD(index){
       console.log(index)
        if (index === 1) {
              if (this.form.elabora_v_id != '' && this.form.elabora_v_id == this.form.aprueba_v_id || this.form.elabora_v_id != '' && this.form.elabora_v_id == this.form.revisa_v_id) {
                this.$swal('Cargo en uso');
                this.form.elabora_v_id = ''
          }
        }  else if (index === 2) {
              if (this.form.revisa_v_id != '' && this.form.revisa_v_id == this.form.elabora_v_id || this.form.revisa_v_id != '' && this.form.revisa_v_id == this.form.aprueba_v_id){
                this.$swal('Cargo en uso')
                this.edit.revisa_v_id = ''
          }
        } else if (index === 3 ) {
              if (this.form.aprueba_v_id != '' && this.form.aprueba_v_id == this.form.elabora_v_id || this.form.aprueba_v_id != '' && this.form.aprueba_v_id == this.form.revisa_v_id) {
                  this.$swal('Cargo en uso');
                  this.form.aprueba_v_id = ''
          }
        }
    },
    eliminarNormativa(index){
      var indice = this.form.normativas.indexOf(index);
      console.log(indice,index )
      if (indice != -1){
        this.form.normativas.splice(indice, 1);
      }
        
    },
     suma(){
       var regex = /(\d+)/g;
       for (let index = 0; index <  this.form.intervalo.match(regex).length; index++) {
           var valor = this.form.intervalo.match(regex)
           this.rango = valor[index]
       }
       let fecha = moment(this.form.fecha_emicion).format("YYYY-MM-DDTHH:MM");
       this.form.fecha_alerta = moment(fecha).add(this.rango, 'month').format("YYYY-MM-DDTHH:MM");
       console.log(this.form.fecha_alerta)
     },
    capSubproceso(proceso){
      for (let index = 0; index < this.procesos.length; index++) {
       if(this.procesos[index].id == this.form.proceso_id){
         this.subproceso = this.procesos[index].subprocesos
         console.log(this.subproceso)
       }
        
      }
    },
    cargarNorma(){
      this.form.normativas.push({
        id : this.titulo.id,
        nombre : this.titulo.nombre,
        archivo:this.titulo.archivo,
        texto : ''
      });
    },
   async listarperfil(){
     let data = new FormData();
     data.append('cliente_id',this.cliente.id);
       await this.axios.post('api/perfil/lista',data)
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },
      async listartipos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/normatividad/listar',data)
            .then((response) => {
              this.tipos = response.data.rows;
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
      async listardocscreados(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/documentos/listar',data)
            .then((response) => {
              this.documentos = response.data;
              console.log(response)
            })
            .catch((e)=>{
              console.log('error' + e);
            })
      },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 
    ...mapActions(['guardarUsuario']),
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarversion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarVersion();
          } else {
        }});
      }
    },
    elaborar(){
      this.$refs.form.validate().then(esValido => {
          if (esValido) {
          this.$swal({
            title: 'Desea subir los documentos version?',
            icon: 'question',
            iconHtml: '',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            showCancelButton: true,
            showCloseButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.elaborarDocumento();
            }
        })
          } 
        });
      },
      revisar(){
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
            this.$swal({
              title: 'Desea subir los documentos version?',
              icon: 'question',
              iconHtml: '',
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
              showCancelButton: true,
              showCloseButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.revisarDocumento();
              }
          })
            } 
        });        
      },
      aprueba(){
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
            this.$swal({
              title: 'Desea subir los documentos version?',
              icon: 'question',
              iconHtml: '',
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
              showCancelButton: true,
              showCloseButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.apruebaDocumento();
              }
          })
            } 
        });        
      },
     async elaborarDocumento(){
     let data = new FormData();
     var formulario = this.edit;
      for (var key in formulario) {
        if (key=='normativas') {
            data.append(key,JSON.stringify(formulario[key]));
        } else {
            data.append(key,formulario[key]);
        }
      }
      if (this.archivo) {
        data.append('filename',this.archivo);
       }
      if (this.diagrama) {
        data.append('diagrama',this.diagrama);
       }
       await this.axios.post('api/documentos/versiones/elaborar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_elaborar", "#btnShow");
               this.buscarVersiones();
              }
            }).catch(e => {
              this.$swal('no se pudo subir!', '','danger');
          });
      }, 
       async apruebaDocumento(){
     let data = new FormData();
     var formulario = this.edit;
      for (var key in formulario) {
        if (key=='normativas') {
            data.append(key,JSON.stringify(formulario[key]));
        } else {
            data.append(key,formulario[key]);
        }
      }
      if (this.archivo && this.edit.status_aprobacion == 'Aprobado') {
        data.append('filename',this.archivo);
       }
       await this.axios.post('api/documentos/versiones/aprobar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_aprobacion", "#btnShow");
               this.buscarVersiones();
              }
            }).catch(e => {
              this.$swal('no se pudo subir!', '','danger');
          });
      },   
    async revisarDocumento(){
     let data = new FormData();
     var formulario = this.edit;
      for (var key in formulario) {
        if (key=='normativas') {
            data.append(key,JSON.stringify(formulario[key]));
        }else if (key=='diagramas'||key=='archivo') {
          
        } else {
            data.append(key,formulario[key]);
        }
      }
      if (this.archivo && this.edit.status_revision == 'Aprobado') {
        data.append('filename',this.archivo);
       }
      if (this.diagrama) {
        data.append('diagrama',this.diagrama);
       }
       console.log(formulario)
       await this.axios.post('api/documentos/versiones/revisar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_revisar", "#btnShow");
               this.buscarVersiones();
              }
            }).catch(e => {
              this.$swal('no se pudo subir!', '','danger');
          });
      },

         habilitar(){
      this.$refs.form.validate().then(esValido => {
          if (esValido) {
          this.$swal({
            title: 'Desea habilitar esta version?',
            icon: 'question',
            iconHtml: '',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            showCancelButton: true,
            showCloseButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.habilitarDocumento();
            }
        })
          } 
        });
      },
          async habilitarDocumento(){
     let data = new FormData();
     var formulario = this.edit;
      for (var key in formulario) {
        if (key=='normativas'||key=='documento_actual') {
            data.append(key,JSON.stringify(formulario[key]));
        } else {
            data.append(key,formulario[key]);
        }
      }
       await this.axios.post('api/documentos/versiones/habilitar', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
              this.$root.$emit("bv::hide::modal", "modal_revisar", "#btnShow");
               this.buscarVersiones();
              }
            }).catch(e => {
              this.$swal('no se pudo subir!', '','danger');
          });
      },
     cargarDoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.cargarVersion();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarVersion();
          } else {
        }});
      }
    },
    switchLocD(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarversion()();
            } else {}
          });        
        }else{
          this.$refs.form.validate().then(esValido => {
          if (esValido) {
            this.editarVersion();
          } else {
        }});
      }
    },
   async editarDocumento(){
      let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        if (key=='normativas') {
          data.append(key,JSON.stringify(formulario[key]));
        } else {
          data.append(key,formulario[key]);
        }
    }
    await this.axios.put('api/documentos', data, {
      headers: {
       'Content-Type': 'multipart/form-data'
       }}).then(response => {
        if (response.status==200) {
            this.$swal('Agregado exito!','','success');
            this.listardocscreados();
            this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
            this.resete();
          }
       }).catch(e => {
         console.log(e.response.data.menssage);
         this.$swal(e.response.data);
     });
    },
  async agregarDocumento(){
     let data = new FormData();
      var formulario = this.form;
        for (var key in formulario) {
          if (key=='normativas') {
              data.append(key,JSON.stringify(formulario[key]));
          } else {
              data.append(key,formulario[key]);
          }
      }
        if (this.logo) {
        data.append('filename',this.logo);
       }
      console.log(formulario)
       await this.axios.post('api/documentos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal(
                   'Agregado exito!',
                    '',
                    'success');
               this.listardocscreados();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario   
               this.resete();
              }
            }).catch(e => {
              console.log(e.response.data.menssag);
              this.$swal(e.response.data);
          });
      },
     async eliminarDocs(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/documentos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listardocscreados();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminarDoc(id){
        this.$swal({
          title: 'Desea borrar este documento?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarDocs(id);
          }
        })
      },
      eliminarVersion(id){
        this.$swal({
          title: 'Desea borrar esta version?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarVersions(id);
          }
        })
      },
      async eliminarVersions(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/documentos/version/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
               this.setearCarga(this.form.id);
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      },

      async buscarVersiones(){
        let data = new FormData();
         data.append('documento_id',this.$route.params.id);
          await this.axios.post('api/documentos/versiones/listar',data)
            .then((response) => {
              this.versiones = response.data
              console.log(this.versiones)
            })
            .catch((e)=>{
              console.log('error' + e);
            })
      },
        async agregarversion(){
          let data = new FormData();
            var formulario = this.edit;
              for (var key in formulario) {
                if (key=='normativas') {
                    data.append(key,JSON.stringify(formulario[key]));
                } else {
                    data.append(key,formulario[key]);
                }
            }
            data.append('documento_id',this.$route.params.id);
             console.log(this.$route.params.id)
            await this.axios.post('api/documentos/versiones', data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }}).then(response => {
                  if (response.status==200) {
                    this.$swal(
                        'Agregado exito!',
                          '',
                          'success');
                    this.listardocscreados();
                    this.buscarVersiones();
                    this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
                    }
                  }).catch(e => {
                    console.log(e.response.data.menssag);
                    this.$swal(e.response.data);
                });
            },
           async editarVersion(){
            let data = new FormData();
            var formulario = this.edit;
            for (var key in formulario) {
              if (key=='normativas') {
                data.append(key,JSON.stringify(formulario[key]));
              } else {
                data.append(key,formulario[key]);
              }
          }
          await this.axios.put('api/documentos/versiones', data, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                  this.$swal('Editado con exito!','','success');
                  this.buscarVersiones();
                  this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
                }
            }).catch(e => {
              console.log(e);
              this.$swal('No se pudo editar!');
          });
          },
        resete(){
          var formulario = this.form;
          for (var key in formulario) {
            if (key=='normativas') {
                 this.form[key]=[];
            }else{
                this.form[key]="";
            }
        }
         this.form.cliente_id=this.cliente.id;
      },
     async setear(index){
       let data = new FormData();
       data.append('id',index);
         await this.axios.post('api/documentos/versiones/find',data)
           .then((response) => {
             console.log(response.data)
              if (response.status==200) {
                this.edit.id = response.data.id;
                this.edit.tipo_id = response.data.tipo_id;
                this.edit.normativas = JSON.parse(response.data.normativas);
                this.edit.nombre = response.data.nombre;
                this.edit.nombre_elabora = response.data.nombre_elabora;
                this.edit.nombre_revisa = response.data.nombre_revisa;
                this.edit.nombre_aprueba = response.data.nombre_aprueba;
                this.edit.creado = response.data.creado;
                this.edit.archivo = response.data.archivo;
                this.edit.firma_elabora = response.data.firma_elabora;
                this.edit.firma_revisa = response.data.firma_revisa;
                this.edit.firma_aprueba = response.data.firma_aprueba;
                this.edit.diagramas = response.data.diagramas;
                this.edit.consecutivo = response.data.consecutivo;
                this.edit.version = response.data.version;
                this.edit.observaciones_elaboracion = response.data.observaciones_elaboracion;
                this.edit.observaciones_revision = response.data.observaciones_revision;
                this.edit.observaciones_documentos = response.data.observaciones_documentos;
                this.edit.observaciones_diagramas = response.data.observaciones_diagramas;
                this.edit.subproceso_id = response.data.subproceso_id;
                this.edit.elaboracion = response.data.elaboracion;
                this.edit.revision = response.data.revision;
                this.edit.aprobacion = response.data.aprobacion;
                this.edit.fecha_alerta = response.data.fecha_alerta;
                this.edit.fecha_emicion = response.data.fecha_emicion;
                this.edit.intervalo = response.data.intervalo;
                this.edit.status_revision = response.data.status_revision
                this.edit.status_aprobacion = response.data.status_aprobacion;
                this.edit.status_elaboracion = response.data.status_elaboracion;
                this.edit.observaciones_aprobacion = response.data.observaciones_aprobacion;
                this.edit.status = response.data.status;
                this.edit.proceso_id = response.data.proceso_id;
                this.edit.documento_id = response.data.documento_id;
                this.edit.sedes_id = response.data.sedes_id;
                this.edit.elabora_v_id = response.data.elabora_v_id;
                this.edit.aprueba_v_id = response.data.aprueba_v_id;
                this.edit.revisa_v_id = response.data.revisa_v_id;
                if (this.editMode) {
                  this.$root.$emit("bv::show::modal", "modal", "#btnShow");
                }
              }
           })
           .catch((e)=>{
             console.log('error' + e);
           })
       },
    async setearD(){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/documentos/find',data)
          .then((response) => {
            console.log(response.data)
             if (response.status==200) {
              this.edit.id = response.data.id;
              this.edit.tipo_id = response.data.tipo_id;
              this.edit.normativas = JSON.parse(response.data.normativas);
              this.edit.nombre = response.data.nombre;
              this.edit.creado = response.data.creado;
              this.edit.consecutivo = response.data.consecutivo;
              this.edit.version = response.data.version;
              this.edit.subproceso_id = response.data.subproceso_id;
              this.edit.elaboracion = response.data.elaboracion;
              this.edit.revision = response.data.revision;
              this.edit.aprobacion = response.data.aprobacion;
              this.edit.fecha_alerta = response.data.fecha_alerta;
              this.edit.fecha_emicion = response.data.fecha_emicion;
              this.edit.intervalo = response.data.intervalo;
              this.edit.status = response.data.status;
              this.edit.proceso_id = response.data.proceso_id;
              this.edit.sedes_id = response.data.sedes_id;
              this.edit.elabora_v_id = response.data.elabora_id;
              this.edit.aprueba_v_id = response.data.aprueba_id;
              this.edit.revisa_v_id = response.data.revisa_id;
              this.$root.$emit("bv::show::modal", "modal", "#btnShow");
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
    async listarDocumento(id){
      let data = new FormData();
      data.append('id',this.$route.params.id);
        await this.axios.post('api/documentos/find',data)
          .then((response) => {
             if (response.status==200) {
              console.log(response) 
              this.doc.id = response.data.id;
              this.doc.tipo_id = response.data.tipo_id;
              this.doc.nombre = response.data.nombre;
              this.doc.normativas = JSON.parse(response.data.normativas);
              this.doc.creado = response.data.creado;
              this.doc.consecutivo = response.data.consecutivo;
              this.doc.version = response.data.version;
              this.doc.subproceso_id = response.data.subproceso_id;
              this.doc.elaboracion = response.data.elaboracion;
              this.doc.revision = response.data.revision;
              this.doc.aprobacion = response.data.aprobacion;
              this.doc.fecha_alerta = response.data.fecha_alerta;
              this.doc.fecha_emicion = response.data.fecha_emicion;
              this.doc.intervalo = response.data.intervalo;
              this.doc.status = response.data.status;
              this.doc.proceso_id = response.data.proceso_id;
              this.doc.sedes_id = response.data.sedes_id;
              this.doc.elabora_id = response.data.elabora_id;
              this.doc.aprueba_id = response.data.aprueba_id;
              this.doc.revisa_id = response.data.revisa_id;
              this.versiones = response.data.versiones;
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      }, 
    async setearCarga(id){
      let data = new FormData();
      data.append('id',id);
        await this.axios.post('api/documentos/find',data)
          .then((response) => {
             if (response.status==200) {
              this.form.id = response.data.id;
              this.form.revisa_id = response.data.revisa_id;
              this.versiones = response.data.versiones;
              this.$root.$emit("bv::show::modal", "modal_carga", "#btnShow");
             }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
      },
       async  listarSedes(){
        let data = new FormData();
          data.append("cliente_id",this.cliente.id);
          await this.axios.post('api/sedes/listar',data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(response => {
                if (response.status==200) {
                  console.log(response.status)
                    this.sedes = response.data.rows
                  }
                }).catch(e => {
                  console.log(e.response.data.menssage);
                  this.$swal(e.response.data);
            });
      },
        async  listartiposdoc(){
            let data = new FormData();
            data.append('cliente_id',this.cliente.id);
            await this.axios.post('api/documentos/tipo/listar',data)
            .then((response) => {
                console.log(response.data)
                this.tiposdocumentos = response.data;
            })
            .catch((e)=>{
                console.log('error' + e);
            })
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
        async listartipos(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/tipo_procesos/listar',data)
            .then((response) => {
              this.tipos = response.data.rows;
            })
            .catch((e)=>{
              console.log('error' + e);
            })
      },
      async listarNormatividad(){
        let data = new FormData();
        data.append('cliente_id',this.cliente.id);
          await this.axios.post('api/normatividad/listar',data)
            .then((response) => {
              this.normativas = response.data.rows;
              console.log(this.normativas)
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
      onFileChangeLogo(e) {
        const logo = e.target.files[0];
        this.url_logo = URL.createObjectURL(logo);
      },

      toggleModal () {
        this.modal = !this.modal
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
    watch: {
      cliente: function () {
        this.listarperfil();
        this.listartipos();
        this.listarProceso();
        this.listarSubproceso();
        this.listartiposdoc();
        this.listarNormatividad();
        this.listardocscreados();
        this.listarCargos();
        this.listarSedes();
        this.listarDocumento();
        this.buscarVersiones();
        this.swichAprobacion();
        this.title=this.cliente.nombre_prestador;
      },
    },
    created(){
      this.session();
      this.listarDocumentosHabilitados()
      console.log(this.form)
      },
     mounted() {
        const $ = require('jquery')
        window.$ = $
          $(document).ready(function() {
          $('.summernote').summernote({
            placeholder: 'Escribe aquí',
            tabsize: 2,
            height: 100,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview', 'help']]
            ],
            callbacks: {
              onImageUpload: function(files) {
                for (let i = 0; i < files.length; i++) {
                  self.lastFile = files[i]
                  self.sendFile()
                }
              },
              onChange: function(content, e) {
                  let len = content.length
                  self.validateLimit(len)
              }
            }
          });
        });
    },
    computed: {
     ...mapState(['usuarioDB','cliente']),

    rows() {
      return this.documentos.length;
    },
  },
}
</script>
