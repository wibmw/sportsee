import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { activity, average, performances, user } from './mockedDatas'

/**
 * Get and returns datas from the back-end or the mocked datas
 * @module 
 * @param {string} id User id
 * @param {string} url Back-end path for url
 * @param {string} dataParam Data de get from the returned datas
 * @returns {*} data
 */
export const getDatas = (id: string, url: string, dataParam: string) => {
  const conf: AxiosRequestConfig = {},
    [data, setData] = useState<any>(),
    [isError, setIsError] = useState(false),
    navigate = useNavigate(),
    client = axios.create({
      baseURL: 'http://localhost:3500/user/',
    })

  conf.validateStatus = (status: number) => {
    return (status >= 200 && status < 300) || status == 404
  }

  // Fetch data from the API
  useEffect(() => {
    /**
     * Description placeholder
     * @date 10/14/2022 - 3:19:04 PM
     *
     * @async
     * @returns {*}
     */
    const fetchData = async () => {
      try {
        client
          .get<[]>(id + url, conf)
          .then((res: AxiosResponse) => {
            if (res.status >= 200 && res.status < 300) setData(res.data.data)
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

  /**
   * Fetch local datas
   * @returns {*}
   */
  const getMockedDatas = () => {
    let data
    if (url === '/average-sessions') data = average.data
    else if (url === '/activity') data = activity.data
    else if (url === '/performance') data = performances.data
    else data = user.data

    return data.filter((data) => data?.id?.toString() === id || data?.userId?.toString() === id)[0][dataParam]
  }

  return data && data
}
