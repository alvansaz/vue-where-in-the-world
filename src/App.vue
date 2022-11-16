<template>
    <header
      class="flex items-center justify-between text-sm lg-tbl:text-base px-5 py-7 bg-white dark:bg-dark-blue text-very-very-dark-blue dark:text-white"
    >
      <RouterLink class="font-bold text-lg" to="/"
        >Where in the world?</RouterLink
      >
      <button @click="toggleMode" class="flex items-center gap-2">
        <span class="material-symbols-outlined text-base">
          {{ mode === "light" ? "dark_mode" : "light_mode" }}
        </span>
        <span>{{ mode === "light" ? "Dark" : "Light" }} Mode</span>
      </button>
    </header>

    <RouterView
      class="flex-grow h-full py-10"
    />
</template>

<script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

const mode = ref("light")

const toggleMode = () => {
  document.querySelector("html").classList.toggle("dark")
  mode.value = mode.value === "light" ? "dark" : "light"
}
</script>

<style scoped></style>
