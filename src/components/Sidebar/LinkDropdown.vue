<!-- DropdownMenu.vue -->
<template>
  <div v-if="isActive">
    <SidebarLink to="/about/option1">Option 1</SidebarLink>
    <SidebarLink to="/about/option2">Option 2</SidebarLink>
    <!-- Agrega más opciones según sea necesario -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import SidebarLink from './SidebarLink.vue';
import { computed } from 'vue';

const route = useRoute();
const isActive = computed(() => route.path.startsWith('/about'));
</script>
