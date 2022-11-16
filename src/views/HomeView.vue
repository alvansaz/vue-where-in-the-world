<template>
  <div class="px-5 tbl-sm:px-10 tbl-md:px-14">
    <div class="flex flex-col tbl-sm:flex-row tbl-sm:justify-between gap-10">
      <div
        class="bg-white dark:bg-dark-blue mx-auto tbl-sm:mx-0 shadow-md flex items-center py-4 px-5 rounded-md gap-5 w-full max-w-md"
      >
        <span class="material-symbols-outlined text-dark-gray dark:text-white">
          search
        </span>
        <input
          class="outline-none w-full dark:bg-dark-blue dark:text-white"
          v-model="searchQuery"
          type="text"
          placeholder="Search for a country..."
        />
      </div>

      <div class="relative text-very-very-dark-blue dark:text-white">
        <div
          class="cursor-pointer flex items-center justify-between py-3 px-6 bg-white dark:bg-dark-blue w-56 rounded-sm shadow-md"
          @click="showDropDown = !showDropDown"
        >
          <span>{{
            filterRegion === "All" ? "Filter by region" : filterRegion
          }}</span
          ><span class="material-symbols-outlined"> expand_more </span>
        </div>
        <ul
          class="py-3 flex flex-col gap-1 absolute top-14 bg-white dark:bg-dark-blue w-56 rounded-sm shadow-md"
          :class="showDropDown ? 'block' : 'hidden'"
        >
          <li
            class="cursor-pointer px-6 hover:bg-gray-200"
            v-for="region in regions"
            :key="region"
            @click="changeRegion(region)"
          >
            {{ region }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-wrap gap-8 pt-10">
      <RouterLink
        class="w-9/12 max-w-vsm mx-auto"
        v-for="country in filteredCountries"
        :key="country.name"
        :to="{ name: 'country', params: { name: country.name } }"
      >
        <SingleCountry
          :flag-url="country.flags.png"
          :name="country.name"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { onMounted, ref, computed } from "vue"
import SingleCountry from "../components/SingleCountry.vue"

const countries = ref([])
const searchQuery = ref("")
const filterRegion = ref("All")

const showDropDown = ref(false)

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]

const filteredCountries = computed(() => {
  let filteredCountries = []

  if (filterRegion.value === "All") {
    filteredCountries = countries.value
  } else {
    filteredCountries = countries.value.filter(
      (country) => country.region === filterRegion.value
    )
  }

  if (searchQuery.value === "") {
    return filteredCountries
  }

  const exactMatches = filteredCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  const searchChars = searchQuery.value.toLowerCase().split("")

  const partialMAtches = filteredCountries.filter((country) =>
    searchChars.every((c) => country.name.toLowerCase().includes(c))
  )

  filteredCountries = [...exactMatches, ...partialMAtches]

  return [...new Set(filteredCountries)]
})

const changeRegion = (region) => {
  filterRegion.value = region
  showDropDown.value = false
}

onMounted(() => {
  axios
    .get(import.meta.env.VITE_BASE_URL + "all")
    .then((response) => {
      countries.value = response.data.slice()
    })
    .catch((error) => console.error(error))
})
</script>
