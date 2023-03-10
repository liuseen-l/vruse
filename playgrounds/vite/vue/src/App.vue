<script setup lang="ts">
import { usePick } from '@vruse/vue'
import { ref } from 'vue'

const r = ref<number>(0)
const { run, pickedList } = usePick([1, 2, 3, 6, 7, 8, 9, 10], {
  pickCount: 5,
  excludes: [1],
}, (v) => {
  r.value = v
})

run()
</script>

<template>
  <div>{{ pickedList }}</div>
  <div>{{ r }}</div>
</template>
