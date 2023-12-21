<template>
    <main class="container text-white">
        <!-- Search-->
        <div class="relative mb-8 pt-4">
            <input
                class="w-full border-b bg-transparent px-1 py-2 placeholder-white focus:border-weather-secondary focus:shadow"
                type="text"
                placeholder="Search for a place"
                v-model="searchQuery"
                @input="getSearchResults"
            />
            <ul
                class="absolute top-[66px] w-full bg-weather-secondary px-1 py-2 text-white shadow-md"
                v-if="mapboxSearchResults"
            >
                <p v-if="searchError">Sorry, something went wrong</p>
                <p v-if="!searchError && mapboxSearchResults.length === 0">
                    No results found
                </p>

                <template v-else>
                    <li
                        v-for="searchResult in mapboxSearchResults"
                        :key="searchResult.id"
                        class="cursor-pointer px-1 py-2 hover:bg-slate-500"
                        @click="selectPlace(searchResult)"
                    >
                        {{ searchResult.place_name }}
                    </li>
                </template>
            </ul>
        </div>

        <!-- Saved locations -->
        <div class="flex flex-col">
            <Suspense>
                <CityList />
                <template #fallback>
                    <CityCardSkeleton />
                </template>
            </Suspense>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CityList from '../components/CityList.vue'
import CityCardSkeleton from '../components/CityCardSkeleton.vue'

const router = useRouter()
const mapboxAPIKey =
    'pk.eyJ1IjoiYmxvcmFuZ2UyIiwiYSI6ImNscTMwdXd0NjA3ZnMya3BkOTJvOWxlMGwifQ.FJRnXDvT7FEKsRy4yGCOaQ'
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)

    queryTimeout.value = setTimeout(async () => {
        if (searchQuery !== '') {
            try {
                const result = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&type=place`
                )

                mapboxSearchResults.value = result.data.features
            } catch {
                searchError.value = true
            }

            return
        }

        mapboxSearchResults.value = null
    }, 300)
}

const selectPlace = (searchResult) => {
    console.log(searchResult)
    const [city, state] = searchResult.place_name.split(',')

    router.push({
        name: 'cityView',
        params: {
            state: state.replaceAll(' ', ''),
            city: city,
        },
        query: {
            lat: searchResult.geometry.coordinates[1],
            lng: searchResult.geometry.coordinates[0],
            preview: true,
        },
    })
}

// https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json
</script>

<style lang="scss" scoped></style>
