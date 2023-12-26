<template>
  <button type="submit" class="submit">{{ props.name }}</button>
</template>
  
<script setup>
const props = defineProps(['name'])
</script>
  
<style lang="scss" scoped>
@import '../../../styles/mixin.scss';

.submit {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: 50%;
  font-weight: 700;
  color: #ffffff;
  background-color: $primaryBtnColor;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: $primary !important;
  }

  @media (min-width: 1024px) {
    width: 16.666667%;
  }
}
</style>