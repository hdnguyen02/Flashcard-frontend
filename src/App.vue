<template>
  <Navbar></Navbar>
  <div>
    <RouterView></RouterView> 
  </div>
  
</template>

<script>
  import Navbar from './components/Navbar.vue' 
  
  export default {
      name: "Home", 
      components: {
          Navbar
      },
  }
</script>

<style>
  .router-link-active {
    color: green;
    border-bottom: 3px solid green !important;
    border-radius: 0% !important;
  }




</style>