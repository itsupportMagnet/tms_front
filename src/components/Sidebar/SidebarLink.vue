<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { collapsed } from './SidebarState';

const props = defineProps(['to', 'icon']);

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <span v-if="!collapsed">
      <slot />
    </span>
  </router-link>
</template>

<style lang="scss">
@import '../../styles/global.scss' ;

.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
   margin: .1rem 0;
  padding: .7rem .5rem;
  height: 1rem;
  color: #fff;
  text-decoration: none;
  transition: all .3s;

  &:hover{
    background-color: $primary_hover;
  }

  &.active{
    background-color: $primary_hover;
  }
}
</style>