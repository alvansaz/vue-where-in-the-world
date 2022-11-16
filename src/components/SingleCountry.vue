<template>
  <div class="flex flex-col bg-white dark:bg-dark-blue shadow-lg rounded-md overflow-hidden text-very-dark-blue dark:text-white">
    <img :src="flagUrl" :alt="name + 'flag'" class="w-full aspect-4/3" />
    <div class="px-5 pt-6 pb-9">
      <h2 class="font-bold text-lg pb-3">{{ name }}</h2>

      <div class="flex gap-1 text-sm pb-1">
        <h3 class="font-semibold">Population:</h3>
        <span>{{ population }}</span>
      </div>
      <div class="flex gap-1 text-sm pb-1">
        <h3 class="font-semibold">Region:</h3>
        <span>{{ region }}</span>
      </div>
      <div class="flex gap-1 text-sm pb-1">
        <h3 class="font-semibold">Capital:</h3>
        <span>{{ capital }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  flagUrl: String,
  name: String,
  population: Number,
  region: String,
  capital: String,
})
</script>
