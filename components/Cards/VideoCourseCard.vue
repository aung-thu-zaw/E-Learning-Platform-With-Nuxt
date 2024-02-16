<script setup lang="ts"></script>

<template>
  <div
    class="relative flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-5 overflow-hidden"
  >
    <span
      class="absolute top-4 -left-11 -rotate-45 bg-yellow-500 border-2 border-yellow-200 text-xs text-white font-bold px-10 py-1.5"
    >
      <i class="fa-solid fa-crown"></i>
      Premium
    </span>
    <img
      class="w-full h-auto rounded-xl"
      src="https://cdn3.careeraddict.com/uploads/article/59039/medium-illustration-man-online-class-computer.jpg"
      alt="Image Description"
    />
    <div class="p-4 md:p-5">
      <h3 class="text-md font-bold text-gray-700 line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, nulla explicabo. Possimus
        similique dolor molestiae ipsam magni impedit iste error id? Laudantium tenetur
        reprehenderit commodi velit, dolorum debitis eum ad.
      </h3>

      <div class="flex items-center justify-between my-5">
        <div class="space-x-2">
          <img
            class="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Image Description"
          />
          <span class="text-xs font-semibold text-gray-500">Aung Thu Zaw</span>
        </div>
        <div>
          <span class="cursor-pointer">
            <i class="fa-regular fa-bookmark"></i>
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between font-medium">
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-film"></i> 24 Lessons
        </span>
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-clock"></i> 2 h 05 min
        </span>
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-chart-simple"></i> Beginner
        </span>
      </div>
    </div>
  </div>
</template>
