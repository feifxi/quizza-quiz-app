<script setup>
  defineProps({
    label: String,
    type: String,
    onClick: Function
  })
</script>

<template>
  <button class=" px-4 py-2 bg-green-600 rounded-xl text-white  active:bg-green-800  active:tranform active:scale-[0.9] transition-all  cursor-pointer ">
    {{ label }}
  </button>
</template>

<style scoped>
</style>