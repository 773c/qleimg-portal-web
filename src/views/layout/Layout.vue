<template>
  <div class="main-wrapper" :class="classObj">
    <!--导航栏-->
    <navbar class="navbar-wrapper"></navbar>
    <!--内容部分-->
    <div class="content-wrapper">
      <!--中间内容-->
      <div class="content-middle">
        <middle></middle>
      </div>
    </div>
  </div>
</template>

<script>
  import {Middle, Navbar} from "./index";
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "layout",
    components: {
      Navbar,
      Middle
    },
    mixins: [ResizeMixin],
    computed: {
      device() {
        console.log(this.$store.state.app.device);
        return this.$store.state.app.device
      },
      classObj() {
        return {
          mobile: this.device === 'mobile'
        }
      }
    }
  }
</script>

<style scoped>
</style>
