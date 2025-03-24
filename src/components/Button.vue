<script setup>
defineProps({
  label: String,
  click: Function,
  className: String,
})
</script>

<template>
  <button @click="click"
    :class="'hover:scale-[1.02] active:scale-100 border-b-3 border-green-600 px-4 py-2 font-bold rounded-xl text-white bg-green-500 active:bg-green-600 transition-all cursor-pointer ' + className">
    {{ label }}
  </button>
</template>

<style scoped></style>