<template>
    <div>
        <Suspense>
            <!-- Our nested async component -->
            <AsyncCityView></AsyncCityView>

            <!-- What we do whilst waiting -->
            <template #fallback>
                <CityViewSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue'
import CityViewSkeleton from '../components/CityViewSkeleton.vue'
</script>
