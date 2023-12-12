import { FC, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Auth, Todo } from "./pages"
import axios from "axios"
import { useCsrfToken } from "./hooks"

const App: FC = () => {
  const { csrfToken } = useCsrfToken()

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
