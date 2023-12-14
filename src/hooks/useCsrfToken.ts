import { useEffect, useState } from "react"
import axios from "axios"
import { CsrfToken } from "../types"
import { apiUrl } from "../utils/const"

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<CsrfToken["csrf_token"]>()
  useEffect(() => {
    if (!csrfToken) {
      const getCsfrToken = async () => {
        const { data } = await axios.get<CsrfToken>(`${apiUrl}/csrf`)
        setCsrfToken(data.csrf_token)
      }
      getCsfrToken()
    }
  }, [csrfToken])

  return { csrfToken }
}
