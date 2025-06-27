<script setup lang="ts">

</script>

<template>
    <!-- Hero Section -->
    <UContainer>
        <section
            class="text-center z-10 sm:text-left py-20 relative sm:py-32 bg-transparent flex flex-col-reverse sm:flex-row items-center justify-between transition-colors duration-300">


            <!-- Text Content -->
            <div class="flex flex-col justify-start items-start sm:w-1/2 w-full space-y-6">
                <h1 class="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                    Welcome to <span class="text-red-100">VitaPulse</span>
                </h1>
                <p class="text-xl md:text-2xl text-white dark:text-gray-300">
                    Your health companion system — track your well-being.
                </p>
                <div class="flex flex-wrap gap-4">
                    <UButton class="text-red bg-white" color="primary" size="lg" to="/signup">
                        Get Started
                    </UButton>
                    <UButton variant="outline" color="primary" class="text-white" size="lg" to="/about">
                        Learn More
                    </UButton>
                </div>
            </div>

            <!-- Image -->
            <div class="sm:w-1/2 w-full flex justify-center sm:justify-end mb-10 sm:mb-0">
                <img src="/src/assets/imgs/vitaP.png" alt="VitaPulse Hero"
                    class="object-contain sm:h-[20rem] h-[12rem] drop-shadow-xl transition-transform hover:scale-105" />
            </div>

        </section>
    </UContainer>\
    <div
        class="py-20 bg-gradient-to-l absolute h-[95%] w-[95%] top-0 from-transparent via-red-500 to-red-500 dark:from-transparent dark:via-red-600 dark:to-red-600  text-white text-center transition-colors duration-300 rounded-r-full">
    </div>
</template>
