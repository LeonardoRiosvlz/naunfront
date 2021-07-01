<script>
import simplebar from "simplebar-vue";
import VueDocPreview from 'vue-doc-preview'
import Layout from "../../views/layouts/main";
import PageHeader from "@/components/page-header";

import { chatData, chatMessagesData } from "./data";

import { required } from "vuelidate/lib/validators";

/**
 * Chat Component
 */
export default {
  page: {
    title: "Chat",
    meta: [{ name: "description" }],
  },
  components: { Layout, PageHeader, simplebar, VueDocPreview, },
  data() {
    return {
      chatData: chatData,
      chatMessagesData: chatMessagesData,
      title: "Chat",
      items: [
        {
          text: "Skote",
          href: "/",
        },
        {
          text: "Chat",
          active: true,
        },
      ],
      submitted: false,
      form: {
        message: "",
      },
      username: "Frank Vickery",
    };
  },
  validations: {
    form: {
      message: { required },
    },
  },
  methods: {
    /**
     * Get the name of user
     */
    chatUsername(name, image) {
      this.image = image;
      this.username = name;
      this.usermessage = "Hello";
      this.chatMessagesData = [];
      const currentDate = new Date();

      this.chatMessagesData.push({
        name: this.username,
        message: this.usermessage,
        time: currentDate.getHours() + ":" + currentDate.getMinutes(),
        image: this.image,
      });
    },

    /**
     * Char form Submit
     */
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        const message = this.form.message;
        const currentDate = new Date();
        this.chatMessagesData.push({
          align: "right",
          name: "Henry Wells",
          message,
          time: currentDate.getHours() + ":" + currentDate.getMinutes(),
        });
        this.handleScroll();
      }
      this.submitted = false;
      this.form = {};
    },

    handleScroll() {
      if (this.$refs.current.$el) {
        setTimeout(() => {
          this.$refs.current.SimpleBar.getScrollElement().scrollTop =
            this.$refs.current.SimpleBar.getScrollElement().scrollHeight + 1500;
        }, 500);
      }
    },
  },
  mounted() {
    var container = document.querySelector(
      "#scrollElement .simplebar-content-wrapper"
    );
    console.log(container)
    container.scrollTo({ top: 200, behavior: "smooth" });

    var container2 = document.querySelector(
      "#containerElement .simplebar-content-wrapper"
    );
    container2.scrollTo({ top: 500, behavior: "smooth" });
  },
};
</script>

<template>
    <div class="d-lg-flex mb-4">
      <div class="chat-leftsidebar">
        <div class="p-3 border-bottom">
          <div class="media">
            <div class="align-self-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="3em" height="3em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M7 12.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm.75 2.25a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5zM7 18.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3.75-6.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zM10 15.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm8.664-9.086l-5.829-5.828a.493.493 0 0 0-.049-.04a.626.626 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414zM18.5 20a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621z" fill="#626262"/></g></svg>
            </div>
            <div class="media-body">
              <h5 class="font-size-15 mt-0 mb-1">Ricky Clark</h5>
              <p class="text-muted mb-0">
                <i class="mdi mdi-circle text-success align-middle mr-1"></i>
                Version actual
              </p>
            </div>
            <div>
              <b-dropdown class="chat-noti-dropdown" right variant="white">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-horizontal font-size-20"></i>
                </template>
                <b-dropdown-item>Action</b-dropdown-item>
                <b-dropdown-item>Another action</b-dropdown-item>
                <b-dropdown-item>Something else here</b-dropdown-item>
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
          <b-card-text>
                <div>
                  <h5 class="font-size-14 px-3 my-3 ">Versiones</h5>
                  <simplebar style="max-height: 345px" id="scrollElement">
                    <ul class="list-unstyled chat-list">
                      <li
                        class
                        v-for="data of chatData"
                        :key="data.id"
                        @click="chatUsername(data.name, data.image)"
                        :class="{ active: username == data.name }"
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
                                {{ data.name }}
                              </h5>
                              <p class="text-truncate mb-0">
                                {{ data.message }}
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
        </div>
      </div>
      <div class="w-100 user-chat mt-4 mt-sm-0">
        <div class="p-3 px-lg-4 user-chat-border">
          <div class="row">
            <div class="col-md-4 col-6">
              <h5 class="font-size-15 mb-1 text-truncate">{{ username }}</h5>
              <p class="text-muted text-truncate mb-0">
                <i class="mdi mdi-circle text-success align-middle mr-1"></i>
                Versión actual
              </p>
            </div>
            <div class="col-md-8 col-3">
              
            </div>
          </div>
        </div>

        <div class="px-lg-2 chat-users">
          <div class="chat-conversation p-3">
            <VueDocPreview value="" type="office" />
          </div>
        </div>
      </div>
    </div>

    <!-- end row -->





    
</template>