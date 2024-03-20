<script setup lang="ts">
import Modal from '~/components/ModalContainer.vue'
import ELearningSearchBox from '~/components/Forms/SearchBoxs/ELearningSearchBox.vue'

const confirmingSearch = ref(false)

const confirmSearch = () => (confirmingSearch.value = true)

const closeModal = () => (confirmingSearch.value = false)
</script>

<template>
  <div>
    <button
      type="button"
      class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
      @click="confirmSearch"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>

    <Modal :show="confirmingSearch" @close="closeModal">
      <div class="max-w-[700px] mx-auto">
        <ELearningSearchBox @updated-search="confirmingSearch = false" />
      </div>

      <div class="my-5 p-5 bg-white rounded-md shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div class="col-span-1">
            <h1 class="font-extrabold uppercase text-xs text-gray-600 py-3 px-2.5">Skill Tags</h1>

            <div>
              <button
                v-for="index in 12"
                :key="index"
                class="text-gray-800 font-semibold w-full px-2.5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
              >
                Html 5
              </button>
            </div>
          </div>

          <div
            class="grid grid-rows-2 col-span-2 md:border-x md:px-5 md:border-y-0 border-y md:py-0 py-5"
          >
            <div>
              <div>
                <h1 class="font-extrabold uppercase text-xs text-gray-600 py-3 px-2.5">Courses</h1>
              </div>
              <div>
                <button
                  v-for="index in 4"
                  :key="index"
                  class="text-gray-800 font-semibold w-full px-2.5 py-3 rounded-md text-left text-sm hover:bg-gray-200 duration-200 transition-all focus:ring-0 flex items-center space-x-2"
                >
                  <img
                    src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                    class="h-10 rounded-sm border"
                  />
                  <span class="line-clamp-2 font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore autem vitae
                    dolorum sed, officia neque, soluta odio ipsa atque nemo praesentium quasi quos
                    hic aut officiis. Perspiciatis, esse reprehenderit.
                  </span>
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1 class="font-extrabold uppercase text-xs text-gray-600 py-3 px-2.5">
                  Learning Paths
                </h1>
              </div>
              <div>
                <button
                  v-for="index in 4"
                  :key="index"
                  class="text-gray-800 font-semibold w-full px-2.5 py-3 rounded-md text-left text-sm hover:bg-gray-200 duration-200 transition-all focus:ring-0 flex items-center space-x-2"
                >
                  <img
                    src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                    class="h-10 rounded-sm border"
                  />
                  <span class="line-clamp-2 font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore autem vitae
                    dolorum sed, officia neque, soluta odio ipsa atque nemo praesentium quasi quos
                    hic aut officiis. Perspiciatis, esse reprehenderit.
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <h1 class="font-extrabold uppercase text-xs text-gray-600 py-3 px-2.5">Instructors</h1>

            <div>
              <button
                v-for="index in 8"
                :key="index"
                class="text-gray-800 font-semibold w-full px-2.5 py-3 rounded-md text-left text-sm hover:bg-gray-200 duration-200 transition-all focus:ring-0 flex items-center space-x-2"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <span> Aung Thu Zaw </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
