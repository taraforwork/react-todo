import { FC, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Auth, Todo } from "./pages"
import { useCsfrToken } from "./hooks/useCsrfToken"
import axios from "axios"

const App: FC = () => {
  const { csrfToken } = useCsfrToken()

  useEffect(() => {
    if (!csrfToken) return
    axios.defaults.withCredentials = true
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken
  }, [csrfToken])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
