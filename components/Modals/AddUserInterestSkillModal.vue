<script setup lang="ts">
import InputField from '~/components/Forms/Fields/InputField.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Modal from '~/components/ModalContainer.vue'

interface SkillTag {
  id: number
  name: string
}

const confirmingAddMoreInterest = ref(false)
const search = ref<string>('')
const skillTags = ref<SkillTag[] | null>(null)
const followedTags = ref<SkillTag[] | null>(null)
const searchableSkillTags = ref<SkillTag[] | null>(null)
const delayedSearch = ref<NodeJS.Timeout | null>(null)
const store = useAuthStore()

const { $axiosApi } = useNuxtApp()

const getSkillTags = async () => {
  try {
    const { data } = await $axiosApi.get(`/skill-tags`)

    skillTags.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const getAllUserInterestedTag = async () => {
  try {
    const { data } = await $axiosApi.get('/followed-tags')

    followedTags.value = data
  } catch (error: any) {
    console.error(error)
  }
}

const followedTag = async (tagId: number) => {
  try {
    await $axiosApi.post('/follow-tag', { tag_id: tagId })

    await getAllUserInterestedTag()
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const unFollowedTag = async (tagId: number) => {
  try {
    await $axiosApi.post('/unfollow-tag', { tag_id: tagId })

    await getAllUserInterestedTag()
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const filteredSkillTags = (keyword: string) => {
  if (delayedSearch.value) {
    clearTimeout(delayedSearch.value)
  }
  delayedSearch.value = setTimeout(() => {
    if (!keyword || !skillTags.value) {
      searchableSkillTags.value = []
      return
    }
    const regex = new RegExp(keyword, 'i')
    searchableSkillTags.value = skillTags.value.filter((skillTag) => regex.test(skillTag.name))
  }, 400)
}

const isFollowed = (tagId: number): boolean => {
  if (!followedTags.value) {
    return false
  }

  return followedTags.value.some((tag) => tag.id === tagId)
}

const confirmAddMoreInterest = () => (confirmingAddMoreInterest.value = true)

const closeModal = () => {
  confirmingAddMoreInterest.value = false
  search.value = ''
}

onMounted(async () => {
  await getSkillTags()
  await getAllUserInterestedTag()
})

watch(
  () => search.value,
  (newKeyword) => filteredSkillTags(newKeyword)
)
</script>

<template>
  <div v-show="store.isAuthenticated">
    <button
      type="button"
      class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
      @click="confirmAddMoreInterest"
    >
      <i class="fa-solid fa-plus mr-1"></i>
      {{ $t('Add More') }}
    </button>

    <Modal :show="confirmingAddMoreInterest" @close="closeModal">
      <div class="p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-md font-bold text-gray-800">
            <i class="fa-solid fa-tag"></i>
            Follow Skills
          </h2>

          <button
            type="button"
            class="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center duration-200"
            @click="closeModal"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <hr class="my-5" />

        <h2 class="text-xs font-extrabold uppercase text-gray-800">Skills You Follow</h2>

        <div>
          <div v-if="followedTags?.length" class="flex items-center flex-wrap my-5">
            <button
              v-for="tag in followedTags"
              :key="tag"
              type="button"
              class="mr-1.5 mb-1.5 rounded-sm font-bold px-3.5 py-1 text-xs bg-yellow-500 text-white"
              @click="unFollowedTag(tag?.id)"
            >
              {{ tag?.name }}

              <i class="fa-solid fa-xmark ml-1.5"></i>
            </button>
          </div>

          <p v-else class="text-xs font-bold text-gray-600 text-center my-10">
            There are no skill tags you followed.
          </p>
        </div>

        <hr class="my-5" />

        <div class="mt-6">
          <InputField
            v-model="search"
            type="text"
            name="skill"
            placeholder="Search you interest skill"
          />
        </div>

        <p v-show="searchableSkillTags?.length" class="text-gray-800 font-bold text-xs my-5">
          {{ searchableSkillTags?.length }} skill(s) found for your search term.
        </p>

        <div class="flex items-center flex-wrap">
          <button
            v-for="skillTag in searchableSkillTags"
            :key="skillTag?.id"
            type="button"
            class="mr-1.5 mb-1.5 rounded-sm font-bold px-3.5 py-1 text-xs border border-gray-400 duration-200"
            :class="{ 'bg-yellow-500 text-white border-yellow-500': isFollowed(skillTag?.id) }"
            @click="isFollowed(skillTag.id) ? unFollowedTag(skillTag.id) : followedTag(skillTag.id)"
          >
            {{ skillTag?.name }}

            <i
              class="fa-solid ml-1.5"
              :class="{
                'fa-xmark': isFollowed(skillTag?.id),
                'fa-plus': !isFollowed(skillTag?.id)
              }"
            ></i>
          </button>
        </div>

        <div class="mt-6 flex justify-end space-x-5">
          <NormalButton class="bg-yellow-500 hover:bg-yellow-600 text-white" @click="closeModal">
            Done
          </NormalButton>
        </div>
      </div>
    </Modal>
  </div>
</template>
