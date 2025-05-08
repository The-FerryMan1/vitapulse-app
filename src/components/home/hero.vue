<script setup lang="ts">

</script>

<template>
    <!-- Hero Section -->
    <UContainer>
        <section
            class="text-center sm:text-left py-20 sm:py-32 bg-white dark:bg-gray-900 flex flex-col-reverse sm:flex-row items-center justify-between transition-colors duration-300">
            <!-- Text Content -->
            <div class="flex flex-col justify-start items-start sm:w-1/2 w-full space-y-6">
                <h1 class="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                    Welcome to <span class="text-red-500">VitaPulse</span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                    Your health companion system — track your well-being.
                </p>
                <div class="flex flex-wrap gap-4">
                    <UButton color="primary" size="lg" to="/signup">
                        Get Started
                    </UButton>
                    <UButton variant="outline" color="primary" size="lg" to="/about">
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
    </UContainer>
</template>
