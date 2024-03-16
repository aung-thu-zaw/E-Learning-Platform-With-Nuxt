<script setup lang="ts">
import Checkbox from '~/components/Forms/Fields/Checkbox.vue'
import Radio from '~/components/Forms/Fields/Radio.vue'
import OneStarRating from '~/components/Ratings/OneStarRating.vue'
import TwoStarRating from '~/components/Ratings/TwoStarRating.vue'
import ThreeStarRating from '~/components/Ratings/ThreeStarRating.vue'
import FourStarRating from '~/components/Ratings/FourStarRating.vue'
import FiveStarRating from '~/components/Ratings/FiveStarRating.vue'
</script>

<template>
  <div class="space-y-5">
    <div>
      <div class="px-5">
        <div class="py-3 mb-3 border-b border-b-gray-300 flex items-center justify-between">
          <h3 class="text-xs font-extrabold uppercase text-gray-800 min-w-[120px]">
            {{ $t('Course Level') }}
          </h3>

          <button
            class="text-yellow-500 duration-200 transition-all hover:bg-yellow-500 hover:text-white font-semibold rounded-md px-2 py-1 text-xs"
          >
            <i class="fa-solid fa-rotate"></i>
            {{ $t('Reset Filters') }}
          </button>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('Beginner') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('Intermediate') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('Advanced') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('All Level') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="px-5">
        <h3
          class="text-xs font-extrabold uppercase text-gray-800 py-3 mb-3 border-b border-b-gray-300"
        >
          {{ $t('Course With') }}
        </h3>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('Resources') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="px-5">
        <h3
          class="text-xs font-extrabold uppercase text-gray-800 py-3 mb-3 border-b border-b-gray-300"
        >
          {{ $t('Publish Date') }}
        </h3>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Radio />

          <span class="ml-3"> {{ $t('All Time') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Radio />

          <span class="ml-3"> {{ $t('Past Week') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Radio />

          <span class="ml-3"> {{ $t('Past Month') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Radio />

          <span class="ml-3"> {{ $t('Past Three Months') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Radio />

          <span class="ml-3"> {{ $t('Past Year') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="px-5">
        <h3
          class="text-xs font-extrabold uppercase text-gray-800 py-3 mb-3 border-b border-b-gray-300"
        >
          {{ $t('Course Duration') }}
        </h3>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('Under 1 hour') }}</span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('1 to 3 hours') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('3 to 5 hours') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> {{ $t('Over 5 hours') }} </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="px-5">
        <h3
          class="text-xs font-extrabold uppercase text-gray-800 py-3 mb-3 border-b border-b-gray-300"
        >
          {{ $t('Course Language') }}
        </h3>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> English</span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> Myanmar </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> French </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> Hindi </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> Japanese </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> Korean </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> Deutsch </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div>
          <Checkbox />

          <span class="ml-3"> Chinese </span>
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="px-5">
        <h3
          class="text-xs font-extrabold uppercase text-gray-800 py-3 mb-3 border-b border-b-gray-300"
        >
          {{ $t('Course Rating') }}
        </h3>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <Radio />

          <FiveStarRating />
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <Radio />

          <FourStarRating />
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <Radio />

          <ThreeStarRating />
        </div>
        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <Radio />

          <TwoStarRating />
        </div>

        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>

      <div
        class="text-gray-700 font-medium w-full px-5 py-2.5 rounded-md text-left text-sm duration-200 transition-all flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <Radio />

          <OneStarRating />
        </div>
        <div>
          <span
            class="border text-[10px] px-3 py-1.5 rounded-full bg-white border-gray-300 font-semibold text-gray-700"
          >
            120
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
