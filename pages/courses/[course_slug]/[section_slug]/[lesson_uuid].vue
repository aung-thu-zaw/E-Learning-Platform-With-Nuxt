<script setup lang="ts">
import VideoPlayerBox from '~/components/VideoPlayerBox.vue'
import SwitchCheckbox from '~/components/Forms/Fields/SwitchCheckbox.vue'
import CourseProgressBar from '~/components/ProgressBars/CourseProgressBar.vue'
import CourseSectionAccordion from '~/components/Accordions/CourseSectionAccordion.vue'
// import CourseInstructorCard from '~/components/Cards/CourseInstructorCard.vue'
import { useCourseStore } from '~/stores/e-learning/course'

useHead({ title: 'Home' })

definePageMeta({ layout: 'app-layout' })

const store = useCourseStore()
const courseSlug = useRoute().params.course_slug?.toString()
const sectionSlug = useRoute().params.section_slug.toString()
const lessonUUId = useRoute().params.lesson_uuid.toString()
const progress = ref<number>(0)

const { course, lesson, lessonVideo } = storeToRefs(store)
const { $axiosApi } = useNuxtApp()

onMounted(async () => {
  await store.getCourse(courseSlug)

  if (course.value) {
    await store.getLessonMetaData(lessonUUId)
    await store.getLessonVideo(course.value.uuid, sectionSlug, lessonUUId)
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const updateProgressPercent = (percent: number) => (progress.value = percent)

const handleDownloadLesson = async () => {
  try {
    if (course.value && lesson.value) {
      const { data } = await $axiosApi.get(
        `courses/${course.value.uuid}/sections/${sectionSlug}/lessons/${lessonUUId}`,
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', sectionSlug + '-' + lesson.value.title)
      document.body.appendChild(link)
      link.click()
    }
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}
</script>

<template>
  <div v-if="lesson">
    <section>
      <header class="pt-5 mt-10 md:mt-0 px-5">
        <div class="">
          <div class="w-full flex flex-col md:flex-row items-start justify-between">
            <div class="w-full md:w-9/12">
              <div v-if="lessonVideo" class="rounded-md overflow-hidden border border-gray-200">
                <VideoPlayerBox :video="lessonVideo" @progress-update="updateProgressPercent" />
              </div>

              <div class="my-10">
                <h1 class="font-bold text-3xl text-gray-800">
                  {{ lesson?.title }}
                </h1>
              </div>

              <div class="my-6 flex items-center justify-between">
                <div class="space-x-5">
                  <button
                    type="button"
                    class="text-white bg-yellow-500 hover:bg-yellow-600 transition-all px-3 py-3 shadow-sm rounded-md text-xs"
                    @click="
                      !lesson?.is_completed
                        ? store.lessonMarkAsComplete(lesson.uuid)
                        : store.lessonUnmarkAsComplete(lesson.uuid)
                    "
                  >
                    <i class="fa-solid fa-circle-check"></i>
                    {{ !lesson?.is_completed ? $t('Mark As Complete') : $t('Unmark as Complete') }}
                  </button>

                  <button
                    type="button"
                    class="text-white bg-yellow-500 hover:bg-yellow-600 transition-all px-3 py-3 shadow-sm rounded-md text-xs"
                    @click="handleDownloadLesson"
                  >
                    <i class="fa-solid fa-download"></i>
                    {{ $t('Download Video') }}
                  </button>
                </div>

                <button
                  type="button"
                  class="text-white bg-yellow-500 hover:bg-yellow-600 transition-all px-3 py-3 shadow-sm rounded-md text-xs"
                >
                  <i class="fa-solid fa-bell"></i>
                  {{ $t('Get notified when participating') }}
                </button>
              </div>
            </div>
            <div class="w-full md:w-3/12 text-gray-700 flex flex-col items-center justify-between">
              <div class="ml-auto">
                <SwitchCheckbox label="Autoplay" />
              </div>

              <!-- Progress -->
              <CourseProgressBar :enrollment="course?.enrollment ?? null" />
              <!-- End Progress -->

              <div class="px-3 h-[600px] overflow-auto">
                <!-- Section -->
                <CourseSectionAccordion
                  v-for="(section, index) in course?.sections"
                  v-show="section?.lessons?.length"
                  :key="index"
                  :section="section"
                  :is-enrolled="course?.is_enrolled"
                  :current-lesson="lesson ?? null"
                  :lesson-progress="progress"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>

    <!-- <section>
      <div class="bg-white border-b border-b-gray-300 overflow-scroll">
        <div class="container mx-auto px-20">
          <nav class="flex space-x-10" aria-label="Tabs" role="tablist">
            <button
              id="tabs-with-underline-item-1"
              type="button"
              class="hs-tab-active:font-semibold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm font-bold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none active"
              data-hs-tab="#tabs-with-underline-1"
              aria-controls="tabs-with-underline-1"
              role="tab"
            >
              About
            </button>
            <button
              id="tabs-with-underline-item-2"
              type="button"
              class="hs-tab-active:font-semibold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none text-sm text-gray-700 font-bold"
              data-hs-tab="#tabs-with-underline-2"
              aria-controls="tabs-with-underline-2"
              role="tab"
            >
              Projects & Resources
            </button>
            <button
              id="tabs-with-underline-item-3"
              type="button"
              class="hs-tab-active:font-semibold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none text-sm text-gray-700 font-bold"
              data-hs-tab="#tabs-with-underline-3"
              aria-controls="tabs-with-underline-3"
              role="tab"
            >
              Reviews
            </button>
            <button
              id="tabs-with-underline-item-4"
              type="button"
              class="hs-tab-active:font-semibold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none text-sm text-gray-700 font-bold"
              data-hs-tab="#tabs-with-underline-4"
              aria-controls="tabs-with-underline-4"
              role="tab"
            >
              Discussions
            </button>
          </nav>
        </div>
      </div>

      <div class="bg-gray-50 max-w-[1200px] mx-auto">
        <div class="mt-3">
          <div
            id="tabs-with-underline-1"
            role="tabpanel"
            aria-labelledby="tabs-with-underline-item-1"
          >
            <div class="flex flex-col md:flex-row items-start pt-3 pb-12 gap-5 p-10">
              <div class="w-full md:w-8/12">
                <h1 class="font-bold text-gray-800 text-xl mb-5">About This Course</h1>
                <p class="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolor, omnis
                  cumque sequi enim ut eius voluptatem esse velit quis dolorem quam nulla alias
                  incidunt culpa pariatur aliquid! Facere accusamus beatae vel. Inventore
                  reprehenderit, eveniet ut nisi iste in iusto id veritatis atque deleniti est, vel
                  similique magni eaque consequatur repellendus distinctio nemo neque perspiciatis!
                  Cumque, facilis nihil ut enim tenetur eveniet, eaque numquam quisquam ratione
                  adipisci mollitia minus consectetur! Natus accusantium ex nostrum ipsum dicta ut
                  quas vel deleniti culpa iusto officia quis, maiores iste dolores mollitia quod
                  magni soluta possimus temporibus. Nihil quis esse soluta, fugiat quaerat
                  voluptatibus ut deleniti velit deserunt iure corrupti adipisci, quia non mollitia
                  commodi voluptates dolorem exercitationem neque aut! Eum quo illum ipsam iste
                  nihil earum, illo quis error accusamus nostrum dicta. Corporis, distinctio vero
                  enim at cum qui unde commodi vitae hic culpa mollitia libero illo maxime
                  consequatur et aliquam excepturi ipsum. Voluptatem, odit praesentium! Consectetur
                  assumenda ullam facere odit, cumque veritatis officia ipsum non quia qui
                  exercitationem voluptatem reiciendis laudantium. Dolor, nemo tempore illum animi
                  adipisci magni necessitatibus accusamus ab autem quo obcaecati repudiandae soluta
                  expedita perferendis ex quia nulla id consequuntur fuga iste iure? Ducimus itaque
                  rem repellendus aliquid et nihil quod voluptatibus. Officia voluptatem cum sit
                  repellat, praesentium sapiente. Eligendi sint provident fuga! Beatae
                  necessitatibus dolor ullam sequi omnis consectetur magnam magni obcaecati quod
                  alias minus voluptatum quis quia voluptatibus a facilis vel, minima rerum qui
                  modi, provident est accusamus, perferendis in! Error repellat amet aliquid ut ea,
                  nisi qui non expedita odio optio neque, sunt consequatur cupiditate impedit,
                  laboriosam explicabo quidem iusto repellendus ab consequuntur quae ipsum
                  asperiores possimus doloremque! Optio odio sit ea, enim aspernatur animi
                  distinctio omnis fugiat vitae quibusdam iste beatae impedit alias amet obcaecati
                  quasi unde quam aperiam debitis laborum ducimus. Libero, quaerat quia! Neque quas
                  praesentium suscipit alias, officia dolore aperiam libero fuga velit, incidunt
                  placeat dolorem iusto ratione unde quisquam molestiae atque rem? Quo, cupiditate
                  autem. Reiciendis accusamus, quisquam dolor, cupiditate nulla quasi hic, iure quos
                  pariatur cumque voluptatibus dicta. Molestiae maxime animi deserunt. Porro
                  doloremque odio magni. Quibusdam, eum odit odio quas minus facere. Sapiente iste
                  dignissimos corrupti molestiae dolorem! Aliquam numquam labore vel minus obcaecati
                  pariatur nobis quasi quisquam, iste similique aperiam, libero consequuntur neque
                  non sequi, architecto magni ex aut porro earum voluptate! Accusantium veritatis
                  dolorum incidunt enim dicta unde nam esse? Reiciendis, a aspernatur numquam nobis
                  quam consequatur ducimus nostrum ad. Ad, recusandae consectetur error tenetur
                  pariatur perspiciatis nesciunt cum itaque expedita quod, eveniet rem. Laboriosam
                  obcaecati, perferendis aliquid facilis nemo ad sint omnis nesciunt consequatur rem
                  porro, vel nisi suscipit et quibusdam cupiditate! Aperiam corporis, autem sequi
                  quam quaerat earum tempora! Assumenda accusantium aspernatur, reprehenderit quae,
                  tenetur eum a, magni dicta maxime eos omnis quam. Nobis sint cupiditate recusandae
                  facilis eligendi repudiandae maxime suscipit tempore similique amet, quam,
                  aspernatur veritatis, repellendus numquam ea. Ratione accusamus ducimus fugiat
                  voluptate asperiores repellat at. Sequi ex vel nisi praesentium ipsam odio
                  voluptate voluptates id fugiat? Soluta officiis hic iusto exercitationem.
                </p>
              </div>
              <div class="w-full md:w-4/12 space-y-5">
                <div class="flex items-center justify-between">
                  <button
                    class="bg-white font-bold px-10 text-sm py-3 rounded-md border border-gray-300 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all"
                  >
                    <i class="fa-solid fa-bookmark"></i>
                    Saved
                  </button>
                  <button
                    class="bg-white font-bold px-10 text-sm py-3 rounded-md border border-gray-300 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all"
                  >
                    <i class="fa-solid fa-share"></i>
                    Share
                  </button>
                </div>

                <CourseInstructorCard />
              </div>
            </div>
          </div>
          <div
            id="tabs-with-underline-2"
            class="hidden"
            role="tabpanel"
            aria-labelledby="tabs-with-underline-item-2"
          >
            <p class="text-gray-500">
              This is the
              <em class="font-semibold text-gray-800">second</em>
              item's tab body.
            </p>
          </div>
          <div
            id="tabs-with-underline-3"
            class="hidden"
            role="tabpanel"
            aria-labelledby="tabs-with-underline-item-3"
          >
            <p class="text-gray-500">
              This is the
              <em class="font-semibold text-gray-800">third</em>
              item's tab body.
            </p>
          </div>
          <div
            id="tabs-with-underline-4"
            class="hidden"
            role="tabpanel"
            aria-labelledby="tabs-with-underline-item-4"
          >
            <p class="text-gray-500">
              This is the
              <em class="font-semibold text-gray-800">fourth</em>
              item's tab body.
            </p>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>
