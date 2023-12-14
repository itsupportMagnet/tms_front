<template>
  <button class="btn-hover btn" role="button">
    <slot></slot>
  </button>
</template>

<script></script>

<style lang="scss">
.btn-hover {
  // padding: 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px 20px 0 20px;
  // height: 40px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 5px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &.btn {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
  }
}

</style>