<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav
            class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row"
        >
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <p class="text-2xl">Weather Mind</p>
                </div>
            </RouterLink>

            <div class="flex flex-1 justify-end gap-3">
                <font-awesome-icon
                    @click="toggleModal"
                    class="cursor-pointer text-xl duration-150 hover:text-weather-secondary"
                    icon="circle-info"
                />
                <font-awesome-icon
                    class="cursor-pointer text-xl duration-150 hover:text-weather-secondary"
                    icon="plus"
                    @click="addCity"
                    v-if="route.query.preview"
                />
            </div>

            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="mb-1 text-2xl">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="mb-4 list-inside list-decimal">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take you
                            to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select the
                        city within the home page. At the bottom of the page,
                        there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { uid } from 'uid'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'

const savedCities = ref([])
const route = useRoute()
const router = useRouter()
const modalActive = ref(null)

const toggleModal = () => {
    modalActive.value = !modalActive.value
}

const addCity = () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
    }

    const locationObject = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coordinates: {
            lat: parseFloat(route.query.lat),
            lng: parseFloat(route.query.lng),
        },
    }

    savedCities.value.push(locationObject)
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value))

    let query = Object.assign({}, route.query)
    delete query.preview
    query.id = locationObject.id
    router.replace({ query })
}
</script>
