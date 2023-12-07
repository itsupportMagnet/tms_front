
<script setup>
import Sidebar from './components/SideBar/Sidebar.vue';
import { collapsed } from './components/Sidebar/sidebarState';
</script>



<template>
  <Sidebar />
  <div :style="{'margin-left': collapsed ? '60px' : '220px', 'transition': '0.3s ease'}">
    <RouterView />
  </div>
</template>

<style scoped></style>