<template>
    <button type="submit" class="submit">{{ props.name }}</button>
  </template>
  
  <script setup>
    const props = defineProps(['name'])
  </script>
  
  <style lang="scss" scoped>
  @import '../../../styles/mixin.scss';
    .submit{
      @include submit;
    }
  </style>