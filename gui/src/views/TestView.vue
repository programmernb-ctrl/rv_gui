<script setup lang="ts">
// Mock player data for demonstration
const player = {
    id: 1,
    name: 'Rider_Ghost',
    level: 25,
    cash: 45800,
    bank: 125600,
    job: 'Police Officer',
    rank: 'Lieutenant',
    phone: '555-0187',
    health: 85,
    armor: 60,
    vehicles: 3,
    houses: 1,
    currentLocation: 'Downtown',
};
</script>

<template>
    <div class="background flex items-center justify-center">
        <div class="player-card glass-panel w-full max-w-4xl mx-auto p-6 rounded-lg text-white">
            <!-- Header -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-6 border-b border-gray-700">
                <div>
                    <h1 class="text-3xl font-bold text-blue-300">Player Overview</h1>
                    <p class="text-gray-400">Welcome back, {{ player.name }}</p>
                </div>
                <div class="bg-blue-600 px-4 py-2 rounded-md flex items-center mt-2 md:mt-0">
                    <span class="font-mono mr-2">ID:</span>
                    <span class="font-bold">{{ player.id }}</span>
                </div>
            </div>

            <!-- Main Content -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Column -->
                <div>
                    <!-- Player Stats -->
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold mb-3 text-blue-400">Player Stats</h2>
                        <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-gray-400">Level</p>
                                    <p class="text-xl font-bold">{{ player.level }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400">Job</p>
                                    <p>{{ player.job }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400">Rank</p>
                                    <p>{{ player.rank }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400">Phone</p>
                                    <p>{{ player.phone }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Health and Armor -->
                    <div>
                        <h2 class="text-xl font-semibold mb-3 text-blue-400">Status</h2>
                        <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 space-y-3">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span>Health</span>
                                    <span>{{ player.health }}%</span>
                                </div>
                                <div class="w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        class="bg-green-500 h-2.5 rounded-full"
                                        :style="`width: ${player.health}%`"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex justify-between mb-1">
                                    <span>Armor</span>
                                    <span>{{ player.armor }}%</span>
                                </div>
                                <div class="w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        class="bg-blue-500 h-2.5 rounded-full"
                                        :style="`width: ${player.armor}%`"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div>
                    <!-- Finances -->
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold mb-3 text-blue-400">Finances</h2>
                        <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 space-y-2">
                            <div class="flex justify-between items-center pb-2 border-b border-gray-700">
                                <span class="text-gray-300">Cash</span>
                                <span class="text-green-400 font-mono">${{ player.cash.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-300">Bank</span>
                                <span class="text-green-400 font-mono">${{ player.bank.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between items-center pt-2 border-t border-gray-700 font-semibold">
                                <span>Total</span>
                                <span class="text-green-400 font-mono"
                                    >${{ (player.cash + player.bank).toLocaleString() }}</span
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Assets -->
                    <div>
                        <h2 class="text-xl font-semibold mb-3 text-blue-400">Assets</h2>
                        <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                            <div class="flex items-center justify-around">
                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-2 mx-auto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 text-blue-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-400">Properties</div>
                                    <div class="text-lg font-semibold">{{ player.houses }}</div>
                                </div>

                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-2 mx-auto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 text-blue-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-400">Vehicles</div>
                                    <div class="text-lg font-semibold">{{ player.vehicles }}</div>
                                </div>

                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-2 mx-auto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 text-blue-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-400">Location</div>
                                    <div class="text-lg font-semibold truncate max-w-[80px]">
                                        {{ player.currentLocation }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-6 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
                Press ESC to close this menu
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    background-image: url(../assets/background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
}

.glass-panel {
    background-color: rgba(17, 24, 39, 0.8);
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
