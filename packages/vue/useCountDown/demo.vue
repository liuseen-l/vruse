<script setup lang="ts">
import { useCountDown } from './index'

const {days,hours, minutes, seconds } = useCountDown(1000 * 60 * 60 * 24)

</script>

<template>
  <div>
    {{ days }}天{{ hours }}时{{ minutes }}分{{ seconds }}秒
  </div>
</template>

<style scoped>

</style>
