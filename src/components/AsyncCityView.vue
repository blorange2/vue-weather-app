<template>
    <div class="flex flex-1 flex-col items-center">
        <!-- Banner -->
        <div
            class="w-full bg-weather-secondary p-4 text-center text-white"
            v-if="route.query.preview"
        >
            <p>
                You are currently previewing this city, click the '+' icon to
                track this city.
            </p>
        </div>

        <!-- Weather overview -->
        <div class="flex flex-col items-center py-12 text-white">
            <h1 class="mb-2 text-4xl">{{ route.params.city }}</h1>
            <p class="mb-12 text-sm">
                {{
                    new Date(weatherData.currentTime).toLocaleDateString(
                        'en-gb',
                        {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'long',
                        }
                    )
                }}
                {{
                    new Date(weatherData.currentTime).toLocaleTimeString(
                        'en-gb',
                        {
                            timeStyle: 'short',
                        }
                    )
                }}
            </p>
            <p class="mb-8 text-8xl">
                {{ Math.round(weatherData.current.temp) }}
            </p>

            <p>Feels like {{ Math.round(weatherData.current.feels_like) }}</p>
            <p class="capitalize">
                {{ weatherData.current.weather[0].description }}
            </p>
            <img
                class="h-auto w-[150px]"
                :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
                alt=""
            />
        </div>

        <hr class="w-full border border-white border-opacity-10" />

        <!-- Hourly weather -->
        <div class="w-full max-w-screen-md py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly weather</h2>
                <div class="flex gap-10 overflow-x-auto">
                    <div
                        class="flex shrink-0 flex-col items-center gap-4"
                        v-for="hourData in weatherData.hourly"
                        :key="hourData.dt"
                    >
                        <p class="whitespace-no-wrap text-lg">
                            {{
                                new Date(
                                    hourData.currentTime
                                ).toLocaleTimeString('en-gb', {
                                    hour: 'numeric',
                                })
                            }}
                        </p>
                        <img
                            class="h-[100px] w-auto object-cover"
                            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                            alt=""
                        />
                        <p class="text-xl">{{ Math.round(hourData.temp) }}</p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="w-full border border-white border-opacity-10" />

        <!-- Weekly weather -->
        <div class="w-full max-w-screen-md py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div class="flex flex-col gap-1">
                    <div
                        class="flex shrink-0 items-center"
                        v-for="day in weatherData.daily"
                        :key="day.dt"
                    >
                        <p class="flex-1">
                            {{
                                new Date(day.dt * 1000).toLocaleDateString(
                                    'en-gb',
                                    {
                                        weekday: 'long',
                                    }
                                )
                            }}
                        </p>
                        <img
                            class="h-[50px] w-auto object-cover"
                            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                            alt=""
                        />

                        <div class="flex flex-1 justify-end gap-2">
                            <p>H: {{ Math.round(day.temp.max) }}</p>
                            <p>L: {{ Math.round(day.temp.min) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex cursor-pointer items-center gap-2 py-12 text-white duration-150 hover:text-red-400"
            @click="removeCity"
        >
            <p>Remove city</p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const error = ref(null)
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=41e0f050225f7989a4d38e30617ce7c2&units=imperial`
        )

        // cal current date & time
        const localOffset = new Date().getTimezoneOffset() * 60000
        const utc = weatherData.data.current.dt * 1000 + localOffset
        weatherData.data.currentTime =
            utc + 1000 * weatherData.data.timezone_offset

        // cal hourly weather offset
        weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
        })

        return weatherData.data
    } catch (err) {
        console.log(err)
        error.value = {
            status: err.response?.status || 503,
            message: err.message || 'Failed to fetch data',
        }
    }
}
const weatherData = await getWeatherData()

const router = useRouter()
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'))

    const updatedCities = cities.filter((city) => {
        return city.id !== route.query.id
    })

    localStorage.setItem('savedCities', JSON.stringify(updatedCities))

    router.push({
        name: 'home',
    })
}
</script>
