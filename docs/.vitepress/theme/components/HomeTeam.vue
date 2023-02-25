<script setup lang="ts">
import { coreTeamMembers } from '../../../contributors'
</script>

<template>
  <div class="vp-doc">
    <h2 op50 font-normal pt-5 pb-2>VRuse Team</h2>
  </div>
  <div
    grid="~ sm:cols-2 md:cols-3 lg:cols-4 gap-x-3 gap-y-20 items-center"
    p-10>
    <TeamMembers v-for="c of coreTeamMembers" :key="c.github" :data="c" />
  </div>
</template>
