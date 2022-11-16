<template>
  <div class="px-6 tbl-md:px-20">
    <button
      @click="goBack"
      class="mb-14 px-8 py-1 shadow-lg bg-white dark:bg-dark-blue text-very-very-dark-blue dark:text-white rounded-sm"
    >
      Back
    </button>
    <div class="flex flex-col gap-10 justify-between tbl-lg:flex-row tbl-lg:items-center text-very-very-dark-blue dark:text-white">
      <div class="mx-auto max-w-md tbl-lg:mx-0  tbl-lg:w-6/12 tbl-lg:max-w-xl">
        <img
          class="w-full aspect-4/3 "
          :src="country.flag"
          alt=""
        />
      </div>
      <div>
        <h1 class="text-xl tbl-md:text-2xl font-bold mb-6">{{ country.name }}</h1>

        <div class="flex flex-col tbl-lg:flex-row dsk:text-lg justify-between">
          <div>

            <div
              v-for="detail in stringTypeDetails"
              :key="detail.label"
              class="flex gap-1 pb-3"
            >
              <h3 class="font-semibold">{{ detail.label }}:</h3>
              <span>{{ detail.value }}</span>
            </div>
          </div>
          <div class="h-10"></div>
          <div>

            <div
              v-for="detail in arrayTypeDetails"
              :key="detail.label"
              class="flex gap-1 pb-3"
            >
              <h3 class="font-semibold">{{ detail.label }}:</h3>
              <span v-for="(val, i) in detail.values" :key="i"
                >{{ val }}{{ i === detail.values.length - 1 ? "" : "," }}</span
              >
            </div>
          </div>
        </div>

        <div class="h-10 dsk:h-20"></div>

        <h3 class="font-semibold text-lg pb-4">Border Countries:</h3>
        <div class="flex flex-wrap gap-5 text-sm">
          <div
            class="w-32 text-center py-2 shadow-lg bg-white dark:bg-dark-blue text-very-very-dark-blue dark:text-white rounded-sm cursor-pointer"
            v-for="borderCountry in borderCountries"
            :key="borderCountry"
            @click="changeCountry(borderCountry)"
          >
            {{ borderCountry }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { computed, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const countryName = ref("")
const country = ref({})
const borderCountries = ref([])

const stringTypeDetails = computed(() => [
  {
    label: "Native Name",
    value: country.value.name,
  },
  {
    label: "Population",
    value: country.value.population,
  },
  {
    label: "Region",
    value: country.value.region,
  },
  {
    label: "Sub Region",
    value: country.value.subregion,
  },
  {
    label: "Capital",
    value: country.value.capital,
  },
])

const arrayTypeDetails = computed(() => [
  {
    label: "Top Level Domains",
    values: topLevelDomain.value,
  },
  {
    label: "Currencies",
    values: currencies.value,
  },
  {
    label: "Languages",
    values: languages.value,
  },
])

const topLevelDomain = computed(() => {
  return country.value.topLevelDomain
})

const currencies = computed(() => country.value.currencies?.map((c) => c.name))

const languages = computed(() => country.value.languages?.map((l) => l.name))

const fetchCountry = async (name) => {
  console.log("name in fetchCountry:", name)

  await axios
    .get(import.meta.env.VITE_BASE_URL + `name/${name}`)
    .then((response) => {
      country.value = { ...response.data[0] }
      // borderCountries.value = response.data[0].borders
    })
    .catch((error) => {
      console.error(error)
    })

  const borders = country.value.borders
  borderCountries.value = []
  if (borders) {
    borders.forEach((border) => {
      axios
        .get(import.meta.env.VITE_BASE_URL + `alpha/${border}`)
        .then((response) => borderCountries.value.push(response.data.name))
    })
  }
}

const changeCountry = (name) => {
  console.log("name in changeCountry:", name)
  countryName.value = name
  router.push({ name: "country", params: { name: name } })
  fetchCountry(name)
}

const goBack = () => {
  console.log("before go -1:", route.params.name)
  router.go(-1)
  console.log("after go -1:", route.params.name)
  countryName.value = route.params.name
  console.log(`goBack to ${countryName}`)
  fetchCountry(countryName.value)
}

watch(countryName, (newName, oldName) => {
  console.log("new name:", newName)
  console.log("old name:", oldName)
})

onMounted(async () => {
  countryName.value = route.params.name
  console.log(`mount ${countryName.value}`)
  await fetchCountry(countryName.value)
})
</script>
