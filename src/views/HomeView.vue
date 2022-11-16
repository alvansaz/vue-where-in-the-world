<template>
  <div class="px-5 tbl-sm:px-10 tbl-md:px-14">
    <div
      class="flex flex-col tbl-lg:flex-row items-center tbl-sm:justify-between gap-10"
    >
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

      <div
        class="w-full flex flex-col tbl-sm:flex-row tbl-lg:justify-end gap-5"
      >
        <div class="relative text-very-very-dark-blue dark:text-white">
          <div
            class="cursor-pointer flex items-center justify-between py-3 px-6 bg-white dark:bg-dark-blue w-48 rounded-sm shadow-md"
            @click="showFilterDropDown = !showFilterDropDown"
          >
            <span>{{
              filterRegion === "All" ? "Filter by region" : filterRegion
            }}</span
            ><span class="material-symbols-outlined"> expand_more </span>
          </div>
          <ul
            class="py-3 flex flex-col gap-1 absolute top-14 bg-white dark:bg-dark-blue w-48 rounded-sm shadow-md"
            :class="showFilterDropDown ? 'block' : 'hidden'"
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
        <div class="relative text-very-very-dark-blue dark:text-white">
          <div
            class="cursor-pointer flex items-center justify-between py-3 px-6 bg-white dark:bg-dark-blue w-52 rounded-sm shadow-md"
            @click="showSortDropDown = !showSortDropDown"
          >
            <span>{{ `Sort by ${sortBase}` }}</span
            ><span class="material-symbols-outlined"> expand_more </span>
          </div>
          <ul
            class="py-3 flex flex-col gap-1 absolute top-14 bg-white dark:bg-dark-blue w-52 rounded-sm shadow-md"
            :class="showSortDropDown ? 'block' : 'hidden'"
          >
            <li
              class="cursor-pointer px-6 hover:bg-gray-200"
              v-for="sortBase in sortBases"
              :key="sortBase"
              @click="changeSort(sortBase)"
            >
              {{ sortBase }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="countries.length === 0"
      class="absolute top-1/2 text-4xl left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        class="w-20 rounded-full animate-spin aspect-square border-t-8 border-b-8 border-solid"
      ></div>
    </div>
    <div
      v-else-if="filteredCountries.length === 0"
      class="absolute top-1/2 text-4xl left-1/2 font-bold -translate-x-1/2 -translate-y-1/2"
    >
      No Match!
    </div>
    <div v-else class="flex flex-wrap gap-8 pt-10">
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
const sortBase = ref("Name")

const showFilterDropDown = ref(false)
const showSortDropDown = ref(false)

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]
const sortBases = ["Name", "Population"]

const filteredCountries = computed(() => {
  console.log("fiCou")
  let filteredCountries = []

  if (filterRegion.value === "All") {
    filteredCountries = countries.value
  } else {
    filteredCountries = countries.value.filter(
      (country) => country.region === filterRegion.value
    )
  }

  if (sortBase.value === "Population") {
    console.log("pop")
    filteredCountries.sort((c1, c2) => {
      return c2.population - c1.population
    })
  } else if (sortBase.value === "Name") {
    console.log("coun name")
    filteredCountries.sort((c1, c2) =>
      c1.name > c2.name ? 1 : c1.name < c2.name ? -1 : 0
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

  // filteredCountries.sort((c1, c2) => c1.population - c2.population)
  // filteredCountries = filteredCountries.sort(() => {
  //   if (sortBase.value === "Unsorted") return filteredCountries
  //   else if (sortBase.value === "Country Name") return fi
  // })

  return [...new Set(filteredCountries)]
})

const changeRegion = (region) => {
  filterRegion.value = region
  showFilterDropDown.value = false
}

const changeSort = (base) => {
  sortBase.value = base
  console.log(sortBase.value)
  showSortDropDown.value = false
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
