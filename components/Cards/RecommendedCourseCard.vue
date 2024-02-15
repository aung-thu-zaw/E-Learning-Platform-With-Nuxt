<script setup lang="ts"></script>

<template>
  <a class="group rounded-xl overflow-hidden" href="#">
    <div class="sm:flex">
      <div class="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
        <img
          class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Image Description"
        />
      </div>

      <div class="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
        <h3 class="text-lg font-bold text-gray-700 line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, nulla explicabo.
          Possimus similique dolor molestiae ipsam magni impedit iste error id? Laudantium tenetur
          reprehenderit commodi velit, dolorum debitis eum ad.
        </h3>
        <div class="flex items-center justify-between my-5">
          <div class="">
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
  </a>
</template>
