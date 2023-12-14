
<script setup>
import Sidebar from './components/SideBar/Sidebar.vue';
import { collapsed } from './components/Sidebar/sidebarState';
import Header from './components/Header/Header.vue';
</script>



<template>
  <Sidebar />
  <Header :style="{'margin-left': collapsed ? '60px' : '200px', 'padding-left': '15px', 'transition': '0.3s ease' }"/>
  <div class="body" :style="{'margin-left': collapsed ? '60px' : '200px', 'padding-left': '15px',  'transition': '0.3s ease'}">
    <RouterView />
  </div>
</template>


<style scoped>
  .body{
    background-color: #f6f6f6;
    height: 93vh;
    color: #383838;
  }
</style>