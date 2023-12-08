
<script setup>
import Sidebar from './components/SideBar/Sidebar.vue';
import { collapsed } from './components/Sidebar/sidebarState';
import Header from './components/Header/Header.vue';
</script>



<template>
  <Sidebar />
  <Header :style="{'margin-left': collapsed ? '60px' : '200px', 'transition': '0.3s ease'}"/>
  <div class="body">
    <RouterView :style="{'margin-left': collapsed ? '60px' : '200px', 'transition': '0.3s ease'}"/>
  </div>
</template>


<style scoped>

</style>