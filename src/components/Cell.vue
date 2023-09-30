<script setup lang="ts">
import { CellState } from '@/models/cell-state.ts';

defineProps({
  cellState: {
    type: Number,
    required: true,
  }
});
</script>

<template>
  <div class="cell flexCentered">
    <img v-if="cellState !== CellState.empty"
         :alt="cellState === CellState.cross ? 'circle' : 'cross'"
         :src="cellState === CellState.cross ? 'src/assets/circle.svg' : 'src/assets/cross.svg'" />
  </div>
</template>

<style scoped>
  .cell {
    background-color: aliceblue;
    border-radius: 1rem;
    height: 10rem;
    width: 10rem;
  }
</style>
