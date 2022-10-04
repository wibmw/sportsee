import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

const client = axios.create({
  baseURL: 'http://localhost:3500/user/',
})

export const getDatas = (url: string, dataParam: string) => {
  const [data, setData] = useState<any>()
  const [isError, setIsError] = useState(false)
  const conf: AxiosRequestConfig = {}

  conf.validateStatus = (status: number) => {
    return (status >= 200 && status < 300) || status == 404
  }

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        client.get<[]>(url, conf).then((res: AxiosResponse) => {
          if (res.status >= 200 && res.status < 300) setData(res.data.data[dataParam])
          else console.error('404 : No user found !')
        })
      } catch (error) {
        setIsError(true)
        alert('Error message: \n' + error)
      }
    }
    fetchData()
  }, [])

  return data && data
}
