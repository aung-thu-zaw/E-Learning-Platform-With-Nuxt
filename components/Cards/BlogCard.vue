<script setup lang="ts"></script>

<template>
  <a
    class="group flex flex-col h-full border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl p-5"
    href="#"
  >
    <div class="aspect-w-16 aspect-h-11 overflow-hidden rounded-xl">
      <img
        class="w-full object-cover rounded-xl group-hover:scale-105 duration-200"
        src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="Image Description"
      />
    </div>
    <div class="my-6">
      <h3 class="text-xl font-semibold text-gray-800 group-hover:text-yellow-500">
        Announcing a free plan for small teams
      </h3>
      <p class="mt-5 text-gray-600">
        At Wake, our mission has always been focused on bringing openness.
      </p>
    </div>

    <div class="mt-auto flex items-center gap-x-3">
      <img
        class="size-8 rounded-full"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
        alt="Image Description"
      />

      <div>
        <h5 class="text-sm font-semibold text-gray-800">By Aung Thu Zaw</h5>
        <p class="text-xs text-gray-600">12-September-2023</p>
      </div>
    </div>
  </a>
</template>
