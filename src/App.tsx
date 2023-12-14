import { FC, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Auth, Todos } from "./pages"
import { CsrfToken } from "./types"
import axios from "axios"
import { apiUrl } from "./utils/const"

const App: FC = () => {
  useEffect(() => {
    const getCsfrToken = async () => {
      axios.defaults.withCredentials = true
      const { data } = await axios.get<CsrfToken>(`${apiUrl}/csrf`)
      axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token
    }
    getCsfrToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
