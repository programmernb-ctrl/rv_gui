<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import TestComponent from '../components/TestComponent.vue';

const router = useRouter();

const isVisible = ref<boolean>(false);

const handleMessage = (event: MessageEvent) => {
    const data = event.data;

    if (data.type === 'isVisible') {
        isVisible.value = data.value;

        if (isVisible.value) {
            router.push({name: 'test'});
        }
    }
};

onMounted(() => {
    window.addEventListener('message', handleMessage);
});

onUnmounted(() => {
    window.removeEventListener('message', handleMessage);
});
</script>
<template>
    <main class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-8 flex flex-col">
        <div class="max-w-5xl mx-auto flex-1 flex flex-col">
            <!-- Header Section -->
            <header class="text-center mb-10 pt-6">
                <div
                    class="mb-4 inline-block p-3 from-blue-600 via-blue-600 to-blue-700 bg-gradient-to-r rounded-lg transform rotate-2 transition-transform hover:rotate-0">
                    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">FiveM Vue TS Boilerplate</h1>
                </div>
                <p class="text-xl text-blue-300 mt-3">Modern UI Development Framework for FiveM</p>
            </header>

            <!-- Feature Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 flex-1">
                <div
                    class="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col">
                    <div class="h-14 w-14 bg-blue-600 rounded-lg mb-4 flex items-center justify-center shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
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
                    <h3 class="text-xl font-bold mb-3">Vue 3 + TypeScript</h3>
                    <p class="text-gray-400 flex-1">
                        Built with Vue 3 + Vue Router and TypeScript for type-safe development with excellent developer
                        experience.
                    </p>
                </div>

                <div
                    class="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col">
                    <div class="h-14 w-14 bg-blue-600 rounded-lg mb-4 flex items-center justify-center shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Tailwind CSS</h3>
                    <p class="text-gray-400 flex-1">
                        Styled with Tailwind for rapid UI development with utility-first approach and beautiful
                        responsive designs.
                    </p>
                </div>

                <div
                    class="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col">
                    <div class="h-14 w-14 bg-blue-600 rounded-lg mb-4 flex items-center justify-center shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">FiveM Ready</h3>
                    <p class="text-gray-400 flex-1">
                        Optimized for FiveM NUI integration with message event handling and efficient performance for
                        your resources.
                    </p>
                </div>
            </div>

            <!-- Getting Started Section -->
            <div class="bg-gray-800 bg-opacity-40 p-6 rounded-lg border border-gray-700 mb-10 flex-1">
                <h2 class="text-2xl font-bold mb-4 text-blue-400">Getting Started</h2>
                <div class="space-y-4">
                    <p class="text-gray-200">
                        This boilerplate includes everything you need to build beautiful user interfaces for your FiveM
                        resources. Get started with these commands:
                    </p>
                    <div class="bg-gray-900 p-5 rounded-lg font-mono overflow-x-auto border border-gray-800">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                                <code class="text-green-400 mr-3">pnpm build</code>
                                <span class="text-gray-500">build server files</span>
                            </div>
                            <div class="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                                <code class="text-green-400 mr-3">pnpm build:web</code>
                                <span class="text-gray-500">build webview</span>
                            </div>
                            <div class="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                                <code class="text-green-400 mr-3">pnpm watch</code>
                                <span class="text-gray-500">watch server files</span>
                            </div>
                            <div class="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                                <code class="text-green-400 mr-3">pnpm watch:web</code>
                                <span class="text-gray-500">watch webview</span>
                            </div>
                            <div class="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                                <code class="text-green-400 mr-3">pnpm build:dev</code>
                                <span class="text-gray-500">build everything</span>
                            </div>
                            <div class="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                                <code class="text-green-400 mr-3">pnpm dev</code>
                                <span class="text-gray-500">watch everything</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Links & Resources -->
            <div class="flex flex-wrap gap-4 justify-center mb-6">
                <a
                    target="_blank"
                    href="https://github.com/programmernb-ctrl/rv_gui/tree/main"
                    class="px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>GitHub</span>
                </a>
                <a
                    target="_blank"
                    href="https://discord.gg/2ZS3Yw7k"
                    class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Discord</span>
                </a>
            </div>

            <!-- Footer -->
            <footer class="text-center mt-auto pt-6 border-t border-gray-800 text-sm">
                <p class="mb-3">
                    Made with <span class="inline-block animate-pulse text-red-500">❤️</span> by
                    <a
                        href="https://github.com/programmernb-ctrl"
                        target="_blank"
                        class="text-blue-400 hover:text-blue-300 border-b border-blue-400 border-opacity-0 hover:border-opacity-100">
                        thirst
                    </a>
                    and
                    <a
                        href="https://github.com/iloomilo"
                        target="_blank"
                        class="text-purple-400 hover:text-purple-300 border-b border-purple-400 border-opacity-0 hover:border-opacity-100">
                        iloomilo
                    </a>
                    for FiveM developers
                </p>
                <p class="text-gray-500">&copy; {{ new Date().getFullYear() }} FiveM Vue TS Boilerplate</p>
            </footer>
        </div>
    </main>
</template>

<style scoped></style>
