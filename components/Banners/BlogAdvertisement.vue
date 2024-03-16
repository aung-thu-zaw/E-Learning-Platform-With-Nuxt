<template>
  <div class="bg-gray-200">
    <div class="container mx-auto py-10 text-center space-y-5">
      <h1 class="font-bold text-3xl text-gray-800">{{ $t('Join Our E-Learning Platform !') }}</h1>
      <p class="text-gray-600 font-medium">
        {{ $t('Join today for unlimited access to thousands of courses and more.') }}
      </p>

      <button
        type="button"
        class="text-xs rounded-md font-bold bg-yellow-500 px-4 py-3 text-white hover:bg-yellow-600 transition-all"
      >
        {{ $t('Try Platform For Free') }}
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>
