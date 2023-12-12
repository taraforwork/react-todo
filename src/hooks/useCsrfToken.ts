import { useEffect, useState } from "react"
import axios from "axios"
import { CsrfToken } from "../types"

export const useCsfrToken = () => {
  const [csrfToken, setCsrfToken] = useState<CsrfToken["csrf_token"]>()
  useEffect(() => {
    if (!csrfToken) {
      const getCsfrToken = async () => {
        const { data } = await axios.get<CsrfToken>(
          `${process.env.API_URL}/csrf`
        )
        setCsrfToken(data.csrf_token)
      }
      getCsfrToken()
    }
  }, [csrfToken])

  return { csrfToken }
}
