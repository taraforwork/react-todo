import { useEffect } from "react"
import axios from "axios"
import { CsrfToken } from "../types"

export const useCsfrToken = () => {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsfrToken = async () => {
      const { data } = await axios.get<CsrfToken>(`${process.env.API_URL}/csrf`)
      axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token
    }
    getCsfrToken()
  }, [])
}
