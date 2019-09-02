<template>
  <div id="root" class="root">
    <router-view></router-view>
  </div>
</template>

<script>
  // import { sessionStorage } from '../assets/js/storage';
  // import { sessionStorage } from '../src/assets/js/storage'
  export default {
    mounted () {
      window.vue = this;
    },
    created () {
      if (sessionStorage.getItem("store") ) {
          this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      } 
      window.addEventListener("beforeunload",()=>{
          sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    }
  }
</script>

<style lang="scss" scoped>
  .root{
    width: 100%;
    height: 100%;
  }
</style>
