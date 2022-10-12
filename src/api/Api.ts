import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { activity, average, performances, user } from './mockedDatas'
const client = axios.create({
  baseURL: 'http://localhost:3500/user/',
})

export const getDatas = (url: string, dataParam: string) => {
  const conf: AxiosRequestConfig = {},
    [data, setData] = useState<any>(),
    [isError, setIsError] = useState(false),
    navigate = useNavigate()

  conf.validateStatus = (status: number) => {
    return (status >= 200 && status < 300) || status == 404
  }

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        client
          .get<[]>(url, conf)
          .then((res: AxiosResponse) => {
            if (res.status >= 200 && res.status < 300) setData(res.data.data[dataParam])
            else {
              console.error('404 : No user found !')
              navigate('./error', { state: { error: 'Aucun utilisteur trouvé !' } })
            }
          })
          .catch((error) => {
            setData(getMockedDatas())
            console.log('INFO: Utilisation des données locales, car l\'API distante n\'est pas disponible. \n' + error)
          })
      } catch (error) {
        setIsError(true)
      }
    }
    fetchData()
  }, [])

  // Fetch local datas
  const getMockedDatas = () => {
    let data

    if (url.includes('/average-sessions')) data = average.data[dataParam]
    else if (url.includes('/activity')) data = activity.data[dataParam]
    else if (url.includes('/performance')) data = performances.data[dataParam]
    else data = user.data[dataParam === 'score' ? 'todayScore' : dataParam]
    return data
  }

  return data && data
}
