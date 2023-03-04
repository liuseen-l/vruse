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
</template>
