<script setup lang="ts">
import Checkbox from '@/components/Forms/Fields/Checkbox.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Email And Notifications' })

definePageMeta({ layout: 'app-layout' })

const store = useAuthStore()

const { user, errors } = storeToRefs(store)

const form = reactive({
  display_name: user.value?.display_name,
  headline: user.value?.headline,
  about_me: user.value?.about_me,
  facebook_url: user.value?.facebook_url,
  twitter_url: user.value?.twitter_url,
  instagram_url: user.value?.instagram_url,
  pinterest_url: user.value?.pinterest_url,
  youtube_url: user.value?.youtube_url,
  github_url: user.value?.github_url,
  personal_website_url: user.value?.personal_website_url,
  avatar: user.value?.avatar
})

watch(
  () => user.value,
  () => {
    form.display_name = user.value?.display_name
    form.headline = user.value?.headline
    form.about_me = user.value?.about_me
    form.facebook_url = user.value?.facebook_url
    form.twitter_url = user.value?.twitter_url
    form.instagram_url = user.value?.instagram_url
    form.pinterest_url = user.value?.pinterest_url
    form.youtube_url = user.value?.youtube_url
    form.github_url = user.value?.github_url
    form.personal_website_url = user.value?.personal_website_url
    form.avatar = user.value?.avatar
  }
)
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row items-start md:space-x-6 space-y-5 md:space-y-0">
        <div class="w-full md:w-3/12">
          <SettingSideTabs />
        </div>
        <div class="w-full md:w-9/12">
          <div class="bg-white border border-gray-300 p-10 rounded-md space-y-10">
            <div>
              <h1 class="font-bold text-xl text-gray-800 mb-8">{{ $t('Email Notifications') }}</h1>

              <div class="space-y-5">
                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Updates From Classes You're Taking
                    </h3>
                    <p class="text-xs font-semibold">Announcements, events, and tips and tricks.</p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Updates from Teacher Discussions
                    </h3>
                    <p class="text-xs font-semibold">
                      Public Discussions outside of a class that teachers share to all of their
                      followers.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Updates From Classes You're Taking
                    </h3>
                    <p class="text-xs font-semibold">Announcements, events, and tips and tricks.</p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Activity on Your Projects</h3>
                    <p class="text-xs font-semibold">
                      Someone likes or comments on a project you've created.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Activity on Your Discussions and Comments
                    </h3>
                    <p class="text-xs font-semibold">
                      Someone replies to a comment or discussion you've created.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Replies to Comments</h3>
                    <p class="text-xs font-semibold">
                      Someone replies to a comment that you previously replied to.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">New Follower</h3>
                    <p class="text-xs font-semibold">Someone on Skillshare follows you.</p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      New Class by Someone You Follow
                    </h3>
                    <p class="text-xs font-semibold">Someone you follow creates a Class.</p>
                  </div>
                </div>

                <hr />

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Personalized Class Recommendations
                    </h3>
                    <p class="text-xs font-semibold">
                      Weekly recommendations tailored to your interests.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">New Launches and Content</h3>
                    <p class="text-xs font-semibold">
                      Learn about new classes, launches, and more on Skillshare.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Updates from Skillshare</h3>
                    <p class="text-xs font-semibold">
                      Occasional product and company announcements.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Promotions and Discounts</h3>
                    <p class="text-xs font-semibold">
                      Stay in the loop on how to get discounts on Skillshare membership and more.
                    </p>
                  </div>
                </div>

                <hr />

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Don't Send Me Any Email</h3>
                    <p class="text-xs font-semibold">
                      You will only receive critical account emails.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1 class="font-bold text-xl text-gray-800 mb-8">{{ $t('In App Notifications') }}</h1>

              <div class="space-y-5">
                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Updates From Classes You're Taking
                    </h3>
                    <p class="text-xs font-semibold">Announcements, events, and tips and tricks.</p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Updates from Teacher Discussions
                    </h3>
                    <p class="text-xs font-semibold">
                      Public Discussions outside of a class that teachers share to all of their
                      followers.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Updates From Classes You're Taking
                    </h3>
                    <p class="text-xs font-semibold">Announcements, events, and tips and tricks.</p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Activity on Your Projects</h3>
                    <p class="text-xs font-semibold">
                      Someone likes or comments on a project you've created.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Activity on Your Discussions and Comments
                    </h3>
                    <p class="text-xs font-semibold">
                      Someone replies to a comment or discussion you've created.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Replies to Comments</h3>
                    <p class="text-xs font-semibold">
                      Someone replies to a comment that you previously replied to.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">New Follower</h3>
                    <p class="text-xs font-semibold">Someone on Skillshare follows you.</p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      New Class by Someone You Follow
                    </h3>
                    <p class="text-xs font-semibold">Someone you follow creates a Class.</p>
                  </div>
                </div>

                <hr />

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      Personalized Class Recommendations
                    </h3>
                    <p class="text-xs font-semibold">
                      Weekly recommendations tailored to your interests.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">New Launches and Content</h3>
                    <p class="text-xs font-semibold">
                      Learn about new classes, launches, and more on Skillshare.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Updates from Skillshare</h3>
                    <p class="text-xs font-semibold">
                      Occasional product and company announcements.
                    </p>
                  </div>
                </div>

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Promotions and Discounts</h3>
                    <p class="text-xs font-semibold">
                      Stay in the loop on how to get discounts on Skillshare membership and more.
                    </p>
                  </div>
                </div>

                <hr />

                <div class="space-x-5 flex items-start">
                  <Checkbox />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">Don't Send Me Any Email</h3>
                    <p class="text-xs font-semibold">
                      You will only receive critical account emails.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
