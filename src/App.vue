<script setup lang="ts">
import { Board } from '@/models/board.ts';
import Cell from './components/Cell.vue';
const board: Board = new Board();

const startVideo = () => {
  const videoFrame = document.getElementById('videoFrame') as HTMLIFrameElement | null;
  if (videoFrame?.src) {
    videoFrame.src += '&autoplay=1';
  }
};

const startGame = () => {
  startVideo();
  board.startGame();
}

const id = 'CoaQhwDIvOc';
const src = 'https://www.youtube.com/embed/' + id + `?rel=0&enablejsapi=1&loop=1&playlist=${id}`;

</script>


<template>
  <div class="tic-tac-toe">
    <iframe
        id="videoFrame"
        width="1903"
        height="762"
        :src="src"
        title="Baki - Yujiro Laughs at Baki [4K]"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>
    <div class="container">
      <div class="row" v-for="row in board.rows" :key="row">
        <Cell v-for="cell in row" v-bind:cellState="cell.state.value" :class="{ disabled: cell.isDisabled.value }" @click="board.makeTurn(cell)"></Cell>
      </div>
      <button class="new-game" @click="startGame">New Game!</button>
    </div>
    <div v-if="!board.isGameStarted.value" class="game-starter flexCentered">
      <button class="new-game" @click="startGame">New Game!</button>
    </div>
  </div>
</template>

<style scoped>
  .container {
    border-radius: 1rem;
    background-color: #6565d0;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 1rem;
    gap: 1rem
  }
  .row {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .game-starter {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .new-game {
    width: 20rem;
    height: 5rem;
    border-radius: 3rem;
    background-color: aliceblue;
    border: 1px solid aquamarine;
    margin: 0 auto;
  }

  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
</style>
