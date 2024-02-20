// export const useFetchInstance = (options) => {
//   const config = useRuntimeConfig()

//   const xsrfToken = useCookie('XSRF-TOKEN')

//   let headers = { accept: 'application/json', ...options?.headers }

//   if (xsrfToken && xsrfToken.value !== null) headers['X-XSRF-TOKEN'] = xsrfToken

//   //   if (process.server) {
//   //     headers = {
//   //       ...headers,
//   //       ...useRequestHeaders(['cookie']),
//   //       referer: config.public.baseURL
//   //     }
//   //   }

//   //   return useFetch(url, {
//   //     baseURL: config.public.apiBaseUrl,
//   //     headers,
//   //     credentials: 'include',
//   //     ...opts
//   //   })

//   const useFetch = async (url,options) => {
//     return await $fetch(url, {})
//   }
//   return { useFetch }
// }

// // const createAxiosInstance = (options) => {
// //   return axios.create({
// //     baseURL: options.baseURL || 'http://localhost:8000',
// //     headers: {
// //       Accept: options.headers?.accept || 'application/json',
// //       'Content-Type': options.headers?.contentType || 'application/json',
// //       'X-Requested-With': options.headers?.xRequestedWith || 'XMLHttpRequest'
// //     }
// //   })
// // }

// const data = await $fetch('http://localhost:8000/api/v1/user', {
//     credentials: 'include',
//     // withXSRFToken: true,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'X-Requested-With': 'XMLHttpRequest'
//     }
//   })
