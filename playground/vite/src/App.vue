<script setup lang="ts">
import { reactive } from "vue";
import { usePick } from "@vruse/core/vue/vue";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const r = reactive<number[]>([]);

const hook = usePick(
  {
    data: arr,
    pickCount: 5,
    previewCount: 10,
    previewDelay: 60,
    pickDelay: 1000,
    excludes: 4, // [4,2]
  },
  (v, _, l) => {
    r[l as number] = v;
  }
);

hook.run();
</script>

<template>
  <div>{{ r }}</div>
</template>
