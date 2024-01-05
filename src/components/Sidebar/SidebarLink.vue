<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { collapsed } from './SidebarState';

const props = defineProps(['to', 'icon']);
const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }, {link_collapsed: collapsed}"> 
      <i class="icon" :class="icon"></i>
      <span v-if="!collapsed">
      <slot />
    </span>
  </router-link>
</template>

<style lang="scss">
@import '../../styles/variables.scss' ;

.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  padding: 1.5rem 1rem;
  height: 1rem;
  color: #fff;
  text-decoration: none;
  transition: background-color .3s;

  &.link_collapsed{
    padding: 1.5rem 1.2rem;
  }

  &:hover{
    background-color: $primary_hover;
  }

  &.active{
    background-color: $active_link;
    position: relative;

    &::after{
      content: '';
      width: 7px;
      height: 100%;
      position: absolute;
      right: 0;
      background-color: $primary_hover;
    }
  }

  .icon{
    flex-shrink: 0;
    width: 25px;
    font-size: 20px;
    margin-right: 5px;
  }
}
</style>