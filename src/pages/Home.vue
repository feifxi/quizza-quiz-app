<script setup>
import { getAllGames } from '@/api/quizsAPI';
import { onBeforeMount, reactive, ref } from 'vue';

  const games = ref([])

  const fetchAllGames = async () => {
    const res = await getAllGames()
    games.value = res.data    
  }

  onBeforeMount(()=>{
    fetchAllGames()
  })
</script>

<template>
  <div>HOME</div>
  <div class="flex">
    <div 
      v-for="game of games" 
      class="border border-black p-5"
    >
      <p> Tittle : {{ game.title }}</p>
      <p> by : {{ game.createBy }}</p>
    </div>  
  </div>
  
</template>

<style scoped>
</style>
