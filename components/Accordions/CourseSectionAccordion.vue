<template>
  <div class="hs-accordion-group">
    <div id="hs-basic-with-arrow-heading-one" class="hs-accordion">
      <button
        class="hs-accordion-toggle hs-accordion-active:text-yellow-600 py-3 inline-flex flex-col items-start justify-between gap-x-3 w-full font-semibold text-start text-white disabled:opacity-50 disabled:pointer-events-none"
        aria-controls="hs-basic-with-arrow-collapse-one"
      >
        <div class="w-full flex items-start justify-between">
          <div class="line-clamp-1 font-semibold text-sm max-w-[310px]">
            Section 1 : Fundemental Controller Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nam vel culpa error, est, iusto consectetur autem odit maiores voluptate quas
            excepturi. Optio cumque maxime sint eligendi numquam assumenda quam aperiam!
          </div>

          <svg
            class="hs-accordion-active:hidden block w-4 h-4"
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
          <svg
            class="hs-accordion-active:block hidden w-4 h-4"
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
            <path d="m18 15-6-6-6 6" />
          </svg>
        </div>

        <span class="text-[.7rem] my-1 font-normal text-white"> 1 / 5 | 1hr 57min </span>
      </button>
      <div
        id="hs-basic-with-arrow-collapse-one"
        class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-with-arrow-heading-one"
      >
        <div class="text-gray-10">
          <div class="p-3 hover:bg-slate-700 rounded-md flex items-start space-x-3 transition-all">
            <div class="flex">
              <input
                id="hs-checked-checkbox"
                type="checkbox"
                class="shrink-0 mt-0.5 border-gray-200 rounded text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                checked
              />
            </div>
            <div>
              <p class="line-clamp-2 font-semibold text-[0.8rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore excepturi ab quam
                fuga illo debitis? Qui id, animi doloribus hic dolor soluta, at sapiente
                voluptatibus assumenda facere non iste debitis.
              </p>
              <span class="text-[.7rem] my-1 font-normal text-gray-300">
                <i class="fa-solid fa-clock mr-2"> </i>
                24min
              </span>
            </div>
          </div>
          <div class="p-3 hover:bg-slate-700 rounded-md flex items-start space-x-3 transition-all">
            <div class="flex">
              <input
                id="hs-checked-checkbox"
                type="checkbox"
                class="shrink-0 mt-0.5 border-gray-200 rounded text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                checked
              />
            </div>
            <div>
              <p class="line-clamp-2 font-semibold text-[0.8rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore excepturi ab quam
                fuga illo debitis? Qui id, animi doloribus hic dolor soluta, at sapiente
                voluptatibus assumenda facere non iste debitis.
              </p>
              <span class="text-[.7rem] my-1 font-normal text-gray-300">
                <i class="fa-solid fa-clock mr-2"> </i>
                24min
              </span>
            </div>
          </div>
          <div class="p-3 hover:bg-slate-700 rounded-md flex items-start space-x-3 transition-all">
            <div class="flex">
              <input
                id="hs-checked-checkbox"
                type="checkbox"
                class="shrink-0 mt-0.5 border-gray-200 rounded text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                checked
              />
            </div>
            <div>
              <p class="line-clamp-2 font-semibold text-[0.8rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore excepturi ab quam
                fuga illo debitis? Qui id, animi doloribus hic dolor soluta, at sapiente
                voluptatibus assumenda facere non iste debitis.
              </p>
              <span class="text-[.7rem] my-1 font-normal text-gray-300">
                <i class="fa-solid fa-clock mr-2"> </i>
                24min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
