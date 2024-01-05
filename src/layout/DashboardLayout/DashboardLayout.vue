<template>
  <Sidebar />
  <Header :style="{'margin-left': collapsed ? '60px' : '200px', 'padding-left': '15px', 'transition': '0.3s ease' }"/>
  <div class="body" :style="{'margin-left': collapsed ? '60px' : '200px', 'padding': '0 20px',  'transition': '0.3s ease'}">
    <RouterView />
  </div>
</template>

<script setup>
import Sidebar from '../../components/SideBar/Sidebar.vue';
import Header from '../../components/Header/Header.vue';
import { collapsed } from '../../components/SideBar/SidebarState';
import { RouterView } from 'vue-router';


</script>

<style scoped>
.body{
    background-color: #f5f5fc;
    min-height: 93vh;
    color: #101111;
    overflow-x: hidden;
  }
</style>