<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  }
};
</script>
<style>
  .custom-control-label {
    cursor: pointer;
    width: 100%;
}
.ex1{
  height:70vh!important;
}
.bar{
  width:auto!important;
}
.dropdown-menu.show{
  z-index:99999999999999;
}
@media (max-width: 769px){
  .bar{
    width:28rem!important;
  }
  .page{
        width: 152mm!important;
  }
}
</style>