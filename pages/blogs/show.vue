<script setup lang="ts">
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import RecommendedCourseCard from '~/components/Cards/RecommendedCourseCard.vue'
import BlogCard from '~/components/Cards/BlogCard.vue'

// useHead({ title: 'Home' })
</script>

<template>
  <NuxtLayout name="blog-layout">
    <section>
      <!-- Hero -->
      <div class="relative overflow-hidden">
        <div class="max-w-[70rem] mx-auto px-4 py-8 md:py-16">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-10">
            How Google Assistant now helps you record stories for kids
          </h1>

          <div class="flex items-center justify-between">
            <!-- Avatar -->
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                  alt="Image Description"
                />
              </div>
              <div class="ms-2.5 sm:ms-4">
                <h4 class="text-md font-semibold text-gray-700">Aaron Larsson</h4>
                <p class="text-xs text-gray-600">Feb 15, 2021</p>
              </div>
            </div>
            <!-- End Avatar -->

            <div class="flex items-center space-x-3">
              <!-- Facebook -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                ></path>
              </svg>

              <!-- Youtube -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                ></path>
                <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
              </svg>

              <!-- Twitter -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#03A9F4"
                  d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                ></path>
              </svg>

              <!-- Linked In -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#0078d4"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                ></path>
                <path
                  d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                  opacity=".05"
                ></path>
                <path
                  d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                  opacity=".07"
                ></path>
                <path
                  fill="#fff"
                  d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                ></path>
              </svg>
            </div>
          </div>

          <div class="my-10 rounded-md border overflow-hidden p-2.5 shadow">
            <img
              src="https://cdn.sanity.io/images/tlr8oxjg/production/9f15109746df254c5a030a7ba9239f8a4bb5dadb-1456x816.png?w=3840&q=100&fit=clip&auto=format"
              alt=""
              class="w-full object-cover"
            />
          </div>

          <div class="mt-3 font-medium text-gray-600 text-left">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptate saepe nihil
              earum excepturi expedita alias, vitae amet voluptatum cupiditate tempore aspernatur
              veniam repellat suscipit ad dolorem, praesentium blanditiis incidunt quam dicta,
              accusantium odio ab eos. Totam at nemo eligendi est? Aspernatur provident totam
              necessitatibus quos beatae quasi sapiente sequi placeat possimus nostrum maiores
              ducimus, consectetur quod corporis perspiciatis sint, qui ipsa culpa doloribus
              voluptatibus quia recusandae. Ratione voluptatibus deleniti, facilis dolore earum
              necessitatibus obcaecati quas, incidunt debitis enim quaerat rem optio error
              repellendus autem laboriosam minus quod, nisi magni! Facere non ipsum iste fuga libero
              eveniet animi velit officia?
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptate saepe nihil
              earum excepturi expedita alias, vitae amet voluptatum cupiditate tempore aspernatur
              veniam repellat suscipit ad dolorem, praesentium blanditiis incidunt quam dicta,
              accusantium odio ab eos. Totam at nemo eligendi est? Aspernatur provident totam
              necessitatibus quos beatae quasi sapiente sequi placeat possimus nostrum maiores
              ducimus, consectetur quod corporis perspiciatis sint, qui ipsa culpa doloribus
              voluptatibus quia recusandae. Ratione voluptatibus deleniti, facilis dolore earum
              necessitatibus obcaecati quas, incidunt debitis enim quaerat rem optio error
              repellendus autem laboriosam minus quod, nisi magni! Facere non ipsum iste fuga libero
              eveniet animi velit officia?
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptate saepe nihil
              earum excepturi expedita alias, vitae amet voluptatum cupiditate tempore aspernatur
              veniam repellat suscipit ad dolorem, praesentium blanditiis incidunt quam dicta,
              accusantium odio ab eos. Totam at nemo eligendi est? Aspernatur provident totam
              necessitatibus quos beatae quasi sapiente sequi placeat possimus nostrum maiores
              ducimus, consectetur quod corporis perspiciatis sint, qui ipsa culpa doloribus
              voluptatibus quia recusandae. Ratione voluptatibus deleniti, facilis dolore earum
              necessitatibus obcaecati quas, incidunt debitis enim quaerat rem optio error
              repellendus autem laboriosam minus quod, nisi magni! Facere non ipsum iste fuga libero
              eveniet animi velit officia?
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptate saepe nihil
              earum excepturi expedita alias, vitae amet voluptatum cupiditate tempore aspernatur
              veniam repellat suscipit ad dolorem, praesentium blanditiis incidunt quam dicta,
              accusantium odio ab eos. Totam at nemo eligendi est? Aspernatur provident totam
              necessitatibus quos beatae quasi sapiente sequi placeat possimus nostrum maiores
              ducimus, consectetur quod corporis perspiciatis sint, qui ipsa culpa doloribus
              voluptatibus quia recusandae. Ratione voluptatibus deleniti, facilis dolore earum
              necessitatibus obcaecati quas, incidunt debitis enim quaerat rem optio error
              repellendus autem laboriosam minus quod, nisi magni! Facere non ipsum iste fuga libero
              eveniet animi velit officia?
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptate saepe nihil
              earum excepturi expedita alias, vitae amet voluptatum cupiditate tempore aspernatur
              veniam repellat suscipit ad dolorem, praesentium blanditiis incidunt quam dicta,
              accusantium odio ab eos. Totam at nemo eligendi est? Aspernatur provident totam
              necessitatibus quos beatae quasi sapiente sequi placeat possimus nostrum maiores
              ducimus, consectetur quod corporis perspiciatis sint, qui ipsa culpa doloribus
              voluptatibus quia recusandae. Ratione voluptatibus deleniti, facilis dolore earum
              necessitatibus obcaecati quas, incidunt debitis enim quaerat rem optio error
              repellendus autem laboriosam minus quod, nisi magni! Facere non ipsum iste fuga libero
              eveniet animi velit officia?
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptate saepe nihil
              earum excepturi expedita alias, vitae amet voluptatum cupiditate tempore aspernatur
              veniam repellat suscipit ad dolorem, praesentium blanditiis incidunt quam dicta,
              accusantium odio ab eos. Totam at nemo eligendi est? Aspernatur provident totam
              necessitatibus quos beatae quasi sapiente sequi placeat possimus nostrum maiores
              ducimus, consectetur quod corporis perspiciatis sint, qui ipsa culpa doloribus
              voluptatibus quia recusandae. Ratione voluptatibus deleniti, facilis dolore earum
              necessitatibus obcaecati quas, incidunt debitis enim quaerat rem optio error
              repellendus autem laboriosam minus quod, nisi magni! Facere non ipsum iste fuga libero
              eveniet animi velit officia?
            </p>
          </div>

          <div class="my-10 flex items-center">
            <p class="text-md font-semibold text-gray-700 mr-3">Share :</p>

            <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="#" class="text-gray-600 hover:text-gray-900">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Facebook page</span>
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-900">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Instagram page</span>
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-900">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- End Hero -->
    </section>

    <section id="related-blogs">
      <h1 class="text-2xl md:text-4xl font-bold text-gray-700 px-5 md:px-20 mb-5">Related Blogs</h1>
      <div class="max-w-[85rem] mx-auto px-4 py-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>

    <section id="recommended-courses" class="py-10">
      <h1 class="text-2xl md:text-4xl font-bold text-gray-700 px-5 md:px-20 mb-5">
        Recommended Courses
      </h1>

      <hr />

      <div class="max-w-[85rem] mx-auto px-4 py-8">
        <div class="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          <RecommendedCourseCard />
          <RecommendedCourseCard />
          <RecommendedCourseCard />
          <RecommendedCourseCard />
        </div>
      </div>
    </section>

    <BlogAdvertisement />
  </NuxtLayout>
</template>
