<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)"> </CityCard>
    </div>

    <p v-if="savedCities.length === 0">
        No locations added, search for a location and then add it using the '+'
        button.
    </p>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CityCard from './CityCard.vue'
import { useRouter } from 'vue-router'

const savedCities = new ref([])

const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
    }

    const requests = []

    savedCities.value.forEach((city) => {
        requests.push(
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=41e0f050225f7989a4d38e30617ce7c2&units=imperial`
            )
        )
    })

    const weatherData = await Promise.all(requests)

    weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data
    })
}

await getCities()

const router = useRouter()
const goToCityView = (city) => {
    router.push({
        name: 'cityView',
        params: {
            state: city.state,
            city: city.city,
        },
        query: {
            id: city.id,
            lat: city.coordinates.lat,
            lng: city.coordinates.lng,
        },
    })
}
</script>
