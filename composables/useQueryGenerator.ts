interface Params {
  [key: string]: any
}

export function useQueryGenerator() {
  const generateQueryString = (params: Params): string => {
    const queryParams = Object.entries(params)
      .filter(([key, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')

    return queryParams
  }

  const getParameter = (url: string, parameterName: string): string | number | null => {
    const urlParams = new URLSearchParams(url.split('?')[1])

    const paramValue = urlParams.get(parameterName)

    if (paramValue !== null) {
      const parsedNumber = parseFloat(paramValue)
      return !isNaN(parsedNumber) ? parsedNumber : paramValue
    }
    return null
  }

  return {
    generateQueryString,
    getParameter
  }
}
