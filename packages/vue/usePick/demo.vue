<script setup lang="ts">
import { ref } from 'vue-demi'
import { usePick } from './index'

const r = ref<number>(0)
const p = usePick([1, 2, 3, 6, 7, 8, 9, 10], 5, (v) => {
  r.value = v
})

p.run()
</script>

<template>
  <div>{{ p.pickedList }}</div>
  <div>{{ r }}</div>
  <button class="btn" @click="() => p.run()">
    重新演示
  </button>
</template>

<style lang="css">
.btn {
  background-color: #24545d;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2px;
  font-size: 15px;
  margin-top: 20px;
}
</style>
