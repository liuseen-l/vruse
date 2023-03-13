<script setup lang="ts">
import { VTSwitch, VTIconChevronDown } from '@vue/theme'
import { useRoute, useRouter } from 'vitepress'
import { ref, onBeforeUnmount } from 'vue'


const preferComposition = ref(false)

const className = 'prefer-composition'


const router = useRouter()
const route = useRoute()

let isOpen = ref(true)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const removeOutline = (e: Event) => {
  ; (e.target as HTMLElement).classList.add('no-outline')
}

const restoreOutline = (e: Event) => {
  ; (e.target as HTMLElement).classList.remove('no-outline')
}

const toggleCompositionAPI = useToggleFn()

function useToggleFn() {
  const classList = document.documentElement.classList
  return () => {
    const url = route.path.split('/')
    const packageName = url[1]
    const hookName = url[2]

    if (packageName === 'vue') {
      classList.add(className)
      router.go(`/react/${hookName}/`)
    } else {
      classList.remove(className)
      const hookName = route.path.split('/')[2]
      router.go(`/vue/${hookName}/`)
    }
  }
}



function toggleCheck(to?: string) {
  if (to) {
    const hookName = route.path.split('/')[2]
    router.go(`/${to}/${hookName}/`)
  }
}

</script>

<template>
  <div class="preference-switch">
    <button pr-5 class="toggle" aria-label="preference switches toggle" aria-controls="preference-switches"
      :aria-expanded="isOpen" @click="toggleOpen" @mousedown="removeOutline" @blur="restoreOutline">
      <span pl-5>API Preference</span>
      <VTIconChevronDown class="vt-link-icon" :class="{ open: isOpen }" />
    </button>
    <div id="preference-switches" :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="options-label" @click="toggleCheck('vue')">Vue</label>
        <VTSwitch class="api-switch" aria-label="prefer composition api" :aria-checked="preferComposition"
          @click="toggleCompositionAPI()" />
        <label class="composition-label" @click="toggleCheck('react')">React</label>
        <!-- <a class="switch-link" title="About API preference" href="/guide/introduction.html#api-styles"
                                          @click="closeSideBar">?</a> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.preference-switch {
  font-size: 12px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  transition: border-color 0.5s, background-color 0.5s ease;
  margin-bottom: 20px;
  top: -0.5px;
  padding-top: 10px;
  border-radius: 10px;
  background-color: rgba(10, 31, 35, .5);
  z-index: 10;
}

.toggle {
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  width: 100%;
  font-weight: 600;
}

.toggle:hover {
  color: var(--vt-c-text-1);
}

.no-outline {
  outline: 0;
}

.vt-link-icon {
  position: relative;
  top: 1px;
}

.vt-link-icon.open {
  transform: rotate(180deg);
}

#preference-switches {
  padding: 12px 16px;
  /* background-color: var(--vt-c-bg-soft); */
  transition: background-color 0.5s;
  margin: 6px 0 12px;
  border-radius: 8px;
  font-weight: 600;
}

.switch-container {
  display: flex;
  align-items: center;
}

.switch-container:nth-child(2) {
  margin-top: 10px;
}

.vt-switch {
  margin-right: 5px;
  transform: scale(0.8);
}

.switch-container label {
  transition: color 0.5s;
  cursor: pointer;
}

.switch-container label:first-child {
  width: 50px;
}

.switch-link {
  margin-left: 8px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: #1eb2ec;
  border: 1px solid #1eb2ec;
  border-radius: 50%;
}

@media (max-width: 1439px) {
  #preference-switches {
    font-size: 11px;
    padding: 8px 4px;
  }

  .vt-switch {
    margin: auto;
  }

  .switch-link {
    margin-left: auto;
  }

  .switch-container label:first-child {
    width: 46px;
  }
}
</style>

<style>
.composition-api,
.sfc {
  display: none;
}

.prefer-composition .options-api,
.prefer-sfc .html {
  display: none;
}

.prefer-composition .composition-api,
.prefer-sfc .sfc {
  display: initial;
}

.prefer-composition .api-switch .vt-switch-check {
  transform: translateX(18px);
}

.composition-label,
.sfc-label,
.prefer-composition .options-label,
.prefer-sfc .no-sfc-label {
  color: var(--vt-c-text-3);
}

.prefer-composition .composition-label,
.prefer-sfc .sfc-label {
  color: var(--vt-c-text-1);
}

.prefer-sfc .sfc-switch .vt-switch-check {
  transform: translateX(18px);
}

.tip .options-api,
.tip .composition-api {
  color: var(--vt-c-text-code);
  /* transition: color 0.5s; */
  font-weight: 600;
}
</style>
