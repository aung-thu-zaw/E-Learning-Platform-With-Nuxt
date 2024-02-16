<script setup lang="ts"></script>

<template>
  <header>
    <!-- Slider -->
    <div
      data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "isAutoPlay": true
  }'
      class="relative"
    >
      <div class="hs-carousel relative overflow-hidden w-full min-h-[400px] bg-white">
        <div
          class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0"
        >
          <div class="hs-carousel-slide">
            <div
              class="flex justify-center h-full bg-gray-100 p-20"
              style="
                background-image: url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b25saW5lJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                background-color: rgba(0, 0, 0, 0.4);
                background-blend-mode: darken;
              "
            >
              <div class="text-white space-y-10 w-full text-center md:text-left md:px-28">
                <h3 class="text-4xl font-bold transition duration-700 min-w-[300px] md:w-[600px]">
                  First slide
                </h3>
                <p class="text-sm font-medium min-w-[300px] md:w-[600px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut corporis ipsa cum
                  maxime, fugit distinctio et perspiciatis tenetur veniam, commodi nihil quos
                  architecto minus laborum, dolor labore ab libero amet.
                </p>

                <button
                  class="bg-yellow-500 px-5 py-2.5 rounded-md text-white text-sm font-semibold hover:bg-yellow-500 duration-200 transition-all"
                >
                  Start For Free
                </button>
              </div>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div
              class="flex justify-center h-full bg-gray-100 p-20"
              style="
                background-image: url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG9ubGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                background-color: rgba(0, 0, 0, 0.4);
                background-blend-mode: darken;
              "
            >
              <div class="text-white space-y-10 w-full text-center md:text-left md:px-28">
                <h3 class="text-4xl font-bold transition duration-700 min-w-[300px] md:w-[600px]">
                  Second slide
                </h3>
                <p class="text-sm font-medium min-w-[300px] md:w-[600px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut corporis ipsa cum
                  maxime, fugit distinctio et perspiciatis tenetur veniam, commodi nihil quos
                  architecto minus laborum, dolor labore ab libero amet.
                </p>

                <button
                  class="bg-yellow-500 px-5 py-2.5 rounded-md text-white text-sm font-semibold hover:bg-yellow-500 duration-200 transition-all"
                >
                  Start For Free
                </button>
              </div>
            </div>
          </div>

          <div class="hs-carousel-slide">
            <div
              class="flex justify-center h-full bg-gray-100 p-20"
              style="
                background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fG9ubGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                background-color: rgba(0, 0, 0, 0.4);
                background-blend-mode: darken;
              "
            >
              <div class="text-white space-y-10 w-full text-center md:text-left md:px-28">
                <h3 class="text-4xl font-bold transition duration-700 min-w-[300px] md:w-[600px]">
                  Third slide
                </h3>
                <p class="text-sm font-medium min-w-[300px] md:w-[600px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut corporis ipsa cum
                  maxime, fugit distinctio et perspiciatis tenetur veniam, commodi nihil quos
                  architecto minus laborum, dolor labore ab libero amet.
                </p>

                <button
                  class="bg-yellow-500 px-5 py-2.5 rounded-md text-white text-sm font-semibold hover:bg-yellow-500 duration-200 transition-all"
                >
                  Start For Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
      >
        <span class="text-2xl" aria-hidden="true">
          <svg
            class="size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </span>
        <span class="sr-only">Previous</span>
      </button>
      <button
        type="button"
        class="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
      >
        <span class="sr-only">Next</span>
        <span class="text-2xl" aria-hidden="true">
          <svg
            class="size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </button>

      <div
        class="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"
      >
        <span
          class="hs-carousel-active:bg-yellow-500 hs-carousel-active:border-yellow-500 size-3 border border-gray-400 rounded-full cursor-pointer"
        ></span>
        <span
          class="hs-carousel-active:bg-yellow-500 hs-carousel-active:border-yellow-500 size-3 border border-gray-400 rounded-full cursor-pointer"
        ></span>
        <span
          class="hs-carousel-active:bg-yellow-500 hs-carousel-active:border-yellow-500 size-3 border border-gray-400 rounded-full cursor-pointer"
        ></span>
      </div>
    </div>
    <!-- End Slider -->
  </header>
</template>
