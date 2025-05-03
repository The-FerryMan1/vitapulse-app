<script setup lang="ts">

</script>

<template>
    <!-- Hero Section -->
    <UContainer>
        <section class="text-center py-24 bg-white sm:flex-row flex flex-col-reverse items-center justify-between ">
            <div class="flex flex-col justify-start items-start">
                <h1 class="text-4xl md:text-7xl font-bold text-gray-800">
                    Welcome to 
                    <span class="text-red-500">VitaPulse</span>
                </h1>
                <p class="mt-4 text-2xl text-gray-600">
                    Your health companion system — track your well-being.
                </p>
                <div class="mt-6 flex items-center sm:w-1/2 w-full sm:justify-start justify-center   gap-4">
                    <UButton color="primary" size="lg" to="/signup">
                        Get Started
                    </UButton>
                    <UButton variant="outline" color="primary" size="lg" to="/about">
                        Learn More
                    </UButton>
                </div>
            </div>
            <div>
                <img src="/src/assets/imgs/vitaP.png" alt="" class="object-contain sm:size-[20rem] size-[10rem] drop-shadow-lg">
            </div>

        </section>
    </UContainer>
</template>