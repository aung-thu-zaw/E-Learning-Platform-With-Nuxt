<script setup lang="ts">
// Your Code
</script>

<template>
  <div class="hs-dropdown relative inline-flex">
    <button
      id="hs-dropdown-slideup-animation"
      type="button"
      class="hs-dropdown-toggle py-2.5 inline-flex items-center gap-x-2 text-sm font-bold text-gray-800 hover:text-gray-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
    >
      <div class="w-10 h-10 rounded-full overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="user-avatar"
          class="w-full h-full object-cover"
        />
      </div>
      Aung Thu Zaw
      <svg
        class="hs-dropdown-open:rotate-180 w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      class="hs-dropdown-menu font-semibold hs-dropdown-open:opacity-100 duration opacity-0 hidden z-10 transition-[margin,opacity] duration-300 mt-2 min-w-[15rem] rounded-lg p-2 bg-white border divide-gray-700 w-auto"
      aria-labelledby="hs-dropdown-slideup-animation"
    >
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-book"></i>
        My Courses
      </a>
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-address-card"></i>
        My Profile
      </a>
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-gear"></i>
        Account Settings
      </a>
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-share"></i>
        Refer a Friend
      </a>
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-credit-card"></i>
        My Membership
      </a>
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-circle-question"></i>
        Help
      </a>
      <a
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100"
        href="#"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
        Sign Out
      </a>
    </div>
  </div>
</template>
